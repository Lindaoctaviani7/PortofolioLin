// Buku 3D interaktif: klik buku -> sampul terbuka -> logo skill muncul (tanpa teks)
const TECHBOOK_W = 260; // lebar satu halaman (px) pada skala 1

function TechBook({ showToast }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scale, setScale] = React.useState(1);
  const stageRef = React.useRef(null);
  const tiltRef = React.useRef(null);

  const toggleBook = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (showToast) showToast(next ? 'Buku terbuka! Ini keahlian teknologi saya' : 'Buku tertutup');
  };

  // Skala otomatis agar buku (terutama saat terbuka, lebarnya 2x) muat di kolom
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const calc = () => {
      const need = isOpen ? TECHBOOK_W * 2 + 24 : TECHBOOK_W + 120;
      setScale(Math.max(0.4, Math.min(1, el.clientWidth / need)));
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isOpen]);

  // Tombol Esc menutup buku
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Buku ikut miring mengikuti pointer (parallax 3D)
  const handleMove = (e) => {
    const el = stageRef.current;
    const tilt = tiltRef.current;
    if (!el || !tilt) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.setProperty('--ry', (px * 20).toFixed(2) + 'deg');
    tilt.style.setProperty('--rx', (-py * 14).toFixed(2) + 'deg');
  };
  const handleLeave = () => {
    const tilt = tiltRef.current;
    if (!tilt) return;
    tilt.style.setProperty('--ry', '0deg');
    tilt.style.setProperty('--rx', '0deg');
  };

  const half = Math.ceil(TECH_SKILLS.length / 2);
  const leftSkills = TECH_SKILLS.slice(0, half);
  const rightSkills = TECH_SKILLS.slice(half);

  const renderIcons = (list) =>
    list.map((skill, i) => (
      <div
        key={skill.id}
        className="bk-icon"
        role="img"
        aria-label={skill.name}
        style={{ '--i': i, '--bc': skill.border, '--gc': skill.color }}
      >
        <div className="bk-bob">
          <div className="bk-glyph">{skill.icon}</div>
        </div>
      </div>
    ));

  return (
    <aside className="tech-book-card" aria-label="Buku interaktif keahlian">
      <div
        ref={stageRef}
        className={`bk-stage ${isOpen ? 'is-open' : ''}`}
        style={{ height: Math.round(480 * scale) + 'px' }}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        <div className="bk-glow"></div>

        <div className="bk-sparks" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} style={{ '--n': i }}></span>
          ))}
        </div>

        <div className="bk-scale" style={{ transform: `scale(${scale})` }}>
          <div className="bk-shadow"></div>
          {isOpen && <div className="bk-burst" aria-hidden="true"></div>}

          <div className="bk-tilt" ref={tiltRef}>
            <div className="bk-float">
              <div
                className={`bk-book ${isOpen ? 'is-open' : 'is-closed'}`}
                role={isOpen ? 'group' : 'button'}
                tabIndex={isOpen ? -1 : 0}
                aria-label={isOpen ? 'Buku terbuka' : 'Klik untuk membuka buku keahlian'}
                onClick={!isOpen ? toggleBook : undefined}
                onKeyDown={(e) => {
                  if (!isOpen && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    toggleBook();
                  }
                }}
              >
                {/* Badan buku */}
                <div className="bk-back"></div>
                <div className="bk-spine"></div>
                <div className="bk-edge bk-edge-right"></div>
                <div className="bk-edge bk-edge-top"></div>
                <div className="bk-edge bk-edge-bottom"></div>

                {/* Halaman kanan (isi logo) */}
                <div className="bk-pagefill">
                  <div className="bk-grid" style={{ '--base': '1s' }}>
                    {isOpen && renderIcons(rightSkills)}
                  </div>
                </div>

                {/* Lembaran yang terbalik saat buku dibuka */}
                <div className="bk-sheet" style={{ '--s': 0 }}></div>
                <div className="bk-sheet" style={{ '--s': 1 }}></div>
                <div className="bk-sheet" style={{ '--s': 2 }}></div>

                {/* Penanda buku merah */}
                <div className="bk-ribbon"></div>

                {/* Sampul depan: berengsel di sisi kiri */}
                <div className="bk-cover">
                  <div className="bk-cover-out"></div>
                  <div className="bk-cover-in">
                    <div className="bk-grid" style={{ '--base': '0.6s' }}>
                      {isOpen && renderIcons(leftSkills)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`book-toggle-pill ${isOpen ? 'active' : ''}`}
        onClick={toggleBook}
        title={isOpen ? 'Tutup buku' : 'Buka buku'}
      >
        <span className="book-status-pulse"></span>
        <span>{isOpen ? 'Tutup Buku \u2715' : 'Buka Buku +'}</span>
      </button>
    </aside>
  );
}
