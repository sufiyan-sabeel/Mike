import { Hero } from '@/components/landing/Hero'
import { ProductDemo } from '@/components/landing/ProductDemo'
import { AISection } from '@/components/landing/AISection'
import { NotesTodoSection } from '@/components/landing/NotesTodoSection'
import { PrivacySection } from '@/components/landing/PrivacySection'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { FinalCTA } from '@/components/landing/FinalCTA'
import { Footer } from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0C0E]">
      <Hero />
      <ProductDemo />
      <AISection />
      <NotesTodoSection />
      <PrivacySection />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </main>
  )
}
