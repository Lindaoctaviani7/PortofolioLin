function Contact({ showToast }) {
  const DATA = useData();
  const { t } = useLang();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent(t('c_subject', { name }));
    const body = encodeURIComponent(`${message}\n\n---\n${t('c_sender')}: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:${DATA.email}?subject=${subject}&body=${body}`;
    showToast(t('c_toast'));
  };

  return (
    <div className="panel-card">
      <h3>{t('c_title')}</h3>
      <p className="sub">{t('c_sub')}</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('c_name')}</label>
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={t('c_name_ph')}
            required
          />
        </div>
        <div className="form-group">
          <label>{t('c_email')}</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="nama@email.com"
            required
          />
        </div>
        <div className="form-group">
          <label>{t('c_msg')}</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder={t('c_msg_ph')}
            required
          />
        </div>
        <button className="btn primary" style={{ width: '100%' }} type="submit">
          {t('c_send')}
        </button>
      </form>

      <h4 style={{ margin: '28px 0 12px', fontSize: '1.1rem', color: '#fff' }}>{t('c_social')}</h4>
      <div className="social-grid">
        {DATA.socials.map((social) => (
          <a key={social.name} href={social.fullUrl} target="_blank" rel="noopener noreferrer" className="social-item">
            <div className="timeline-icon" style={{ width: '38px', height: '38px' }}>
              {getSocialIcon(social.type, social.name, 18)}
            </div>
            <div>
              <b>{social.name}</b>
              <small>{social.url}</small>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
