import type { Language } from '../content'

type LocalizedText = Record<Language, string>

export interface Project {
  id: 'booking-hotels' | 'exam-vocabulary' | 'pub-scholarship'
  title: string
  description: LocalizedText
  category: LocalizedText
  year: string
  tech: string[]
  tone: 'green' | 'blue' | 'coral'
  github?: string
  link?: string
  status: 'completed' | 'in-progress' | 'planned'
}

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
    tone: 'green',
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
    tone: 'blue',
    status: 'completed',
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
    tone: 'coral',
    status: 'completed',
  },
]

export default projects
