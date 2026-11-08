// Sistem dua bahasa (English / Indonesia).
// - LangProvider  : menyimpan bahasa aktif (disimpan di localStorage) dan membagikannya ke semua komponen
// - useLang()     : { lang, setLang, t }  -> t('kunci', { variabel }) untuk teks antarmuka
// - useData()     : DATA yang sudah diterjemahkan sesuai bahasa aktif (pengganti DATA global di komponen)
const LANG_KEY = 'bubu_portfolio_lang';

const STRINGS = {
  en: {
    lang_toast: 'Language changed to English',
    lang_title: 'Change language',
    nav_home: 'Home', nav_about: 'About', nav_portfolio: 'Portfolio', nav_contact: 'Contact',
    nav_aria: 'Main desktop navigation', dock_aria: 'Mobile navigation',
    theme_title: 'Change accent color',
    theme_blue: 'Blue Theme', theme_violet: 'Violet Theme', theme_emerald: 'Emerald Theme', theme_amber: 'Amber Theme', theme_rose: 'Rose Theme',
    toast_theme: 'Accent theme changed to {name}',
    hero_welcome: 'Welcome to', hero_sub: 'My Portfolio',
    hero_explore: 'Explore Projects', hero_contact: 'Contact Me', hero_find: 'Find me :',
    about_tag: 'About Me', about_hi: "Hi, I'm", about_cv: 'View CV', about_exp: 'View Experience',
    about_photo: 'Photo of {name}', about_cv_toast: 'Add your CV file link in portfolioData.resume',
    tl_edu: 'Education', tl_exp: 'Experience',
    folder_projects: 'projects', folder_certs: 'certificates',
    folder_open: 'Open', folder_close: 'Close', folder_item_aria: 'Open {title} in portfolio',
    section_portfolio: 'Portfolio',
    tab_projects: 'Projects', tab_certs: 'Certificates', tab_stack: 'Tech Stack',
    details: 'Details', learning: '(Currently Learning)', badge_award: 'Achievement',
    cert_zoom: 'Click to view certificate', close: 'Close',
    back: 'Back', tech_used: 'Technologies Used',
    link_github: 'View repository', link_figma: 'View design on Figma', link_open: 'Open link', loading: 'Loading',
    g_prev: 'Previous', g_next: 'Next', g_show: 'Show {title}',
    f_tagline: 'Keep learning, growing, and building something meaningful through technology.',
    f_nav: 'Navigation', f_connect: 'Connect', f_nav_aria: 'Footer navigation',
    f_about: 'About Me', f_projects: 'Projects', f_rights: 'All rights reserved.',
    pre_1: 'Welcome To My', pre_2: 'Portfolio Website',
    tb_aria: 'Interactive skills book', tb_open: 'Click to open the skills book', tb_close: 'Click to close the book',
    tb_logos: 'Application and programming language logos',
    c_title: 'Send a Direct Message', c_sub: 'Your message will be sent straight to my personal email.',
    c_name: 'Full Name', c_name_ph: 'Example: John Smith', c_email: 'Email Address', c_msg: 'Your Message',
    c_msg_ph: "Hello, I'm interested in discussing a project...", c_send: 'Send Message via Email',
    c_social: 'Social Networks', c_subject: 'Portfolio message from {name}', c_sender: 'Sender', c_toast: 'Opening your email app...',
    gb_title: 'Guestbook & Comments', gb_count: '{n} Comments', gb_sub: 'Leave a warm message or your thoughts here!',
    gb_name_ph: 'Your name or nickname', gb_msg_ph: 'Write your message...', gb_send: 'Post Comment',
    gb_like_toast: 'Thank you for your appreciation! ❤️', gb_posted_toast: 'Your comment has been published! 🎉',
    meta_desc: 'Official portfolio of Linda Octaviani - Junior Developer'
  },
  id: {
    lang_toast: 'Bahasa diubah ke Bahasa Indonesia',
    lang_title: 'Ubah bahasa',
    nav_home: 'Beranda', nav_about: 'Tentang', nav_portfolio: 'Portofolio', nav_contact: 'Kontak',
    nav_aria: 'Navigasi Utama Desktop', dock_aria: 'Navigasi Mobile',
    theme_title: 'Ubah tema aksen warna',
    theme_blue: 'Tema Biru', theme_violet: 'Tema Violet', theme_emerald: 'Tema Emerald', theme_amber: 'Tema Amber', theme_rose: 'Tema Rose',
    toast_theme: 'Tema aksen diubah ke {name}',
    hero_welcome: 'Selamat datang di', hero_sub: 'Portofolio Saya',
    hero_explore: 'Lihat Proyek', hero_contact: 'Hubungi Saya', hero_find: 'Temukan saya :',
    about_tag: 'Tentang Saya', about_hi: 'Hai, saya', about_cv: 'Lihat CV', about_exp: 'Lihat Pengalaman',
    about_photo: 'Foto {name}', about_cv_toast: 'Tambahkan link file CV Anda pada portfolioData.resume',
    tl_edu: 'Pendidikan', tl_exp: 'Pengalaman',
    folder_projects: 'proyek', folder_certs: 'sertifikat',
    folder_open: 'Buka', folder_close: 'Tutup', folder_item_aria: 'Buka {title} di portofolio',
    section_portfolio: 'Portofolio',
    tab_projects: 'Proyek', tab_certs: 'Sertifikat', tab_stack: 'Tech Stack',
    details: 'Detail', learning: '(Sedang Dipelajari)', badge_award: 'Prestasi',
    cert_zoom: 'Klik untuk melihat sertifikat', close: 'Tutup',
    back: 'Kembali', tech_used: 'Teknologi yang Digunakan',
    link_github: 'Lihat repository', link_figma: 'Lihat desain di Figma', link_open: 'Buka tautan', loading: 'Memuat',
    g_prev: 'Sebelumnya', g_next: 'Berikutnya', g_show: 'Tampilkan {title}',
    f_tagline: 'Terus belajar, berkembang, dan membangun sesuatu yang bermakna melalui teknologi.',
    f_nav: 'Navigasi', f_connect: 'Terhubung', f_nav_aria: 'Navigasi footer',
    f_about: 'Tentang Saya', f_projects: 'Proyek', f_rights: 'Hak cipta dilindungi.',
    pre_1: 'Selamat Datang di', pre_2: 'Website Portofolio',
    tb_aria: 'Buku interaktif keahlian', tb_open: 'Klik untuk membuka buku keahlian', tb_close: 'Klik untuk menutup buku',
    tb_logos: 'Logo aplikasi dan bahasa pemrograman',
    c_title: 'Kirim Pesan Langsung', c_sub: 'Pesan akan langsung diarahkan ke email pribadi saya.',
    c_name: 'Nama Lengkap', c_name_ph: 'Contoh: Budi Pratama', c_email: 'Alamat Email', c_msg: 'Pesan Anda',
    c_msg_ph: 'Halo, saya tertarik mendiskusikan proyek...', c_send: 'Kirim Pesan via Email',
    c_social: 'Jejaring Sosial', c_subject: 'Pesan Portofolio dari {name}', c_sender: 'Pengirim', c_toast: 'Membuka aplikasi email Anda...',
    gb_title: 'Buku Tamu & Komentar', gb_count: '{n} Komentar', gb_sub: 'Tinggalkan pesan hangat atau tanggapan kamu di sini!',
    gb_name_ph: 'Nama atau panggilan kamu', gb_msg_ph: 'Tuliskan pesan kamu...', gb_send: 'Kirim Komentar',
    gb_like_toast: 'Terima kasih atas apresiasinya! ❤️', gb_posted_toast: 'Komentar kamu berhasil dipublikasikan! 🎉',
    meta_desc: 'Portofolio resmi Linda Octaviani - Junior Developer'
  }
};

function translate(lang, key, vars) {
  const dict = STRINGS[lang] || STRINGS.en;
  let s = dict[key] !== undefined ? dict[key] : (STRINGS.en[key] !== undefined ? STRINGS.en[key] : key);
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}

// Gabungkan DATA (Inggris) dengan terjemahan DATA_ID berdasarkan urutan indeks
function buildData(lang) {
  if (lang !== 'id' || typeof DATA_ID === 'undefined') return DATA;
  const merge = (base, over) => base.map((b, i) => (over && over[i] ? { ...b, ...over[i] } : b));
  return {
    ...DATA,
    roles: DATA_ID.roles,
    hero: DATA_ID.hero,
    about: DATA_ID.about,
    education: merge(DATA.education, DATA_ID.education),
    experience: merge(DATA.experience, DATA_ID.experience),
    projects: merge(DATA.projects, DATA_ID.projects),
    certificates: merge(DATA.certificates, DATA_ID.certificates),
    gallery: merge(DATA.gallery, DATA_ID.gallery),
    stack: DATA.stack.map(([title, skills]) => [
      DATA_ID.stackTitles[title.trim()] || title,
      skills.map((sk) => ({ ...sk, name: DATA_ID.skills[sk.name.trim()] || sk.name }))
    ])
  };
}

const LangContext = React.createContext(null);

function LangProvider({ children }) {
  const [lang, setLangState] = React.useState(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      return saved === 'id' || saved === 'en' ? saved : 'en';
    } catch (e) { return 'en'; }
  });

  const setLang = React.useCallback((next) => {
    setLangState(next === 'id' ? 'id' : 'en');
  }, []);

  React.useEffect(() => {
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* abaikan */ }
    document.documentElement.setAttribute('lang', lang);
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', translate(lang, 'meta_desc'));
  }, [lang]);

  const value = React.useMemo(() => ({
    lang,
    setLang,
    t: (key, vars) => translate(lang, key, vars),
    data: buildData(lang)
  }), [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

function useLang() {
  return React.useContext(LangContext);
}

function useData() {
  return React.useContext(LangContext).data;
}
