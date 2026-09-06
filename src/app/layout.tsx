import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MIKE — Temporary Email, Intelligent Inbox',
  description: 'A temporary digital workspace. Real inbox, AI-powered understanding, notes, and tasks — for exactly as long as you need it.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
