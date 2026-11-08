// Halaman detail proyek / sertifikat (dibuka dari kartu di dalam folder)
function ProjectDetail({ detail, onClose }) {
  const DATA = useData();
  const { t } = useLang();
  const [ready, setReady] = useState(false); // spinner singkat sebelum halaman tampil
  const item = detail ? (DATA[detail.key] || [])[detail.idx] : null;

  useEffect(() => {
    if (!detail) return undefined;
    setReady(false);
    const loadTimer = setTimeout(() => setReady(true), 450);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(loadTimer);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [detail]);

  if (!item) return null;

  const isProject = detail.key === 'projects';
  const crumb = isProject ? t('tab_projects') : t('tab_certs');
  const description = isProject ? item.d : item.s;
  const extra = isProject ? (item.p || []) : [];
  const techs = isProject ? (item.s || []) : [];
  // Cari logo: nama sama persis di TECH_SKILLS (HTML -> HTML5, CSS -> CSS3), lalu logo tambahan khusus proyek
  const TECH_ALIAS = { html: 'html5', css: 'css3' };
  const findTech = (name) => {
    const key = String(name).toLowerCase();
    const k = TECH_ALIAS[key] || key;
    const base = typeof TECH_SKILLS !== 'undefined' ? TECH_SKILLS.find((x) => x.name.toLowerCase() === k) : null;
    if (base) return base;
    return (typeof PROJECT_TECH_EXTRA !== 'undefined' && PROJECT_TECH_EXTRA[k]) || null;
  };
  const links = isProject ? (item.links || []) : [];
  const linkMeta = {
    github: { label: t('link_github'), icon: getSocialIcon('github', 'GitHub', 18) },
    figma: { label: t('link_figma'), icon: findTech('Figma') ? <span className="pd-brand">{findTech('Figma').icon}</span> : null }
  };
  const isCode = (t) => /^(html|css|php)/i.test(t);

  const CubeIcon = () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 8l-9-5-9 5v8l9 5 9-5z" /><path d="M3 8l9 5 9-5M12 13v8" /></svg>
  );
  const CodeIcon = () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5" /></svg>
  );

  return (
    <div className="pd-overlay" role="dialog" aria-modal="true" aria-label={item.t}>
      <div className="pd-blob pd-blob-a" />
      <div className="pd-blob pd-blob-b" />

      {!ready && <div className="pd-loader" aria-label={t('loading')}><span /></div>}

      {ready && (
      <div className="pd-page" key={`${detail.key}-${detail.idx}`}>
        <nav className="pd-nav" aria-label="Breadcrumb">
          <button type="button" className="pd-back" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            {t('back')}
          </button>
          <button type="button" className="pd-crumb" onClick={onClose}>{crumb}</button>
          <svg className="pd-sep" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          <span className="pd-current">{item.t}</span>
        </nav>

        <div className="pd-grid">
          <div className="pd-info">
            <h2 className="pd-title">{item.t}</h2>
            {isProject && item.r && <div className="pd-role">{item.r}</div>}
            <p className="pd-desc">{description}</p>

            {extra.length > 0 && (
              <ul className="pd-points">
                {extra.map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
            )}

            {techs.length > 0 && (
              <div className="pd-tech">
                <h3><CodeIcon /> {t('tech_used')}</h3>
                <div className="pd-chips">
                  {techs.map((t) => {
                    const brand = findTech(t);
                    return (
                      <span className="pd-chip" key={t}>
                        {brand ? <span className="pd-brand">{brand.icon}</span> : (isCode(t) ? <CodeIcon /> : <CubeIcon />)}
                        {t}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {links.length > 0 && (
              <div className="pd-actions">
                {links.map((l, i) => {
                  const meta = linkMeta[l.type] || { label: t('link_open'), icon: null };
                  // Tautan bawaan bila url proyek belum diisi: profil GitHub / beranda Figma
                  const ghProfile = (DATA.socials.find((so) => so.type === 'github') || {}).fullUrl;
                  const href = l.url || (l.type === 'github' ? ghProfile : l.type === 'figma' ? 'https://www.figma.com/' : '#');
                  return (
                    <a key={i} className="pd-cta" href={href} target="_blank" rel="noopener noreferrer">{meta.icon}{meta.label}</a>
                  );
                })}
              </div>
            )}
          </div>

          {item.img && (
            <div className="pd-media">
              <div className="pd-frame">
                <img src={encodeURI(item.img)} alt={item.t} />
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
}
