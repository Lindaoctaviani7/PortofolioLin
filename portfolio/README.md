# portfolio-react-preview

Versi standalone (React 18 + Babel via CDN, tanpa npm/Vite), dipecah dari satu file HTML.

## Struktur

```
portfolio-react-preview/
├── index.html                 # head + <link> CSS + urutan <script>
├── assets/logo/               # poltek.jpg, smago.png
├── css/                       # 01-variables ... 14-tech-book (urutan = cascade)
└── js/
    ├── core/react-hooks.js    # const { useState, useEffect, useRef, useCallback } = React
    ├── data/                  # portfolioData.js (DATA), techSkills.jsx (TECH_SKILLS)
    ├── utils/                 # stringToColor.js, socialIcons.jsx
    ├── components/
    │   ├── layout/            # StarfieldCanvas, Navbar, MobileDock, Footer, BackToTop, Toast
    │   └── sections/          # Hero, TechBook, About, Timeline, Stats, PortfolioTabs,
    │                          # CoverflowGallery, Contact, Guestbook
    ├── App.jsx
    └── main.jsx               # ReactDOM.createRoot(...).render(<App />)
```

## Menjalankan

Browser memblokir pemuatan file `.jsx` lewat `file://`, jadi jalankan lewat server lokal:

- Laragon/XAMPP: taruh foldernya di `www`/`htdocs`, buka `http://localhost/portfolio-react-preview/`
- atau: `python -m http.server 8000` / `npx serve` di dalam folder ini

Urutan `<script>` di `index.html` jangan diubah (data/util -> komponen -> App -> main).
