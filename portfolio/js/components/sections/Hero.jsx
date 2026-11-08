function Hero({ onExploreProjects }) {
  const DATA = useData();
  const { lang, t } = useLang();
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Ganti bahasa: ulangi animasi ketik dari awal agar tidak tersangkut di indeks lama
  useEffect(() => {
    setCharIndex(0);
    setIsDeleting(false);
    setTypedText('');
  }, [lang]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setTypedText(DATA.roles[0]);
      return;
    }

    const currentWord = DATA.roles[roleIndex];
    let speed = isDeleting ? 30 : 65;
    if (!isDeleting && charIndex === currentWord.length) speed = 2200;
    else if (isDeleting && charIndex === 0) speed = 350;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentWord.length) {
        setTypedText(currentWord.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (!isDeleting && charIndex === currentWord.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex > 0) {
        setTypedText(currentWord.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % DATA.roles.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, DATA]);

  return (
    <div className="hero-content">
      <h1>
        <span className="theme-text">{t('hero_welcome')}</span><br />
        <span className="hero-subtext">{t('hero_sub')}</span>
      </h1>

      <div className="typed-wrapper">
        <span>{typedText}</span>
        <span className="caret" aria-hidden="true"></span>
      </div>

      <p className="hero-lead">{DATA.hero}</p>

      <div className="btn-group">
        <button className="btn primary" type="button" onClick={onExploreProjects}>
          {t('hero_explore')}
        </button>
        <a className="btn" href="#contact" onClick={(e) => {
          e.preventDefault();
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          {t('hero_contact')}
        </a>
      </div>

      <div className="social-strip">
        <span className="label">{t('hero_find')}</span>
        <div className="social-links">
          {DATA.socials.map((social) => (
            <a
              key={social.name}
              href={social.fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-chip"
              title={social.name}
            >
              {getSocialIcon(social.type, social.name, 15)}
              <span>{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
