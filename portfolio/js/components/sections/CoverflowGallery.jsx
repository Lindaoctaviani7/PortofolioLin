function CoverflowGallery() {
  const [flowIdx, setFlowIdx] = useState(2);
  const items = DATA.gallery;

  const nextSlide = () => setFlowIdx((prev) => (prev + 1) % items.length);
  const prevSlide = () => setFlowIdx((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className="gallery-section">

      <div className="flow-container">
        {items.map((item, i) => {
          const offset = i - flowIdx;
          const absOffset = Math.abs(offset);
          return (
            <div
              key={i}
              className="flow-slide"
              style={{
                background: `linear-gradient(145deg, ${item.gradient})`,
                transform: `translateX(${offset * 58}%) rotateY(${-offset * 26}deg) scale(${1 - absOffset * 0.12})`,
                opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.22,
                zIndex: 10 - absOffset
              }}
              onClick={() => setFlowIdx(i)}
            >
              <h4>{item.title}</h4>
              <span>{item.desc}</span>
            </div>
          );
        })}
      </div>

      <div className="flow-controls">
        <button className="btn sm" type="button" onClick={prevSlide}>◀</button>
        <div className="flow-dots">
          {items.map((_, i) => (
            <div
              key={i}
              className={`flow-dot ${i === flowIdx ? 'active' : ''}`}
              onClick={() => setFlowIdx(i)}
            />
          ))}
        </div>
        <button className="btn sm" type="button" onClick={nextSlide}>▶</button>
      </div>
    </div>
  );
}
