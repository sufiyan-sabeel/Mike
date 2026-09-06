// Inbox types
export type InboxStatus = 'creating' | 'created' | 'loading' | 'empty' | 'receiving' | 'populated' | 'refreshing' | 'expiring' | 'expired' | 'deleted' | 'error'
export type InboxDuration = '10m' | '1h' | '1d'

export interface Inbox {
  id: string
  address: string
  status: InboxStatus
  domain: string
  createdAt: string
  expiresAt: string
  duration: InboxDuration
  messageCount: number
  unreadCount: number
  canExtend: boolean
  aiEnabled: boolean
}

// Message types
export type MessageStatus = 'loading' | 'loaded' | 'unread' | 'read' | 'ai-processing' | 'ai-ready' | 'ai-error' | 'ai-unavailable'

export interface Message {
  id: string
  inboxId: string
  sender: string
  senderEmail: string
  subject: string
  preview: string
  timestamp: string
  read: boolean
  size: number
  htmlBody?: string
  textBody?: string
  attachments: Attachment[]
  ai?: AIInsight
  status: MessageStatus
}

export interface Attachment {
  filename: string
  mimeType: string
  size: number
}

// AI types
export type AIStatus = 'idle' | 'loading' | 'success' | 'failure' | 'unavailable'

export interface AIInsight {
  status: AIStatus
  summary?: string
  verificationCode?: string
  extractedLinks?: ExtractedLink[]
  actionItems?: string[]
  senderContext?: string
  error?: string
}

export interface ExtractedLink {
  url: string
  label: string
  purpose?: string
}

export interface AIQuestion {
  question: string
  answer: string
}

// Notes types
export type NoteStatus = 'empty' | 'creating' | 'editing' | 'saving' | 'saved' | 'error'

export interface Note {
  id: string
  title: string
  content: string
  pinned: boolean
  archived: boolean
  tags: string[]
  sourceMessageId?: string
  createdAt: string
  updatedAt: string
}

// Todo types
export type TodoStatus = 'empty' | 'active'
export type TodoPriority = 'low' | 'normal' | 'high'
export type TodoView = 'today' | 'upcoming' | 'completed'

export interface Todo {
  id: string
  title: string
  completed: boolean
  priority: TodoPriority
  dueDate?: string
  sourceMessageId?: string
  createdAt: string
  updatedAt: string
}

// Provider interfaces (integration boundaries)
export interface EmailProvider {
  createInbox(options: { duration: InboxDuration; customLocalPart?: string }): Promise<{ address: string; inboxId: string; expiresAt: string }>
  getInbox(inboxId: string): Promise<{ status: InboxStatus; address: string; expiresAt: string }>
  getMessages(inboxId: string): Promise<Message[]>
  getMessage(messageId: string): Promise<Message>
  deleteInbox(inboxId: string): Promise<{ success: boolean }>
  getDomains(): Promise<string[]>
  getStatus(): Promise<{ healthy: boolean; degraded: boolean; reason?: string }>
}

export interface AIProvider {
  summarize(messageContent: string): Promise<{ summary: string }>
  extractEntities(messageContent: string): Promise<{ codes: string[]; links: ExtractedLink[]; dates: string[]; actionItems: string[] }>
  classifySender(messageContent: string): Promise<{ likelySender: string }>
  answerQuestion(messageContent: string, question: string): Promise<{ answer: string }>
}

// UI state types
export type CapsuleState = 'empty' | 'received' | 'processing' | 'understood' | 'expiring' | 'deleted'
