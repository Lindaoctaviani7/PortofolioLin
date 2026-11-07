function Timeline() {
  return (
    <div className="timeline-grid">
      <div className="timeline-box">
        <h3>Pendidikan</h3>
        <div className="timeline-items">
          {DATA.education.map((item, index) => (
            <div className="timeline-item" key={index}>
              <div className={`timeline-icon ${item.logo ? 'has-logo' : ''}`}>
                {item.logo ? (
                  <img src={item.logo} alt={item.t} className="timeline-logo-img" />
                ) : (
                  item.i
                )}
              </div>
              <div className="timeline-content">
                <b>{item.t}</b>
                <span>{item.s}</span>
                <em>{item.y}</em>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="timeline-box">
        <h3>Pengalaman</h3>
        <div className="timeline-items">
          {DATA.experience.map((item, index) => (
            <div className="timeline-item" key={index}>
              <div className={`timeline-icon ${item.logo ? 'has-logo' : ''}`}>
                {item.logo ? (
                  <img src={item.logo} alt={item.t} className="timeline-logo-img" />
                ) : (
                  item.i
                )}
              </div>
              <div className="timeline-content">
                <b>{item.t}</b>
                <span>{item.s}</span>
                <em>{item.y}</em>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
