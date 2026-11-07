function Toast({ toast }) {
  return (
    <div className={`toast ${toast.show ? 'show' : ''}`} role="status">
      <span>{toast.message}</span>
    </div>
  );
}
