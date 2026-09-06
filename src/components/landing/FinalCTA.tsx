import { CapsuleSVG } from '@/components/ui/CapsuleSVG'
import Link from 'next/link'

export function FinalCTA() {
  return (
    <section className="py-32 md:py-48 px-5 md:px-10 text-center">
      <div className="max-w-2xl mx-auto anim-slide-up">
        <div className="mb-10 capsule-float inline-block">
          <CapsuleSVG className="w-24 h-24 mx-auto" state="empty" />
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Ready to disappear?
        </h2>
        <p className="text-[#c5c5d6] text-lg mb-10">
          Create a free inbox in one click. No signup required.
        </p>
        <Link href="/app" className="inline-flex items-center justify-center gap-2 bg-[#6C87FF] text-white font-body font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-all duration-300 group">
          Create free inbox
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </div>
    </section>
  )
}
