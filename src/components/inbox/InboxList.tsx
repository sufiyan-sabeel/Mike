'use client'
import { useInboxStore } from '@/lib/store'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function InboxList() {
  const { messages, selectedMessageId, selectMessage } = useInboxStore()

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#292a2c] flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8e909f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
            <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>
          </svg>
        </div>
        <p className="text-sm text-[#c5c5d6] font-medium">Waiting for your first message</p>
        <p className="text-xs text-[#8e909f] mt-1">Send an email to your temporary address</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto" role="list" aria-label="Inbox messages">
      {messages.map((msg) => (
        <Link
          key={msg.id}
          href={`/app/inbox/view/?id=${msg.id}`}
          onClick={() => selectMessage(msg.id)}
          className={cn(
            'block px-5 py-4 border-b border-[#444653]/30 transition-colors hover:bg-[#292a2c]',
            selectedMessageId === msg.id && 'bg-[#6C87FF]/5 border-l-2 border-l-[#6C87FF]'
          )}
          role="listitem"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                {!msg.read && <div className="w-2 h-2 rounded-full bg-[#6C87FF] flex-shrink-0" />}
                <span className={cn('text-sm font-medium truncate', msg.read ? 'text-[#c5c5d6]' : 'text-[#e3e2e5]')}>{msg.sender}</span>
              </div>
              <p className="text-sm text-[#c5c5d6] truncate">{msg.subject}</p>
              <p className="text-xs text-[#8e909f] truncate mt-0.5">{msg.preview}</p>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className="text-[10px] text-[#8e909f]">{formatDate(msg.timestamp)}</span>
              {msg.ai?.verificationCode && (
                <span className="font-mono text-[10px] font-semibold text-[#6C87FF] bg-[#6C87FF]/10 px-1.5 py-0.5 rounded">
                  {msg.ai.verificationCode}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
