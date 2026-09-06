'use client'
import { useNotesStore } from '@/lib/store'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { formatDate } from '@/lib/utils'

export default function NotesPage() {
  const { notes, createNote, deleteNote } = useNotesStore()
  const router = useRouter()
  const [search, setSearch] = useState('')

  const filtered = notes.filter(n =>
    !n.archived && (n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()))
  )

  const handleNewNote = () => {
    const id = createNote({ title: '', content: '' })
    router.push(`/app/notes/edit/?id=${id}`)
  }

  return (
    <div className="flex-1 flex flex-col md:flex-row">
      {/* Notes list */}
      <div className="w-full md:w-80 lg:w-96 border-r border-[#444653]/30 flex flex-col min-h-0">
        <div className="px-5 py-3 border-b border-[#444653]/30">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Notes</h2>
            <PrimaryButton size="sm" onClick={handleNewNote}>New note</PrimaryButton>
          </div>
          <div className="relative">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8e909f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#121315] border border-[#444653]/30 rounded-lg text-sm text-[#e3e2e5] placeholder:text-[#8e909f] focus:outline-none focus:border-[#6C87FF]/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#292a2c] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8e909f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </div>
              <p className="text-sm text-[#c5c5d6] font-medium mb-1">No notes yet</p>
              <p className="text-xs text-[#8e909f] mb-4">Create a note or save from an email</p>
              <PrimaryButton size="sm" onClick={handleNewNote}>New note</PrimaryButton>
            </div>
          ) : (
            filtered.map((note) => (
              <button
                key={note.id}
                onClick={() => router.push(`/app/notes/edit/?id=${note.id}`)}
                className="w-full text-left px-5 py-4 border-b border-[#444653]/30 hover:bg-[#292a2c] transition-colors group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {note.pinned && <span className="text-[10px] text-[#E0A63B]">📌</span>}
                      <h3 className="text-sm font-medium text-[#e3e2e5] truncate">{note.title || 'Untitled note'}</h3>
                    </div>
                    <p className="text-xs text-[#8e909f] truncate">{note.content || 'Empty note'}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteNote(note.id) }}
                    className="p-1 rounded text-[#8e909f] hover:text-[#F16B7E] opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Delete note"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                  </button>
                </div>
                <p className="text-[10px] text-[#8e909f] mt-1">{formatDate(note.updatedAt)}</p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Note editor placeholder (desktop) */}
      <div className="flex-1 hidden md:flex items-center justify-center">
        <p className="text-sm text-[#8e909f]">Select a note to edit</p>
      </div>
    </div>
  )
}
