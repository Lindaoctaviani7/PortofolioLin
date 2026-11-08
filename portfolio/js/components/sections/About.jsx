function About({ showToast }) {
  const avatarCardRef = useRef(null);

  const handleDownloadCV = () => {
    if (DATA.resume && DATA.resume.trim() !== '') {
      window.open(DATA.resume, '_blank');
    } else {
      showToast('Tambahkan link file CV Anda pada portfolioData.resume');
    }
  };

  const handleMouseMove = (e) => {
    const card = avatarCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / rect.height) * 18;
    const rotY = (x / rect.width) * 18;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (avatarCardRef.current) {
      avatarCardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
  };

  return (
    <div className="about-hero">
      <div className="about-text">
        <span className="section-tag">Tentang Saya</span>
        <h2>Hai, perkenalkan saya <span className="gradient-text">{DATA.name}</span></h2>
        <p>{DATA.about}</p>

        <div className="btn-group">
          <button className="btn primary" type="button" onClick={handleDownloadCV}>
            View CV
          </button>
          <a className="btn" href="#portfolio" onClick={(e) => {
            e.preventDefault();
            document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            View Experience
          </a>
        </div>
      </div>

      <div className="avatar-showcase">
        <div
          className="avatar-card"
          ref={avatarCardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="avatar-initial">{DATA.name[0]}</div>
          <div className="avatar-tag">
            <span className="status-pulse"></span>
            <span>Front-End Dev &amp; UI/UX</span>
          </div>
        </div>

        <div className="float-badge f1">Laravel &amp; PHP</div>
        <div className="float-badge f2">Figma UI/UX</div>
        <div className="float-badge f3">Flutter &amp; Dart</div>
      </div>
    </div>
  );
}
