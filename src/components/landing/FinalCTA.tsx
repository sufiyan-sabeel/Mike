'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { CapsuleSVG } from '@/components/ui/CapsuleSVG'
import Link from 'next/link'

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-32 md:py-48 px-6 md:px-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-10 capsule-float inline-block">
          <CapsuleSVG className="w-24 h-24 mx-auto" state="empty" />
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Ready to disappear?
        </h2>
        <p className="text-[#AEB0B4] text-lg mb-10">
          Create a free inbox in one click. No signup required.
        </p>
        <Link href="/app">
          <PrimaryButton size="lg">Create free inbox</PrimaryButton>
        </Link>
      </motion.div>
    </section>
  )
}
