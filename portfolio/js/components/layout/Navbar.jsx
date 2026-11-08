function Navbar({ activeSection, setActiveSection, currentTheme, setCurrentTheme, showToast }) {
  const indicatorRef = useRef(null);
  const mascotRef = useRef(null);
  const linksContainerRef = useRef(null);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' }
  ];

  const themes = [
    { id: 'blue', color: '#3b82f6', label: 'Tema Biru' },
    { id: 'violet', color: '#8b5cf6', label: 'Tema Violet' },
    { id: 'emerald', color: '#10b981', label: 'Tema Emerald' },
    { id: 'amber', color: '#f59e0b', label: 'Tema Amber' },
    { id: 'rose', color: '#ec4899', label: 'Tema Rose' }
  ];

  useEffect(() => {
    if (!linksContainerRef.current) return;
    const activeLink = linksContainerRef.current.querySelector(`[data-id="${activeSection}"]`);
    if (activeLink && indicatorRef.current && mascotRef.current) {
      const left = activeLink.offsetLeft;
      const width = activeLink.offsetWidth;
      indicatorRef.current.style.left = `${left}px`;
      indicatorRef.current.style.width = `${width}px`;
      mascotRef.current.style.transform = `translateX(${left + width / 2 - 14}px)`;
    }
  }, [activeSection]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
  };

  return (
    <header className="header-bar" role="banner">
      <div className="nav-container">
        <nav className="nav-pill" id="desktopNav" aria-label="Navigasi Utama Desktop">
          <div className="mascot" id="mascot" ref={mascotRef} aria-hidden="true">
            <svg viewBox="0 0 32 40" fill="none">
              <circle cx="16" cy="16" r="14" fill="#ffffff" />
              <circle cx="11" cy="14" r="2.5" fill="#0f172a" />
              <circle cx="21" cy="14" r="2.5" fill="#0f172a" />
              <circle cx="12" cy="13" r="0.8" fill="#ffffff" />
              <circle cx="22" cy="13" r="0.8" fill="#ffffff" />
              <path d="M11 20C13 23 19 23 21 20" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
              <rect x="12" y="28" width="8" height="8" fill="#ffffff" transform="rotate(45 16 32)" />
            </svg>
          </div>

          <div className="nav-indicator" id="navIndicator" ref={indicatorRef}></div>

          <div className="nav-links" id="navLinks" ref={linksContainerRef}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-id={item.id}
                className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className="nav-actions">
        <div className="color-dots" title="Ubah tema aksen warna">
          {themes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              className={`color-dot ${currentTheme === theme.id ? 'active' : ''}`}
              style={{ background: theme.color }}
              aria-label={theme.label}
              onClick={() => handleThemeChange(theme.id)}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
