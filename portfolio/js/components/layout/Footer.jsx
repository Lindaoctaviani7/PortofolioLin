// Tekstur asap realistis: awan bergumpal dibuat dari noise fraktal (fBm), digambar sekali ke canvas
function makeSmokeTextures() {
  const S = 220;
  const out = [];
  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const smoothstep = (a, b, v) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  for (let seed = 0; seed < 4; seed++) {
    const hash = (x, y) => {
      let h = (x * 374761393 + y * 668265263 + (seed + 1) * 1442695041) | 0;
      h = (h ^ (h >>> 13)) * 1274126177 | 0;
      return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
    };
    const noise = (x, y) => {
      const xi = Math.floor(x), yi = Math.floor(y);
      const u = smoothstep(0, 1, x - xi), v = smoothstep(0, 1, y - yi);
      const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    };
    const fbm = (x, y, oct) => {
      let sum = 0, amp = 0.5, f = 1, norm = 0;
      for (let o = 0; o < oct; o++) { sum += amp * noise(x * f, y * f); norm += amp; amp *= 0.5; f *= 2; }
      return sum / norm;
    };
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(S, S);
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        const u = (x / S) * 2 - 1, v = (y / S) * 2 - 1;
        const r = Math.hypot(u, v);
        const big = fbm(x / S * 3.2, y / S * 3.2, 5);          // gumpalan besar
        const fine = fbm(x / S * 9 + 7.3, y / S * 9 + 2.1, 4); // detail halus
        const edge = r + (big - 0.5) * 0.9;                    // tepi bergelombang
        let a = 1 - smoothstep(0.34, 0.95, edge);
        a *= 0.7 + 0.55 * fine;
        a *= 1 - smoothstep(0.86, 1, r);
        a = clamp01(a * 1.18);
        const light = clamp01(0.5 - (u * 0.35 + v * 0.8) * 0.5);   // terang dari atas
        const shade = Math.max(140, Math.min(255, 255 - (1 - fine) * 40 - (1 - light) * 46 - Math.max(0, 0.5 - big) * 36));
        const i = (y * S + x) * 4;
        img.data[i] = shade - 7;
        img.data[i + 1] = shade - 3;
        img.data[i + 2] = shade;
        img.data[i + 3] = Math.round(a * 255);
      }
    }
    ctx.putImageData(img, 0, 0);
    out.push(c.toDataURL('image/png'));
  }
  return out;
}

function Footer() {
  const DATA = useData();
  const { t } = useLang();
  const stageRef = useRef(null);
  const sentinelRef = useRef(null);
  const [flight, setFlight] = useState(0);   // 0 = menunggu; >0 = nomor peluncuran
  const [inView, setInView] = useState(false);
  const [done, setDone] = useState(false);
  const [puffs, setPuffs] = useState([]);
  const [embers, setEmbers] = useState([]);
  const [tex, setTex] = useState([]);
  const inViewRef = useRef(false);
  const flyingRef = useRef(false);
  const timerRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0 });

  const FLY_S = 2.5;          // roket menyeberang layar (detik, kecepatan stabil)
  const TOTAL_MS = 8300;      // roket + asap tebal + asap memudar + teks muncul

  const launch = useCallback(() => {
    if (flyingRef.current) return;
    flyingRef.current = true;
    setDone(false);
    setFlight(f => f + 1);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      flyingRef.current = false;
      setDone(true);
    }, TOTAL_MS);
  }, []);

  const reset = useCallback(() => {
    clearTimeout(timerRef.current);
    flyingRef.current = false;
    setDone(false);
    setFlight(0);
  }, []);

  // 0) Buat tekstur asap sekali saja
  useEffect(() => {
    try { setTex(makeSmokeTextures()); } catch (err) { /* tanpa tekstur, asap tidak ditampilkan */ }
  }, []);

  // 1) Hitung ukuran roket, jalur & posisi asap sesuai lebar/tinggi layar
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const layout = () => {
      const W = Math.min(el.getBoundingClientRect().width, document.documentElement.clientWidth);
      const H = el.clientHeight;
      const top = parseFloat(getComputedStyle(el).paddingTop) || 0;   // zona asap di atas isi footer
      const ch = Math.max(1, H - top);                                  // tinggi area isi footer
      const len = clamp(W * 0.28, 170, 380);           // panjang roket (besar)
      const k = len / 130;
      const sx = W + len * 0.9;                        // mulai di luar layar kanan
      const dx = -(W + len * 2.1);                     // berakhir di luar layar kiri
      const ry = top + ch * 0.4;                       // garis terbang roket
      const s = el.style;
      s.setProperty('--k', k.toFixed(3));
      s.setProperty('--sx', sx.toFixed(1) + 'px');
      s.setProperty('--ry', ry.toFixed(1) + 'px');
      s.setProperty('--dx', dx.toFixed(1) + 'px');
      s.setProperty('--fly', FLY_S + 's');

      // Asap: tiap gumpalan muncul tepat saat roket melewati posisinya
      const prev = sizeRef.current;
      if (Math.abs(prev.w - W) < 4 && Math.abs(prev.h - H) < 4) return;
      sizeRef.current = { w: W, h: H };
      const rnd = (a, b) => a + Math.random() * (b - a);
      const emitX = sx + len * 0.37;                   // ujung nosel
      const N = Math.round(clamp(W / 8, 90, 170));
      const list = [];
      for (let i = 0; i < N; i++) {
        const near = i % 2 === 0;
        const x = rnd(-90, W + 90);
        const t = Math.max(0, FLY_S * (emitX - x) / -dx);
        const upper = i % 4 === 1;                      // sebagian asap membumbung ke atas, melewati batas footer
        const y = near ? ry + (Math.random() - 0.5) * ch * 0.5
          : upper ? top * rnd(0.15, 1) + ch * rnd(0, 0.2)
          : top + ch * rnd(0.45, 0.95);
        const size = (near ? rnd(60, 112) : rnd(80, 142)) * k;
        list.push({
          x, y, size,
          delay: t + (near ? 0 : rnd(0.05, 0.5)),
          life: rnd(3.6, 4.3),
          ddx: rnd(-40, 70) * k * 0.5,
          ddy: (near ? rnd(-30, 30) : rnd(-20, 40)) * k * 0.5,
          tone: Math.floor(rnd(0, 4)),
          rot: rnd(0, 360),
          op: upper ? rnd(0.45, 0.7) : 1,
        });
      }
      setPuffs(list);
      const e = [];
      for (let i = 0; i < 26; i++) {
        const x = rnd(-60, W + 60);
        e.push({
          x, y: ry + rnd(-0.6, 0.6) * len * 0.3,
          delay: Math.max(0, FLY_S * (emitX - x) / -dx) + rnd(0, 0.2),
          ex: rnd(30, 120) * k * 0.5, ey: rnd(-70, 70) * k * 0.5,
        });
      }
      setEmbers(e);
    };
    layout();
    let ro;
    if ('ResizeObserver' in window) { ro = new ResizeObserver(layout); ro.observe(el); }
    window.addEventListener('resize', layout);
    window.addEventListener('orientationchange', layout);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', layout);
      window.removeEventListener('orientationchange', layout);
    };
  }, []);

  // 2) Mulai saat pengguna tiba di area contact/footer; reset saat pergi
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { inViewRef.current = true; setInView(true); launch(); return; }
    const io = new IntersectionObserver(([e]) => {
      const vis = e.isIntersecting;
      inViewRef.current = vis;
      setInView(vis);
      if (vis) launch(); else reset();
    }, { threshold: 0.5 });
    io.observe(sentinelRef.current || el);
    return () => { io.disconnect(); clearTimeout(timerRef.current); };
  }, [launch, reset]);

  // 3) Klik / ketuk di mana saja saat di footer = roket lewat lagi
  useEffect(() => {
    const onPointer = (e) => {
      if (e.target.closest && e.target.closest('a, button')) return;
      if (inViewRef.current && !flyingRef.current) launch();
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [launch]);

  const goTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  const navLinks = [
    { id: 'home', label: t('nav_home') },
    { id: 'about', label: t('f_about') },
    { id: 'portfolio', label: t('f_projects') },
    { id: 'contact', label: t('nav_contact') }
  ];
  const MailIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7l8.5 6 8.5-6" /></svg>
  );

  const idx12 = Array.from({ length: 12 }, (_, i) => i);
  const idx3 = [0, 1, 2];

  return (
    <footer id="contact">
      <div
        className={'rk-stage' + (inView ? ' run' : '') + (flight > 0 ? ' go' : '')}
        ref={stageRef}
      >
        {/* Penanda area isi footer (pemicu animasi saat area ini terlihat) */}
        <div className="rk-sentinel" ref={sentinelRef} aria-hidden="true"></div>

        {/* Isi footer: tertutup asap, lalu muncul dari kanan ke kiri mengikuti asap yang memudar */}
        <div className="ft-content" key={'t' + flight} style={{ '--t0': flight > 1 ? 1 : 0 }}>
          <div className="ft-grid">
            <div className="ft-brand">
              <a className="ft-logo" href="#home" onClick={(e) => goTo(e, 'home')}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 7l5 5-5 5" /><path d="M13 18h6" /></svg>
                <span>{DATA.name}.</span>
              </a>
              <p>{t('f_tagline')}</p>
            </div>

            <nav className="ft-col" aria-label={t('f_nav_aria')}>
              <h4>{t('f_nav')}</h4>
              <ul>
                {navLinks.map((l) => (
                  <li key={l.id}><a href={`#${l.id}`} onClick={(e) => goTo(e, l.id)}>{l.label}</a></li>
                ))}
              </ul>
            </nav>

            <div className="ft-col">
              <h4>{t('f_connect')}</h4>
              <div className="ft-socials">
                {DATA.socials.map((so) => (
                  <a key={so.name} className="ft-social" href={so.fullUrl} target="_blank" rel="noopener noreferrer" aria-label={so.name} title={so.name}>
                    {getSocialIcon(so.type, so.name, 18)}
                  </a>
                ))}
                {DATA.email && (
                  <a className="ft-social" href={`mailto:${DATA.email}`} aria-label="Email" title="Email"><MailIcon /></a>
                )}
              </div>
            </div>
          </div>

          <div className="ft-bottom">
            © {new Date().getFullYear()} {DATA.fullName || DATA.name}. {t('f_rights')}
          </div>
        </div>

        {/* Asap tebal di belakang roket */}
        <div className="rk-smoke-layer" key={'s' + flight} aria-hidden="true">
          {tex.length > 0 && puffs.map((p, i) => (
            <span
              key={i}
              className="rk-puff"
              style={{
                left: p.x - p.size / 2, top: p.y - p.size / 2,
                width: p.size, height: p.size,
                animationDelay: p.delay.toFixed(2) + 's',
                animationDuration: p.life.toFixed(2) + 's',
                backgroundImage: `url(${tex[p.tone % tex.length]})`,
                '--rot': p.rot.toFixed(0) + 'deg', '--op': p.op.toFixed(2),
                '--ddx': p.ddx.toFixed(0) + 'px', '--ddy': p.ddy.toFixed(0) + 'px',
              }}
            ></span>
          ))}
          {embers.map((e, i) => (
            <span
              key={'e' + i}
              className="rk-ember"
              style={{
                left: e.x, top: e.y,
                animationDelay: e.delay.toFixed(2) + 's',
                '--ex': e.ex.toFixed(0) + 'px', '--ey': e.ey.toFixed(0) + 'px',
              }}
            ></span>
          ))}
        </div>

        {/* Roket 3D besar: kanan -> kiri, kecepatan stabil */}
        <div className="rk-path-x" key={'r' + flight} aria-hidden="true">
          <div className="rk-path-y">
            <div className="rk-ship">
              <div className="rk-depth">
                <div className="rk-heading">
                  <div className="rk-flame-wrap">
                    <div className="rk-flame-glow"></div>
                    <div className="rk-flame"></div>
                    <div className="rk-flame rk-flame-mid"></div>
                    <div className="rk-flame rk-flame-core"></div>
                  </div>
                  <div className="rk-scene">
                    <div className="rk-rotor">
                      {idx12.map(i => <i key={'b' + i} className="rk-face rk-body" style={{ '--i': i }}></i>)}
                      {idx12.map(i => <i key={'n' + i} className="rk-face rk-nose" style={{ '--i': i }}></i>)}
                      {idx12.map(i => <i key={'z' + i} className="rk-face rk-nozzle" style={{ '--i': i }}></i>)}
                      {idx3.map(i => <i key={'f' + i} className="rk-fin" style={{ '--i': i }}></i>)}
                      <i className="rk-window"></i>
                      <i className="rk-cap"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}