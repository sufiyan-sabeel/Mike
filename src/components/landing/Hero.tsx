import Link from 'next/link'
import { CapsuleSVG } from '@/components/ui/CapsuleSVG'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#121315]/80 backdrop-blur-md border-b border-[#444653]/20">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto px-5 md:px-10 h-16">
          <a className="font-display text-lg font-bold tracking-tighter text-[#e3e2e5]" href="#">MIKE</a>
          <nav className="hidden md:flex gap-6 items-center font-body text-sm">
            <a className="text-[#6C87FF] font-semibold border-b-2 border-[#6C87FF] pb-1" href="#">Product</a>
            <a className="text-[#c5c5d6] hover:text-[#6C87FF] transition-colors duration-300" href="#features">Features</a>
            <a className="text-[#c5c5d6] hover:text-[#6C87FF] transition-colors duration-300" href="#privacy">Security</a>
            <a className="text-[#c5c5d6] hover:text-[#6C87FF] transition-colors duration-300" href="#how-it-works">How It Works</a>
          </nav>
          <Link href="/app" className="font-body text-sm bg-[#292a2c] border border-[#444653]/30 text-[#e3e2e5] px-6 py-2 rounded-full hover:bg-[#38393b] transition-all duration-300">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-5 md:px-10 py-20 md:py-32 max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-12 md:mt-24 w-full">
          {/* Text Content */}
          <div className="flex flex-col gap-6 order-2 lg:order-1 max-w-[600px]">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] text-[#e3e2e5] anim-slide-up">
              Here when you need it.
              <br />
              <span className="text-[#c5c5d6]">Gone when you don&apos;t.</span>
            </h1>
            <p className="font-body text-lg text-[#c5c5d6] max-w-[500px] leading-relaxed anim-slide-up-delay-1">
              MIKE gives you a real inbox — read, understood, and organized by AI — for exactly as long as you need it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 anim-slide-up-delay-2">
              <Link href="/app" className="bg-[#6C87FF] text-white font-body font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 group">
                Create free inbox
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
              <a href="#how-it-works" className="border border-[#444653] text-[#e3e2e5] font-body px-8 py-4 rounded-full flex items-center justify-center hover:bg-[#292a2c] hover:border-[#8e909f] transition-all duration-300">
                See how it works
              </a>
            </div>

            {/* Terminal Widget */}
            <div className="mt-8 bg-[#1b1c1e] border border-[#444653]/20 rounded-xl p-4 font-mono text-sm text-[#c5c5d6] flex items-center shadow-[0_20px_50px_rgba(108,135,255,0.05)] anim-slide-up-delay-3">
              <span className="text-[#6C87FF] mr-2">root@mike:~#</span>
              <span>Generating secure endpoint...</span>
              <span className="inline-block w-2 h-4 bg-[#b8c3ff] ml-1 animate-pulse" />
            </div>
          </div>

          {/* Capsule Visual */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative h-[400px] lg:h-[600px] w-full anim-scale-in">
            <div className="absolute inset-0 bg-[#6d88ff]/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="capsule-float relative z-10 flex items-center justify-center w-full h-full">
              <CapsuleSVG className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80" state="empty" />
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}
