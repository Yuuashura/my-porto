export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  image?: string
  link?: string
  github?: string
  status: 'completed' | 'in-progress' | 'planned'
}

const projects: Project[] = [
  {
    id: 'nginep',
    title: 'NgiNep',
    description:
      'Hotel booking platform berbasis microservices (Spring Boot, React, MySQL). Fitur: JWT auth, OTP email, multi-role, API Gateway.',
    tech: ['Java', 'Spring Boot', 'React', 'MySQL', 'Docker'],
    status: 'in-progress',
    github: 'https://github.com/YuuAshura',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Teyvat',
    description:
      'Portfolio interaktif bertema Genshin Impact — Fontaine. 3D Vision Crystal, particle effects, anime.js animations.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Anime.js', 'Sketchfab'],
    status: 'completed',
    github: 'https://github.com/YuuAshura',
  },
  {
    id: 'placeholder-1',
    title: 'Coming Soon',
    description:
      'Project selanjutnya sedang dalam perencanaan. Sebuah Domain baru menanti untuk ditaklukkan.',
    tech: ['?'],
    status: 'planned',
  },
  {
    id: 'placeholder-2',
    title: 'Coming Soon',
    description:
      'Project selanjutnya sedang dalam perencanaan. Sebuah Domain baru menanti untuk ditaklukkan.',
    tech: ['?'],
    status: 'planned',
  },
]

export default projects
