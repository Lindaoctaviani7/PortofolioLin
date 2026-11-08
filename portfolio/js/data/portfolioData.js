const DATA = {
  name: "Linda Octaviani",
  fullName: "Linda Octaviani",
  roles: [
    "Informatics Engineering Student",
    "Web Developer",
    "Mobile Developer",
    "Junior Developer",
    "Open for Internship"
  ],
  hero: "I focus on web and mobile application development, data processing, and applying machine learning through academic projects. With a strong passion for continuous learning and growth, I am currently seeking internship opportunities in software development.",
  about: "I am an Informatics Engineering student at State Polytechnic of Malang with a strong passion for software development. I continuously enhance my skills through academic projects and independent exploration, while documenting my work and projects on GitHub. Using Laravel, Flutter, and Python, I develop web and mobile applications and strive to create technology solutions that are functional, efficient, and aligned with user needs.",
  resume: "",
  socials: [
    { name: "GitHub", url: "github.com/Lindaoctaviani7", fullUrl: "https://github.com/Lindaoctaviani7", type: "github" },
    { name: "LinkedIn", url: "linkedin.com/in/linda-octaviani", fullUrl: "https://www.linkedin.com/in/linda-octaviani-b22905313?utm_source=share_via&utm_content=profile&utm_medium=member_android", type: "linkedin" },
    { name: "Instagram", url: "instagram.com/lindaoctavia._", fullUrl: "https://www.instagram.com/lindaoctavia._?utm_source=qr&rpxt=ODg5ZTNlbjFobjR1", type: "instagram" }
  ],
  education: [
    {
      t: "State Polytechnic of Malang",
      s: "D4 Informatics Engineering",
      y: "2024 – Present",
      logo: "./assets/logo/poltek.jpg",
      i: "P"
    },
    {
      t: "State Senior High School 1 Gondang",
      s: "Mathematics and Natural Sciences",
      y: "2021 – 2024",
      logo: "./assets/logo/smago.png",
      i: "S"
    }
  ],
  experience: [
    { t: "Semester Break Internship Staff", s: "Ministry of Agrarian Affairs and Spatial Planning/National Land Agency (ATR/BPN)", y: "semester break period", logo: "./assets/logo/bpn.jpg", i: "B" },
    { t: "Sports Student Activity Unit (UKM) State Polytechnic of Malang", s: "Member", y: "2025 – Present", logo: "./assets/logo/olahraga.jpg", i: "O" },
    { t: "Islamic Religious Student Activity Unit State Polytechnic of Malang", s: "Member", y: "2025 – Present", logo: "./assets/logo/rispol.jpg", i: "R" }
  ],
  projects: [
    {
      t: "Website SiMagang JTI",
      // Isi url dengan link GitHub / Figma proyek ini (kosong = memakai tautan bawaan: profil GitHub / figma.com)
      links: [{ type: "github", url: "https://github.com/ibnuzzi/PBL_Magang.git" }, { type: "figma", url: "https://www.figma.com/design/sh8hVmTDgyzSC3xsQZB5AG/MagangMatch-SiMagang-JTI?node-id=0-1&t=Yt0AVqHZevlG7uTE-1" }],
      img: "./assets/prototype/MagangMatch.png",
      r: "Front-End Developer & Documenter • Semester 4",
      d: "MagangMatch is a web-based information system developed for the Department of Information Technology at the State Polytechnic of Malang to facilitate the student internship placement process in a digital, structured, and transparent manner. The system employs the Simple Additive Weighting (SAW) method to generate internship recommendations tailored to each student's profile, academic achievements, and skills. Beyond providing recommendations, MagangMatch supports the comprehensive management of internship activities, ranging from application submissions and multi-level approval processes to the maintenance of daily digital logbooks and the provision of a monitoring dashboard. The system is accessible anytime and anywhere via a web browser on computers, laptops, tablets, or mobile phones with an internet connection.",
      p: ["Contributions:",
        "Prepared and maintained project documentation, including system requirements, system workflows, technical specifications, and project-related documentation.",
        "Implemented responsive web application interfaces based on Figma wireframes and prototypes using PHP and Laravel, with MySQL as the database.",
        "Developed and implemented frontend components to ensure consistent layouts, intuitive navigation, and a seamless user experience.",
        "Optimized responsive layouts to provide a consistent and accessible interface across smartphones, tablets, and desktop devices.",
        "Collaborated in integrating frontend interfaces with backend functionality to support the system's features."
      ],
      s: ["PHP", "Laravel", "MySQL", "GitHub", "Figma", "Canva"]
    },
    {
      t: "Website Lab NCS",
      // Isi url dengan link GitHub / Figma proyek ini (kosong = memakai tautan bawaan: profil GitHub / figma.com)
      links: [{ type: "github", url: "https://github.com/ibnuzzi/PBL_LAB_NCS_TI-2A.git" }, { type: "figma", url: "https://www.figma.com/design/pWacbfr75yFBlwqtap35Uz/LAB-NCS?t=QwUVMlvBMDCiiTCK-1" }],
      img: "./assets/prototype/lab ncs.png",
      r: "Documenter & UI/UX Designer • Semester 3",
      d: "The Network and Cyber Security (NCS) Laboratory Profile Website at State Polytechnic of Malang serves as an official publication platform for sharing information about learning activities, research, network security practices, training, workshops, and competitions. The website provides information about the laboratory, including its profile, vision and mission, organizational structure, activity documentation, digital archives, services, and supporting links. It is equipped with a PHP Native-based Content Management System (CMS), allowing laboratory administrators to manage content independently and systematically.",
      p: ["Contributions:",
        "Prepared system documentation covering the system architecture, user flows, and technical specifications for each laboratory module.",
        "Designed the information architecture, low-fidelity wireframes, and interface mockups to create an intuitive user experience.",
        "Collaborated with the development team to ensure the implemented interfaces aligned with the approved designs and specifications."
      ],
      s: ["PHP", "CSS", "PLpgSQL", "JavaScript", "GitHub", "Figma", "Canva"]
    },
    {
      t: "FinMind",
      // Isi url dengan link GitHub / Figma proyek ini (kosong = memakai tautan bawaan: profil GitHub / figma.com)
      links: [{ type: "github", url: "https://github.com/rahmanlana26/PBL_FINMIND.git" }, { type: "figma", url: "https://www.figma.com/design/qQFMV4kjZNhQy0U2dyPqBG/FinMind?t=QwUVMlvBMDCiiTCK-1" }],
      img: "./assets/prototype/FinMind.png",
      imgPos: "50% 46%", // bagian gambar yang tampil di kartu (logo FinMind ada di tengah)
      r: "Mobile Application",
      d: "FinMind is designed as an application that helps students manage their personal finances through transaction tracking and financial data analysis.",
      p: ["Contributions:",
        "Performed functional testing to verify application features, identify bugs, and ensure the application worked as expected.",
        "Coordinated application integration and release processes, ensuring all components functioned properly before deployment.",
        "Assisted the frontend development process by helping implement and refine user interface components."
      ],
      s: ["Dart", "Python", "C++", "CMake", "HTML", "Swift", "C", "Kotlin", "Figma", "GitHub", "Canva"]
    },
    {
      t: "PICO",
      // Isi url dengan link GitHub / Figma proyek ini (kosong = memakai tautan bawaan: profil GitHub / figma.com)
      links: [],
      img: "./assets/prototype/pico.jpeg",
      r: "Game",
      d: "PICO is a web-based educational game combining 2D Puzzle and Simulation genres, where players collect electrons, create chemical elements based on the Aufbau principle, and combine them to produce various everyday objects.",
      p: ["Contributions:",
        "Designing the main menu with Play, Settings, and Quit options.",
      ],
      s: ["Game", "UI Design"]
    }
  ],
 certificates: [
  { t: "NVIDIA - Building LLM Applications With Prompt Engineering", s: "Certificate of Competency • NVIDIA", img: "./assets/sertifikat/nvidia.png" },
  { t: "Global Game Jam 2026 Malang", s: "Participant • 48-Hour Game Development Challenge", img: "./assets/sertifikat/gjm.png" },
  { t: "Polinema Bridge Tournament 2026", s: "Organizing Committee • Sports Student Activity Unit, State Polytechnic of Malang", img: "./assets/sertifikat/bridge.png" },
  { t: "Polinema Bridge Tournament 2025", s: "Organizing Committee • Sports Student Activity Unit, State Polytechnic of Malang", img: "./assets/sertifikat/pbt.png" },
  { t: "Polinema Cup 2026 National Chess Championship", s: "Organizing Committee • Sports Student Activity Unit, State Polytechnic of Malang", img: "./assets/sertifikat/catur26.png" },
  { t: "Polinema Cup 2025 National Chess Championship", s: "Organizing Committee • Sports Student Activity Unit, State Polytechnic of Malang", img: "./assets/sertifikat/catur25.png" },
  { t: "Workshop on Basic Network Management Using MikroTik", s: "Participant • Play IT, Department of Information Technology, State Polytechnic of Malang", img: "./assets/sertifikat/mikrotik.png" },
  { t: "2025 Information Technology Freshman Orientation", s: "Organizing Committee • Information Technology Student Association (HMTI), State Polytechnic of Malang", img: "./assets/sertifikat/prastud.png" },
  { t: "Firma Ceria 2025 - From Lost to Led", s: "Organizing Committee • Islamic Religious Student Activity Unit, State Polytechnic of Malang", img: "./assets/sertifikat/firce.png" },
  { t: "MENYALA Mentoring - Islamic Pillars in the Digital Age", s: "Mentoring Closing Ceremony Committee • Islamic Religious Student Activity Unit, State Polytechnic of Malang", img: "./assets/sertifikat/mentoring.png" }
],
  awards: [
    { t: "Top PBL Project Showcase", s: "Apresiasi proyek terbaik dalam pameran Project-Based Learning tingkat program studi" }
  ],
  stack: [
    ["Programming Languages", [
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
    ["UI/UX & Graphic Design", [
      { name: "Figma", isLearning: false },
      { name: "Canva", isLearning: false },
      { name: "Wireframing", isLearning: false },
      { name: "Interactive Prototyping", isLearning: false },
      { name: "Design Systems", isLearning: false }
    ]],
    ["Database & Developer Tools", [
      { name: "MySQL / PostgreSQL ", isLearning: false },
      { name: "DBeaver", isLearning: false },
      { name: "Laragon / XAMPP", isLearning: false },
      { name: "VS Code", isLearning: false },
      { name: "Git & GitHub", isLearning: false },
      { name: "Notion", isLearning: false }
    ]],
    ["Soft Skills & Collaboration", [
      { name: "Problem Solving", isLearning: false },
      { name: "Teamwork", isLearning: false },
      { name: "Communication", isLearning: false },
      { name: "Critical Thinking", isLearning: false },
      { name: "Adaptability", isLearning: false },
      { name: "Time Management", isLearning: false },
      { name: "Collaboration", isLearning: false },
      { name: "Project Management", isLearning: false },
      { name: "Organizational Skills ", isLearning: false },
    ]]
  ],
  gallery: [
  { title: "Internship at BPN", desc: "Sharing memorable moments with the team during the internship", img: "./assets/kegiatan/bpn.jpeg", gradient: "#065f46, #06241b" },
  { title: "Independence Day Celebration at BPN", desc: "Celebrating Indonesia's Independence Day with the BPN team", img: "./assets/kegiatan/17 bpn.jpeg", gradient: "#9a3412, #2e1106" },
  { title: "Semester 3 PBL Teamwork", desc: "Presenting our project alongside the team", img: "./assets/kegiatan/pbl sem 3.jpeg", gradient: "#581c87, #1e1035" },
  { title: "Global Game Jam 2026", desc: "A 48-hour game development challenge with the team", img: "./assets/kegiatan/gjm.jpeg", gradient: "#1e3a8a, #0f172a" },
  { title: "Polinema Bridge Tournament", img: "./assets/kegiatan/bridge.jpeg", imgPos: "center 30%", gradient: "#831843, #2c0717" }
]
};
