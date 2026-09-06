'use client'
import { InboxList } from '@/components/inbox/InboxList'
import { useInboxStore } from '@/lib/store'
import { CapsuleSVG } from '@/components/ui/CapsuleSVG'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

export default function InboxPage() {
  const { inbox, messages, capsuleState } = useInboxStore()

  return (
    <div className="flex-1 flex flex-col md:flex-row">
      {/* Message list */}
      <div className="w-full md:w-80 lg:w-96 border-r border-[#26282C] flex flex-col min-h-0">
        <div className="px-5 py-3 border-b border-[#26282C] flex items-center justify-between">
          <h2 className="text-sm font-semibold">Inbox</h2>
          <span className="text-xs text-[#6E7075]">{messages.length} message{messages.length !== 1 ? 's' : ''}</span>
        </div>
        <InboxList />
      </div>

      {/* Empty state / message detail placeholder */}
      <div className="flex-1 hidden md:flex items-center justify-center">
        {messages.length === 0 ? (
          <div className="text-center">
            <div className="mb-6">
              <CapsuleSVG state={capsuleState} className="w-24 h-24 mx-auto" />
            </div>
            <p className="text-sm text-[#AEB0B4] font-medium mb-2">Waiting for your first message</p>
            <p className="text-xs text-[#6E7075] mb-6">Send an email to your temporary address to get started</p>
            <PrimaryButton size="sm" onClick={() => {
              navigator.clipboard.writeText(inbox?.address || '')
            }}>
              Copy email address
            </PrimaryButton>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-[#6E7075]">Select a message to read</p>
          </div>
        )}
      </div>
    </div>
  )
}
