'use client'
import { useInboxStore } from '@/lib/store'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SecondaryButton } from '@/components/ui/PrimaryButton'
import Link from 'next/link'
import { useState } from 'react'

export default function SettingsPage() {
  const { inbox, deleteInbox, regenerateInbox } = useInboxStore()
  const [aiEnabled, setAiEnabled] = useState(inbox?.aiEnabled ?? true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="font-display text-2xl font-bold mb-8">Settings</h1>

        {/* AI Processing */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold mb-4">AI Processing</h2>
          <div className="bg-[#17181C] border border-[#26282C] rounded-[16px] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Enable AI analysis</p>
                <p className="text-xs text-[#6E7075] mt-0.5">AI reads and summarizes incoming messages</p>
              </div>
              <button
                onClick={() => setAiEnabled(!aiEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative ${aiEnabled ? 'bg-[#6C87FF]' : 'bg-[#26282C]'}`}
                role="switch"
                aria-checked={aiEnabled}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${aiEnabled ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
            {!aiEnabled && (
              <p className="text-xs text-[#6E7075] mt-3 px-3 py-2 rounded-[8px] bg-[#0B0C0E]">
                AI processing is disabled. Messages will still arrive but won&apos;t be analyzed.
              </p>
            )}
          </div>
        </section>

        {/* Inbox Management */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold mb-4">Inbox</h2>
          <div className="bg-[#17181C] border border-[#26282C] rounded-[16px] p-5 space-y-4">
            {inbox && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Current address</p>
                    <p className="font-mono text-xs text-[#AEB0B4] mt-0.5">{inbox.address}</p>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(inbox.address)}
                    className="text-xs text-[#6C87FF] hover:underline"
                  >
                    Copy
                  </button>
                </div>
                <div className="h-px bg-[#26282C]" />
                <div>
                  <p className="text-sm font-medium mb-1">Regenerate inbox</p>
                  <p className="text-xs text-[#6E7075] mb-3">Creates a new address and destroys the current inbox</p>
                  <SecondaryButton onClick={() => regenerateInbox()}>
                    Regenerate
                  </SecondaryButton>
                </div>
                <div className="h-px bg-[#26282C]" />
                <div>
                  <p className="text-sm font-medium mb-1">Delete inbox</p>
                  <p className="text-xs text-[#6E7075] mb-3">Permanently delete this inbox and all its messages</p>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="text-sm text-[#F16B7E] hover:underline"
                  >
                    Delete inbox
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* About */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold mb-4">About</h2>
          <div className="bg-[#17181C] border border-[#26282C] rounded-[16px] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#AEB0B4]">Version</span>
              <span className="text-sm text-[#6E7075]">1.0.0</span>
            </div>
            <div className="h-px bg-[#26282C]" />
            <Link href="/app/settings/privacy" className="flex items-center justify-between group">
              <span className="text-sm text-[#AEB0B4] group-hover:text-white transition-colors">Privacy</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6E7075" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </Link>
          </div>
        </section>

        {/* Delete confirmation modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)}>
            <div className="bg-[#1E2024] border border-[#26282C] rounded-[24px] p-6 max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-display text-lg font-semibold mb-2">Delete inbox?</h3>
              <p className="text-sm text-[#AEB0B4] mb-6">This deletes your inbox and all its messages. This can&apos;t be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-2.5 rounded-full border border-[#26282C] text-sm font-medium hover:border-[#6C87FF] transition-colors">Cancel</button>
                <button onClick={() => { deleteInbox(); setShowDeleteConfirm(false) }} className="flex-1 py-2.5 rounded-full bg-[#F16B7E] text-white text-sm font-medium hover:bg-[#E0566A] transition-colors">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
