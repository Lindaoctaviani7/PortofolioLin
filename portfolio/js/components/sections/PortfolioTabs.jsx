function PortfolioTabs({ activeTab, setActiveTab, focusItem, onOpenDetail }) {
  const [expandedProjects, setExpandedProjects] = useState({});
  const [highlight, setHighlight] = useState(null); // 'projects-1', 'certificates-0', ...
  const [preview, setPreview] = useState(null); // { src, title } sertifikat yang sedang dibuka

  // Tutup pratinjau dengan Esc & kunci scroll halaman saat terbuka
  useEffect(() => {
    if (!preview) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setPreview(null); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [preview]);

  // Dari klik kartu di folder: buka detail, gulir ke item, lalu sorot sebentar
  useEffect(() => {
    if (!focusItem) return;
    const id = `${focusItem.key}-${focusItem.idx}`;
    if (focusItem.key === 'projects') setExpandedProjects((p) => ({ ...p, [focusItem.idx]: true }));
    setHighlight(id);
    const t1 = setTimeout(() => {
      document.getElementById(`pf-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 450);
    const t2 = setTimeout(() => setHighlight(null), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [focusItem]);

  const ic = (children) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
  );
  const tabs = [
    { key: 'projects', label: 'Projects', icon: ic(<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />) },
    { key: 'certificates', label: 'Certificates', icon: ic(<React.Fragment><circle cx="12" cy="9" r="5.5" /><path d="M8.5 13.5L7 21l5-3 5 3-1.5-7.5" /></React.Fragment>) },
    { key: 'stack', label: 'Tech Stack', icon: ic(<React.Fragment><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" rx="0.8" /><path d="M9 2.5v3M15 2.5v3M9 18.5v3M15 18.5v3M2.5 9h3M2.5 15h3M18.5 9h3M18.5 15h3" /></React.Fragment>) }
  ];

  return (
    <React.Fragment>
      <div className="tabs-container">
        <div className="tabs-wrapper" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              type="button"
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div id="panel">
        {activeTab === 'projects' && (
          <div className="cards-grid pj-grid">
            {DATA.projects.map((proj, idx) => (
              <article className={`project-card pj-card ${highlight === `projects-${idx}` ? 'is-focus' : ''}`} id={`pf-projects-${idx}`} key={idx}>
                {proj.img ? (
                  <img
                    className="pj-thumb"
                    src={encodeURI(proj.img)}
                    alt={proj.t}
                    loading="lazy"
                    style={proj.imgPos ? { objectPosition: proj.imgPos } : undefined}
                    onClick={() => onOpenDetail && onOpenDetail('projects', idx)}
                  />
                ) : (
                  <div className="pj-thumb pj-ph" aria-hidden="true"><span>{proj.t}</span></div>
                )}
                <h3>{proj.t}</h3>
                <p className="project-desc">{proj.d}</p>
                <button className="pj-details" type="button" onClick={() => onOpenDetail && onOpenDetail('projects', idx)}>
                  Details
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </button>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'stack' && (
          <div>
            {DATA.stack.map(([groupTitle, skills], idx) => (
              <div className="stack-group" key={idx}>
                <h3>{groupTitle}</h3>
                <div className="chips-cloud">
                  {skills.map((skill, sIdx) => (
                    <span className={`chip ${skill.isLearning ? 'learning' : ''}`} key={sIdx}>
                      {skill.name} {skill.isLearning ? '✦ (Currently Learning)' : ''}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {(activeTab === 'certificates' || activeTab === 'awards') && (
          <div className="cards-grid">
            {DATA[activeTab]?.map((item, idx) => (activeTab === 'certificates' && !item.img) ? null : (
              <article className={`project-card ${highlight === `${activeTab}-${idx}` ? 'is-focus' : ''}`} id={`pf-${activeTab}-${idx}`} key={idx}>
                {item.img && (
                  <img
                    className="pf-thumb is-zoomable"
                    src={item.img}
                    alt={item.t}
                    loading="lazy"
                    role="button"
                    tabIndex={0}
                    title="Klik untuk melihat sertifikat"
                    onClick={() => setPreview({ src: item.img, title: item.t })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPreview({ src: item.img, title: item.t }); }
                    }}
                  />
                )}
                {activeTab === 'awards' && <span className="project-badge">Prestasi</span>}
                <h3>{item.t}</h3>
                <p className="project-desc" style={{ marginTop: '8px' }}>{item.s}</p>
              </article>
            ))}
          </div>
        )}
      </div>

      {preview && (
        <div className="cert-lightbox" role="dialog" aria-modal="true" aria-label={preview.title} onClick={() => setPreview(null)}>
          <button type="button" className="cert-lightbox-close" aria-label="Tutup" onClick={() => setPreview(null)}>&times;</button>
          <img src={encodeURI(preview.src)} alt={preview.title} onClick={(e) => e.stopPropagation()} />
          <div className="cert-lightbox-caption">{preview.title}</div>
        </div>
      )}
    </React.Fragment>
  );
}
