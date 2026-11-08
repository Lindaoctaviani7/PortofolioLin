function CoverflowGallery() {
  const DATA = useData();
  const { t } = useLang();
  // pos terus bertambah / berkurang tanpa batas, sehingga galeri berputar (looping)
  const [pos, setPos] = useState(0);
  const items = DATA.gallery;
  const n = items.length;
  const half = Math.floor(n / 2);
  const prevOffsets = useRef({});
  const touchX = useRef(null);

  const go = (step) => setPos((p) => p + step);
  const activeIdx = ((pos % n) + n) % n;

  // Selisih posisi tiap foto terhadap foto tengah, dibungkus agar selalu di antara -half..half
  const offsetOf = (i) => {
    let d = (i - pos) % n;
    if (d > half) d -= n;
    if (d < -half) d += n;
    return d;
  };

  // Foto yang "melompat" dari ujung kiri ke kanan (atau sebaliknya) tidak perlu dianimasikan melintasi layar
  const current = items.map((_, i) => offsetOf(i));
  const jumped = current.map((o, i) => prevOffsets.current[i] !== undefined && Math.abs(o - prevOffsets.current[i]) > 1);
  useEffect(() => {
    const next = {};
    current.forEach((o, i) => { next[i] = o; });
    prevOffsets.current = next;
  });

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  return (
    <div className="gallery-section">

      <div className="flow-container" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {items.map((item, i) => {
          const offset = current[i];
          const absOffset = Math.abs(offset);
          const isCenter = offset === 0;
          return (
            <div
              key={i}
              className={`flow-slide ${isCenter ? 'is-center' : ''}`}
              style={{
                background: `linear-gradient(145deg, ${item.gradient})`,
                transform: `translateX(${offset * 70}%) rotateY(${-offset * 26}deg) scale(${1 - absOffset * 0.12})`,
                opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.22,
                zIndex: 10 - absOffset,
                transition: jumped[i] ? 'none' : undefined
              }}
              role="button"
              tabIndex={isCenter ? -1 : 0}
              aria-label={isCenter ? item.title : t('g_show', { title: item.title })}
              onClick={() => { if (!isCenter) go(offset); }}
              onKeyDown={(e) => {
                if (!isCenter && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); go(offset); }
              }}
            >
              {item.img && (
                <img
                  className="flow-photo"
                  src={encodeURI(item.img)}
                  alt={item.title}
                  loading="lazy"
                  draggable="false"
                  style={item.imgPos ? { objectPosition: item.imgPos } : undefined}
                />
              )}
              <h4>{item.title}</h4>
              <span>{item.desc}</span>
            </div>
          );
        })}
      </div>

      <div className="flow-controls">
        <button className="btn sm" type="button" aria-label={t('g_prev')} onClick={() => go(-1)}>◀</button>
        <div className="flow-dots">
          {items.map((_, i) => (
            <div
              key={i}
              className={`flow-dot ${i === activeIdx ? 'active' : ''}`}
              onClick={() => go(offsetOf(i))}
            />
          ))}
        </div>
        <button className="btn sm" type="button" aria-label={t('g_next')} onClick={() => go(1)}>▶</button>
      </div>
    </div>
  );
}
