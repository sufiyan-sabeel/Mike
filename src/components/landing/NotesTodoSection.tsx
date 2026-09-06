'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function NotesTodoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 md:py-40 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#6C87FF] mb-4">Workspace</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Beyond the inbox
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notes card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#17181C] border border-[#26282C] rounded-[24px] p-8"
          >
            <div className="w-10 h-10 rounded-[12px] bg-[#6C87FF]/15 flex items-center justify-center mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C87FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">Notes</h3>
            <p className="text-sm text-[#AEB0B4] leading-relaxed mb-6">
              Save the important bits before your inbox expires. Turn any email into a note with one tap.
            </p>
            <div className="space-y-2">
              {['GitHub verification code: 482913', 'Vercel deploy URL ready', 'API key rotation needed'].map((note, i) => (
                <div key={i} className="px-3 py-2 rounded-[8px] bg-[#0B0C0E] border border-[#26282C] text-xs text-[#AEB0B4] truncate">
                  {note}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Todo card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#17181C] border border-[#26282C] rounded-[24px] p-8"
          >
            <div className="w-10 h-10 rounded-[12px] bg-[#3FC98C]/15 flex items-center justify-center mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3FC98C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">Todo</h3>
            <p className="text-sm text-[#AEB0B4] leading-relaxed mb-6">
              MIKE detects action items in emails and suggests tasks. Never miss a follow-up.
            </p>
            <div className="space-y-2">
              {[
                { text: 'Complete email verification', done: true },
                { text: 'Set up 2FA on GitHub', done: false },
                { text: 'Review API documentation', done: false },
              ].map((todo, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-[8px] bg-[#0B0C0E] border border-[#26282C]">
                  <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${todo.done ? 'border-[#3FC98C] bg-[#3FC98C]' : 'border-[#6E7075]'}`} />
                  <span className={`text-xs ${todo.done ? 'text-[#6E7075] line-through' : 'text-[#AEB0B4]'}`}>{todo.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
