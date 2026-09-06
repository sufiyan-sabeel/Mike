'use client'
import { useInboxStore } from '@/lib/store'
import { formatExpiry } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function AddressCard() {
  const { inbox } = useInboxStore()
  const [timeLeft, setTimeLeft] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!inbox) return
    const update = () => setTimeLeft(formatExpiry(inbox.expiresAt))
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [inbox])

  if (!inbox) return null

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inbox.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="md:hidden flex items-center gap-2 px-4 py-3 bg-[#1f2022] border-b border-[#444653]/30">
      <button onClick={handleCopy} className="flex-1 flex items-center gap-2 min-w-0">
        <span className="font-mono text-xs text-[#c5c5d6] truncate">{inbox.address}</span>
        {copied ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3FC98C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8e909f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        )}
      </button>
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#121315] border border-[#444653]/30">
        <div className={`w-1.5 h-1.5 rounded-full ${timeLeft === 'Expired' ? 'bg-[#F16B7E]' : 'bg-[#3FC98C]'}`} />
        <span className="font-mono text-[10px] text-[#8e909f]">{timeLeft}</span>
      </div>
    </div>
  )
}
