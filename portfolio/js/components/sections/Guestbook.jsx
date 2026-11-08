function Guestbook({ showToast }) {
  const DATA = useData();
  const { t } = useLang();
  const [comments, setComments] = useState([]);
  const [authorName, setAuthorName] = useState('');
  const [message, setMessage] = useState('');
  const [likedMap, setLikedMap] = useState({});

  useEffect(() => {
    try {
      const local = JSON.parse(localStorage.getItem('bubu_guestbook_comments') || '[]');
      if (Array.isArray(local) && local.length > 0) {
        setComments([...local, ...DATA.initialComments]);
      } else {
        setComments([...DATA.initialComments]);
      }
    } catch {
      setComments([...DATA.initialComments]);
    }
  }, []);

  const handleLike = (index) => {
    setComments((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = { ...updated[index], likes: (updated[index].likes || 0) + 1 };
      }
      return updated;
    });
    setLikedMap((prev) => ({ ...prev, [index]: true }));
    showToast(t('gb_like_toast'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    const newComment = {
      author: authorName.trim(),
      message: message.trim(),
      date: new Date().toISOString().slice(0, 10),
      likes: 1
    };

    setComments((prev) => [newComment, ...prev]);
    try {
      const local = JSON.parse(localStorage.getItem('bubu_guestbook_comments') || '[]');
      localStorage.setItem('bubu_guestbook_comments', JSON.stringify([newComment, ...local]));
    } catch { }

    setAuthorName('');
    setMessage('');
    showToast(t('gb_posted_toast'));
  };

  return (
    <div className="panel-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3>{t('gb_title')}</h3>
        <span className="chip">{t('gb_count', { n: comments.length })}</span>
      </div>
      <p className="sub">{t('gb_sub')}</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder={t('gb_name_ph')}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('gb_msg_ph')}
            style={{ minHeight: '90px' }}
            required
          />
        </div>
        <button className="btn" style={{ width: '100%' }} type="submit">
          {t('gb_send')}
        </button>
      </form>

      <div className="comments-list">
        {comments.map((comment, idx) => {
          const avatarColor = stringToColor(comment.author);
          const isLiked = !!likedMap[idx];
          return (
            <div className="comment-card" key={idx}>
              <div className="comment-avatar" style={{ background: avatarColor }}>
                {(comment.author[0] || 'U').toUpperCase()}
              </div>
              <div className="comment-body">
                <div className="comment-top">
                  <b>{comment.author}</b>
                  <time>{comment.date}</time>
                </div>
                <p className="comment-text">{comment.message}</p>
                <button
                  className={`comment-like ${isLiked ? 'liked' : ''}`}
                  type="button"
                  onClick={() => handleLike(idx)}
                >
                  ❤️ <span>{comment.likes || 0}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
