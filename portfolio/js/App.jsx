function App() {
  const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('bubu_portfolio_theme') || 'blue');
  const [activeSection, setActiveSection] = useState('home');
  const [activePortfolioTab, setActivePortfolioTab] = useState('projects');
  const [detail, setDetail] = useState(null); // { key, idx } item yang dibuka di halaman detail
  const [toast, setToast] = useState({ show: false, message: '' });
  const toastTimeoutRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('bubu_portfolio_theme', currentTheme);
  }, [currentTheme]);

  const showToast = useCallback((message) => {
    setToast({ show: true, message });
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToast({ show: false, message: '' }), 2800);
  }, []);

  useEffect(() => {
    const sections = ['home', 'about', 'portfolio', 'contact'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-35% 0px -45% 0px' });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleExplore = () => {
    setActivePortfolioTab('projects');
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <React.Fragment>
      <StarfieldCanvas />
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        showToast={showToast}
      />
      <MobileDock activeSection={activeSection} setActiveSection={setActiveSection} />

      <main>
        <section className="hero-section" id="home">
          <div className="wrap">
            <div className="hero-grid">
              <Hero onExploreProjects={handleExplore} />
              <TechBook showToast={showToast} />
            </div>
          </div>
        </section>

        <section id="about">
          <div className="wrap">
            <About showToast={showToast} />
            <Timeline />
            <Stats onSelectItem={(key, idx) => setDetail({ key, idx })} />
          </div>
        </section>

        <section id="portfolio">
          <div className="wrap">
            <div className="center">
              <h2 className="section-title">Portofolio</h2>
            </div>
            <PortfolioTabs activeTab={activePortfolioTab} setActiveTab={setActivePortfolioTab} onOpenDetail={(key, idx) => setDetail({ key, idx })} />
            <CoverflowGallery />
          </div>
        </section>

      </main>

      <Footer />

      <BackToTop />

      <Toast toast={toast} />
      <ProjectDetail detail={detail} onClose={() => setDetail(null)} />
    </React.Fragment>
  );
}
