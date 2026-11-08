// Logo teknologi tambahan khusus halaman detail proyek (tidak masuk ke buku Tech Stack).
// Kunci = nama teknologi dalam huruf kecil, sama dengan yang ditulis di daftar `s` tiap proyek.
const PROJECT_TECH_EXTRA = {
  'c++': {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M12 1.2l9.4 5.4v10.8L12 22.8l-9.4-5.4V6.6z" fill="#00599C" />
        <path d="M11.2 9.3a3.6 3.6 0 1 0 0 5.4" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M13.6 12h3.4M15.3 10.3v3.4M17.8 12h3.4M19.5 10.3v3.4" fill="none" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" transform="translate(-1.3 0)" />
      </svg>
    )
  },
  'c': {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M12 1.2l9.4 5.4v10.8L12 22.8l-9.4-5.4V6.6z" fill="#5C6BC0" />
        <path d="M15.2 8.9a4.4 4.4 0 1 0 0 6.2" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    )
  },
  'cmake': {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M12 1.5L2 22.5l10-6z" fill="#3FA33F" />
        <path d="M12 1.5l10 21-10-6z" fill="#D8362B" />
        <path d="M2 22.5l10-6 10 6z" fill="#1E6FC8" />
      </svg>
    )
  },
  'kotlin': {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <defs>
          <linearGradient id="pdKotlinGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#7F52FF" />
            <stop offset="0.5" stopColor="#C811E1" />
            <stop offset="1" stopColor="#F88909" />
          </linearGradient>
        </defs>
        <path d="M2 2h20L12 12l10 10H2z" fill="url(#pdKotlinGrad)" />
      </svg>
    )
  },
  'swift': {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <defs>
          <linearGradient id="pdSwiftGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FAA33D" />
            <stop offset="1" stopColor="#EF3C2D" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="22" height="22" rx="5.5" fill="url(#pdSwiftGrad)" />
        <path d="M17.4 16.3c1.6-3.6-.2-7.6-3.6-9.6 1.7 2 2.6 4.3 2.4 5.9-1.2-.9-4-3.3-6.4-5.1 1.5 2 3.6 4.8 5.1 6.2-2.1-1.2-4.9-3.4-6.8-5 1 1.7 3.2 4.4 5 5.7-2.5-.2-4.5-1.6-5.4-2.2.8 1.4 2.6 3.7 5.4 4.2 1.7.3 3.2 0 4.3-.9.7.4 1.4.7 2 .8z" fill="#fff" />
      </svg>
    )
  },
  'plpgsql': {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <circle cx="12" cy="12" r="11" fill="#336791" />
        <ellipse cx="8" cy="10.5" rx="3.6" ry="5" fill="#fff" opacity="0.95" />
        <ellipse cx="8.4" cy="10.5" rx="2.3" ry="3.6" fill="#336791" />
        <circle cx="14" cy="8.8" r="5.4" fill="#fff" />
        <path d="M16.8 11.5c1.8 1.7 2.6 4.3 1.6 7.3-.3.9-1.7.8-1.6-.2.1-1.6-.2-3.2-1.1-4.3" fill="#fff" />
        <circle cx="14.2" cy="8" r="1" fill="#336791" />
        <path d="M12.2 12.8c1.1.6 2.2.6 3.2 0" fill="none" stroke="#336791" strokeWidth="0.9" strokeLinecap="round" />
      </svg>
    )
  }
};
