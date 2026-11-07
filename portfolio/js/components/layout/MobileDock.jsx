function MobileDock({ activeSection, setActiveSection }) {
  const dockItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portofolio' },
    { id: 'contact', label: 'Kontak' }
  ];

  const handleDockClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="mobile-dock" aria-label="Navigasi Mobile">
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
