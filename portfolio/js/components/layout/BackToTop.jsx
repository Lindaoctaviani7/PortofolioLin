function BackToTop() {
  return (
    <button
      className="back-to-top show"
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ▲
    </button>
  );
}
