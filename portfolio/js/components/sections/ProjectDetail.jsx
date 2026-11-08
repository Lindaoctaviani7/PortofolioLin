// Halaman detail proyek / sertifikat (dibuka dari kartu di dalam folder)
function ProjectDetail({ detail, onClose }) {
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
  const crumb = isProject ? 'Projects' : 'Certificates';
  const description = isProject ? item.d : item.s;
  const extra = isProject ? (item.p || []) : [];
  const techs = isProject ? (item.s || []) : [];
  const findTech = (name) => (typeof TECH_SKILLS !== 'undefined' ? TECH_SKILLS.find((x) => x.name.toLowerCase() === String(name).toLowerCase()) : null);
  const links = isProject ? (item.links || []) : [];
  const linkMeta = {
    github: { label: 'Lihat repository', icon: getSocialIcon('github', 'GitHub', 18) },
    figma: { label: 'Lihat desain di Figma', icon: findTech('Figma') ? <span className="pd-brand">{findTech('Figma').icon}</span> : null }
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

      {!ready && <div className="pd-loader" aria-label="Memuat"><span /></div>}

      {ready && (
      <div className="pd-page" key={`${detail.key}-${detail.idx}`}>
        <nav className="pd-nav" aria-label="Breadcrumb">
          <button type="button" className="pd-back" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back
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
                <h3><CodeIcon /> Technologies Used</h3>
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
                  const meta = linkMeta[l.type] || { label: 'Buka tautan', icon: null };
                  return l.url ? (
                    <a key={i} className="pd-cta" href={l.url} target="_blank" rel="noopener noreferrer">{meta.icon}{meta.label}</a>
                  ) : (
                    <span key={i} className="pd-cta is-disabled" role="link" aria-disabled="true" title="Link belum tersedia">{meta.icon}{meta.label}</span>
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
