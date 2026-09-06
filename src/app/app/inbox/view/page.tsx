'use client'
import { EmailViewer } from '@/components/email/EmailViewer'
import { AIPanel } from '@/components/ai/AIPanel'
import { useUIStore } from '@/lib/store'

export default function MessageViewPage() {
  const { aiPanelOpen, toggleAIPanel } = useUIStore()

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
      <EmailViewer />

      {/* AI Panel - desktop sidebar */}
      <div className={`hidden md:flex flex-col w-80 border-l border-[#444653]/30 bg-[#1b1c1e] ${aiPanelOpen ? '' : 'hidden'}`}>
        <AIPanel />
      </div>

      {/* AI Panel toggle */}
      <button
        onClick={toggleAIPanel}
        className="hidden md:flex fixed right-6 bottom-6 z-40 w-12 h-12 rounded-full bg-[#6C87FF] items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
        aria-label="Toggle AI panel"
      >
        <span className="text-sm font-bold text-white">AI</span>
      </button>
    </div>
  )
}
