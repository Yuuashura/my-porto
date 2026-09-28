export type Language = 'en' | 'id'

export interface PortfolioContent {
  meta: {
    title: string
    description: string
  }
  language: {
    label: string
    english: string
    indonesian: string
  }
  skipToContent: string
  navigation: {
    work: string
    experience: string
    about: string
    contact: string
    talk: string
    openMenu: string
    closeMenu: string
    startConversation: string
    primaryLabel: string
    mobileLabel: string
    homeLabel: string
  }
  hero: {
    role: string
    location: string
    title: string
    tagline1: string
    tagline2: string
    cardHeading: string
    ctaHeading: string
    ctaDescription: string
    introduction: string
    viewWork: string
    downloadCv: string
    availability: string
  }
  work: {
    heading: string
    introduction: string
    viewGithub: string
    visitLive: string
    viewDetails: string
    carouselLabel: string
    viewLabel: string
    viewSlide: string
    viewGrid: string
    technologiesLabel: string
  }
  experience: {
    note: string
    development: string
    teaching: string
    heading: string
    introduction: string
    education: string
    degree: string
    university: string
    gpa: string
    items: Array<{
      period: string
      role: string
      company: string
      summary: string
    }>
  }
  about: {
    heading: string
    introduction: string
    skillsLabel: string
    stack: {
      backend: string
      data: string
      frontend: string
    }
    principlesLabel: string
    principlesQuote: string
    principles: string[]
  }
  contact: {
    prompt: string
    heading: string
    emailAction: string
    email: string
    phone: string
    location: string
    locationValue: string
    marquee: string[]
    craftedWith: string
    craftedBy: string
    backToTop: string
  }
  projectVisuals: {
    bookingFlow: string
    microservices: string
    reactClient: string
    apiGateway: string
    auth: string
    hotels: string
    booking: string
    jwt: string
    persistence: string
    bookingIllustration: string
  }
  projectDetail: {
    back: string
    gallery: string
    galleryLabel: string
    howBuilt: string
    howBuiltIntro: string
    tech: string
    features: string
    status: Record<'completed' | 'in-progress' | 'planned', string>
    next: string
    notFound: string
    notFoundBody: string
    home: string
  }
}

export const content: Record<Language, PortfolioContent> = {
  en: {
    meta: {
      title: 'Yudistira Syaputra — Software Engineer',
      description:
        'Portfolio of Yudistira Syaputra, a software engineer and programming instructor based in Bandung, Indonesia.',
    },
    language: {
      label: 'Language',
      english: 'English',
      indonesian: 'Indonesian',
    },
    skipToContent: 'Skip to content',
    navigation: {
      work: 'Work',
      experience: 'Experience',
      about: 'About',
      contact: 'Contact',
      talk: 'Let’s talk',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      startConversation: 'Start a conversation',
      primaryLabel: 'Primary navigation',
      mobileLabel: 'Mobile navigation',
      homeLabel: 'Yudistira Syaputra, home',
    },
    hero: {
      role: 'Software engineer',
      location: 'Bandung, Indonesia',
      title: 'I engineer software that makes complex work feel simple.',
      tagline1: 'I engineer software',
      tagline2: 'that feels simple.',
      cardHeading: 'Engineer by trade. Teacher by habit.',
      ctaHeading: 'Let’s look at the work.',
      ctaDescription: 'Four projects, from Spring Boot microservices to a coffee shop profile. Keep scrolling or grab the CV.',
      introduction:
        'I’m Yudistira Syaputra, a software engineer and programming instructor building reliable backends, thoughtful interfaces, and products that answer real operational needs.',
      viewWork: 'View selected work',
      downloadCv: 'Download CV',
      availability: 'Open to software engineering roles',
    },
    work: {
      heading: 'Selected work',
      introduction:
        'Systems shaped around clear user flows, maintainable architecture, and the business problem underneath the code.',
      viewGithub: 'View GitHub',
      visitLive: 'Visit live site',
      viewDetails: 'View project details',
      carouselLabel: 'Selected projects',
      viewLabel: 'Project layout',
      viewSlide: 'Slide',
      viewGrid: 'Cards',
      technologiesLabel: 'technologies',
    },
    experience: {
      note: 'Development meets teaching',
      development: 'Development',
      teaching: 'Teaching',
      heading: 'I learn deeply enough to explain clearly.',
      introduction:
        'Alongside building applications, I teach programming fundamentals and databases. That practice has made me a more patient collaborator and a more deliberate engineer.',
      education: 'Education',
      degree: 'B.Sc. Informatics Engineering',
      university: 'Universitas Nasional PASIM Bandung',
      gpa: 'GPA',
      items: [
        {
          period: 'Jun 2026 — Present',
          role: 'HTML, CSS & JavaScript Instructor',
          company: 'Program Pemberdayaan Umat Berkelanjutan',
          summary: 'Guiding participants from web fundamentals to a responsive mini project.',
        },
        {
          period: 'Feb 2026 — May 2026',
          role: 'Database Instructor',
          company: 'Program Pemberdayaan Umat Berkelanjutan',
          summary: 'Taught relational design, SQL, joins, procedures, functions, and triggers in MySQL.',
        },
        {
          period: 'Sep 2025 — Jan 2026',
          role: 'C Programming Instructor',
          company: 'Program Pemberdayaan Umat Berkelanjutan',
          summary: 'Taught programming logic, algorithms, CRUD, and foundational data structures.',
        },
        {
          period: 'Jan 2024 — May 2025',
          role: 'Data Structure Instructor',
          company: 'Program Pemberdayaan Umat Berkelanjutan',
          summary: 'Led practical lessons on arrays, strings, pointers, stacks, and queues.',
        },
      ],
    },
    about: {
      heading: 'Practical across the stack. Grounded in the backend.',
      introduction:
        'My strongest work starts with Java and relational data, then extends into the frontend whenever the product needs a complete, coherent experience.',
      skillsLabel: 'Tools I build with',
      stack: {
        backend: 'Backend',
        data: 'Data',
        frontend: 'Frontend & tools',
      },
      principlesLabel: 'How I work',
      principlesQuote:
        'Clean code is useful only when it helps the next person understand, change, and trust the system.',
      principles: ['Clear communication', 'Practical problem-solving', 'Continuous learning'],
    },
    contact: {
      prompt: 'Have a role, project, or problem worth solving?',
      heading: 'Let’s build something useful.',
      emailAction: 'Email Yudistira',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      locationValue: 'Bandung, Indonesia',
      marquee: ['Java', 'Spring Boot', 'React', 'Next.js', 'TypeScript', 'PostgreSQL', 'Teaching'],
      craftedWith: 'Crafted with',
      craftedBy: 'by',
      backToTop: 'Back to top',
    },
    projectVisuals: {
      bookingFlow: 'Booking flow',
      microservices: 'Microservices',
      reactClient: 'React client',
      apiGateway: 'API gateway',
      auth: 'Auth',
      hotels: 'Hotels',
      booking: 'Booking',
      jwt: 'JWT authentication',
      persistence: 'MySQL persistence',
      bookingIllustration: 'Hotel booking architecture illustration',
    },
    projectDetail: {
      back: 'All projects',
      gallery: 'Inside the product',
      galleryLabel: 'Project screenshots',
      howBuilt: 'How it’s built',
      howBuiltIntro: 'The stack on the left feeds the product; the product delivers the features on the right.',
      tech: 'Stack',
      features: 'Delivers',
      status: {
        completed: 'Completed',
        'in-progress': 'In progress',
        planned: 'Planned',
      },
      next: 'Next project',
      notFound: 'Project not found',
      notFoundBody: 'That project doesn’t exist or has moved.',
      home: 'Back to home',
    },
  },
  id: {
    meta: {
      title: 'Yudistira Syaputra — Software Engineer',
      description:
        'Portofolio Yudistira Syaputra, software engineer dan instruktur pemrograman yang berbasis di Bandung, Indonesia.',
    },
    language: {
      label: 'Bahasa',
      english: 'Inggris',
      indonesian: 'Indonesia',
    },
    skipToContent: 'Lewati ke konten',
    navigation: {
      work: 'Proyek',
      experience: 'Pengalaman',
      about: 'Tentang',
      contact: 'Kontak',
      talk: 'Mari berdiskusi',
      openMenu: 'Buka menu',
      closeMenu: 'Tutup menu',
      startConversation: 'Mulai percakapan',
      primaryLabel: 'Navigasi utama',
      mobileLabel: 'Navigasi mobile',
      homeLabel: 'Yudistira Syaputra, beranda',
    },
    hero: {
      role: 'Software engineer',
      location: 'Bandung, Indonesia',
      title: 'Saya merancang software yang membuat hal rumit terasa sederhana.',
      tagline1: 'Saya merancang software',
      tagline2: 'yang terasa sederhana.',
      cardHeading: 'Engineer karena profesi. Pengajar karena kebiasaan.',
      ctaHeading: 'Mari lihat karyanya.',
      ctaDescription: 'Empat proyek, dari microservices Spring Boot sampai profil coffee shop. Lanjut scroll atau unduh CV.',
      introduction:
        'Saya Yudistira Syaputra, software engineer dan instruktur pemrograman yang membangun backend andal, antarmuka yang matang, dan produk yang menjawab kebutuhan operasional nyata.',
      viewWork: 'Lihat proyek pilihan',
      downloadCv: 'Unduh CV',
      availability: 'Terbuka untuk peran software engineer',
    },
    work: {
      heading: 'Proyek pilihan',
      introduction:
        'Sistem yang dibentuk melalui alur pengguna yang jelas, arsitektur yang mudah dipelihara, dan pemahaman terhadap masalah bisnis di balik kode.',
      viewGithub: 'Lihat GitHub',
      visitLive: 'Kunjungi situs',
      viewDetails: 'Lihat detail proyek',
      carouselLabel: 'Proyek pilihan',
      viewLabel: 'Tampilan proyek',
      viewSlide: 'Slide',
      viewGrid: 'Kartu',
      technologiesLabel: 'teknologi',
    },
    experience: {
      note: 'Development bertemu pengajaran',
      development: 'Development',
      teaching: 'Pengajaran',
      heading: 'Saya belajar cukup dalam untuk menjelaskan dengan jelas.',
      introduction:
        'Selain membangun aplikasi, saya mengajar fundamental pemrograman dan database. Pengalaman itu membentuk saya menjadi kolaborator yang lebih sabar dan engineer yang lebih terarah.',
      education: 'Pendidikan',
      degree: 'S1 Teknik Informatika',
      university: 'Universitas Nasional PASIM Bandung',
      gpa: 'IPK',
      items: [
        {
          period: 'Jun 2026 — Sekarang',
          role: 'Instruktur HTML, CSS & JavaScript',
          company: 'Program Pemberdayaan Umat Berkelanjutan',
          summary: 'Membimbing peserta dari fundamental web hingga menyelesaikan mini project responsif.',
        },
        {
          period: 'Feb 2026 — Mei 2026',
          role: 'Instruktur Database',
          company: 'Program Pemberdayaan Umat Berkelanjutan',
          summary: 'Mengajar desain relasional, SQL, join, procedure, function, dan trigger menggunakan MySQL.',
        },
        {
          period: 'Sep 2025 — Jan 2026',
          role: 'Instruktur Pemrograman C',
          company: 'Program Pemberdayaan Umat Berkelanjutan',
          summary: 'Mengajar logika pemrograman, algoritma, CRUD, dan struktur data fundamental.',
        },
        {
          period: 'Jan 2024 — Mei 2025',
          role: 'Instruktur Struktur Data',
          company: 'Program Pemberdayaan Umat Berkelanjutan',
          summary: 'Memimpin pembelajaran praktis mengenai array, string, pointer, stack, dan queue.',
        },
      ],
    },
    about: {
      heading: 'Praktis di seluruh stack. Berakar kuat di backend.',
      introduction:
        'Keahlian utama saya dimulai dari Java dan data relasional, lalu meluas ke frontend ketika produk membutuhkan pengalaman yang lengkap dan konsisten.',
      skillsLabel: 'Tools yang saya gunakan',
      stack: {
        backend: 'Backend',
        data: 'Data',
        frontend: 'Frontend & tools',
      },
      principlesLabel: 'Cara saya bekerja',
      principlesQuote:
        'Clean code berguna ketika membantu orang berikutnya memahami, mengubah, dan mempercayai sistem.',
      principles: ['Komunikasi yang jelas', 'Pemecahan masalah praktis', 'Belajar berkelanjutan'],
    },
    contact: {
      prompt: 'Punya posisi, proyek, atau masalah yang layak diselesaikan?',
      heading: 'Mari membangun sesuatu yang berguna.',
      emailAction: 'Email Yudistira',
      email: 'Email',
      phone: 'Telepon',
      location: 'Lokasi',
      locationValue: 'Bandung, Indonesia',
      marquee: ['Java', 'Spring Boot', 'React', 'Next.js', 'TypeScript', 'PostgreSQL', 'Pengajaran'],
      craftedWith: 'Dibuat dengan',
      craftedBy: 'oleh',
      backToTop: 'Kembali ke atas',
    },
    projectVisuals: {
      bookingFlow: 'Alur pemesanan',
      microservices: 'Microservices',
      reactClient: 'React client',
      apiGateway: 'API gateway',
      auth: 'Autentikasi',
      hotels: 'Hotel',
      booking: 'Pemesanan',
      jwt: 'Autentikasi JWT',
      persistence: 'Penyimpanan MySQL',
      bookingIllustration: 'Ilustrasi arsitektur aplikasi pemesanan hotel',
    },
    projectDetail: {
      back: 'Semua proyek',
      gallery: 'Isi produknya',
      galleryLabel: 'Tangkapan layar proyek',
      howBuilt: 'Cara dibangun',
      howBuiltIntro: 'Stack di kiri menjadi fondasi produk; produk menghadirkan fitur di kanan.',
      tech: 'Stack',
      features: 'Menghadirkan',
      status: {
        completed: 'Selesai',
        'in-progress': 'Dalam pengerjaan',
        planned: 'Direncanakan',
      },
      next: 'Proyek berikutnya',
      notFound: 'Proyek tidak ditemukan',
      notFoundBody: 'Proyek tersebut tidak ada atau sudah dipindahkan.',
      home: 'Kembali ke beranda',
    },
  },
}
