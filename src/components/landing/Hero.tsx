import { PrimaryButton, SecondaryButton } from '@/components/ui/PrimaryButton'
import { CapsuleSVG } from '@/components/ui/CapsuleSVG'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 md:px-16 overflow-hidden">
      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-16 py-6 z-10">
        <div className="font-display text-xl font-bold tracking-tight text-white">MIKE</div>
        <div className="hidden md:flex items-center gap-8 text-sm text-[#AEB0B4]">
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
        </div>
        <Link href="/app">
          <PrimaryButton size="sm">Open MIKE</PrimaryButton>
        </Link>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mt-20 md:mt-0">
        {/* Capsule */}
        <div className="mb-12 md:mb-16 anim-scale-in">
          <div className="capsule-float inline-block">
            <CapsuleSVG className="w-32 h-32 md:w-48 md:h-48 mx-auto" state="empty" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6 anim-slide-up-delay-1">
          Here when you need it.
          <br />
          <span className="text-[#6C87FF]">Gone when you don&apos;t.</span>
        </h1>

        {/* Subhead */}
        <p className="text-[#AEB0B4] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed anim-slide-up-delay-2">
          MIKE gives you a real inbox — read, understood, and organized by AI — for exactly as long as you need it. Then it disappears.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 anim-slide-up-delay-3">
          <Link href="/app">
            <PrimaryButton size="lg">Create free inbox</PrimaryButton>
          </Link>
          <a href="#how-it-works">
            <SecondaryButton size="lg">See how MIKE works</SecondaryButton>
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 anim-fade-in" style={{ animationDelay: '1.2s' }}>
        <div className="capsule-float">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6E7075" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6C87FF] opacity-[0.03] blur-[120px] pointer-events-none" />
    </section>
  )
}
