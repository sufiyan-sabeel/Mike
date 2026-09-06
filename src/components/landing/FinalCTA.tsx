import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { CapsuleSVG } from '@/components/ui/CapsuleSVG'
import Link from 'next/link'

export function FinalCTA() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-16 text-center">
      <div className="max-w-2xl mx-auto anim-slide-up">
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
      </div>
    </section>
  )
}
