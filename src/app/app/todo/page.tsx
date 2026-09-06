'use client'
import { useTodoStore } from '@/lib/store'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

const views = ['today', 'upcoming', 'completed'] as const

export default function TodoPage() {
  const { todos, view, setView, createTodo, toggleTodo, deleteTodo } = useTodoStore()
  const [newTitle, setNewTitle] = useState('')

  const today = new Date().toISOString().split('T')[0]

  const filteredTodos = todos.filter(t => {
    if (view === 'completed') return t.completed
    if (view === 'today') return !t.completed && t.dueDate <= today
    return !t.completed && (!t.dueDate || t.dueDate > today)
  })

  const handleAdd = () => {
    if (!newTitle.trim()) return
    createTodo({ title: newTitle.trim(), dueDate: today })
    setNewTitle('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="flex-1 flex flex-col md:flex-row">
      {/* Todo list */}
      <div className="w-full md:w-80 lg:w-96 border-r border-[#26282C] flex flex-col min-h-0">
        <div className="px-5 py-3 border-b border-[#26282C]">
          <h2 className="text-sm font-semibold mb-3">Todo</h2>
          {/* View tabs */}
          <div className="flex gap-1 bg-[#0B0C0E] rounded-[8px] p-1">
            {views.map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  'flex-1 py-1.5 text-xs font-medium rounded-[6px] transition-colors capitalize',
                  view === v ? 'bg-[#1E2024] text-white' : 'text-[#6E7075] hover:text-[#AEB0B4]'
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Add todo */}
        <div className="px-5 py-3 border-b border-[#26282C]">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a task..."
              className="flex-1 px-3 py-2 bg-[#0B0C0E] border border-[#26282C] rounded-[8px] text-sm text-white placeholder:text-[#6E7075] focus:outline-none focus:border-[#6C87FF]/50"
            />
            <PrimaryButton size="sm" onClick={handleAdd}>Add</PrimaryButton>
          </div>
        </div>

        {/* Todo items */}
        <div className="flex-1 overflow-y-auto">
          {filteredTodos.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#1E2024] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6E7075" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <p className="text-sm text-[#AEB0B4] font-medium mb-1">
                {view === 'completed' ? 'No completed tasks' : 'Nothing on your list'}
              </p>
              <p className="text-xs text-[#6E7075]">
                {view === 'completed' ? 'Complete a task to see it here' : 'Add a task to get started'}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div key={todo.id} className="flex items-center gap-3 px-5 py-3 border-b border-[#26282C] group hover:bg-[#1E2024] transition-colors">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors',
                    todo.completed ? 'border-[#3FC98C] bg-[#3FC98C]' : 'border-[#6E7075] hover:border-[#6C87FF]'
                  )}
                  aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {todo.completed && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm', todo.completed ? 'text-[#6E7075] line-through' : 'text-white')}>{todo.title}</p>
                  {todo.dueDate && !todo.completed && (
                    <p className="text-[10px] text-[#6E7075] mt-0.5">Due {formatDate(todo.dueDate)}</p>
                  )}
                </div>
                {todo.priority === 'high' && !todo.completed && (
                  <span className="text-[10px] text-[#F16B7E] bg-[#F16B7E]/10 px-1.5 py-0.5 rounded font-medium">High</span>
                )}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-1 rounded text-[#6E7075] hover:text-[#F16B7E] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Delete task"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Desktop placeholder */}
      <div className="flex-1 hidden md:flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-[#6E7075]">
            {todos.length > 0 ? `${todos.filter(t => !t.completed).length} tasks remaining` : 'Add a task to get started'}
          </p>
        </div>
      </div>
    </div>
  )
}
