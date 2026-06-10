import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import OrnateFrame from './UI/OrnateFrame'

const stats = [
  { name: 'Max HP (Backend Solidity)', value: '22,450', percentage: 80, desc: 'Robustness and scalability of server-side architecture (Java & Spring Boot)' },
  { name: 'ATK (Frontend Agility)', value: '2,340', percentage: 70, desc: 'Speed and reactivity of UI/UX rendering (React & Tailwind)' },
  { name: 'DEF (Bug Resistance)', value: '1,120', percentage: 75, desc: 'Error isolation, containerization, and test coverage (Docker & Postgres)' },
  { name: 'Elemental Mastery (TS/JS Synergy)', value: '380', percentage: 65, desc: 'Modularity, type safety, and clean code integration (TypeScript)' },
]

const talents = [
  {
    name: 'Normal Attack: Code Refactor',
    type: 'Normal Attack',
    description: 'Performs up to 5 consecutive refactoring strikes to eliminate code smells, optimize performance, and enhance codebase legibility.',
    detail: 'Refactor strike DMG: 112% \nClean Code Rate: +25% \nExecution Time reduction: 12%',
    icon: '⚔️'
  },
  {
    name: 'Elemental Skill: Spring Injection',
    type: 'Elemental Skill',
    description: 'Deploys an IOC Container to perform automated dependency injection. Grants nearby context the "Enterprise Layer" buff, increasing development efficiency by 45%.',
    detail: 'Spring Boot Buff: +45% system reliability \nStartup Time Optimization: 1.2s \nREST Endpoint deployment speed: +80%',
    icon: '🌱'
  },
  {
    name: 'Elemental Burst: Fontaine Hydro Container',
    type: 'Elemental Burst',
    description: 'Summons an isolated Docker Container to neutralize environment discrepancies. Instantly builds compilation pipelines, exposing active services onto production ports.',
    detail: 'Isolasi Dependency Rate: 100% \nContainer startup speed: 1.8s \nDeployment Stability: +90%',
    icon: '🐳'
  },
  {
    name: 'Passive Talent: Autodidact Path',
    type: 'Passive Talent',
    description: 'Constantly parses technical documentations and libraries. When self-teaching new technologies, the learning efficiency is increased by 30%.',
    detail: 'Self-learning speed: +30% \nBug-solving speed: +20%',
    icon: '📖'
  }
]

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeTab, setActiveTab] = useState<'attributes' | 'talents'>('attributes')
  const [selectedTalent, setSelectedTalent] = useState(0)

  return (
    <section id="about" className="relative py-24 md:py-32 px-6">
      {/* Decorative side gears/watermarks */}
      <div className="absolute top-1/4 left-4 w-40 h-40 border border-fontaine-cyan/5 rounded-full pointer-events-none z-0 rotate-45 select-none" />
      <div className="absolute bottom-1/4 right-4 w-60 h-60 border border-fontaine-gold/5 rounded-full pointer-events-none z-0 -rotate-12 select-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-display text-fontaine-gold text-sm tracking-[0.3em] mb-3">
            ─── CHARACTER INFORMATION ───
          </p>
          <h2 className="font-heading text-3xl md:text-5xl text-fontaine-light-gold">
            Sang <span className="text-gradient-gold">Pengembara</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Character Card + Equipment */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Ornate Portrait Card */}
            <OrnateFrame variant="gold" className="max-w-sm mx-auto lg:mx-0" padding="p-4">
              <div className="relative aspect-[3/3.8] rounded-lg overflow-hidden bg-gradient-to-b from-fontaine-teal/20 via-fontaine-deep-navy to-fontaine-navy flex flex-col justify-between p-4">
                <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-fontaine-gold/30" />
                <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-fontaine-gold/30" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-fontaine-gold/30" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-fontaine-gold/30" />

                {/* Level / Friendship info overlay */}
                <div className="flex justify-between items-start z-10">
                  <div className="px-2 py-0.5 rounded bg-fontaine-navy/80 border border-fontaine-cyan/20 text-[10px] text-fontaine-cyan font-mono">
                    Lv. 90/90
                  </div>
                  <div className="px-2 py-0.5 rounded bg-fontaine-navy/80 border border-fontaine-gold/20 text-[10px] text-fontaine-light-gold font-mono">
                    ❤️ Friendship 10
                  </div>
                </div>

                {/* Picture and name */}
                <div className="flex-grow flex items-center justify-center py-4">
                  <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-fontaine-gold shadow-lg shadow-fontaine-gold/10">
                    <img 
                      src="/im.jpg" 
                      alt="Yudistira Syaputra" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                <div className="text-center z-10 border-t border-fontaine-cyan/10 pt-3">
                  <p className="font-heading text-fontaine-light-gold text-xl tracking-wide font-semibold">
                    Yudistira Syaputra
                  </p>
                  <p className="text-fontaine-cream/50 text-xs mt-1">
                    Universitas Nasional Pasim &bull; Semester 4
                  </p>
                  <div className="flex justify-center gap-1 mt-2 text-fontaine-gold text-sm">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
            </OrnateFrame>

            {/* Equipment slots (Social Links) */}
            <div className="max-w-sm mx-auto lg:mx-0 space-y-3">
              <p className="text-xs text-fontaine-cyan/60 uppercase tracking-widest font-mono pl-1">
                ✦ Equipped Gear
              </p>
              
              {/* GitHub Weapon slot */}
              <a
                href="https://github.com/YuuAshura"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 bg-fontaine-navy/60 border border-fontaine-gold/30 hover:border-fontaine-gold hover:bg-fontaine-teal/10 rounded-xl transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-fontaine-gold/30 to-fontaine-navy border border-fontaine-gold/50 flex items-center justify-center text-xl text-fontaine-gold">
                  🗡️
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-fontaine-light-gold">GitHub Domain (Weapon)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-fontaine-gold/20 text-fontaine-gold font-mono">R5</span>
                  </div>
                  <p className="text-xs text-fontaine-cream/50 mt-0.5">Lv. 90 &bull; Catalyst: mechanical_keyboard.dll</p>
                </div>
              </a>

              {/* LinkedIn Artifact slot */}
              <a
                href="https://linkedin.com/in/yudistira-syaputra-b0978b343"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 bg-fontaine-navy/60 border border-fontaine-cyan/20 hover:border-fontaine-cyan hover:bg-fontaine-teal/10 rounded-xl transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-fontaine-cyan/30 to-fontaine-navy border border-fontaine-cyan/50 flex items-center justify-center text-xl text-fontaine-cyan">
                  🌸
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-fontaine-light-gold">LinkedIn Network (Artifact)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-fontaine-cyan/20 text-fontaine-cyan font-mono">+20</span>
                  </div>
                  <p className="text-xs text-fontaine-cream/50 mt-0.5">Flower of Life &bull; Connections & Opportunities</p>
                </div>
              </a>

              {/* Instagram Artifact slot */}
              <a
                href="https://instagram.com/Yudis.Ashura"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 bg-fontaine-navy/60 border border-fontaine-cyan/20 hover:border-fontaine-cyan hover:bg-fontaine-teal/10 rounded-xl transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-fontaine-cyan/30 to-fontaine-navy border border-fontaine-cyan/50 flex items-center justify-center text-xl text-fontaine-cyan">
                  🪶
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-fontaine-light-gold">Instagram Feed (Artifact)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-fontaine-cyan/20 text-fontaine-cyan font-mono">+20</span>
                  </div>
                  <p className="text-xs text-fontaine-cream/50 mt-0.5">Plume of Death &bull; Daily Adventure Records</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Tab Panel (Stats, Talents, Story) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Lore/Intro card */}
            <div className="glass-card p-6 border-l-4 border-fontaine-gold">
              <h3 className="font-heading text-xl text-fontaine-gold mb-3 flex items-center gap-2">
                <span>✦</span> Perjalanan Sang Developer
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

            {/* Interactive Panel Tabs */}
            <div className="bg-fontaine-navy/40 border border-fontaine-cyan/15 rounded-xl overflow-hidden shadow-lg">
              
              {/* Tab Header */}
              <div className="flex border-b border-fontaine-cyan/15 bg-fontaine-navy/80">
                <button
                  onClick={() => setActiveTab('attributes')}
                  className={`flex-1 py-4 text-center text-sm font-semibold tracking-wider transition-all duration-300 border-b-2 ${
                    activeTab === 'attributes'
                      ? 'text-fontaine-gold border-fontaine-gold bg-fontaine-gold/5'
                      : 'text-fontaine-cream/40 border-transparent hover:text-fontaine-cream/70 hover:bg-white/5'
                  }`}
                >
                  ATTRIBUTES (STATS)
                </button>
                <button
                  onClick={() => setActiveTab('talents')}
                  className={`flex-1 py-4 text-center text-sm font-semibold tracking-wider transition-all duration-300 border-b-2 ${
                    activeTab === 'talents'
                      ? 'text-fontaine-gold border-fontaine-gold bg-fontaine-gold/5'
                      : 'text-fontaine-cream/40 border-transparent hover:text-fontaine-cream/70 hover:bg-white/5'
                  }`}
                >
                  TALENTS (ACTIVE SKILLS)
                </button>
              </div>

              {/* Tab Body */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'attributes' ? (
                    <motion.div
                      key="attributes"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-5"
                    >
                      <h4 className="text-xs font-mono uppercase tracking-widest text-fontaine-cyan/70">
                        ⚡ Developer Attributes Details
                      </h4>
                      <div className="space-y-4">
                        {stats.map((stat) => (
                          <div key={stat.name} className="space-y-1 group">
                            <div className="flex justify-between text-xs md:text-sm">
                              <span className="text-fontaine-light-gold font-medium">{stat.name}</span>
                              <span className="text-fontaine-cyan font-semibold font-mono">{stat.value}</span>
                            </div>
                            <div className="h-2 rounded-full bg-fontaine-navy/90 overflow-hidden p-[1px] border border-fontaine-cyan/10">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-fontaine-teal via-fontaine-cyan to-fontaine-light-gold transition-all duration-1000"
                                style={{ width: inView ? `${stat.percentage}%` : '0%' }}
                              />
                            </div>
                            <p className="text-[10px] text-fontaine-cream/40 group-hover:text-fontaine-cream/70 transition-colors duration-200 pl-1 leading-relaxed">
                              {stat.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="talents"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid md:grid-cols-12 gap-6"
                    >
                      {/* Talent selector icons */}
                      <div className="md:col-span-4 flex md:flex-col gap-3 justify-center md:justify-start">
                        {talents.map((talent, idx) => (
                          <button
                            key={talent.name}
                            onClick={() => setSelectedTalent(idx)}
                            className={`w-full p-2.5 rounded-lg border flex items-center gap-3 transition-all duration-300 text-left ${
                              selectedTalent === idx
                                ? 'bg-fontaine-teal/30 border-fontaine-cyan text-fontaine-cyan'
                                : 'bg-fontaine-navy/40 border-fontaine-cyan/15 text-fontaine-cream/60 hover:text-fontaine-cream hover:bg-white/5'
                            }`}
                          >
                            <span className="text-xl">{talent.icon}</span>
                            <div className="hidden md:block">
                              <p className="text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-32">
                                {talent.name.split(':')[1]?.trim() || talent.name}
                              </p>
                              <p className="text-[9px] opacity-50">{talent.type}</p>
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Selected Talent detail display */}
                      <div className="md:col-span-8 bg-fontaine-navy/50 border border-fontaine-cyan/15 rounded-lg p-5 flex flex-col justify-between min-h-[200px]">
                        <div>
                          <div className="flex justify-between items-start border-b border-fontaine-cyan/10 pb-2 mb-3">
                            <h4 className="font-heading text-base font-semibold text-fontaine-light-gold">
                              {talents[selectedTalent].name}
                            </h4>
                            <span className="text-[10px] text-fontaine-cyan bg-fontaine-teal/20 px-2 py-0.5 rounded font-mono uppercase">
                              {talents[selectedTalent].type}
                            </span>
                          </div>
                          <p className="text-xs text-fontaine-cream/70 leading-relaxed italic mb-4">
                            &ldquo;{talents[selectedTalent].description}&rdquo;
                          </p>
                        </div>
                        <div className="bg-black/30 rounded p-3 border border-fontaine-gold/10">
                          <p className="text-[10px] uppercase font-mono tracking-wider text-fontaine-gold mb-1">
                            ✦ Skill Attributes:
                          </p>
                          <pre className="text-xs text-fontaine-cream/60 font-sans leading-relaxed whitespace-pre-line">
                            {talents[selectedTalent].detail}
                          </pre>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

