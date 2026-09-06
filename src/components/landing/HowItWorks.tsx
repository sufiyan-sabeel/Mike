'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  { num: '01', label: 'Create an inbox', desc: 'One click generates a real, working email address.' },
  { num: '02', label: 'Use it anywhere', desc: 'Sign up, verify, download — without giving out your real email.' },
  { num: '03', label: 'AI understands', desc: 'Codes, links, and action items are surfaced automatically.' },
  { num: '04', label: 'Save what matters', desc: 'Convert emails to notes or tasks before the inbox expires.' },
  { num: '05', label: 'It disappears', desc: 'When you\'re done, the inbox and its contents are deleted.' },
]

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 md:py-40 px-6 md:px-16" id="how-it-works">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#6C87FF] mb-4">How it works</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Five steps. No signup.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <span className="font-mono text-3xl font-bold text-[#6C87FF]/30">{step.num}</span>
              <h3 className="font-display text-lg font-semibold mt-2 mb-2">{step.label}</h3>
              <p className="text-sm text-[#AEB0B4] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
