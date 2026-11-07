function TechBook({ showToast }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [hoveredSkill, setHoveredSkill] = React.useState(null);

  const toggleBook = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (showToast) {
      showToast(nextState ? 'Buku Terbuka! Eksplorasi keahlian teknologi' : 'Buku Tertutup');
    }
  };

  const filteredSkills = activeCategory === 'all'
    ? TECH_SKILLS
    : TECH_SKILLS.filter((s) => s.category === activeCategory);

  return (
    <aside className="tech-book-card" aria-label="Buku Interaktif Keahlian">
      <div className="book-card-header">
        <button
          type="button"
          className={`book-toggle-pill ${isOpen ? 'active' : ''}`}
          onClick={toggleBook}
          title={isOpen ? 'Tutup buku' : 'Buka buku'}
        >
          <span className="book-status-pulse"></span>
          <span>{isOpen ? 'Tutup Buku X' : 'Buka Buku +'}</span>
        </button>
      </div>

      {isOpen && (
        <div className="book-filter-row">
          {[
            { id: 'all', label: 'Semua (18)' },
            { id: 'frontend', label: 'Frontend' },
            { id: 'design', label: 'UI/UX' },
            { id: 'mobile', label: 'Mobile' },
            { id: 'backend', label: 'Backend' },
            { id: 'database', label: 'Database' },
            { id: 'tools', label: 'Tools' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`book-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <div className="book-stage">
        <div
          className={`book-3d ${isOpen ? 'is-open' : 'is-closed'}`}
          onClick={!isOpen ? toggleBook : undefined}
          title={!isOpen ? 'Klik untuk membuka buku keahlian' : ''}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !isOpen) {
              e.preventDefault();
              toggleBook();
            }
          }}
        >
          <div className="book-cover-front">
            <div className="cover-inner-border">
              <div className="cover-ribbon"></div>
              <div className="cover-emblem">
                <div className="emblem-glyph">&lt;/&gt;</div>
              </div>
              <div className="cover-title">BUBU'S TECH ARSENAL</div>
              <div className="cover-subtitle">Front-End &bull; UI/UX &bull; Multiplatform</div>
              <div className="cover-instruction">
                <span className="pulse-hand">&#128070;</span> Klik untuk Membuka
              </div>
            </div>
            <div className="book-pages-edge"></div>
          </div>

          <div className="book-spine-3d">
            <div className="spine-text">TECH SPELLBOOK 2026</div>
          </div>

          <div className="book-pages-spread">
            <div className="page-left">
              <div className="page-header">
                <b>Core Foundations</b>
                <small>Keahlian Utama</small>
              </div>
              <ul className="page-highlights">
                <li>&#9657; Perancangan UI/UX presisi pixel &amp; prototipe interaktif</li>
                <li>&#9657; Kode modular berbasis komponen responsif</li>
                <li>&#9657; Integrasi RESTful API &amp; database relasional</li>
              </ul>
              <div className="page-number">01</div>
            </div>

            <div className="page-right">
              <div className="page-header">
                <b>Modern Tech Stack</b>
                <small>Tools &amp; Frameworks</small>
              </div>
              <p className="page-note">
                Arahkan kursor pada logo untuk melihat spesialisasi dan deskripsi keahlian.
              </p>
              <div className="page-number">02</div>
            </div>

            <div className="book-magic-beam"></div>
          </div>
        </div>

        {isOpen && (
          <div className="bursting-skills-container" aria-label="Logo aplikasi dan bahasa pemrograman">
            {filteredSkills.map((skill, index) => {
              const delay = (index * 0.04).toFixed(2);
              return (
                <div
                  key={skill.id}
                  className="floating-skill-pill"
                  style={{
                    animationDelay: `${delay}s`,
                    borderColor: skill.border,
                    background: skill.bg,
                    boxShadow: `0 8px 24px -6px ${skill.border}`
                  }}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="skill-icon-wrap">{skill.icon}</div>
                  <span className="skill-pill-name">{skill.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="book-skill-preview">
          {hoveredSkill ? (
            <div className="preview-active">
              <div className="preview-indicator" style={{ background: hoveredSkill.color }}></div>
              <div>
                <b>{hoveredSkill.name}</b>
                <span> &mdash; {hoveredSkill.desc}</span>
              </div>
            </div>
          ) : (
            <div className="preview-idle">
              Sentuh atau arahkan kursor ke salah satu logo untuk melihat detail keahlian
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
