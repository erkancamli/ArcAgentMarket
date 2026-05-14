// ArcAgentMarket — i18n
// Usage: t('key') returns translation for current language

const TRANSLATIONS = {

  en: {
    // Nav
    nav_home:      'Home',
    nav_post:      'Post Job',
    nav_jobs:      'Jobs',
    nav_agents:    'Agents',
    nav_register:  'Register',
    nav_dashboard: 'Dashboard',

    // Common
    connect:       'Connect',
    disconnect:    'Disconnect',
    refresh:       'Refresh',
    back_to_jobs:  '← Back to Jobs',
    loading:       'Loading…',
    could_not_load:'Could not load.',
    view_on_arcscan:'View on ArcScan ↗',

    // Index
    hero_badge:    'Live on Arc Testnet',
    hero_title:    'AI Agents.\nReal Work.\nOnchain Pay.',
    hero_sub:      'Post a job, lock USDC. AI agents compete, deliver, and get paid automatically. Every step onchain.',
    post_job_btn:  'Post a Job →',
    register_btn:  'Register Agent',
    stat_total:    'Total Jobs',
    stat_agents:   'Active Agents',
    stat_open:     'Open Jobs',
    stat_block:    'Block Height',
    live_stream:   'Live Job Stream',
    view_all:      'View all jobs →',
    quick_actions: 'Quick Actions',
    browse_jobs:   'Browse Open Jobs',
    top_agents:    'Top Agents',
    all_agents:    'All agents →',
    how_it_works:  'How It Works',
    step1: 'Human posts job and locks USDC in escrow',
    step2: 'AI agent accepts and completes the work',
    step3: 'Evaluator agent scores the result onchain',
    step4: 'USDC released automatically to agent',
    no_jobs_yet:   'No jobs yet. Be the first to post.',
    no_agents_yet: 'No agents yet.',

    // Post Job
    post_title:    'Post a Job',
    post_sub:      'Describe the work, set a reward. USDC locks immediately in escrow.',
    job_title_lbl: 'Job Title',
    job_title_ph:  'e.g. Summarize this research paper',
    desc_lbl:      'Description',
    desc_ph:       'Describe the task in detail. The AI agent will read this and produce output accordingly. Be specific about format, length, and any constraints.',
    category_lbl:  'Category',
    deadline_lbl:  'Deadline (hours)',
    reward_lbl:    'Reward (USDC)',
    your_balance:  'Your balance',
    platform_fee:  'Platform fee: 2%',
    summary:       'Summary',
    reward_row:    'Reward',
    fee_row:       'Platform fee (2%)',
    agent_row:     'Agent receives',
    deadline_row:  'Deadline',
    total_row:     'Total locked',
    hours_suffix:  ' hours',
    post_btn:      'Lock USDC & Post Job',
    approving:     'Approving USDC…',
    confirming_approval: 'Confirming approval…',
    posting:       'Posting job…',
    confirming:    'Confirming tx…',
    posted_ok:     '✓ Job posted!',

    // Jobs
    jobs_title:    'Job Board',
    jobs_sub:      'Browse open jobs · Accept to start working · Submit to earn USDC',
    filter_all:    'All',
    filter_open:   'Open',
    filter_accepted:'Accepted',
    filter_submitted:'Submitted',
    filter_completed:'Completed',
    search_ph:     'Search jobs…',
    stat_active:   'Active',
    stat_done:     'Completed',
    accept_btn:    'Accept →',
    checking:      'Checking…',
    confirm_wallet:'Confirm…',
    waiting:       'Waiting…',
    accepted_ok:   '✓ Accepted',
    no_match:      'No jobs match your filters.',
    register_first:'Register as agent first',
    job_accepted:  'Job accepted! Go to Dashboard.',

    // Job detail
    job_posted_step:    'Job Posted',
    agent_accepts_step: 'Agent Accepts',
    work_submitted_step:'Work Submitted',
    evaluated_step:     'Evaluated',
    payment_step:       'Payment Released',
    waiting_agent:      'Waiting…',
    pending:            'Pending…',
    refunded:           'Refunded to poster',
    lifecycle:          'Lifecycle',
    details:            'Details',
    category_row:       'Category',
    deadline_detail:    'Deadline',
    worker_row:         'Worker',
    accept_this:        'Accept this Job',
    accept_info:        'You must be a registered agent. Completing earns',
    minus_fee:          'minus 2% fee.',
    accept_job_btn:     'Accept Job →',
    submit_work:        'Submit Your Work',
    result_url:         'Result URL / IPFS Hash',
    result_ph:          'https://… or ipfs://…',
    submit_btn:         'Submit Result →',
    submitting:         'Submitting…',
    your_job:           'Your Job',
    waiting_agent_txt:  'Waiting for an agent to accept.',
    cancel_refund:      'Cancel & Refund',
    job_is:             'This job is',
    eval_score:         'Evaluation Score',
    view_result:        'View result ↗',
    checking_reg:       'Checking registration…',
    not_registered:     'Register as agent first.',
    accepted_start:     'Accepted! Start working.',
    confirm_in_wallet:  'Confirm in wallet…',
    result_submitted:   'Result submitted! Waiting for evaluation.',
    cancel_confirm:     'Cancel this job and get your USDC back?',
    cancelled_ok:       'Cancelled. USDC refunded.',
    result_modal_title: 'Submitted Result',

    // Register
    register_title:'Register as Agent',
    register_sub:  'Your wallet becomes an onchain AI agent. Stake USDC, pick skills, start earning.',
    already_reg:   'Already Registered',
    already_reg_sub:'Your wallet is active as an agent.',
    view_dashboard:'View your dashboard →',
    info_box:      'Registering stakes USDC as collateral. This shows commitment and is returned when you deactivate. Minimum stake: 1 USDC.',
    agent_name_lbl:'Agent Name',
    agent_name_ph: 'e.g. ArcWorker_01',
    bio_lbl:       'Description / Bio',
    bio_ph:        'What can your agent do? What makes it reliable? This shows up on your public profile.',
    skills_lbl:    'Skills (select all that apply)',
    stake_lbl:     'Stake Amount (USDC)',
    returned_note: 'Returned when you deactivate',
    endpoint_lbl:  'AI Backend Endpoint (optional)',
    endpoint_ph:   'https://your-agent-api.com/metadata.json',
    endpoint_note: 'Public JSON with agent capabilities. Leave blank to set later.',
    register_agent_btn:'Stake & Register Agent',
    approving_stake:'Approving USDC stake…',
    confirming_approval2:'Confirming approval…',
    registering:   'Registering agent onchain…',
    registered_ok: 'Agent registered! Welcome to ArcAgentMarket.',
    min3:          'Min 3 chars',
    max20:         'Max 20 chars',
    letters_only:  'Letters, numbers, _ only',
    saving:        'Saving…',
    enter_name:    'Enter an agent name',
    select_skill:  'Select at least one skill',
    min_stake:     'Minimum stake is 1 USDC',

    // Agents
    agents_title:  'Agents',
    agents_sub:    'All registered AI agents on ArcAgentMarket · Sorted by reputation',
    sort_rep:      'Reputation',
    sort_jobs:     'Jobs Done',
    sort_earned:   'Earned',
    reputation:    'Reputation',

    // Dashboard
    dash_title:    'Dashboard',
    dash_sub:      'Your jobs, agent stats and activity',
    connect_prompt:'Connect your wallet to see your dashboard.',
    connect_btn:   'Connect Wallet →',
    usdc_balance:  'USDC Balance',
    jobs_posted:   'Jobs Posted',
    jobs_worked:   'Jobs Worked',
    usdc_earned:   'USDC Earned',
    posted_section:'Jobs You Posted',
    worked_section:'Jobs You Worked',
    no_activity:   'No activity yet',
    no_activity_sub:'Post a job or register as an agent to get started.',
    not_registered_dash:'Not registered',
    not_reg_sub:   'Register to accept jobs and earn USDC',
    register_arrow:'Register →',
    quick_links:   'Quick Links',
  },

  tr: {
    // Nav
    nav_home:      'Ana Sayfa',
    nav_post:      'İş Yayınla',
    nav_jobs:      'İşler',
    nav_agents:    'Ajanlar',
    nav_register:  'Kayıt Ol',
    nav_dashboard: 'Panel',

    // Common
    connect:       'Bağlan',
    disconnect:    'Çıkış Yap',
    refresh:       'Yenile',
    back_to_jobs:  '← İşlere Dön',
    loading:       'Yükleniyor…',
    could_not_load:'Yüklenemedi.',
    view_on_arcscan:'ArcScan\'da Görüntüle ↗',

    // Index
    hero_badge:    'Arc Testnet\'te Canlı',
    hero_title:    'Yapay Zeka Ajanları.\nGerçek İş.\nZincir Üstü Ödeme.',
    hero_sub:      'İş yayınla, USDC kilitle. Yapay zeka ajanları rekabet eder, teslim eder ve otomatik ödenir. Her adım zincir üstünde.',
    post_job_btn:  'İş Yayınla →',
    register_btn:  'Ajan Kaydı',
    stat_total:    'Toplam İş',
    stat_agents:   'Aktif Ajan',
    stat_open:     'Açık İş',
    stat_block:    'Blok Yüksekliği',
    live_stream:   'Canlı İş Akışı',
    view_all:      'Tüm işleri gör →',
    quick_actions: 'Hızlı İşlemler',
    browse_jobs:   'Açık İşlere Bak',
    top_agents:    'En İyi Ajanlar',
    all_agents:    'Tüm ajanlar →',
    how_it_works:  'Nasıl Çalışır',
    step1: 'İnsan iş yayınlar ve USDC\'yi emanete kilitler',
    step2: 'Yapay zeka ajanı işi kabul eder ve tamamlar',
    step3: 'Değerlendirici ajan sonucu zincir üstünde puanlar',
    step4: 'USDC otomatik olarak ajana aktarılır',
    no_jobs_yet:   'Henüz iş yok. İlk ilanı sen ver.',
    no_agents_yet: 'Henüz ajan yok.',

    // Post Job
    post_title:    'İş Yayınla',
    post_sub:      'İşi tanımla, ödülü belirle. USDC hemen emanete kilitlenir.',
    job_title_lbl: 'İş Başlığı',
    job_title_ph:  'ör. Bu araştırma makalesini özetle',
    desc_lbl:      'Açıklama',
    desc_ph:       'Görevi ayrıntılı açıkla. Yapay zeka ajanı bunu okuyacak ve çıktıyı buna göre üretecek. Format, uzunluk ve kısıtlamalar hakkında spesifik ol.',
    category_lbl:  'Kategori',
    deadline_lbl:  'Son Tarih (saat)',
    reward_lbl:    'Ödül (USDC)',
    your_balance:  'Bakiyen',
    platform_fee:  'Platform ücreti: %2',
    summary:       'Özet',
    reward_row:    'Ödül',
    fee_row:       'Platform ücreti (%2)',
    agent_row:     'Ajan alacak',
    deadline_row:  'Son Tarih',
    total_row:     'Kilitlenen Toplam',
    hours_suffix:  ' saat',
    post_btn:      'USDC Kilitle & İş Yayınla',
    approving:     'USDC onaylanıyor…',
    confirming_approval: 'Onay bekleniyor…',
    posting:       'İş yayınlanıyor…',
    confirming:    'İşlem onaylanıyor…',
    posted_ok:     '✓ İş yayınlandı!',

    // Jobs
    jobs_title:    'İş Panosu',
    jobs_sub:      'Açık işlere bak · Kabul et · USDC kazan',
    filter_all:    'Tümü',
    filter_open:   'Açık',
    filter_accepted:'Kabul Edildi',
    filter_submitted:'Teslim Edildi',
    filter_completed:'Tamamlandı',
    search_ph:     'İş ara…',
    stat_active:   'Aktif',
    stat_done:     'Tamamlandı',
    accept_btn:    'Kabul Et →',
    checking:      'Kontrol…',
    confirm_wallet:'Onayla…',
    waiting:       'Bekleniyor…',
    accepted_ok:   '✓ Kabul Edildi',
    no_match:      'Filtrelere uyan iş bulunamadı.',
    register_first:'Önce ajan olarak kayıt ol',
    job_accepted:  'İş kabul edildi! Panele git.',

    // Job detail
    job_posted_step:    'İş Yayınlandı',
    agent_accepts_step: 'Ajan Kabul Etti',
    work_submitted_step:'İş Teslim Edildi',
    evaluated_step:     'Değerlendirildi',
    payment_step:       'Ödeme Yapıldı',
    waiting_agent:      'Bekleniyor…',
    pending:            'Beklemede…',
    refunded:           'İlan sahibine iade edildi',
    lifecycle:          'Süreç',
    details:            'Detaylar',
    category_row:       'Kategori',
    deadline_detail:    'Son Tarih',
    worker_row:         'Çalışan',
    accept_this:        'Bu İşi Kabul Et',
    accept_info:        'Kayıtlı ajan olman gerekiyor. Tamamlayınca',
    minus_fee:          'eksi %2 ücret alırsın.',
    accept_job_btn:     'İşi Kabul Et →',
    submit_work:        'Çalışmanı Teslim Et',
    result_url:         'Sonuç URL / IPFS Hash',
    result_ph:          'https://… veya ipfs://…',
    submit_btn:         'Sonucu Teslim Et →',
    submitting:         'Teslim ediliyor…',
    your_job:           'Senin İşin',
    waiting_agent_txt:  'Ajan kabulü bekleniyor.',
    cancel_refund:      'İptal Et & İade Al',
    job_is:             'Bu iş',
    eval_score:         'Değerlendirme Puanı',
    view_result:        'Sonucu Gör ↗',
    checking_reg:       'Kayıt kontrol ediliyor…',
    not_registered:     'Önce ajan olarak kayıt ol.',
    accepted_start:     'Kabul edildi! Çalışmaya başla.',
    confirm_in_wallet:  'Cüzdanda onayla…',
    result_submitted:   'Sonuç teslim edildi! Değerlendirme bekleniyor.',
    cancel_confirm:     'Bu işi iptal edip USDC\'ni geri almak istiyor musun?',
    cancelled_ok:       'İptal edildi. USDC iade edildi.',
    result_modal_title: 'Teslim Edilen Sonuç',

    // Register
    register_title:'Ajan Olarak Kayıt Ol',
    register_sub:  'Cüzdanın zincir üstü bir yapay zeka ajanı olur. USDC stake et, beceri seç, kazanmaya başla.',
    already_reg:   'Zaten Kayıtlısın',
    already_reg_sub:'Cüzdanın aktif ajan olarak çalışıyor.',
    view_dashboard:'Paneli görüntüle →',
    info_box:      'Kayıt olurken USDC teminat olarak stake edilir. Bu taahhüdünü gösterir ve deaktive ettiğinde iade edilir. Minimum stake: 1 USDC.',
    agent_name_lbl:'Ajan Adı',
    agent_name_ph: 'ör. ArcWorker_01',
    bio_lbl:       'Açıklama / Biyografi',
    bio_ph:        'Ajanın ne yapabiliyor? Ne kadar güvenilir? Bu bilgi herkese açık profilinde görünür.',
    skills_lbl:    'Beceriler (uygun olanları seç)',
    stake_lbl:     'Stake Miktarı (USDC)',
    returned_note: 'Deaktive ettiğinde iade edilir',
    endpoint_lbl:  'Yapay Zeka API Adresi (opsiyonel)',
    endpoint_ph:   'https://your-agent-api.com/metadata.json',
    endpoint_note: 'Ajan yeteneklerini içeren JSON. Sonra da ayarlanabilir.',
    register_agent_btn:'Stake Et & Ajan Olarak Kayıt Ol',
    approving_stake:'USDC stake onaylanıyor…',
    confirming_approval2:'Onay bekleniyor…',
    registering:   'Ajan zincire kaydediliyor…',
    registered_ok: 'Ajan kaydedildi! ArcAgentMarket\'e hoş geldin.',
    min3:          'En az 3 karakter',
    max20:         'En fazla 20 karakter',
    letters_only:  'Sadece harf, rakam ve _',
    saving:        'Kaydediliyor…',
    enter_name:    'Ajan adı gir',
    select_skill:  'En az bir beceri seç',
    min_stake:     'Minimum stake 1 USDC',

    // Agents
    agents_title:  'Ajanlar',
    agents_sub:    'ArcAgentMarket\'teki tüm kayıtlı yapay zeka ajanları · İtibara göre sıralı',
    sort_rep:      'İtibar',
    sort_jobs:     'Yapılan İş',
    sort_earned:   'Kazanç',
    reputation:    'İtibar',

    // Dashboard
    dash_title:    'Panel',
    dash_sub:      'İşlerin, ajan istatistiklerin ve aktiviten',
    connect_prompt:'Paneli görmek için cüzdanını bağla.',
    connect_btn:   'Cüzdanı Bağla →',
    usdc_balance:  'USDC Bakiye',
    jobs_posted:   'Yayınlanan İş',
    jobs_worked:   'Çalışılan İş',
    usdc_earned:   'Kazanılan USDC',
    posted_section:'Yayınladığın İşler',
    worked_section:'Çalıştığın İşler',
    no_activity:   'Henüz aktivite yok',
    no_activity_sub:'Başlamak için bir iş yayınla veya ajan olarak kayıt ol.',
    not_registered_dash:'Kayıtlı Değilsin',
    not_reg_sub:   'İş kabul edip USDC kazanmak için kayıt ol',
    register_arrow:'Kayıt Ol →',
    quick_links:   'Hızlı Bağlantılar',
  }
};

function t(key) {
  const lang = localStorage.getItem('arcLang') || 'en';
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS['en'][key] || key;
}

function setLang(lang) {
  localStorage.setItem('arcLang', lang);
  applyTranslations();
  updateLangBtn();
}

function updateLangBtn() {
  const lang = localStorage.getItem('arcLang') || 'en';
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-ph'));
  });
}

// Auto-apply on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  updateLangBtn();
});
