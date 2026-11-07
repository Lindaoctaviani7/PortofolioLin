function Footer() {
  return (
    <footer>
      <div className="wrap">
        <p>© {new Date().getFullYear()} <strong>{DATA.name}</strong>. Dibuat dengan React &amp; dedikasi.</p>
      </div>
    </footer>
  );
}
