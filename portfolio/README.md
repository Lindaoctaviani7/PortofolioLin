## Struktur

```
portfolio
├── index.html                 # head + <link> CSS + urutan <script>
├── assets/logo/               # poltek.jpg, smago.png
├── css/                       # 01-variables ... 14-tech-book (urutan = cascade)
└── js/
    ├── core/react-hooks.js    # const { useState, useEffect, useRef, useCallback } = React
    ├── core/i18n.jsx          # kamus teks UI EN/ID, LangProvider, useLang(), useData()
    ├── data/                  # portfolioData.js (DATA, English), portfolioData.id.js (DATA_ID, terjemahan Indonesia), techSkills.jsx
    ├── utils/                 # stringToColor.js, socialIcons.jsx
    ├── components/
    │   ├── layout/            # StarfieldCanvas, Navbar, MobileDock, Footer, BackToTop, Toast
    │   └── sections/          # Hero, TechBook, About, Timeline, Stats, PortfolioTabs,
    │                          # CoverflowGallery, Contact, Guestbook
    ├── App.jsx
    └── main.jsx               # ReactDOM.createRoot(...).render(<App />)
```