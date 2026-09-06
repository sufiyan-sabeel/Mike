'use client'
import { useInboxStore } from '@/lib/store'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function AIPage() {
  const { messages } = useInboxStore()
  const aiMessages = messages.filter(m => m.ai && m.ai.status === 'success')

  return (
    <div className="flex-1 flex flex-col">
      <div className="px-6 py-4 border-b border-[#26282C]">
        <h2 className="text-sm font-semibold">AI Inbox</h2>
        <p className="text-xs text-[#6E7075] mt-0.5">AI-analyzed insights from your messages</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {aiMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#6C87FF]/10 flex items-center justify-center mb-4">
              <div className="w-6 h-6 rounded-full bg-[#6C87FF] flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">AI</span>
              </div>
            </div>
            <p className="text-sm text-[#AEB0B4] font-medium mb-1">No AI insights yet</p>
            <p className="text-xs text-[#6E7075] max-w-xs">Send an email to your inbox and AI will automatically analyze it</p>
          </div>
        ) : (
          <div className="divide-y divide-[#26282C]">
            {aiMessages.map((msg) => (
              <Link
                key={msg.id}
                href={`/app/inbox/${msg.id}`}
                className="block px-6 py-5 hover:bg-[#1E2024] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#6C87FF]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-[#6C87FF]">AI</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">{msg.sender}</span>
                      <span className="text-[10px] text-[#6E7075]">{formatDate(msg.timestamp)}</span>
                    </div>
                    {msg.ai?.summary && (
                      <p className="text-sm text-[#AEB0B4] leading-relaxed mb-2">{msg.ai.summary}</p>
                    )}
                    {msg.ai?.verificationCode && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#6C87FF]/10 border border-[#6C87FF]/20">
                        <span className="font-mono text-xs font-semibold text-[#6C87FF]">{msg.ai.verificationCode}</span>
                        <span className="text-[10px] text-[#6C87FF]">code</span>
                      </div>
                    )}
                    {msg.ai?.extractedLinks && msg.ai.extractedLinks.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {msg.ai.extractedLinks.map((link, i) => (
                          <span key={i} className="text-[10px] text-[#6E7075] bg-[#1E2024] px-2 py-0.5 rounded">
                            {link.label || 'link'}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
