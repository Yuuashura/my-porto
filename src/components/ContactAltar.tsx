import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import WishButton from './UI/WishButton'
import OrnateFrame from './UI/OrnateFrame'

export default function ContactAltar() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-display text-fontaine-gold text-sm tracking-[0.3em] mb-3">
            ─── CONTACT ALTAR ───
          </p>
          <h2 className="font-heading text-3xl md:text-5xl text-fontaine-light-gold">
            Kirim <span className="text-gradient-gold">Wish</span>
          </h2>
          <p className="text-fontaine-cream/50 mt-4 max-w-lg mx-auto text-sm">
            Punya pertanyaan, proyek, atau sekadar ingin terhubung? Kirimkan wish-mu melalui
            altar ini.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <OrnateFrame variant="cyan" className="max-w-2xl mx-auto">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-fontaine-cyan/70 mb-1.5">
                    Nama Traveler
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name..."
                    className="w-full px-4 py-3 rounded-lg bg-fontaine-navy/60 border border-fontaine-cyan/20 text-fontaine-cream placeholder-fontaine-cream/30 text-sm focus:outline-none focus:border-fontaine-cyan/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-fontaine-cyan/70 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-fontaine-navy/60 border border-fontaine-cyan/20 text-fontaine-cream placeholder-fontaine-cream/30 text-sm focus:outline-none focus:border-fontaine-cyan/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-fontaine-cyan/70 mb-1.5">
                  Domain (Subject)
                </label>
                <input
                  type="text"
                  placeholder="Project collaboration, question, etc..."
                  className="w-full px-4 py-3 rounded-lg bg-fontaine-navy/60 border border-fontaine-cyan/20 text-fontaine-cream placeholder-fontaine-cream/30 text-sm focus:outline-none focus:border-fontaine-cyan/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-fontaine-cyan/70 mb-1.5">
                  Pesan
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tulis pesanmu di sini..."
                  className="w-full px-4 py-3 rounded-lg bg-fontaine-navy/60 border border-fontaine-cyan/20 text-fontaine-cream placeholder-fontaine-cream/30 text-sm focus:outline-none focus:border-fontaine-cyan/50 transition-colors resize-none"
                />
              </div>

              <div className="text-center pt-2">
                <WishButton type="submit" variant="gold">
                  {sent ? '✦ Wish Granted!' : '✦ Kirim Wish'}
                </WishButton>
              </div>

              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-fontaine-cyan text-sm"
                >
                  ✦ Wish-mu telah dikirim ke altar! Akan dijawab segera.
                </motion.p>
              )}
            </form>
          </OrnateFrame>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="font-heading text-fontaine-cream/40 text-sm">
            support@yudistira.dev
          </p>
          <p className="font-heading text-fontaine-cream/30 text-xs mt-1">
            © 2026 Yudistira Syaputra — Vision Developer
          </p>
        </motion.div>
      </div>
    </section>
  )
}
