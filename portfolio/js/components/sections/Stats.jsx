function Stats({ onSelectItem }) {
  const statsRef = useRef(null);
  const [counts, setCounts] = useState({ projects: 0, certificates: 0 });
  const [openKey, setOpenKey] = useState(null);   // dipasang lewat klik/tap
  const [hoverKey, setHoverKey] = useState(null);  // hover mouse: kartu hanya mengintip naik

  // Folder yang ditampilkan (urutan = urutan kartu)
  const folders = [
    { key: 'projects', lines: ['projects'] },
    { key: 'certificates', lines: ['certificates'] }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();

        const duration = 1200;
        const startTime = performance.now();
        const targets = { projects: DATA.projects.length, certificates: DATA.certificates.filter((c) => c.img).length };

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

  // Buka halaman detail untuk item yang diklik (idx = urutan di DATA[key])
  const handleGo = (key, idx) => onSelectItem(key, idx);

  return (
    <div className="stats-grid" id="stats" ref={statsRef}>
      {folders.map((f) => {
        const pinned = openKey === f.key;
        const isOpen = pinned;
        const all = (DATA[f.key] || []).map((it, idx) => ({ ...it, idx }));
        const withImg = all.filter((it) => it.img);
        const list = withImg.length ? withImg : all;
        // Kartu isi folder, urut dari yang paling depan. Semua item masuk; minimal 3 lapis agar susunan tetap rapi.
        const cards = list.map((it) => ({ t: it.t, sub: it.r || (typeof it.s === 'string' ? it.s : ''), img: it.img, idx: it.idx }));
        while (cards.length < 3) cards.push({ ghost: true });
        const n = cards.length;
        const ts = n > 1 ? Math.min(8, 24 / (n - 1)) : 0;
        const zs = n > 1 ? Math.min(9, 27 / (n - 1)) : 0;
        const spread = n > 4 ? 24 : 17;

        return (
          <div
            key={f.key}
            className={`folder-item ${isOpen ? 'is-open' : ''} ${!isOpen && hoverKey === f.key ? 'is-peek' : ''}`}
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
                    className={`folder-card fc-${k % 4} ${c.img ? 'has-img' : ''} ${c.ghost ? 'is-ghost' : ''}`}
                    style={{
                      '--k': k,
                      '--top': (40 - k * ts).toFixed(1) + 'px',
                      '--z': (14 - k * zs).toFixed(1) + 'px',
                      '--py': (-16 - k * ts * 0.75).toFixed(1) + 'px',
                      '--oy': (-112 + k * ts).toFixed(1) + 'px',
                      '--rot': (n > 1 ? spread - k * 2 * spread / (n - 1) : 0).toFixed(1) + 'deg',
                      ...(c.img ? { backgroundImage: `url("${encodeURI(c.img)}")` } : {})
                    }}
                    aria-hidden={c.ghost ? 'true' : undefined}
                    role={c.ghost ? undefined : 'link'}
                    tabIndex={!c.ghost && isOpen ? 0 : -1}
                    aria-label={c.ghost ? undefined : `Buka ${c.t} di portofolio`}
                    onClick={c.ghost ? undefined : (e) => { e.stopPropagation(); if (isOpen) handleGo(f.key, c.idx); }}
                    onKeyDown={c.ghost ? undefined : (e) => { if (isOpen && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.stopPropagation(); handleGo(f.key, c.idx); } }}
                  >
                    {!c.img && !c.ghost && <span className="card-title card-title-solo">{c.t}</span>}
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
