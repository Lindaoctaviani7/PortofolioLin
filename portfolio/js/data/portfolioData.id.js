// Terjemahan Bahasa Indonesia untuk konten portofolio (DATA di portfolioData.js berbahasa Inggris).
// Item array digabung berdasarkan urutan indeks; field yang tidak ditulis di sini memakai nilai aslinya.
const DATA_ID = {
  roles: [
    "Mahasiswa Teknik Informatika",
    "Web Developer",
    "Mobile Developer",
    "Junior Developer",
    "Terbuka untuk Magang"
  ],
  hero: "Saya berfokus pada pengembangan aplikasi web dan mobile, pengolahan data, serta penerapan machine learning melalui proyek akademik. Dengan semangat belajar dan berkembang yang tinggi, saat ini saya mencari kesempatan magang di bidang pengembangan perangkat lunak.",
  about: "Saya adalah mahasiswa Teknik Informatika di Politeknik Negeri Malang dengan minat besar pada pengembangan perangkat lunak. Saya terus mengasah kemampuan melalui proyek akademik dan eksplorasi mandiri, sambil mendokumentasikan karya dan proyek saya di GitHub. Dengan Laravel, Flutter, dan Python, saya membangun aplikasi web dan mobile serta berupaya menciptakan solusi teknologi yang fungsional, efisien, dan sesuai kebutuhan pengguna.",
  education: [
    { t: "Politeknik Negeri Malang", s: "D4 Teknik Informatika", y: "2024 – Sekarang" },
    { t: "SMA Negeri 1 Gondang", s: "Matematika dan Ilmu Pengetahuan Alam (MIPA)", y: "2021 – 2024" }
  ],
  experience: [
    { t: "Staf Magang Libur Semester", s: "Kementerian Agraria dan Tata Ruang/Badan Pertanahan Nasional (ATR/BPN)", y: "periode libur semester" },
    { t: "Unit Kegiatan Mahasiswa (UKM) Olahraga Politeknik Negeri Malang", s: "Anggota", y: "2025 – Sekarang" },
    { t: "Unit Kegiatan Mahasiswa (UKM) Kerohanian Islam Politeknik Negeri Malang", s: "Anggota", y: "2025 – Sekarang" }
  ],
  projects: [
    {
      r: "Front-End Developer & Dokumentator • Semester 4",
      d: "MagangMatch adalah sistem informasi berbasis web yang dikembangkan untuk Jurusan Teknologi Informasi Politeknik Negeri Malang guna mempermudah proses penempatan magang mahasiswa secara digital, terstruktur, dan transparan. Sistem ini menggunakan metode Simple Additive Weighting (SAW) untuk menghasilkan rekomendasi magang yang disesuaikan dengan profil, prestasi akademik, dan keterampilan setiap mahasiswa. Selain memberikan rekomendasi, MagangMatch mendukung pengelolaan kegiatan magang secara menyeluruh, mulai dari pengajuan lamaran dan proses persetujuan berjenjang hingga pencatatan logbook harian digital dan penyediaan dasbor pemantauan. Sistem dapat diakses kapan saja dan di mana saja melalui peramban web di komputer, laptop, tablet, maupun ponsel dengan koneksi internet.",
      p: ["Kontribusi:",
        "Menyusun dan memelihara dokumentasi proyek, meliputi kebutuhan sistem, alur kerja sistem, spesifikasi teknis, dan dokumentasi terkait proyek.",
        "Mengimplementasikan antarmuka aplikasi web yang responsif berdasarkan wireframe dan prototipe Figma menggunakan PHP dan Laravel, dengan MySQL sebagai basis data.",
        "Mengembangkan dan mengimplementasikan komponen front-end agar tata letak konsisten, navigasi intuitif, dan pengalaman pengguna mulus.",
        "Mengoptimalkan tata letak responsif agar antarmuka konsisten dan mudah diakses di ponsel, tablet, dan perangkat desktop.",
        "Berkolaborasi dalam mengintegrasikan antarmuka front-end dengan fungsionalitas back-end untuk mendukung fitur-fitur sistem."
      ]
    },
    {
      r: "Dokumentator & UI/UX Designer • Semester 3",
      d: "Website Profil Laboratorium Network and Cyber Security (NCS) Politeknik Negeri Malang berfungsi sebagai platform publikasi resmi untuk membagikan informasi tentang kegiatan pembelajaran, penelitian, praktik keamanan jaringan, pelatihan, workshop, dan kompetisi. Website ini memuat informasi tentang laboratorium, termasuk profil, visi dan misi, struktur organisasi, dokumentasi kegiatan, arsip digital, layanan, serta tautan pendukung. Website ini dilengkapi Content Management System (CMS) berbasis PHP Native sehingga admin laboratorium dapat mengelola konten secara mandiri dan sistematis.",
      p: ["Kontribusi:",
        "Menyusun dokumentasi sistem yang mencakup arsitektur sistem, alur pengguna, dan spesifikasi teknis untuk setiap modul laboratorium.",
        "Merancang arsitektur informasi, wireframe low-fidelity, dan mockup antarmuka untuk menciptakan pengalaman pengguna yang intuitif.",
        "Berkolaborasi dengan tim pengembang agar antarmuka yang diimplementasikan sesuai dengan desain dan spesifikasi yang telah disetujui."
      ]
    },
    {
      r: "Aplikasi Mobile",
      d: "FinMind dirancang sebagai aplikasi yang membantu mahasiswa mengelola keuangan pribadi melalui pencatatan transaksi dan analisis data keuangan.",
      p: ["Kontribusi:",
        "Melakukan pengujian fungsional untuk memverifikasi fitur aplikasi, menemukan bug, dan memastikan aplikasi berjalan sesuai harapan.",
        "Mengoordinasikan integrasi aplikasi dan proses rilis, memastikan seluruh komponen berfungsi dengan baik sebelum deployment.",
        "Membantu proses pengembangan front-end dengan mengimplementasikan dan menyempurnakan komponen antarmuka pengguna."
      ]
    },
    {
      r: "Game",
      d: "PICO adalah game edukasi berbasis web yang memadukan genre Puzzle 2D dan Simulasi, di mana pemain mengumpulkan elektron, membuat unsur kimia berdasarkan prinsip Aufbau, lalu menggabungkannya untuk menghasilkan berbagai benda sehari-hari.",
      p: ["Kontribusi:",
        "Merancang menu utama dengan opsi Play, Settings, dan Quit."
      ]
    }
  ],
  certificates: [
    { s: "Sertifikat Kompetensi • NVIDIA" },
    { s: "Peserta • Tantangan Pengembangan Game 48 Jam" },
    { s: "Panitia • Unit Kegiatan Mahasiswa Olahraga, Politeknik Negeri Malang" },
    { s: "Panitia • Unit Kegiatan Mahasiswa Olahraga, Politeknik Negeri Malang" },
    { s: "Panitia • Unit Kegiatan Mahasiswa Olahraga, Politeknik Negeri Malang" },
    { s: "Panitia • Unit Kegiatan Mahasiswa Olahraga, Politeknik Negeri Malang" },
    { t: "Workshop Dasar Manajemen Jaringan Menggunakan MikroTik", s: "Peserta • Play IT, Jurusan Teknologi Informasi, Politeknik Negeri Malang" },
    { t: "Orientasi Mahasiswa Baru Teknologi Informasi 2025", s: "Panitia • Himpunan Mahasiswa Teknologi Informasi (HMTI), Politeknik Negeri Malang" },
    { s: "Panitia • Unit Kegiatan Mahasiswa Kerohanian Islam, Politeknik Negeri Malang" },
    { t: "Mentoring MENYALA - Pilar Islam di Era Digital", s: "Panitia Penutupan Mentoring • Unit Kegiatan Mahasiswa Kerohanian Islam, Politeknik Negeri Malang" }
  ],
  gallery: [
    { title: "Magang di BPN", desc: "Berbagi momen berkesan bersama tim selama masa magang" },
    { title: "Perayaan Hari Kemerdekaan di BPN", desc: "Merayakan Hari Kemerdekaan Indonesia bersama tim BPN" },
    { title: "Kerja Tim PBL Semester 3", desc: "Mempresentasikan proyek bersama tim" },
    { title: "Global Game Jam 2026", desc: "Tantangan pengembangan game 48 jam bersama tim" },
    {}
  ],
  stackTitles: {
    "Programming Languages": "Bahasa Pemrograman",
    "Framework & Library": "Framework & Library",
    "UI/UX & Graphic Design": "UI/UX & Desain Grafis",
    "Database & Developer Tools": "Basis Data & Alat Pengembang",
    "Soft Skills & Collaboration": "Soft Skills & Kolaborasi"
  },
  skills: {
    "Wireframing": "Wireframing",
    "Problem Solving": "Pemecahan Masalah",
    "Teamwork": "Kerja Tim",
    "Communication": "Komunikasi",
    "Critical Thinking": "Berpikir Kritis",
    "Adaptability": "Adaptabilitas",
    "Time Management": "Manajemen Waktu",
    "Collaboration": "Kolaborasi",
    "Project Management": "Manajemen Proyek",
    "Organizational Skills": "Keterampilan Organisasi"
  }
};
