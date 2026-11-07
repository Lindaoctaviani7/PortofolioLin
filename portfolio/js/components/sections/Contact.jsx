function Contact({ showToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent(`Pesan Portofolio dari ${name}`);
    const body = encodeURIComponent(`${message}\n\n---\nPengirim: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:${DATA.email}?subject=${subject}&body=${body}`;
    showToast('Membuka aplikasi email Anda...');
  };

  return (
    <div className="panel-card">
      <h3>Kirim Pesan Langsung</h3>
      <p className="sub">Pesan akan langsung diarahkan ke email pribadi saya.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nama Lengkap</label>
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Contoh: Budi Pratama"
            required
          />
        </div>
        <div className="form-group">
          <label>Alamat Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="nama@email.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Pesan Anda</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Halo Bubu, saya tertarik mendiskusikan proyek..."
            required
          />
        </div>
        <button className="btn primary" style={{ width: '100%' }} type="submit">
          Kirim Pesan via Email
        </button>
      </form>

      <h4 style={{ margin: '28px 0 12px', fontSize: '1.1rem', color: '#fff' }}>Jejaring Sosial</h4>
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
