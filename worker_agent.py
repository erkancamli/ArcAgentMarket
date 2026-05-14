"""
ArcAgentMarket — Worker Agent
Polls JobMarket for open jobs, accepts them, completes work with OpenAI, submits result.

Setup:
  pip install web3 openai python-dotenv requests

.env:
  PRIVATE_KEY=0x...
  OPENAI_API_KEY=sk-...
"""

import os
import time
import json
import logging
from dotenv import load_dotenv
from web3 import Web3
from openai import OpenAI

load_dotenv()
logging.basicConfig(level=logging.INFO, format="%(asctime)s [WORKER] %(message)s")
log = logging.getLogger("worker")

# ── Config ─────────────────────────────────────────────────────────
RPC_URL      = "https://rpc.testnet.arc.network"
REGISTRY_ADDR  = "0x67E20Da08864e3e680E0BBEC4e3c7461E74328e5"
JOBMARKET_ADDR = "0xF97c3a8DA46CC3ea2bB505A0324d6eD6fc3e5a94"
POLL_INTERVAL  = 15   # seconds between polls
MAX_REWARD     = 100  # skip jobs above this USDC (safety)
MIN_REWARD     = 1    # skip jobs below this USDC

REGISTRY_ABI = [
    {"inputs":[{"name":"","type":"address"}],"name":"isRegistered","outputs":[{"name":"","type":"bool"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"name":"_a","type":"address"}],"name":"registered","outputs":[{"name":"","type":"bool"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"name":"_a","type":"address"}],"name":"isActive","outputs":[{"name":"","type":"bool"}],"stateMutability":"view","type":"function"},
]

JOBMARKET_ABI = [
    {"inputs":[],"name":"jobCount","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"getOpenJobs","outputs":[{"name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"name":"","type":"uint256"}],"name":"core","outputs":[
        {"name":"poster","type":"address"},{"name":"worker","type":"address"},
        {"name":"reward","type":"uint256"},{"name":"deadline","type":"uint256"},
        {"name":"createdAt","type":"uint256"},{"name":"completedAt","type":"uint256"},
        {"name":"status","type":"uint8"},{"name":"evalScore","type":"uint256"}
    ],"stateMutability":"view","type":"function"},
    {"inputs":[{"name":"","type":"uint256"}],"name":"meta","outputs":[
        {"name":"title","type":"string"},{"name":"description","type":"string"},
        {"name":"category","type":"string"},{"name":"resultURI","type":"string"},
        {"name":"evalNote","type":"string"}
    ],"stateMutability":"view","type":"function"},
    {"inputs":[{"name":"_id","type":"uint256"}],"name":"acceptJob","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"name":"_id","type":"uint256"},{"name":"_uri","type":"string"}],"name":"submitResult","outputs":[],"stateMutability":"nonpayable","type":"function"},
]

STATUS = ["OPEN","ACCEPTED","SUBMITTED","COMPLETED","DISPUTED","CANCELLED","EXPIRED"]

# ── Init ───────────────────────────────────────────────────────────
w3   = Web3(Web3.HTTPProvider(RPC_URL))
acct = w3.eth.account.from_key(os.environ["PRIVATE_KEY"])
ai   = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

registry  = w3.eth.contract(address=Web3.to_checksum_address(REGISTRY_ADDR),  abi=REGISTRY_ABI)
jobmarket = w3.eth.contract(address=Web3.to_checksum_address(JOBMARKET_ADDR), abi=JOBMARKET_ABI)

processed = set()   # job IDs already handled this session
accepted  = set()   # jobs this agent has accepted

def check_registered():
    try:
        is_reg = registry.functions.registered(acct.address).call()
        if not is_reg:
            log.warning(f"Wallet {acct.address} is not registered. Go to arcagentmarket.netlify.app/register.html")
            return False
        is_active = registry.functions.isActive(acct.address).call()
        if not is_active:
            log.warning("Agent is not active.")
            return False
        log.info(f"Agent active: {acct.address}")
        return True
    except Exception as e:
        log.error(f"Registry check failed: {e}")
        return False

def send_tx(fn, gas=300_000):
    """Build, sign and send a transaction."""
    nonce = w3.eth.get_transaction_count(acct.address, "pending")
    gas_price = w3.eth.gas_price
    tx = fn.build_transaction({
        "from":     acct.address,
        "nonce":    nonce,
        "gas":      gas,
        "gasPrice": gas_price,
        "chainId":  5042002,
    })
    signed = acct.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed.rawTransaction)
    log.info(f"TX sent: {tx_hash.hex()}")
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash, timeout=60)
    if receipt.status == 0:
        raise Exception(f"TX reverted: {tx_hash.hex()}")
    log.info(f"TX confirmed in block {receipt.blockNumber}")
    return receipt

def do_work(title: str, description: str, category: str) -> str:
    """Call OpenAI to complete the job. Returns result as text."""
    
    system_prompt = """You are a professional AI agent on ArcAgentMarket, an onchain job marketplace.
Your job is to complete tasks accurately and concisely.
Output only the result — no preamble, no explanation of what you're doing.
Format your response in markdown when appropriate."""

    user_prompt = f"""Task Category: {category}
Task Title: {title}

Task Description:
{description}

Complete this task now. Provide a high-quality result."""

    log.info(f"Calling OpenAI for job: {title}")
    response = ai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_prompt}
        ],
        max_tokens=1500,
        temperature=0.7,
    )
    result = response.choices[0].message.content.strip()
    log.info(f"OpenAI result: {len(result)} chars")
    return result

def store_result(job_id: int, title: str, result: str) -> str:
    """
    Store result and return a URI.
    In production: upload to IPFS (Pinata, web3.storage) and return ipfs://... URI.
    For now: returns a data URI with the result encoded as JSON.
    """
    data = {
        "job_id":    job_id,
        "title":     title,
        "result":    result,
        "agent":     acct.address,
        "timestamp": int(time.time()),
    }
    # Encode as JSON string (on-chain readable, no external dependency needed for testnet)
    # For mainnet: replace with IPFS upload
    result_json = json.dumps(data, ensure_ascii=False)
    
    # Trim if too long for on-chain string (keep under 2KB for gas)
    if len(result_json) > 3000:
        data["result"] = result[:2500] + "…"
        result_json = json.dumps(data, ensure_ascii=False)
    
    log.info(f"Result stored ({len(result_json)} chars)")
    return result_json  # pass directly as resultURI

def process_open_jobs():
    try:
        open_ids = jobmarket.functions.getOpenJobs().call()
        log.info(f"Open jobs: {open_ids}")
        
        for job_id in open_ids:
            if job_id in processed:
                continue
            
            try:
                c = jobmarket.functions.core(job_id).call()
                m = jobmarket.functions.meta(job_id).call()
                
                poster, worker, reward, deadline = c[0], c[1], c[2], c[3]
                status = c[6]
                title, description, category = m[0], m[1], m[2]
                
                reward_usdc = reward / 1e6
                
                # Skip our own jobs
                if poster.lower() == acct.address.lower():
                    log.info(f"Job #{job_id}: our own job, skipping")
                    processed.add(job_id)
                    continue
                
                # Skip out of range rewards
                if reward_usdc < MIN_REWARD or reward_usdc > MAX_REWARD:
                    log.info(f"Job #{job_id}: reward {reward_usdc} USDC out of range, skipping")
                    processed.add(job_id)
                    continue
                
                # Skip expired
                if int(time.time()) >= deadline:
                    log.info(f"Job #{job_id}: expired, skipping")
                    processed.add(job_id)
                    continue
                
                log.info(f"Job #{job_id}: '{title}' | {reward_usdc} USDC | {category}")
                
                # Step 1: Accept
                log.info(f"Job #{job_id}: accepting…")
                send_tx(jobmarket.functions.acceptJob(job_id))
                accepted.add(job_id)
                log.info(f"Job #{job_id}: accepted ✓")
                
                # Step 2: Do the work
                time.sleep(2)
                result_text = do_work(title, description, category)
                
                # Step 3: Store and submit
                result_uri = store_result(job_id, title, result_text)
                log.info(f"Job #{job_id}: submitting result…")
                send_tx(jobmarket.functions.submitResult(job_id, result_uri), gas=800_000)
                log.info(f"Job #{job_id}: result submitted ✓")
                
                processed.add(job_id)
                time.sleep(3)  # small delay between jobs
                
            except Exception as e:
                log.error(f"Job #{job_id} failed: {e}")
                processed.add(job_id)  # don't retry this run
                
    except Exception as e:
        log.error(f"Poll failed: {e}")

def process_accepted_jobs():
    """Check if any of our accepted jobs still need submission (recovery)."""
    try:
        worker_ids = []
        count = jobmarket.functions.jobCount().call()
        for i in range(max(1, count - 50), count + 1):
            try:
                c = jobmarket.functions.core(i).call()
                if c[1].lower() == acct.address.lower() and c[6] == 1:  # ACCEPTED
                    worker_ids.append(i)
            except:
                pass
        
        for job_id in worker_ids:
            if job_id in processed:
                continue
            log.info(f"Recovery: completing accepted job #{job_id}")
            try:
                m = jobmarket.functions.meta(job_id).call()
                title, description, category = m[0], m[1], m[2]
                result_text = do_work(title, description, category)
                result_uri  = store_result(job_id, title, result_text)
                send_tx(jobmarket.functions.submitResult(job_id, result_uri), gas=800_000)
                log.info(f"Recovery job #{job_id}: submitted ✓")
                processed.add(job_id)
            except Exception as e:
                log.error(f"Recovery job #{job_id} failed: {e}")
    except Exception as e:
        log.error(f"Recovery check failed: {e}")

def main():
    log.info("=== ArcAgentMarket Worker Agent ===")
    log.info(f"Wallet: {acct.address}")
    log.info(f"Network: Arc Testnet (5042002)")
    log.info(f"JobMarket: {JOBMARKET_ADDR}")
    log.info(f"Poll interval: {POLL_INTERVAL}s")
    
    if not check_registered():
        log.error("Agent not registered. Exiting.")
        return
    
    log.info("Starting poll loop…")
    cycle = 0
    
    while True:
        cycle += 1
        log.info(f"─── Cycle {cycle} ───")
        
        # Check for open jobs to accept
        process_open_jobs()
        
        # Recovery: submit any accepted-but-not-submitted jobs
        if cycle % 5 == 0:
            process_accepted_jobs()
        
        log.info(f"Sleeping {POLL_INTERVAL}s…")
        time.sleep(POLL_INTERVAL)

if __name__ == "__main__":
    main()
