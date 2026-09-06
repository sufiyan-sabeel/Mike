import type { Metadata } from 'next'
import { FloatingNav } from '@/components/app/FloatingNav'
import { BottomNav } from '@/components/app/BottomNav'
import { TopBar } from '@/components/app/TopBar'
import { AddressCard } from '@/components/inbox/AddressCard'
import { InboxInitializer } from '@/components/app/InboxInitializer'

export const metadata: Metadata = {
  title: 'MIKE — Inbox',
  robots: { index: false, follow: false },
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#121315] flex flex-col">
      <InboxInitializer />
      <AddressCard />
      <TopBar />
      <div className="flex-1 flex md:ml-[88px]">
        <FloatingNav />
        <main className="flex-1 flex flex-col min-h-screen pb-16 md:pb-0">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
