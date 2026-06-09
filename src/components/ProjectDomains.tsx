import projects from '../data/projects'
import ProjectCard from './ProjectCard'

export default function ProjectDomains() {
  return (
    <section id="projects" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-display text-fontaine-gold text-sm tracking-[0.3em] mb-3">
            ─── PROJECT DOMAINS ───
          </p>
          <h2 className="font-heading text-3xl md:text-5xl text-fontaine-light-gold">
            Domain yang <span className="text-gradient-gold">Ditaklukkan</span>
          </h2>
          <p className="text-fontaine-cream/50 mt-4 max-w-lg mx-auto text-sm">
            Setiap project adalah Domain yang berhasil ditaklukkan. Setiap baris kode adalah
            langkah menuju mastery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
