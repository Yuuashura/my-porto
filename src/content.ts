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
    titleLines: string[]
    introduction: string
    viewWork: string
    downloadCv: string
    availability: string
    buildingWith: string
  }
  work: {
    heading: string
    introduction: string
    viewGithub: string
    visitLive: string
    technologiesLabel: string
  }
  experience: {
    note: string
    heading: string
    introduction: string
    education: string
    degree: string
    university: string
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
    assessment: string
    question: string
    chooseMeaning: string
    answerAccurate: string
    answerTemporary: string
    selected: string
    correctionReady: string
    scholarship: string
    studentRecords: string
    addStudent: string
    applications: string
    open: string
    selection: string
    tokenBased: string
    reviewed: string
    registered: string
    bookingIllustration: string
    examIllustration: string
    scholarshipIllustration: string
    coffeeIllustration: string
    coffeeTagline: string
    coffeeLocation: string
    coffeePurpose: string
    exploreCoffee: string
  }
}

export const content: Record<Language, PortfolioContent> = {
  en: {
    meta: {
      title: 'Yudistira Syaputra — Java Developer',
      description:
        'Portfolio of Yudistira Syaputra, a Java developer and programming instructor based in Bandung, Indonesia.',
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
      role: 'Java developer',
      location: 'Bandung, Indonesia',
      title: 'I build Java systems that make complex work feel simple.',
      titleLines: ['I build Java', 'systems that', 'make complex', 'work feel simple.'],
      introduction:
        'I’m Yudistira Syaputra, a developer and programming instructor focused on reliable backends, thoughtful interfaces, and software that answers real operational needs.',
      viewWork: 'View selected work',
      downloadCv: 'Download CV',
      availability: 'Open to Java developer opportunities',
      buildingWith: 'Building with',
    },
    work: {
      heading: 'Selected work',
      introduction:
        'Systems shaped around clear user flows, maintainable architecture, and the business problem underneath the code.',
      viewGithub: 'View GitHub',
      visitLive: 'Visit live site',
      technologiesLabel: 'technologies',
    },
    experience: {
      note: 'Development meets teaching',
      heading: 'I learn deeply enough to explain clearly.',
      introduction:
        'Alongside building applications, I teach programming fundamentals and databases. That practice has made me a more patient collaborator and a more deliberate engineer.',
      education: 'Education',
      degree: 'B.Sc. Informatics Engineering',
      university: 'Universitas Nasional PASIM Bandung · GPA 3.80/4.00',
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
      assessment: 'Vocabulary assessment',
      question: 'Question 08 / 20',
      chooseMeaning: 'Choose the closest meaning.',
      answerAccurate: 'Accurate and exact',
      answerTemporary: 'Quick and temporary',
      selected: 'Selected',
      correctionReady: 'Auto-correction and manual review ready',
      scholarship: 'Scholarship',
      studentRecords: 'Student records',
      addStudent: '+ Add student',
      applications: 'Applications',
      open: 'Open',
      selection: 'Selection',
      tokenBased: 'Token based',
      reviewed: 'Reviewed',
      registered: 'Registered',
      bookingIllustration: 'Hotel booking architecture illustration',
      examIllustration: 'Vocabulary exam interface illustration',
      scholarshipIllustration: 'Scholarship administration illustration',
      coffeeIllustration: 'Muladari Coffee single-page website illustration',
      coffeeTagline: 'From a Story into a Dream',
      coffeeLocation: 'Batusangkar',
      coffeePurpose: 'Coffee · Community · WFC',
      exploreCoffee: 'Explore the coffee shop',
    },
  },
  id: {
    meta: {
      title: 'Yudistira Syaputra — Java Developer',
      description:
        'Portofolio Yudistira Syaputra, Java developer dan instruktur pemrograman yang berbasis di Bandung, Indonesia.',
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
      role: 'Java developer',
      location: 'Bandung, Indonesia',
      title: 'Saya membangun sistem Java yang membuat pekerjaan kompleks terasa sederhana.',
      titleLines: ['Saya membangun', 'sistem Java', 'yang membuat hal rumit', 'terasa sederhana.'],
      introduction:
        'Saya Yudistira Syaputra, developer dan instruktur pemrograman yang berfokus pada backend andal, antarmuka yang matang, dan software yang menjawab kebutuhan operasional nyata.',
      viewWork: 'Lihat proyek pilihan',
      downloadCv: 'Unduh CV',
      availability: 'Terbuka untuk peluang Java developer',
      buildingWith: 'Dibangun dengan',
    },
    work: {
      heading: 'Proyek pilihan',
      introduction:
        'Sistem yang dibentuk melalui alur pengguna yang jelas, arsitektur yang mudah dipelihara, dan pemahaman terhadap masalah bisnis di balik kode.',
      viewGithub: 'Lihat GitHub',
      visitLive: 'Kunjungi situs',
      technologiesLabel: 'teknologi',
    },
    experience: {
      note: 'Development bertemu pengajaran',
      heading: 'Saya belajar cukup dalam untuk menjelaskan dengan jelas.',
      introduction:
        'Selain membangun aplikasi, saya mengajar fundamental pemrograman dan database. Pengalaman itu membentuk saya menjadi kolaborator yang lebih sabar dan engineer yang lebih terarah.',
      education: 'Pendidikan',
      degree: 'S1 Teknik Informatika',
      university: 'Universitas Nasional PASIM Bandung · IPK 3,80/4,00',
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
      assessment: 'Ujian kosakata',
      question: 'Pertanyaan 08 / 20',
      chooseMeaning: 'Pilih arti yang paling dekat.',
      answerAccurate: 'Akurat dan tepat',
      answerTemporary: 'Cepat dan sementara',
      selected: 'Dipilih',
      correctionReady: 'Siap untuk koreksi otomatis dan pemeriksaan manual',
      scholarship: 'Beasiswa',
      studentRecords: 'Data mahasiswa',
      addStudent: '+ Tambah mahasiswa',
      applications: 'Pendaftaran',
      open: 'Dibuka',
      selection: 'Pemilihan',
      tokenBased: 'Berbasis token',
      reviewed: 'Ditinjau',
      registered: 'Terdaftar',
      bookingIllustration: 'Ilustrasi arsitektur aplikasi pemesanan hotel',
      examIllustration: 'Ilustrasi antarmuka ujian kosakata',
      scholarshipIllustration: 'Ilustrasi administrasi beasiswa',
      coffeeIllustration: 'Ilustrasi website single-page Muladari Coffee',
      coffeeTagline: 'Berawal dari Cerita Menjadi Sebuah Cita-Cita',
      coffeeLocation: 'Batusangkar',
      coffeePurpose: 'Kopi · Komunitas · WFC',
      exploreCoffee: 'Jelajahi coffee shop',
    },
  },
}
