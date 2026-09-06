'use client'
import { useInboxStore } from '@/lib/store'
import { formatExpiry } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function TopBar() {
  const { inbox, deleteInbox } = useInboxStore()
  const [timeLeft, setTimeLeft] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!inbox) return
    const update = () => setTimeLeft(formatExpiry(inbox.expiresAt))
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [inbox])

  const handleCopy = async () => {
    if (!inbox) return
    await navigator.clipboard.writeText(inbox.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!inbox) return null

  return (
    <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-[#17181C] border-b border-[#26282C]">
      {/* Address chip */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B0C0E] border border-[#26282C] hover:border-[#6C87FF]/50 transition-colors group"
        aria-label={`Copy email address: ${inbox.address}`}
      >
        <span className="font-mono text-sm text-[#AEB0B4] group-hover:text-white transition-colors">{inbox.address}</span>
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3FC98C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6E7075" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        )}
      </button>

      {/* Countdown */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#0B0C0E] border border-[#26282C]">
        <div className={`w-2 h-2 rounded-full ${timeLeft === 'Expired' ? 'bg-[#F16B7E]' : 'bg-[#3FC98C]'}`} />
        <span className="font-mono text-xs text-[#6E7075]">{timeLeft}</span>
      </div>

      {/* AI toggle */}
      <div className="ml-auto flex items-center gap-2">
        <span className="text-xs text-[#6E7075]">AI</span>
        <div className="w-8 h-5 rounded-full bg-[#6C87FF] relative cursor-pointer">
          <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-all" />
        </div>
      </div>

      {/* Actions */}
      <button
        onClick={deleteInbox}
        className="p-2 rounded-[8px] text-[#6E7075] hover:text-[#F16B7E] hover:bg-[#F16B7E]/10 transition-colors"
        aria-label="Delete inbox"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
      </button>
    </div>
  )
}
