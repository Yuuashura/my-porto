import type { Language } from '../content'

type LocalizedText = Record<Language, string>

export interface Screenshot {
  src: string
  label: string
}

export interface Project {
  id: 'booking-hotels' | 'exam-vocabulary' | 'pub-scholarship' | 'muladari-coffee'
  title: string
  description: LocalizedText
  category: LocalizedText
  year: string
  tech: string[]
  features: LocalizedText[]
  /** First item is the carousel cover. Empty = render the architecture illustration. */
  screenshots: Screenshot[]
  github?: string
  link?: string
  status: 'completed' | 'in-progress' | 'planned'
}

const shots = (folder: string, files: Array<[file: string, label: string]>): Screenshot[] =>
  files.map(([file, label]) => ({ src: encodeURI(`/${folder}/${file}`), label }))

const projects: Project[] = [
  {
    id: 'booking-hotels',
    title: 'Booking Hotels',
    description: {
      en: 'A Traveloka-inspired hotel reservation platform designed to make room discovery and booking easier. The system uses a Spring Boot microservices architecture with a React frontend.',
      id: 'Platform reservasi hotel yang terinspirasi Traveloka untuk mempermudah pencarian dan pemesanan kamar. Sistem ini menggunakan arsitektur microservices Spring Boot dengan frontend React.',
    },
    category: {
      en: 'Platform architecture',
      id: 'Arsitektur platform',
    },
    year: '2026',
    tech: ['Java', 'Spring Boot', 'Microservices', 'React', 'MySQL'],
    features: [
      { en: 'API gateway routing', id: 'Routing lewat API gateway' },
      { en: 'JWT authentication', id: 'Autentikasi JWT' },
      { en: 'Room search & booking', id: 'Pencarian & pemesanan kamar' },
    ],
    screenshots: [],
    status: 'in-progress',
    github: 'https://github.com/YuuAshura',
  },
  {
    id: 'exam-vocabulary',
    title: 'Exam Vocabulary',
    description: {
      en: 'A web-based English vocabulary assessment for an educational institution, covering exam rules, violation handling, automatic and manual correction, and score reporting.',
      id: 'Ujian kosakata bahasa Inggris berbasis web untuk sebuah institusi pendidikan, mencakup aturan ujian, penanganan pelanggaran, koreksi otomatis dan manual, serta laporan nilai.',
    },
    category: {
      en: 'Education product',
      id: 'Produk pendidikan',
    },
    year: '2026',
    tech: ['Next.js', 'TypeScript', 'Assessment workflow', 'Reporting'],
    features: [
      { en: 'Timed exam with rule enforcement', id: 'Ujian berwaktu dengan aturan ketat' },
      { en: 'Auto & manual correction', id: 'Koreksi otomatis & manual' },
      { en: 'Score analytics for admins', id: 'Analitik nilai untuk admin' },
    ],
    screenshots: shots('Screenshoots exam vocabulary', [
      ['Homepage.png', 'Homepage'],
      ['Exam.png', 'Exam'],
      ['DashboardAdmin.png', 'Admin dashboard'],
      ['Analitik.png', 'Analytics'],
      ['ResultsExamAll Admin.png', 'Exam results'],
    ]),
    status: 'completed',
    link: 'https://exam-vocabulary.pubpasim.org/',
  },
  {
    id: 'pub-scholarship',
    title: 'PUB Scholarship Profile',
    description: {
      en: 'A complete scholarship profile and administration experience with student registration, detailed records, an admin dashboard, and a token-based organization election system.',
      id: 'Website profil dan administrasi beasiswa lengkap dengan pendaftaran mahasiswa, detail data, dashboard admin, dan sistem pemilihan organisasi berbasis token.',
    },
    category: {
      en: 'Operations system',
      id: 'Sistem operasional',
    },
    year: '2026',
    tech: ['Next.js', 'CRUD', 'Admin dashboard', 'Token system'],
    features: [
      { en: 'Student records & cohorts', id: 'Data mahasiswa & angkatan' },
      { en: 'Master data management', id: 'Pengelolaan master data' },
      { en: 'Token-based election', id: 'Pemilihan berbasis token' },
    ],
    screenshots: shots('Screenshoots PUB Website', [
      ['Homepages.png', 'Homepage'],
      ['ListMahasiswa.png', 'Student list'],
      ['Detail Mahasiswa.png', 'Student detail'],
      ['Page Angkatan mahasiswa.png', 'Cohorts'],
      ['Kepengurusan.png', 'Board'],
      ['Detail Kepengurusan.png', 'Board detail'],
      ['Master Data.png', 'Master data'],
      ['Dashboard Pemilihan ketua PUB.png', 'Election dashboard'],
    ]),
    status: 'completed',
    link: 'https://new.pubpasim.org/',
  },
  {
    id: 'muladari-coffee',
    title: 'Muladari Coffee',
    description: {
      en: 'A simple single-page profile for a coffee shop in Batusangkar, presenting its story, premium coffee experience, community-friendly atmosphere, and work-from-café offering.',
      id: 'Website profil single-page sederhana untuk coffee shop di Batusangkar yang memperkenalkan cerita brand, pengalaman menikmati kopi premium, suasana komunitas, dan fasilitas work from café.',
    },
    category: {
      en: 'Brand profile',
      id: 'Profil brand',
    },
    year: '2026',
    tech: ['Next.js', 'TypeScript', 'Responsive UI', 'Single-page'],
    features: [
      { en: 'Brand story section', id: 'Section cerita brand' },
      { en: 'Menu showcase', id: 'Tampilan menu' },
      { en: 'Responsive single page', id: 'Single page responsif' },
    ],
    screenshots: shots('Screenshoots Muladari Coffe', [
      ['Homepage.png', 'Homepage'],
      ['Story.png', 'Story'],
      ['Menu.png', 'Menu'],
      ['Screenshot (753).png', 'Vibes'],
      ['Screenshot (754).png', 'Gallery'],
      ['Screenshot (755).png', 'Events'],
    ]),
    status: 'completed',
    link: 'https://muladaricoffee.shop/',
  },
]

export const findProject = (slug: string) => projects.find((project) => project.id === slug)

export default projects
