function About({ showToast }) {
  const DATA = useData();
  const { t } = useLang();
  const avatarCardRef = useRef(null);
  const [photoFailed, setPhotoFailed] = useState(false);

  const handleDownloadCV = () => {
    if (DATA.resume && DATA.resume.trim() !== '') {
      window.open(DATA.resume, '_blank');
    } else {
      showToast(t('about_cv_toast'));
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
        <span className="section-tag">{t('about_tag')}</span>
        <h2>{t('about_hi')} <span className="gradient-text">{DATA.name}</span></h2>
        <p>{DATA.about}</p>

        <div className="btn-group">
          <button className="btn primary" type="button" onClick={handleDownloadCV}>
            {t('about_cv')}
          </button>
          <a className="btn" href="#portfolio" onClick={(e) => {
            e.preventDefault();
            document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            {t('about_exp')}
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
          {!photoFailed ? (
            <img
              className="avatar-photo"
              src="./assets/kegiatan/profile.jpeg"
              alt={t('about_photo', { name: DATA.name })}
              onError={() => setPhotoFailed(true)}
            />
          ) : (
            <div className="avatar-initial">{DATA.name[0]}</div>
          )}
          <div className="avatar-tag">
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
