export function NotesTodoSection() {
  return (
    <section className="py-20 md:py-32 px-5 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16 anim-slide-up">
          <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#6C87FF] mb-4">Workspace</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Beyond the inbox
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notes card */}
          <div className="bg-[#1f2022] border border-[#444653]/30 rounded-2xl p-8 anim-slide-up-delay-1 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
            <div className="w-10 h-10 rounded-xl bg-[#6C87FF]/15 flex items-center justify-center mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C87FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">Notes</h3>
            <p className="text-sm text-[#c5c5d6] leading-relaxed mb-6">
              Save the important bits before your inbox expires. Turn any email into a note with one tap.
            </p>
            <div className="space-y-2">
              {['GitHub verification code: 482913', 'Vercel deploy URL ready', 'API key rotation needed'].map((note, i) => (
                <div key={i} className="px-3 py-2 rounded-lg bg-[#121315] border border-[#444653]/30 text-xs text-[#c5c5d6] truncate">
                  {note}
                </div>
              ))}
            </div>
          </div>

          {/* Todo card */}
          <div className="bg-[#1f2022] border border-[#444653]/30 rounded-2xl p-8 anim-slide-up-delay-2 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
            <div className="w-10 h-10 rounded-xl bg-[#3FC98C]/15 flex items-center justify-center mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3FC98C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">Todo</h3>
            <p className="text-sm text-[#c5c5d6] leading-relaxed mb-6">
              MIKE detects action items in emails and suggests tasks. Never miss a follow-up.
            </p>
            <div className="space-y-2">
              {[
                { text: 'Complete email verification', done: true },
                { text: 'Set up 2FA on GitHub', done: false },
                { text: 'Review API documentation', done: false },
              ].map((todo, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#121315] border border-[#444653]/30">
                  <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${todo.done ? 'border-[#3FC98C] bg-[#3FC98C]' : 'border-[#8e909f]'}`} />
                  <span className={`text-xs ${todo.done ? 'text-[#8e909f] line-through' : 'text-[#c5c5d6]'}`}>{todo.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
