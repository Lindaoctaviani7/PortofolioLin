// Layar pembuka bergaya langit malam: kilat biru menyambar, partikel debu berkumpul membentuk
// teks "Welcome To My / Portofolio Website", ada "Loading" + persen; di akhir kilat besar lalu
// teks pecah dan layar memudar memperlihatkan website. Semua digambar di canvas (tanpa file gambar).
function Preloader() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading');   // loading -> open -> gone
  const phaseRef = useRef('loading');
  const openAtRef = useRef(0);

  // Kunci scroll selama layar pembuka tampil
  useEffect(() => {
    if (phase === 'gone') return undefined;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = prev; };
  }, [phase]);

  // Persen: naik halus sampai ~92%, lalu 100% setelah halaman selesai dimuat
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const MIN = reduce ? 800 : 3000;
    const start = performance.now();
    let loaded = document.readyState === 'complete';
    let cur = 0, raf; const timers = [];
    const onLoad = () => { loaded = true; };
    window.addEventListener('load', onLoad);
    const tick = (now) => {
      const t = now - start;
      const target = (loaded && t >= MIN) ? 100 : Math.min(92, (t / MIN) * 92);
      cur = Math.min(target, cur + Math.max(0.15, (target - cur) * 0.05));
      setProgress(Math.floor(cur));
      if (cur >= 99.9) {
        setProgress(100);
        timers.push(setTimeout(() => {
          openAtRef.current = performance.now();
          phaseRef.current = 'open';
          setPhase('open');
        }, 550));
        timers.push(setTimeout(() => { phaseRef.current = 'gone'; setPhase('gone'); }, 550 + (reduce ? 700 : 1900)));
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); window.removeEventListener('load', onLoad); };
  }, []);

  // Animasi canvas: bintang, meteor, kilat, partikel teks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const clamp01 = (v) => Math.min(1, Math.max(0, v));
    const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
    let W = 0, H = 0, dpr = 1, fs = 60, step = 3, cy = 0;
    let stars = [], parts = [], bolts = [], meteors = [];
    let raf = 0, partStart = 0, built = false, stopped = false;
    const t0 = performance.now();
    let nextBolt = 0.3, nextMeteor = 1.2, finalBolt = false, boltCount = 0;

    // ----- Kilat: titik tengah berulang (midpoint displacement) -----
    const jag = (x0, y0, x1, y1, d, out) => {
      if (d < 3.5) { out.push([x1, y1]); return; }
      const mx = (x0 + x1) / 2 + rnd(-d, d), my = (y0 + y1) / 2 + rnd(-d * 0.3, d * 0.3);
      jag(x0, y0, mx, my, d / 2, out);
      jag(mx, my, x1, y1, d / 2, out);
    };
    const makeLine = (x0, y0, x1, y1, d) => { const pts = [[x0, y0]]; jag(x0, y0, x1, y1, d, pts); return pts; };
    const spawnBolt = (x, life, big) => {
      const x1 = x + rnd(-0.12, 0.12) * W;
      const main = makeLine(x, -10, x1, H * rnd(0.88, 1.05), H * 0.11);
      const branches = [];
      const nb = Math.floor(rnd(2, 5));
      for (let i = 0; i < nb; i++) {
        const p = main[Math.floor(rnd(0.15, 0.85) * main.length)];
        branches.push(makeLine(p[0], p[1], p[0] + rnd(-0.16, 0.16) * W, p[1] + rnd(0.1, 0.3) * H, H * 0.05));
      }
      bolts.push({ main, branches, born: performance.now(), life, big: !!big, x: (x + x1) / 2 });
    };

    const strokePath = (pts) => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.stroke();
    };

    const drawBolt = (b, now) => {
      const age = (now - b.born) / 1000;
      if (age > b.life) return false;
      let a = age < 0.05 ? age / 0.05 : Math.exp(-(age - 0.05) * (b.big ? 2.2 : 3.4));
      a *= 0.75 + 0.25 * Math.sin(age * 90 + b.x);                           // kedip cepat
      a += 0.55 * Math.exp(-Math.pow((age - 0.2) / 0.035, 2));              // sambaran ulang
      a = clamp01(a);
      // cahaya biru yang menerangi langit
      const g = ctx.createRadialGradient(b.x, H * 0.45, 10, b.x, H * 0.45, W * 0.55);
      g.addColorStop(0, `rgba(50,110,255,${0.26 * a})`);
      g.addColorStop(1, 'rgba(10,30,120,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      const s = Math.max(0.6, Math.min(1.4, H / 900));
      const passes = [[16 * s, `rgba(30,90,255,${0.10 * a})`], [8 * s, `rgba(60,140,255,${0.22 * a})`], [3.4 * s, `rgba(150,205,255,${0.7 * a})`], [1.5 * s, `rgba(255,255,255,${a})`]];
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      passes.forEach(([w, col]) => {
        ctx.strokeStyle = col;
        ctx.lineWidth = w;
        strokePath(b.main);
        ctx.lineWidth = w * 0.5;
        b.branches.forEach(strokePath);
      });
      return true;
    };

    // ----- Partikel teks -----
    const build = () => {
      const off = document.createElement('canvas');
      off.width = W; off.height = H;
      const o = off.getContext('2d');
      o.textAlign = 'center';
      o.textBaseline = 'middle';
      o.font = `800 ${fs}px ${FONT}`;
      const y1 = cy - fs * 0.62, y2 = cy + fs * 0.55;
      o.fillStyle = '#fff';
      o.fillText('Welcome To My', W / 2, y1);
      o.fillStyle = '#2f6bff';
      o.fillText('Portofolio Website', W / 2, y2);
      const top = Math.max(0, Math.floor(cy - fs * 1.4)), hh = Math.min(H - top, Math.ceil(fs * 2.8));
      const data = o.getImageData(0, top, W, hh).data;
      const list = [];
      for (let y = 0; y < hh; y += step) {
        for (let x = 0; x < W; x += step) {
          const i = (y * W + x) * 4;
          if (data[i + 3] > 140) {
            list.push({
              tx: x, ty: y + top, sx: rnd(0, W), sy: rnd(0, H),
              c: data[i] > 150 ? 0 : 1,                      // 0 = putih, 1 = biru
              d: rnd(0, 1.1), dur: rnd(1.5, 2.2), ph: rnd(0, 6.28),
              ang: rnd(0, 6.28), sp: rnd(120, 520)
            });
          }
        }
      }
      parts = list;
      partStart = performance.now();
      built = true;
    };

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fs = Math.max(26, Math.min(W * (W < 700 ? 0.105 : 0.062), 76));
      step = fs > 52 ? 3 : 2;
      cy = H / 2;
      if (rootRef.current) rootRef.current.style.setProperty('--fs', fs + 'px');
      stars = Array.from({ length: Math.round(Math.min(240, (W * H) / 6000)) }, () => ({ x: rnd(0, W), y: rnd(0, H), r: rnd(0.4, 1.5), ph: rnd(0, 6.28), sp: rnd(0.6, 2.2) }));
    };
    setup();
    const fontReady = (document.fonts && document.fonts.load)
      ? Promise.race([document.fonts.load(`800 40px ${FONT}`), new Promise((r) => setTimeout(r, 700))])
      : Promise.resolve();
    fontReady.then(() => { if (!stopped) build(); });

    let rt;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { setup(); build(); }, 150); };
    window.addEventListener('resize', onResize);

    const frame = (now) => {
      if (stopped || phaseRef.current === 'gone') return;
      const t = (now - t0) / 1000;
      const open = phaseRef.current === 'open';
      const ot = open ? (now - openAtRef.current) / 1000 : 0;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';

      // bintang berkelip
      stars.forEach((s) => {
        const a = 0.35 + 0.65 * Math.abs(Math.sin(t * s.sp + s.ph));
        ctx.fillStyle = `rgba(200,220,255,${a * 0.85})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
      });

      if (!reduce) {
        // meteor tipis sesekali
        if (t >= nextMeteor && !open) {
          const v = rnd(600, 900);
          meteors.push({ x: rnd(0.1, 0.9) * W, y: rnd(0, 0.5) * H, vx: v, vy: v * 0.5, born: now });
          nextMeteor = t + rnd(1.5, 3.2);
        }
        meteors = meteors.filter((m) => {
          const age = (now - m.born) / 1000;
          if (age > 0.6) return false;
          const x = m.x + m.vx * age, y = m.y + m.vy * age;
          ctx.strokeStyle = `rgba(220,235,255,${0.8 * (1 - age / 0.6)})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - m.vx * 0.09, y - m.vy * 0.09); ctx.stroke();
          return true;
        });

        // jadwal sambaran kilat: total 4 kali (3 saat loading + 1 besar saat masuk ke website)
        if (!open && boltCount < 3 && t >= nextBolt) {
          spawnBolt(W * rnd(0.3, 0.78), rnd(0.8, 1.1));
          boltCount++;
          nextBolt = t + rnd(1.2, 1.5);
        }
        if (open && !finalBolt) { finalBolt = true; spawnBolt(W * 0.5, 1.1, true); }

        ctx.globalCompositeOperation = 'lighter';
        bolts = bolts.filter((b) => drawBolt(b, now));
        ctx.globalCompositeOperation = 'source-over';
      }

      // partikel teks (debu berkumpul membentuk tulisan)
      if (built) {
        const pt = reduce ? 99 : (now - partStart) / 1000;
        const formed = clamp01((pt - 2.4) / 0.6);                          // teks tajam muncul
        const textA = open ? clamp01(1 - ot / 0.45) : formed;
        const dustA = open ? clamp01(1 - ot / 0.9) : 1 - formed * 0.85;
        const size = step > 2 ? 2.1 : 1.6;
        for (let c = 0; c < 2; c++) {
          ctx.fillStyle = c === 0 ? `rgba(255,255,255,${0.9 * dustA})` : `rgba(70,125,255,${0.95 * dustA})`;
          for (let i = 0; i < parts.length; i++) {
            const p = parts[i];
            if (p.c !== c) continue;
            const e = clamp01((pt - p.d) / p.dur);
            const k = 1 - Math.pow(1 - e, 3);
            let x = p.sx + (p.tx - p.sx) * k + (1 - k) * Math.sin(pt * 3 + p.ph) * 18;
            let y = p.sy + (p.ty - p.sy) * k + (1 - k) * Math.cos(pt * 2.4 + p.ph) * 18;
            if (e >= 1) { x += Math.sin(pt * 2 + p.ph) * 0.6; y += Math.cos(pt * 2.2 + p.ph) * 0.6; }
            if (open) { x += Math.cos(p.ang) * p.sp * ot * ot; y += Math.sin(p.ang) * p.sp * ot * ot; }
            ctx.fillRect(x, y, size, size);
          }
        }
        if (textA > 0.01) {
          ctx.save();
          ctx.globalAlpha = textA;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = `800 ${fs}px ${FONT}`;
          ctx.fillStyle = '#fff';
          ctx.fillText('Welcome To My', W / 2, cy - fs * 0.62);
          ctx.shadowColor = 'rgba(60,120,255,0.55)';
          ctx.shadowBlur = fs * 0.25;
          ctx.fillStyle = '#2f6bff';
          ctx.fillText('Portofolio Website', W / 2, cy + fs * 0.55);
          ctx.restore();
        }
      }

      // kilatan putih saat layar mulai terbuka
      if (open) {
        const fa = 0.55 * Math.exp(-ot * 7);
        if (fa > 0.01) { ctx.fillStyle = `rgba(200,225,255,${fa})`; ctx.fillRect(0, 0, W, H); }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { stopped = true; cancelAnimationFrame(raf); clearTimeout(rt); window.removeEventListener('resize', onResize); };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div ref={rootRef} className={'pl-root' + (phase === 'open' ? ' is-open' : '')} role="status" aria-live="polite" aria-label={`Memuat ${progress}%`}>
      <canvas ref={canvasRef} className="pl-canvas" aria-hidden="true" />
      <div className="pl-load">
        <div className="pl-load-row"><span>Loading</span><span>{progress}%</span></div>
        <div className="pl-load-line"><i style={{ width: progress + '%' }} /></div>
      </div>
    </div>
  );
}
