'use client'
import { useInboxStore } from '@/lib/store'
import { useNotesStore, useTodoStore } from '@/lib/store'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState, Suspense } from 'react'

function AIPanelInner() {
  const searchParams = useSearchParams()
  const messageId = searchParams.get('id')
  const router = useRouter()
  const { messages } = useInboxStore()
  const { createNote } = useNotesStore()
  const { createTodo } = useTodoStore()
  const message = messages.find(m => m.id === messageId)
  const [copied, setCopied] = useState(false)

  if (!message?.ai || message.ai.status === 'idle') {
    return (
      <div className="p-6 text-center">
        <p className="text-xs text-[#6E7075]">AI hasn&apos;t looked at this message yet</p>
      </div>
    )
  }

  if (message.ai.status === 'loading') {
    return (
      <div className="p-6 space-y-4">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-20 w-full" />
      </div>
    )
  }

  if (message.ai.status === 'failure') {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-[#F16B7E] mb-2">AI couldn&apos;t process this message</p>
        <p className="text-xs text-[#6E7075]">{message.ai.error || 'Try again later'}</p>
      </div>
    )
  }

  const handleCopyCode = async () => {
    if (!message.ai?.verificationCode) return
    await navigator.clipboard.writeText(message.ai.verificationCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSaveNote = () => {
    createNote({ title: message.subject, content: message.ai?.summary || message.preview, sourceMessageId: message.id })
    router.push('/app/notes/')
  }

  const handleCreateTodo = () => {
    createTodo({ title: `Follow up: ${message.subject}`, sourceMessageId: message.id })
    router.push('/app/todo/')
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-[#6C87FF] flex items-center justify-center">
          <span className="text-[10px] font-bold text-white">AI</span>
        </div>
        <span className="text-xs font-medium text-[#AEB0B4]">AI Insight</span>
      </div>

      {message.ai.summary && (
        <div className="p-3 rounded-[12px] bg-[#0B0C0E] border border-[#26282C]">
          <p className="text-sm text-[#AEB0B4] leading-relaxed">
            <span className="text-[#6C87FF] font-medium">{message.ai.senderContext || 'Message'}</span>
            {' '}{message.ai.summary}
          </p>
        </div>
      )}

      {message.ai.verificationCode && (
        <div className="p-4 rounded-[12px] bg-[#6C87FF]/10 border border-[#6C87FF]/30 text-center">
          <p className="text-[10px] uppercase tracking-[0.1em] text-[#6C87FF] mb-2 font-medium">Verification code</p>
          <p className="font-mono text-2xl font-bold tracking-[0.1em] text-white mb-2">{message.ai.verificationCode}</p>
          <button onClick={handleCopyCode} className="text-xs text-[#6C87FF] font-medium hover:underline">
            {copied ? 'Copied!' : 'Copy code'}
          </button>
        </div>
      )}

      {message.ai.extractedLinks && message.ai.extractedLinks.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-[0.1em] text-[#6E7075] font-medium">Extracted links</p>
          {message.ai.extractedLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-[8px] bg-[#0B0C0E] border border-[#26282C] hover:border-[#6C87FF]/30 transition-colors"
            >
              <p className="text-xs font-medium text-[#AEB0B4]">{link.label || link.url}</p>
              {link.purpose && <p className="text-[10px] text-[#6E7075]">{link.purpose}</p>}
            </a>
          ))}
        </div>
      )}

      <div className="space-y-2 pt-2">
        <button onClick={handleSaveNote} className="w-full text-left px-3 py-2 text-xs text-[#AEB0B4] rounded-[8px] hover:bg-[#1E2024] transition-colors">
          Save to Notes →
        </button>
        <button onClick={handleCreateTodo} className="w-full text-left px-3 py-2 text-xs text-[#AEB0B4] rounded-[8px] hover:bg-[#1E2024] transition-colors">
          Create Todo →
        </button>
      </div>
    </div>
  )
}

export function AIPanel() {
  return (
    <Suspense fallback={<div className="p-6"><div className="skeleton h-4 w-3/4" /></div>}>
      <AIPanelInner />
    </Suspense>
  )
}
