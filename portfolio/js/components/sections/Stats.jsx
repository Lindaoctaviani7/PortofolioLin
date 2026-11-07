function Stats({ onSelectTab }) {
  const statsRef = useRef(null);
  const [counts, setCounts] = useState({ projects: 0, certificates: 0, awards: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();

        const duration = 1200;
        const startTime = performance.now();
        const targets = { projects: DATA.projects.length, certificates: DATA.certificates.length, awards: DATA.awards.length };

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setCounts({
            projects: Math.round(progress * targets.projects),
            certificates: Math.round(progress * targets.certificates),
            awards: Math.round(progress * targets.awards)
          });
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      });
    }, { threshold: 0.3 });

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCardClick = (key) => {
    onSelectTab(key);
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="stats-grid" id="stats" ref={statsRef}>
      <div className="stat-card" onClick={() => handleCardClick('projects')}>
        <strong>{counts.projects}</strong>
        <b>Proyek Selesai</b>
        <span>Solusi nyata yang telah dibuat</span>
      </div>
      <div className="stat-card" onClick={() => handleCardClick('certificates')}>
        <strong>{counts.certificates}</strong>
        <b>Sertifikasi</b>
        <span>Kompetensi terverifikasi</span>
      </div>
      <div className="stat-card" onClick={() => handleCardClick('awards')}>
        <strong>{counts.awards}</strong>
        <b>Penghargaan</b>
        <span>Pencapaian &amp; apresiasi</span>
      </div>
    </div>
  );
}
