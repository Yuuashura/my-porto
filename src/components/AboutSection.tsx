import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import OrnateFrame from './UI/OrnateFrame'

const skills = [
  { name: 'Java', level: 80 },
  { name: 'Spring Boot', level: 75 },
  { name: 'React', level: 70 },
  { name: 'TypeScript', level: 65 },
  { name: 'PostgreSQL', level: 70 },
  { name: 'Docker', level: 60 },
  { name: 'Tailwind CSS', level: 75 },
  { name: 'Git', level: 75 },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/YuuAshura', icon: 'GH' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yudistira-syaputra-b0978b343', icon: 'LI' },
  { label: 'Instagram', href: 'https://instagram.com/Yudis.Ashura', icon: 'IG' },
]

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-display text-fontaine-gold text-sm tracking-[0.3em] mb-3">
            ─── ABOUT THE TRAVELER ───
          </p>
          <h2 className="font-heading text-3xl md:text-5xl text-fontaine-light-gold">
            Sang <span className="text-gradient-gold">Pengembara</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <OrnateFrame variant="gold" className="max-w-sm mx-auto md:mx-0">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-fontaine-teal/30 to-fontaine-navy flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-fontaine-gold/20 border-2 border-fontaine-gold/50 flex items-center justify-center mb-4">
                    <span className="font-display text-3xl text-fontaine-gold">YS</span>
                  </div>
                  <p className="font-heading text-fontaine-light-gold text-lg">
                    Yudistira Syaputra
                  </p>
                  <p className="text-fontaine-cream/50 text-sm mt-1">
                    Universitas Nasional Pasim &bull; Semester 4
                  </p>
                  <div className="flex justify-center gap-3 mt-4">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-fontaine-teal/20 border border-fontaine-cyan/30 flex items-center justify-center text-xs font-bold text-fontaine-cyan hover:bg-fontaine-teal/40 transition-colors"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </OrnateFrame>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="glass-card p-6">
              <h3 className="font-heading text-xl text-fontaine-gold mb-3">
                ✦ Perjalanan Sang Developer
              </h3>
              <p className="text-fontaine-cream/70 leading-relaxed text-sm">
                Seorang mahasiswa Teknik Informatika di Universitas Nasional Pasim yang
                sedang menempuh semester 4. Berawal dari rasa penasaran terhadap cara kerja
                software, kini terus mengembangkan diri sebagai Full Stack Developer.
              </p>
              <p className="text-fontaine-cream/70 leading-relaxed text-sm mt-3">
                Setiap project adalah sebuah <span className="text-fontaine-cyan">Domain</span>{' '}
                yang harus ditaklukkan. Setiap teknologi adalah{' '}
                <span className="text-fontaine-gold">Elemental Skill</span> yang terus
                diasah. Visinya: menjadi developer yang tidak hanya bisa membuat kode,
                tetapi juga menghadirkan solusi yang elegan dan bermanfaat.
              </p>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-heading text-lg text-fontaine-cyan mb-4">
                ⚡ Constellation of Skills
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-fontaine-cream/70">{skill.name}</span>
                      <span className="text-fontaine-cyan">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-fontaine-navy overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-fontaine-teal to-fontaine-cyan transition-all duration-1000"
                        style={{ width: inView ? `${skill.level}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
