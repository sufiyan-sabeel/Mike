import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MIKE — Temporary Email, Intelligent Inbox',
  description: 'A temporary digital workspace. Real inbox, AI-powered understanding, notes, and tasks — for exactly as long as you need it.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
      </body>
    </html>
  )
}
