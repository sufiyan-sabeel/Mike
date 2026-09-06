'use client'
import { useInboxStore } from '@/lib/store'
import { formatDate } from '@/lib/utils'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SecondaryButton } from '@/components/ui/PrimaryButton'
import { useNotesStore } from '@/lib/store'
import { useTodoStore } from '@/lib/store'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function EmailViewerInner() {
  const searchParams = useSearchParams()
  const messageId = searchParams.get('id')
  const router = useRouter()
  const { messages, markRead } = useInboxStore()
  const { createNote } = useNotesStore()
  const { createTodo } = useTodoStore()
  const message = messages.find(m => m.id === messageId)

  if (message && !message.read) {
    markRead(message.id)
  }

  if (!message) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-sm text-[#8e909f]">Message not found</p>
      </div>
    )
  }

  const handleSaveToNotes = () => {
    createNote({
      title: message.subject,
      content: message.textBody || message.preview,
      sourceMessageId: message.id,
    })
    router.push('/app/notes/')
  }

  const handleCreateTodo = () => {
    createTodo({
      title: message.subject,
      sourceMessageId: message.id,
    })
    router.push('/app/todo/')
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#444653]/30">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => router.back()} className="p-1.5 rounded-lg hover:bg-[#292a2c] text-[#8e909f] md:hidden">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className="w-10 h-10 rounded-full bg-[#6C87FF]/15 flex items-center justify-center text-sm font-bold text-[#6C87FF]">
            {message.sender.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-[#e3e2e5] truncate">{message.sender}</h2>
            <p className="text-xs text-[#8e909f]">{message.senderEmail} · {formatDate(message.timestamp)}</p>
          </div>
        </div>
        <h1 className="text-lg font-semibold">{message.subject}</h1>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6">
        {message.htmlBody ? (
          <div
            className="email-sandboxed"
            dangerouslySetInnerHTML={{ __html: message.htmlBody }}
          />
        ) : (
          <div className="text-sm text-[#c5c5d6] leading-relaxed whitespace-pre-wrap">
            {message.textBody || message.preview}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t border-[#444653]/30 flex items-center gap-3">
        <PrimaryButton size="sm" onClick={handleSaveToNotes}>Save to Notes</PrimaryButton>
        <SecondaryButton size="sm" onClick={handleCreateTodo}>Create Todo</SecondaryButton>
      </div>
    </div>
  )
}

export function EmailViewer() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center"><div className="skeleton h-8 w-48" /></div>}>
      <EmailViewerInner />
    </Suspense>
  )
}
