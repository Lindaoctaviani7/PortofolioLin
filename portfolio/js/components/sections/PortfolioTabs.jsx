function PortfolioTabs({ activeTab, setActiveTab }) {
  const [expandedProjects, setExpandedProjects] = useState({});

  const tabs = [
    { key: 'projects', label: 'Proyek' },
    { key: 'certificates', label: 'Sertifikat' },
    { key: 'awards', label: 'Penghargaan' },
    { key: 'stack', label: 'Tech Stack' }
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
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div id="panel">
        {activeTab === 'projects' && (
          <div className="cards-grid">
            {DATA.projects.map((proj, idx) => {
              const isExpanded = !!expandedProjects[idx];
              return (
                <article className="project-card" key={idx}>
                  <span className="project-badge">Proyek Unggulan</span>
                  <h3>{proj.t}</h3>
                  <div className="project-role">{proj.r}</div>
                  <p className="project-desc">{proj.d}</p>
                  <div className="chips-cloud">
                    {proj.s.map((skill, sIdx) => <span className="chip" key={sIdx}>{skill}</span>)}
                  </div>
                  <button
                    className="btn sm"
                    type="button"
                    onClick={() => setExpandedProjects((p) => ({ ...p, [idx]: !p[idx] }))}
                  >
                    <span>{isExpanded ? 'Tutup Detail Fitur' : 'Lihat Detail Fitur'}</span>
                  </button>
                  {isExpanded && (
                    <ul className="project-details">
                      {proj.p.map((point, pIdx) => <li key={pIdx}>{point}</li>)}
                    </ul>
                  )}
                </article>
              );
            })}
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
                      {skill.name} {skill.isLearning ? '✦ (Sedang didalami)' : ''}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {(activeTab === 'certificates' || activeTab === 'awards') && (
          <div className="cards-grid">
            {DATA[activeTab]?.map((item, idx) => (
              <article className="project-card" key={idx}>
                <span className="project-badge">{activeTab === 'certificates' ? 'Kredensial' : 'Prestasi'}</span>
                <h3>{item.t}</h3>
                <p className="project-desc" style={{ marginTop: '8px' }}>{item.s}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
