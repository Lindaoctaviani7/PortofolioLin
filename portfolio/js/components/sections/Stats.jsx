function Stats({ onSelectTab }) {
  const statsRef = useRef(null);
  const [counts, setCounts] = useState({ projects: 0, certificates: 0 });
  const [openKey, setOpenKey] = useState(null);   // dipasang lewat klik/tap
  const [hoverKey, setHoverKey] = useState(null);  // sementara saat hover mouse

  // Folder yang ditampilkan (urutan = urutan kartu)
  const folders = [
    { key: 'projects', tag: '#proyek', lines: ['proyek', 'selesai'], sub: 'Solusi nyata yang telah dibuat' },
    { key: 'certificates', tag: '#sertifikasi', lines: ['sertifikasi'], sub: 'Kompetensi terverifikasi' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();

        const duration = 1200;
        const startTime = performance.now();
        const targets = { projects: DATA.projects.length, certificates: DATA.certificates.length };

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setCounts({
            projects: Math.round(progress * targets.projects),
            certificates: Math.round(progress * targets.certificates)
          });
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      });
    }, { threshold: 0.3 });

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Tutup folder saat klik di luar folder atau menekan Escape
  useEffect(() => {
    const onDocClick = (e) => {
      if (!e.target.closest('.folder-item')) setOpenKey(null);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpenKey(null); };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const handleGo = (key) => {
    onSelectTab(key);
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="stats-grid" id="stats" ref={statsRef}>
      {folders.map((f) => {
        const pinned = openKey === f.key;
        const isOpen = pinned || hoverKey === f.key;
        const list = DATA[f.key] || [];
        const shown = list.slice(0, 4);
        const extra = list.length - shown.length;
        // Kartu isi folder, urut dari yang paling depan. Minimal 3 lapis agar susunan tetap rapi.
        const cards = shown.map((it) => ({ t: it.t, sub: it.s || it.r || '', img: it.img }));
        while (cards.length < 3) cards.push({ ghost: true });

        return (
          <div
            key={f.key}
            className={`folder-item ${isOpen ? 'is-open' : ''}`}
            onClick={() => setOpenKey(pinned ? null : f.key)}
            onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHoverKey(f.key); }}
            onPointerLeave={() => setHoverKey(null)}
          >
            <div className="folder-stage">
              <div className="folder-ground" />

              <div className="folder-3d">
                {/* Rangka folder: punggung + tab, dinding samping, alas */}
                <div className="f3-back"><div className="f3-tab" /></div>
                <div className="f3-wall f3-wall-l" />
                <div className="f3-wall f3-wall-r" />
                <div className="f3-floor" />

                {/* Isi folder: kartu bersusun rapi seperti anak tangga */}
                {cards.map((c, k) => (
                  <div
                    key={k}
                    className={`folder-card fc-${k} ${c.img ? 'has-img' : ''} ${c.ghost ? 'is-ghost' : ''}`}
                    style={c.img ? { backgroundImage: `url(${c.img})` } : undefined}
                    aria-hidden={c.ghost ? 'true' : undefined}
                  >
                    <div className="card-head">
                      {c.ghost ? <i className="ghost-bar" /> : <span className="card-title">{c.t}</span>}
                      {k === 0 ? (
                        <button
                          type="button"
                          className="paper-go"
                          tabIndex={isOpen ? 0 : -1}
                          onClick={(e) => { e.stopPropagation(); handleGo(f.key); }}
                        >
                          Buka ›
                        </button>
                      ) : (
                        <span className="card-idx">{String(k + 1).padStart(2, '0')}</span>
                      )}
                    </div>
                    {k === 0 && !c.img && (
                      <div className="card-body">
                        <p className="card-sub">{c.sub}</p>
                        {extra > 0 && <span className="card-more">+{extra} lainnya</span>}
                      </div>
                    )}
                  </div>
                ))}

                {/* Tutup depan (kaca) — engsel di sisi bawah */}
                <div className="folder-flap">
                  <button
                    type="button"
                    className="folder-front"
                    aria-expanded={isOpen}
                    aria-label={`${f.lines.join(' ')}: ${counts[f.key]}. ${pinned ? 'Tutup' : 'Buka'} folder`}
                  >
                    <span className="folder-top">
                      <span className="folder-tag">{f.tag}</span>
                      <span className="folder-count">{counts[f.key]}</span>
                    </span>
                    <span className="folder-bottom">
                      <span className="folder-text">
                        <span className="folder-title">
                          {f.lines.map((l, i) => <span key={i}>{l}</span>)}
                        </span>
                        <span className="folder-sub">{f.sub}</span>
                      </span>
                      <span className="folder-go" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
