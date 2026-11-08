const DATA = {
  name: "Linda",
  fullName: "Linda Octaviani",
  roles: [
    "Front-End Developer",
    "UI/UX Designer",
    "Software Developer",
    "Creative Problem Solver"
  ],
  hero: "Sedang menempuh perjalanan di dunia Informatika, mengeksplorasi teknologi, dan mengembangkan ide melalui kode. Setiap proses membawa pengalaman baru, dan setiap karya menjadi bagian dari perjalanan saya.",
  about: "Sebagai mahasiswa Program Studi D4 Teknik Informatika, Jurusan Teknologi Informasi, Politeknik Negeri Malang, saya berfokus pada pengembangan teknologi yang aplikatif, inovatif, dan mampu memberikan solusi nyata melalui pengalaman digital yang menarik dan bermanfaat.",
  resume: "",
  socials: [
    { name: "GitHub", url: "github.com/Lindaoctaviani7", fullUrl: "https://github.com/Lindaoctaviani7", type: "github" },
    { name: "LinkedIn", url: "linkedin.com/in/linda-octaviani1", fullUrl: "https://www.linkedin.com/in/linda-octaviani-b22905313?utm_source=share_via&utm_content=profile&utm_medium=member_android123", type: "linkedin" },
    { name: "Instagram", url: "instagram.com/lindaoctavia._1", fullUrl: "https://www.instagram.com/lindaoctavia._?utm_source=qr&rpxt=ODg5ZTNlbjFobjR123", type: "instagram" }
  ],
  education: [
    {
      t: "Politeknik Negeri Malang",
      s: "D4 Teknik Informatika",
      y: "2024 – Sekarang",
      logo: "./assets/logo/poltek.jpg",
      i: "P"
    },
    {
      t: "SMA Negeri 1 Gondang",
      s: "Matematika dan Ilmu Pengetahuan Alam",
      y: "2021 – 2024",
      logo: "./assets/logo/smago.png",
      i: "S"
    }
  ],
  experience: [
    { t: "Staf Magang Liburan Semester", s: "Badan Pertanahan Nasional (BPN)", y: "Periodik Liburan", logo: "./assets/logo/bpn.jpg", i: "B" },
    { t: "UKM Olah Raga Politeknik Negeri Malang", s: "Anggota", y: "2025 – Sekarang", logo: "./assets/logo/olahraga.jpg", i: "O" },
    { t: "UKM Kerohanian Islam Politeknik Negeri Malang", s: "Anggota", y: "2025 – Sekarang", logo: "./assets/logo/rispol.jpg", i: "R" }
  ],
  projects: [
    {
      t: "Website Portal Magang",
      // Isi url dengan link GitHub / Figma proyek ini (kosong = tombol nonaktif)
      links: [{ type: "github", url: "" }, { type: "figma", url: "" }],
      img: "./assets/prototype/MagangMatch.png",
      r: "Front-End Developer • Semester 4",
      d: "Platform komprehensif untuk pencarian, pelamaran, dan manajemen informasi magang mahasiswa dengan antarmuka yang bersih dan terstruktur.",
      p: [
        "Menerjemahkan wireframe dan prototype Figma ke antarmuka web responsif berbasis HTML, CSS, JavaScript, dan framework PHP/Laravel.",
        "Mengintegrasikan UI dengan RESTful API backend dan database relasional MySQL.",
        "Mengoptimalkan layout agar nyaman diakses di smartphone, tablet, maupun layar desktop resolusi tinggi."
      ],
      s: ["HTML5", "CSS3", "JavaScript", "PHP", "Laravel", "MySQL", "Figma"]
    },
    {
      t: "Website Lab NCS",
      // Isi url dengan link GitHub / Figma proyek ini (kosong = tombol nonaktif)
      links: [{ type: "figma", url: "" }],
      img: "./assets/prototype/lab ncs.png",
      r: "Documenter & UI Designer • Semester 3",
      d: "Penyusunan blueprint dokumentasi teknis sistem dan perancangan awal antarmuka website laboratorium komputasi.",
      p: [
        "Menyusun dokumentasi arsitektur sistem, alur pengguna (user flow), dan spesifikasi teknis modul laboratorium.",
        "Membangun struktur informasi, wireframe low-fidelity, dan rancangan mockups antarmuka.",
        "Berkoordinasi aktif dengan rekan tim developer untuk memastikan hasil koding konsisten dengan desain."
      ],
      s: ["Figma", "Wireframing", "Notion", "Dokumentasi", "UI/UX"]
    },
    {
      t: "FinMind",
      // Isi url dengan link GitHub / Figma proyek ini (kosong = tombol nonaktif)
      links: [{ type: "figma", url: "" }],
      img: "./assets/prototype/FinMind.png",
      imgPos: "50% 46%", // bagian gambar yang tampil di kartu (logo FinMind ada di tengah)
      r: "Prototype Aplikasi Mobile",
      d: "Prototype aplikasi mobile FinMind dengan layar pembuka (onboarding) yang sederhana.",
      p: [
        "Merancang tampilan layar pembuka aplikasi lengkap dengan logo dan tombol Mulai.",
        "Menyusun antarmuka mobile yang bersih dan mudah dipahami."
      ],
      s: ["Mobile App", "UI/UX"]
    },
    {
      t: "PICO",
      // Isi url dengan link GitHub / Figma proyek ini (kosong = tombol nonaktif)
      links: [{ type: "figma", url: "" }],
      img: "./assets/prototype/pico.jpeg",
      r: "Prototype Game",
      d: "Prototype game PICO dengan menu utama bergaya kartun.",
      p: [
        "Merancang menu utama dengan pilihan Play, Settings, dan Quit.",
        "Menyusun tampilan antarmuka game yang berwarna dan mudah dikenali."
      ],
      s: ["Game", "UI Design"]
    }
  ],
  certificates: [
    { t: "NVIDIA - Building LLM Applications With Prompt Engineering", s: "Certificate of Competency • NVIDIA • November 2025", img: "./assets/sertifikat/nvidia.png" },
    { t: "Global Game Jam 2026 Malang", s: "Participant • Game development challenge 48 jam", img: "./assets/sertifikat/gjm.png" },
    { t: "Polinema Bridge Tournament 2026", s: "Panitia • UKM Olah Raga Politeknik Negeri Malang", img: "./assets/sertifikat/bridge.png" },
    { t: "Polinema Bridge Tournament 2025", s: "Panitia • UKM Olah Raga Politeknik Negeri Malang", img: "./assets/sertifikat/pbt.png" },
    { t: "Kejuaraan Nasional Catur Polinema Cup 2026", s: "Panitia • UKM Olah Raga Politeknik Negeri Malang • 18 April 2026", img: "./assets/sertifikat/catur26.png" },
    { t: "Kejuaraan Nasional Catur Polinema Cup 2025", s: "Panitia • UKM Olah Raga Politeknik Negeri Malang • Februari 2025", img: "./assets/sertifikat/catur25.png" },
    { t: "Workshop Tata Kelola Jaringan Sederhana dengan Mikrotik", s: "Peserta • Play IT, Jurusan Teknologi Informasi Polinema • 22-23 Juni 2026", img: "./assets/sertifikat/mikrotik.png" },
    { t: "Prastudi Mahasiswa Baru Teknologi Informasi 2025", s: "Panitia • HMTI Politeknik Negeri Malang • 18-23 Agustus 2025", img: "./assets/sertifikat/prastud.png" },
    { t: "Firma Ceria 2025 - From Lost to Led", s: "Panitia • UKM Kerohanian Islam Politeknik (RISPOL) • 16 November 2025", img: "./assets/sertifikat/firce.png" },
    { t: "Mentoring MENYALA - Rukun Islam di Era Digitalisasi", s: "Panitia Closing Mentoring • UKM RISPOL • 20-21 September 2025", img: "./assets/sertifikat/mentoring.png" },
    { t: "Dasar Pemrograman Web", s: "Dicoding Academy • Menguasai semantik HTML5, CSS3 Grid/Flexbox, dan JavaScript ES6" },
    { t: "Belajar Membuat Aplikasi Flutter untuk Pemula", s: "Dicoding Academy • Fondasi arsitektur widget, state management dasar, dan layouting mobile" }
  ],
  awards: [
    { t: "Top PBL Project Showcase", s: "Apresiasi proyek terbaik dalam pameran Project-Based Learning tingkat program studi" }
  ],
  stack: [
    ["Bahasa Pemrograman", [
      { name: "HTML5", isLearning: false },
      { name: "CSS3", isLearning: false },
      { name: "JavaScript", isLearning: false },
      { name: "PHP", isLearning: false },
      { name: "Java", isLearning: false },
      { name: "Python", isLearning: false },
      { name: "Dart", isLearning: true }
    ]],
    ["Framework & Library", [
      { name: "Laravel", isLearning: false },
      { name: "Bootstrap / Tailwind", isLearning: false },
      { name: "Flutter", isLearning: true }
    ]],
    ["UI/UX & Desain Grafis", [
      { name: "Figma", isLearning: false },
      { name: "Canva", isLearning: false },
      { name: "Wireframing", isLearning: false },
      { name: "Interactive Prototyping", isLearning: false },
      { name: "Design Systems", isLearning: false }
    ]],
    ["Database & Tools Pengembang", [
      { name: "MySQL", isLearning: false },
      { name: "Laragon / XAMPP", isLearning: false },
      { name: "VS Code", isLearning: false },
      { name: "Git & GitHub", isLearning: false },
      { name: "Notion", isLearning: false }
    ]],
    ["Soft Skills & Kolaborasi", [
      { name: "Kemampuan Belajar Cepat", isLearning: false },
      { name: "Dokumentasi Sistem", isLearning: false },
      { name: "Kerja Sama Tim Agile", isLearning: false },
      { name: "Komunikasi Efektif", isLearning: false }
    ]]
  ],
  gallery: [
    { title: "Magang di BPN", desc: "Kebersamaan bersama tim di sela magang", img: "./assets/kegiatan/bpn.jpeg", gradient: "#065f46, #06241b" },
    { title: "Upacara 17 Agustus di BPN", desc: "Merayakan hari kemerdekaan bersama keluarga besar BPN", img: "./assets/kegiatan/17 bpn.jpeg", gradient: "#9a3412, #2e1106" },
    { title: "Kerja Tim PBL Semester 3", desc: "Demo proyek bersama tim Teknologi Informasi", img: "./assets/kegiatan/pbl sem 3.jpeg", gradient: "#581c87, #1e1035" },
    { title: "Global Game Jam 2026", desc: "Game jam 48 jam bersama tim", img: "./assets/kegiatan/gjm.jpeg", gradient: "#1e3a8a, #0f172a" },
    { title: "Polinema Bridge Tournament", desc: "Bersama panitia dan para juara", img: "./assets/kegiatan/bridge.jpeg", imgPos: "center 30%", gradient: "#831843, #2c0717" }
  ],
  playlist: [
    { title: "Deep Focus", artist: "Lo-fi Beats", color: "#3b82f6", duration: "02:45" },
    { title: "Late Night Code", artist: "Synthwave Chill", color: "#8b5cf6", duration: "03:12" },
    { title: "Figma Flow", artist: "Calm Piano Study", color: "#10b981", duration: "02:50" },
    { title: "Morning Sprint", artist: "Acoustic Energy", color: "#f59e0b", duration: "03:30" }
  ],
  initialComments: [
    { author: "Rani Maharani", message: "Tampilannya sangat rapi, transisinya halus dan enak banget dilihat! Semangat terus kuliahnya!", date: "2026-10-24", likes: 4 },
    { author: "Dimas Aryo", message: "Portofolio yang informatif dan estetik. Integrasi playlist-nya keren banget!", date: "2026-10-22", likes: 7 }
  ]
};
