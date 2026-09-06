'use client'
import { useNotesStore } from '@/lib/store'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useCallback, Suspense } from 'react'
import { formatDate } from '@/lib/utils'

function NoteEditorInner() {
  const searchParams = useSearchParams()
  const noteId = searchParams.get('id')
  const router = useRouter()
  const { notes, updateNote, deleteNote } = useNotesStore()
  const note = notes.find(n => n.id === noteId)
  const [title, setTitle] = useState(note?.title || '')
  const [content, setContent] = useState(note?.content || '')
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
    }
  }, [note?.id])

  const debouncedSave = useCallback(() => {
    if (!noteId) return
    setSaveStatus('saving')
    updateNote(noteId, { title, content })
    setTimeout(() => setSaveStatus('saved'), 500)
  }, [noteId, title, content, updateNote])

  useEffect(() => {
    if (!note) return
    const timer = setTimeout(debouncedSave, 1000)
    setSaveStatus('unsaved')
    return () => clearTimeout(timer)
  }, [title, content, debouncedSave, note])

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-[#6E7075]">Note not found</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="px-4 md:px-6 py-3 border-b border-[#26282C] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/app/notes/')} className="p-1.5 rounded-[8px] hover:bg-[#1E2024] text-[#6E7075]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span className="text-xs text-[#6E7075]">
            {saveStatus === 'saved' ? 'Saved' : saveStatus === 'saving' ? 'Saving...' : 'Unsaved'}
          </span>
        </div>
        <button
          onClick={() => { deleteNote(noteId!); router.push('/app/notes/') }}
          className="p-1.5 rounded-[8px] text-[#6E7075] hover:text-[#F16B7E] hover:bg-[#F16B7E]/10 transition-colors"
          aria-label="Delete note"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col p-4 md:p-8 max-w-3xl mx-auto w-full">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          className="font-display text-2xl md:text-3xl font-bold bg-transparent border-none outline-none text-white placeholder:text-[#6E7075] mb-4"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          className="flex-1 bg-transparent border-none outline-none text-[#AEB0B4] text-base leading-relaxed resize-none placeholder:text-[#6E7075]"
          style={{ minHeight: '400px' }}
        />
        {note.sourceMessageId && (
          <div className="mt-4 px-3 py-2 rounded-[8px] bg-[#1E2024] border border-[#26282C]">
            <p className="text-[10px] text-[#6E7075]">Created from email · {formatDate(note.createdAt)}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function NoteEditorPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center"><div className="skeleton h-8 w-48" /></div>}>
      <NoteEditorInner />
    </Suspense>
  )
}
