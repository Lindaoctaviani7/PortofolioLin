// Tombol ganti bahasa (EN / ID) di pojok kanan atas
function LanguageToggle({ showToast }) {
  const { lang, setLang, t } = useLang();

  const choose = (next) => {
    if (next === lang) return;
    setLang(next);
    if (showToast) showToast(translate(next, 'lang_toast'));
  };

  const options = [
    { id: 'en', short: 'EN', label: 'English' },
    { id: 'id', short: 'ID', label: 'Bahasa Indonesia' }
  ];

  return (
    <div className="lang-switch" role="group" aria-label={t('lang_title')} title={t('lang_title')}>
      <svg className="lang-globe" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.6 2.7 3.9 5.7 3.9 9s-1.3 6.3-3.9 9c-2.6-2.7-3.9-5.7-3.9-9S9.4 5.7 12 3z" />
      </svg>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className={`lang-btn ${lang === o.id ? 'active' : ''}`}
          aria-pressed={lang === o.id}
          aria-label={o.label}
          lang={o.id}
          onClick={() => choose(o.id)}
        >
          {o.short}
        </button>
      ))}
    </div>
  );
}
