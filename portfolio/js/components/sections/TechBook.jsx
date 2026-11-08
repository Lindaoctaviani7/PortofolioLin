// Buku 3D interaktif:
// - drag/geser pada buku -> buku berputar bebas 360 derajat (dengan inersia)
// - klik buku -> terbuka horizontal, logo skill melayang (levitate) keluar dari buku
// - klik buku lagi -> logo masuk kembali & buku tertutup
const TECHBOOK_W = 260; // lebar satu halaman (px) pada skala 1

// Susunan logo berbentuk kubah di atas buku (koordinat relatif pusat buku, skala 1)
function techbookLayout(n) {
  const rows = Math.ceil(n / 7);
  const per = Math.ceil(n / rows);
  const out = [];
  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / per); // 0 = baris paling atas
    const inRow = Math.min(per, n - row * per);
    const dx = i - row * per - (inRow - 1) / 2;
    out.push({
      x: Math.round(dx * 72),
      y: Math.round(-62 - (rows - 1 - row) * 74 + dx * dx * 3.2),
      r: Math.round(dx * 5),
    });
  }
  return out;
}

function TechBook({ showToast }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scale, setScale] = React.useState(1);
  const stageRef = React.useRef(null);
  const tiltRef = React.useRef(null);
  const openRef = React.useRef(false);
  const rot = React.useRef({
    x: 0, y: 0, vx: 0, vy: 0, hx: 0, hy: 0, thx: 0, thy: 0,
    dragging: false, moved: 0, startX: 0, startY: 0, lastX: 0, lastY: 0,
    onBook: false, lastTouch: 0,
  });

  const toggleBook = () => {
    const next = !openRef.current;
    openRef.current = next;
    setIsOpen(next);
    const r = rot.current;
    r.vx = 0; r.vy = 0;
    r.lastTouch = -99999; // langsung kembali ke pose datar
  };

  // Skala otomatis agar muat di kolom
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const calc = () => {
      const need = isOpen ? TECHBOOK_W * 2 + 30 : TECHBOOK_W + 130;
      setScale(Math.max(0.4, Math.min(1, el.clientWidth / need)));
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isOpen]);

  // Loop animasi rotasi: inersia + parallax hover + kembali datar saat terbuka
  React.useEffect(() => {
    let raf;
    const tick = () => {
      const r = rot.current;
      const tilt = tiltRef.current;
      if (tilt) {
        if (!r.dragging) {
          r.x += r.vx; r.y += r.vy;
          r.vx *= 0.94; r.vy *= 0.94;
          if (Math.abs(r.vx) < 0.01) r.vx = 0;
          if (Math.abs(r.vy) < 0.01) r.vy = 0;
          if (openRef.current && performance.now() - r.lastTouch > 1800) {
            // saat terbuka, perlahan kembali ke pose horizontal lewat jalur terpendek
            r.x += (0 - r.x) * 0.06;
            r.y += (0 - r.y) * 0.06;
          }
        }
        // jaga sudut tetap di rentang -180..180 (hasil visual sama, matriks 3D lebih stabil)
        r.x = ((((r.x + 180) % 360) + 360) % 360) - 180;
        r.y = ((((r.y + 180) % 360) + 360) % 360) - 180;
        r.hx += (r.thx - r.hx) * 0.1;
        r.hy += (r.thy - r.hy) * 0.1;
        tilt.style.transform = `rotateX(${(r.x + r.hx).toFixed(2)}deg) rotateY(${(r.y + r.hy).toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Esc menutup buku
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { openRef.current = false; setIsOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    const r = rot.current;
    r.dragging = true;
    r.moved = 0;
    r.startX = r.lastX = e.clientX;
    r.startY = r.lastY = e.clientY;
    r.vx = 0; r.vy = 0;
    r.onBook = !!(e.target.closest && e.target.closest('.bk-book'));
    r.lastTouch = performance.now();
    stageRef.current.classList.add('dragging');
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { }
  };

  const onPointerMove = (e) => {
    const el = stageRef.current;
    const r = rot.current;
    if (r.dragging) {
      const dx = e.clientX - r.lastX;
      const dy = e.clientY - r.lastY;
      r.lastX = e.clientX; r.lastY = e.clientY;
      r.moved += Math.abs(dx) + Math.abs(dy);
      r.y += dx * 0.6;
      r.x -= dy * 0.6;
      r.vy = dx * 0.6;
      r.vx = -dy * 0.6;
      r.lastTouch = performance.now();
      return;
    }
    if (!el) return;
    const b = el.getBoundingClientRect();
    r.thy = ((e.clientX - b.left) / b.width - 0.5) * 14;
    r.thx = -((e.clientY - b.top) / b.height - 0.5) * 10;
  };

  const endDrag = (e, cancelled) => {
    const r = rot.current;
    if (!r.dragging) return;
    r.dragging = false;
    r.lastTouch = performance.now();
    if (stageRef.current) stageRef.current.classList.remove('dragging');
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (err) { }
    if (!cancelled && r.moved < 6 && r.onBook) toggleBook(); // klik (bukan drag) pada buku
  };

  const onPointerLeave = () => {
    const r = rot.current;
    r.thx = 0; r.thy = 0;
  };

  const layout = techbookLayout(TECH_SKILLS.length);

  return (
    <aside className="tech-book-card" aria-label="Buku interaktif keahlian">
      <div
        ref={stageRef}
        className={`bk-stage ${isOpen ? 'is-open' : ''}`}
        style={{ height: Math.round((isOpen ? 560 : 480) * scale) + 'px' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(e) => endDrag(e, false)}
        onPointerCancel={(e) => endDrag(e, true)}
        onPointerLeave={onPointerLeave}
      >
        <div className="bk-glow"></div>

        <div className="bk-sparks" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} style={{ '--n': i }}></span>
          ))}
        </div>

        <div className="bk-scale" style={{ transform: `scale(${scale})` }}>
          <div className="bk-beam" aria-hidden="true"></div>
          <div className="bk-shadow" aria-hidden="true"></div>
          {isOpen && <div className="bk-burst" aria-hidden="true"></div>}
          <div className="bk-lift">

            <div className="bk-tilt" ref={tiltRef}>
              <div className="bk-float">
                <div
                  className={`bk-book ${isOpen ? 'is-open' : 'is-closed'}`}
                  role="button"
                  tabIndex={0}
                  aria-label={isOpen ? 'Klik untuk menutup buku' : 'Klik untuk membuka buku keahlian'}
                  aria-pressed={isOpen}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleBook();
                    }
                  }}
                >
                  <div className="bk-back"></div>
                  <div className="bk-spine"></div>
                  <div className="bk-edge bk-edge-right"></div>
                  <div className="bk-edge bk-edge-top"></div>
                  <div className="bk-edge bk-edge-bottom"></div>

                  <div className="bk-pagefill"><div className="bk-lines"></div></div>

                  <div className="bk-sheet" style={{ '--s': 0 }}></div>
                  <div className="bk-sheet" style={{ '--s': 1 }}></div>
                  <div className="bk-sheet" style={{ '--s': 2 }}></div>

                  <div className="bk-ribbon"></div>

                  <div className="bk-cover">
                    <div className="bk-cover-out"></div>
                    <div className="bk-cover-in"><div className="bk-lines"></div></div>
                  </div>

                  {/* Petunjuk di luar buku, melengkung mengikuti sudut kanan atas sampul */}
                  <svg className="bk-clickme" viewBox="0 0 260 340" aria-hidden="true">
                    <defs>
                      <path id="bkClickArc" d="M 186 -34 H 244 A 24 24 0 0 1 268 -10 V 50" fill="none" />
                    </defs>
                    <text>
                      <textPath href="#bkClickArc" startOffset="50%" textAnchor="middle">!!!</textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Logo skill: keluar dari buku lalu melayang */}
          <div className="bk-fly-layer" aria-label="Logo aplikasi dan bahasa pemrograman">
            {TECH_SKILLS.map((skill, i) => (
              <div
                key={skill.id}
                className="bk-fly"
                role="img"
                aria-label={skill.name}
                style={{
                  '--i': i,
                  '--x': layout[i].x + 'px',
                  '--y': layout[i].y + 'px',
                  '--r': layout[i].r + 'deg',
                  '--bc': skill.border,
                  '--gc': skill.color,
                }}
              >
                <div className="bk-levitate">
                  <div className="bk-glyph">{skill.icon}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
