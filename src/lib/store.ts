import { create } from 'zustand'
import type { Inbox, Message, Note, Todo, InboxDuration, CapsuleState, TodoPriority, TodoView } from './types'

interface InboxState {
  inbox: Inbox | null
  messages: Message[]
  selectedMessageId: string | null
  capsuleState: CapsuleState
  createInbox: (duration?: InboxDuration) => void
  deleteInbox: () => void
  regenerateInbox: (duration?: InboxDuration) => void
  selectMessage: (id: string | null) => void
  addMessage: (message: Message) => void
  markRead: (messageId: string) => void
}

interface NotesState {
  notes: Note[]
  selectedNoteId: string | null
  createNote: (note: Partial<Note>) => string
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void
  selectNote: (id: string | null) => void
}

interface TodoState {
  todos: Todo[]
  view: TodoView
  createTodo: (todo: Partial<Todo>) => string
  updateTodo: (id: string, updates: Partial<Todo>) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  setView: (view: TodoView) => void
}

interface UIState {
  aiPanelOpen: boolean
  settingsOpen: boolean
  mobileNavActive: 'inbox' | 'notes' | 'todo' | 'ai'
  toggleAIPanel: () => void
  setMobileNav: (tab: 'inbox' | 'notes' | 'todo' | 'ai') => void
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36)
}

function generateAddress(): string {
  const words = ['flux','drift','echo','nova','pulse','glint','spark','wave','zephyr','orb','arc','bolt','dawn','flux','haze','iris','jade','kite','luna','mist']
  const w1 = words[Math.floor(Math.random() * words.length)]
  const w2 = words[Math.floor(Math.random() * words.length)]
  const num = Math.floor(Math.random() * 900 + 100)
  return `${w1}${w2}${num}`
}

const DURATION_MS: Record<InboxDuration, number> = {
  '10m': 10 * 60 * 1000,
  '1h': 60 * 60 * 1000,
  '1d': 24 * 60 * 60 * 1000,
}

export const useInboxStore = create<InboxState>((set, get) => ({
  inbox: null,
  messages: [],
  selectedMessageId: null,
  capsuleState: 'empty',

  createInbox: (duration: InboxDuration = '1h') => {
    const address = generateAddress()
    const now = new Date()
    const expiresAt = new Date(now.getTime() + DURATION_MS[duration])
    const inbox: Inbox = {
      id: generateId(),
      address: `${address}@mike.dev`,
      status: 'created',
      domain: 'mike.dev',
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      duration,
      messageCount: 0,
      unreadCount: 0,
      canExtend: true,
      aiEnabled: true,
    }
    set({ inbox, messages: [], capsuleState: 'empty', selectedMessageId: null })
  },

  deleteInbox: () => {
    set({ inbox: null, messages: [], capsuleState: 'deleted', selectedMessageId: null })
    setTimeout(() => {
      const state = get()
      if (state.capsuleState === 'deleted') set({ capsuleState: 'empty' })
    }, 1500)
  },

  regenerateInbox: (duration?: InboxDuration) => {
    const d = get().inbox?.duration || duration || '1h'
    get().deleteInbox()
    setTimeout(() => get().createInbox(d), 800)
  },

  selectMessage: (id) => set({ selectedMessageId: id }),

  addMessage: (message) => {
    const inbox = get().inbox
    if (!inbox) return
    const messages = [message, ...get().messages]
    set({
      messages,
      capsuleState: 'received',
      inbox: { ...inbox, messageCount: messages.length, unreadCount: messages.filter(m => !m.read).length },
    })
    setTimeout(() => {
      if (get().capsuleState === 'received') set({ capsuleState: 'empty' })
    }, 2000)
  },

  markRead: (messageId) => {
    const messages = get().messages.map(m => m.id === messageId ? { ...m, read: true, status: 'read' as const } : m)
    const inbox = get().inbox
    if (inbox) {
      set({ messages, inbox: { ...inbox, unreadCount: messages.filter(m => !m.read).length } })
    } else {
      set({ messages })
    }
  },
}))

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  selectedNoteId: null,

  createNote: (partial) => {
    const note: Note = {
      id: generateId(),
      title: partial.title || '',
      content: partial.content || '',
      pinned: partial.pinned || false,
      archived: false,
      tags: partial.tags || [],
      sourceMessageId: partial.sourceMessageId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    set((s) => ({ notes: [note, ...s.notes], selectedNoteId: note.id }))
    return note.id
  },

  updateNote: (id, updates) => {
    set((s) => ({
      notes: s.notes.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n),
    }))
  },

  deleteNote: (id) => {
    set((s) => ({ notes: s.notes.filter(n => n.id !== id), selectedNoteId: s.selectedNoteId === id ? null : s.selectedNoteId }))
  },

  selectNote: (id) => set({ selectedNoteId: id }),
}))

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  view: 'today',

  createTodo: (partial) => {
    const todo: Todo = {
      id: generateId(),
      title: partial.title || '',
      completed: false,
      priority: partial.priority || 'normal',
      dueDate: partial.dueDate,
      sourceMessageId: partial.sourceMessageId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    set((s) => ({ todos: [todo, ...s.todos] }))
    return todo.id
  },

  updateTodo: (id, updates) => {
    set((s) => ({
      todos: s.todos.map(t => t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t),
    }))
  },

  deleteTodo: (id) => {
    set((s) => ({ todos: s.todos.filter(t => t.id !== id) }))
  },

  toggleTodo: (id) => {
    set((s) => ({
      todos: s.todos.map(t => t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t),
    }))
  },

  setView: (view) => set({ view }),
}))

export const useUIStore = create<UIState>((set) => ({
  aiPanelOpen: false,
  settingsOpen: false,
  mobileNavActive: 'inbox',
  toggleAIPanel: () => set((s) => ({ aiPanelOpen: !s.aiPanelOpen })),
  setMobileNav: (tab) => set({ mobileNavActive: tab }),
}))
