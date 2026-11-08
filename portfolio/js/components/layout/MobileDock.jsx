function MobileDock({ activeSection, setActiveSection }) {
  const { t } = useLang();
  const dockItems = [
    { id: 'home', label: t('nav_home') },
    { id: 'about', label: t('nav_about') },
    { id: 'portfolio', label: t('nav_portfolio') },
    { id: 'contact', label: t('nav_contact') }
  ];

  const handleDockClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="mobile-dock" aria-label={t('dock_aria')}>
      {dockItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`dock-item ${activeSection === item.id ? 'active' : ''}`}
          onClick={(e) => handleDockClick(e, item.id)}
        >
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
