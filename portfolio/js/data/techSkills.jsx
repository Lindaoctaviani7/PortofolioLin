// Official SVG Logos for Technologies
const TECH_SKILLS = [
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    desc: 'Library UI modern berbasis komponen & hooks',
    color: '#61DAFB',
    bg: 'rgba(97, 218, 251, 0.12)',
    border: 'rgba(97, 218, 251, 0.35)',
    icon: (
      <svg viewBox="-11.5 -10.232 23 20.463" width="26" height="26">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    )
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'design',
    desc: 'Desain antarmuka UI/UX, wireframe & prototyping',
    color: '#F24E1E',
    bg: 'rgba(242, 78, 30, 0.12)',
    border: 'rgba(242, 78, 30, 0.35)',
    icon: (
      <svg viewBox="0 0 38 57" width="24" height="26" fill="none">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
      </svg>
    )
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    desc: 'Logika interaktif, DOM manipulation & ES6+',
    color: '#F7DF1E',
    bg: 'rgba(247, 223, 30, 0.12)',
    border: 'rgba(247, 223, 30, 0.35)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M7 17.5c.8.5 1.7.8 2.6.8 1.4 0 2.2-.7 2.2-2.1v-7.2h-2.1v7.1c0 .7-.3 1-1 1-.5 0-1.1-.2-1.4-.4l-.3.8zm8.2-.2c1 .6 2.1.9 3.2.9 2.5 0 3.6-1.3 3.6-3.2 0-1.8-1-2.6-2.8-3.4-1.3-.6-1.8-1-1.8-1.8 0-.7.6-1.3 1.7-1.3.9 0 1.7.3 2.3.7l.6-1.5c-.7-.4-1.7-.7-2.9-.7-2.3 0-3.7 1.3-3.7 3.1 0 1.6 1 2.5 2.7 3.2 1.4.6 2 1.1 2 2 0 .9-.8 1.4-2 1.4-1.1 0-2.1-.4-2.8-.9l-.4 1.5z" fill="#000" />
      </svg>
    )
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'mobile',
    desc: 'Pengembangan app mobile multiplatform (Android/iOS)',
    color: '#02569B',
    bg: 'rgba(2, 86, 155, 0.15)',
    border: 'rgba(2, 86, 155, 0.4)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
        <path d="M14.314 0L2.3 12.015l3.693 3.693L18.007 3.693 14.314 0z" fill="#42A5F5" />
        <path d="M14.286 10.767l-5.632 5.632 3.693 3.693 5.632-5.632-3.693-3.693z" fill="#0D47A1" />
        <path d="M8.654 16.399l3.693 3.693L8.654 23.785 4.961 20.092l3.693-3.693z" fill="#42A5F5" />
        <path d="M12.347 20.092l5.66-5.632 3.693 3.693-5.66 5.632-3.693-3.693z" fill="#01579B" />
      </svg>
    )
  },
  {
    id: 'dart',
    name: 'Dart',
    category: 'mobile',
    desc: 'Bahasa pemrograman terstruktur untuk Flutter & OOP',
    color: '#0175C2',
    bg: 'rgba(1, 117, 194, 0.15)',
    border: 'rgba(1, 117, 194, 0.4)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
        <path d="M4.5 3.5l10.5 4.5-3 12.5L2 14z" fill="#0175C2" opacity="0.8" />
        <path d="M15 8l7 8-9.5 4.5L12 8z" fill="#00B4AB" />
        <path d="M4.5 3.5L15 8l-3 12.5L2 14z" stroke="#fff" strokeWidth="0.8" />
      </svg>
    )
  },
  {
    id: 'laravel',
    name: 'Laravel',
    category: 'backend',
    desc: 'Framework PHP MVC untuk backend & REST API',
    color: '#FF2D20',
    bg: 'rgba(255, 45, 32, 0.12)',
    border: 'rgba(255, 45, 32, 0.35)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="#FF2D20">
        <path d="M8.5 2.5l7 4v3.5l-3.5 2v-3.5l-3.5-2v8l7 4 3.5-2v-6l3.5-2v8l-10.5 6-7-4v-12l3.5-2z" />
      </svg>
    )
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'frontend',
    desc: 'Flexbox, CSS Grid, animasi & responsive design',
    color: '#1572B6',
    bg: 'rgba(21, 114, 182, 0.15)',
    border: 'rgba(21, 114, 182, 0.35)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
        <path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3z" fill="#1572B6" />
        <path d="M12 3.8v16.3l5.6-1.9L19 3.8H12z" fill="#33A9DC" />
        <path d="M6.8 6.5h10.4l-.3 2.5H9.6l.2 2.5h6.8l-.6 6-4 1.3-4-1.3-.2-2.7h2.3l.1 1.4 1.8.6 1.8-.6.2-2.4H7.2L6.8 6.5z" fill="#fff" />
      </svg>
    )
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'frontend',
    desc: 'Semantik web modern, struktur SEO & aksesibilitas',
    color: '#E34F26',
    bg: 'rgba(227, 79, 38, 0.15)',
    border: 'rgba(227, 79, 38, 0.35)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
        <path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3z" fill="#E34F26" />
        <path d="M12 3.8v16.3l5.6-1.9L19 3.8H12z" fill="#EF652A" />
        <path d="M7 6.5h10l-.9 9.5-4.1 1.2-4.1-1.2-.3-3.2h2.2l.1 1.6 2.1.6 2.1-.6.3-3H7.5L7 6.5z" fill="#fff" />
      </svg>
    )
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'design',
    desc: 'Desain konten visual, presentasi & grafis kreatif',
    color: '#00C4CC',
    bg: 'rgba(0, 196, 204, 0.15)',
    border: 'rgba(0, 196, 204, 0.4)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <circle cx="12" cy="12" r="11" fill="#00C4CC" />
        <path d="M13.5 7.2c-3.8 0-6.2 3-6.2 6.8 0 3.2 2 5 4.8 5 2.4 0 4-1.2 4.7-2.3l-1.4-1.2c-.6.8-1.8 1.6-3.1 1.6-1.8 0-3-1.2-3-3.3 0-2.4 1.6-4.8 4.2-4.8 1.5 0 2.5.7 3 1.4l1.3-1.3c-.9-1.1-2.3-1.9-4.3-1.9z" fill="#fff" />
      </svg>
    )
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'database',
    desc: 'Relational database management, schema & querying',
    color: '#00758F',
    bg: 'rgba(0, 117, 143, 0.15)',
    border: 'rgba(0, 117, 143, 0.4)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="#00758F">
        <path d="M12 2C6.48 2 2 4.01 2 6.5v11C2 19.99 6.48 22 12 22s10-2.01 10-4.5v-11C22 4.01 17.52 2 12 2zm0 3c4.41 0 8 1.34 8 2s-3.59 2-8 2-8-1.34-8-2 3.59-2 8-2zm0 5c4.41 0 8 1.34 8 2s-3.59 2-8 2-8-1.34-8-2 3.59-2 8-2zm0 5c4.41 0 8 1.34 8 2s-3.59 2-8 2-8-1.34-8-2 3.59-2 8-2z" />
      </svg>
    )
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'database',
    desc: 'Complex queries, indexing, joins, aggregate data',
    color: '#34D399',
    bg: 'rgba(52, 211, 153, 0.15)',
    border: 'rgba(52, 211, 153, 0.4)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#34D399" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    )
  },
  {
    id: 'dbeaver',
    name: 'DBeaver',
    category: 'database',
    desc: 'Database GUI client, ERD visualizer & SQL executor',
    color: '#8B5CF6',
    bg: 'rgba(139, 92, 246, 0.15)',
    border: 'rgba(139, 92, 246, 0.4)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="4" fill="#6B46C1" />
        <circle cx="9" cy="10" r="2" fill="#fff" />
        <circle cx="15" cy="10" r="2" fill="#fff" />
        <path d="M10 14h4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 3l3 3M18 3l-3 3" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'tools',
    desc: 'Kolaborasi open-source, repository & version control',
    color: '#FFFFFF',
    bg: 'rgba(255, 255, 255, 0.12)',
    border: 'rgba(255, 255, 255, 0.3)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    )
  },
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    desc: 'Branching, commit, merge, resolving conflicts',
    color: '#F05032',
    bg: 'rgba(240, 80, 50, 0.15)',
    border: 'rgba(240, 80, 50, 0.4)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="#F05032">
        <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.6 4.8l2.6 2.6c.6-.2 1.3-.1 1.8.4.5.5.6 1.3.4 1.8l2.5 2.5c.6-.2 1.3-.1 1.8.4.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.6-.6-.7-1.4-.3-2.1L12.4 10v4.7c.3.2.5.4.6.7.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6.3-.3.6-.5 1-.6V9.8c-.4-.1-.7-.3-1-.6-.6-.6-.7-1.4-.3-2.1L7.5 4.5 2.4 9.6c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.6-8.5c.6-.5.6-1.5 0-2.1z" />
      </svg>
    )
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'backend',
    desc: 'Pemrograman web server-side & integrasi database',
    color: '#777BB4',
    bg: 'rgba(119, 123, 180, 0.15)',
    border: 'rgba(119, 123, 180, 0.4)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <ellipse cx="12" cy="12" rx="10" ry="6" fill="#777BB4" />
        <text x="12" y="14" fill="#fff" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PHP</text>
      </svg>
    )
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    desc: 'Editor utama dengan integrasi ekstensi & terminal',
    color: '#007ACC',
    bg: 'rgba(0, 122, 204, 0.15)',
    border: 'rgba(0, 122, 204, 0.4)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="#007ACC">
        <path d="M17.5 2.2L6.8 11.9 2.5 8.7.6 10.1l5 4.5-5 4.5 1.9 1.4 4.3-3.2 10.7 9.7 5.9-2.8V5l-5.9-2.8zm-1.8 14.7L10 12l5.7-4.9v9.8z" />
      </svg>
    )
  },
  {
    id: 'java',
    name: 'Java',
    category: 'backend',
    desc: 'Pemrograman OOP berbasis JVM, backend & enterprise',
    color: '#ED8B00',
    bg: 'rgba(237, 139, 0, 0.15)',
    border: 'rgba(237, 139, 0, 0.4)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
        <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218" fill="#ED8B00" />
        <path d="M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573" fill="#ED8B00" />
        <path d="M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118" fill="#ED8B00" />
        <path d="M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.889 4.831-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.542 1.644-2.469 6.197-3.665 5.19-7.624" fill="#ED8B00" />
        <path d="M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639" fill="#ED8B00" />
      </svg>
    )
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    desc: 'Scripting, data processing & general purpose programming',
    color: '#3776AB',
    bg: 'rgba(55, 118, 171, 0.15)',
    border: 'rgba(55, 118, 171, 0.4)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.959 3.403 5.959h2.03v-2.867s-.109-3.405 3.345-3.405h5.766s3.236.052 3.236-3.128V3.242S18.28 0 11.914 0zm-3.21 1.87a1.047 1.047 0 1 1 0 2.093 1.046 1.046 0 0 1 0-2.093z" fill="#3776AB" />
        <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752H12v-.826h8.1S24 18.21 24 12.03c0-6.18-3.403-5.959-3.403-5.959h-2.03v2.867s.109 3.405-3.345 3.405H9.456s-3.236-.052-3.236 3.128v5.286S5.72 24 12.086 24zm3.21-1.87a1.047 1.047 0 1 1 0-2.093 1.046 1.046 0 0 1 0 2.093z" fill="#FFD43B" />
      </svg>
    )
  }
];
