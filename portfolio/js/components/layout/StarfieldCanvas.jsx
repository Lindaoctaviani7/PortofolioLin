function StarfieldCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let stars = [];
    let meteor = null;
    let animId;
    let mouseX = w / 2, mouseY = h / 2;

    const createStars = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(Math.round((w * h) / 7500), 180);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2
      }));
    };

    createStars();
    const handleResize = () => createStars();
    const handlePointerMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove);

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.phase += s.speed;
        const flicker = reduceMotion ? 0.7 : 0.3 + 0.7 * Math.abs(Math.sin(s.phase));
        let px = s.x, py = s.y;
        if (!reduceMotion) {
          px += (mouseX - w / 2) * 0.015 * s.r;
          py += (mouseY - h / 2) * 0.015 * s.r;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${flicker})`;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduceMotion) {
        if (!meteor && Math.random() < 0.006) {
          meteor = { x: Math.random() * w * 0.75, y: Math.random() * h * 0.4, len: 0, maxLen: 240, speed: 12 };
        }
        if (meteor) {
          meteor.len += meteor.speed;
          const grad = ctx.createLinearGradient(
            meteor.x + meteor.len, meteor.y + meteor.len * 0.55,
            meteor.x + meteor.len - 80, meteor.y + meteor.len * 0.55 - 44
          );
          grad.addColorStop(0, 'rgba(255,255,255,0.95)');
          grad.addColorStop(1, 'transparent');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(meteor.x + meteor.len, meteor.y + meteor.len * 0.55);
          ctx.lineTo(meteor.x + meteor.len - 80, meteor.y + meteor.len * 0.55 - 44);
          ctx.stroke();
          if (meteor.len > meteor.maxLen) meteor = null;
        }
      }
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <React.Fragment>
      <canvas id="stars" ref={canvasRef} aria-hidden="true" />
    </React.Fragment>
  );
}
