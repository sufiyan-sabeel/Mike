export function ProductDemo() {
  return (
    <section className="py-20 md:py-32 px-5 md:px-10" id="features">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16 anim-slide-up">
          <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#6C87FF] mb-4">Live experience</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            See MIKE in action
          </h2>
        </div>

        <div className="bg-[#1f2022] border border-[#444653]/30 rounded-2xl overflow-hidden anim-slide-up-delay-1 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
          {/* Demo panel header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-[#444653]/30">
            <div className="w-3 h-3 rounded-full bg-[#F16B7E]/60" />
            <div className="w-3 h-3 rounded-full bg-[#E0A63B]/60" />
            <div className="w-3 h-3 rounded-full bg-[#3FC98C]/60" />
            <div className="ml-4 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121315] border border-[#444653]/30">
              <span className="font-mono text-xs text-[#8e909f]">fluxdrift421@mike.dev</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8e909f" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            </div>
            <div className="ml-auto flex items-center gap-2 text-xs text-[#8e909f]">
              <div className="w-2 h-2 rounded-full bg-[#3FC98C]" />
              Expires in 58m
            </div>
          </div>

          {/* Demo panel body */}
          <div className="grid grid-cols-1 md:grid-cols-3 min-h-[400px]">
            {/* Message list */}
            <div className="border-r border-[#444653]/30 p-4 space-y-2">
              {[
                { sender: 'GitHub', subject: 'Verify your email', time: '2m ago', unread: true, code: '482913' },
                { sender: 'Vercel', subject: 'Welcome to Vercel', time: '5m ago', unread: true, code: null },
                { sender: 'Discord', subject: 'Verify your account', time: '8m ago', unread: false, code: '736201' },
              ].map((msg, i) => (
                <div key={i} className={`p-3 rounded-xl cursor-pointer transition-colors ${msg.unread ? 'bg-[#6C87FF]/10 border border-[#6C87FF]/20' : 'hover:bg-[#292a2c]'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${msg.unread ? 'text-[#e3e2e5]' : 'text-[#c5c5d6]'}`}>{msg.sender}</span>
                    <span className="text-xs text-[#8e909f]">{msg.time}</span>
                  </div>
                  <p className="text-xs text-[#c5c5d6] truncate">{msg.subject}</p>
                  {msg.code && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#6C87FF]/15 border border-[#6C87FF]/30">
                      <span className="font-mono text-xs font-semibold text-[#6C87FF]">{msg.code}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Message viewer */}
            <div className="p-6">
              <h3 className="font-display text-lg font-semibold mb-2">Verify your email address</h3>
              <p className="text-xs text-[#8e909f] mb-4">From: notifications@github.com</p>
              <div className="text-sm text-[#c5c5d6] leading-relaxed space-y-3">
                <p>Hello,</p>
                <p>Please verify your email address by entering the following code:</p>
                <div className="py-4 text-center">
                  <span className="font-mono text-3xl font-bold tracking-[0.1em] text-[#e3e2e5]">482913</span>
                </div>
                <p>This code expires in 10 minutes.</p>
              </div>
            </div>

            {/* AI Panel */}
            <div className="border-l border-[#444653]/30 p-4 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-[#6C87FF] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">AI</span>
                </div>
                <span className="text-xs font-medium text-[#c5c5d6]">AI Insight</span>
              </div>

              <div className="p-3 rounded-xl bg-[#121315] border border-[#444653]/30">
                <p className="text-xs text-[#c5c5d6] leading-relaxed">
                  <span className="text-[#6C87FF] font-medium">GitHub sent a verification email.</span> Code detected and ready to copy.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#6C87FF]/10 border border-[#6C87FF]/30 text-center">
                <p className="text-[10px] uppercase tracking-wider text-[#6C87FF] mb-2 font-medium">Verification code</p>
                <p className="font-mono text-2xl font-bold tracking-[0.1em] text-[#e3e2e5] mb-2">482913</p>
                <button className="text-xs text-[#6C87FF] font-medium hover:underline">Copy code</button>
              </div>

              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-xs text-[#c5c5d6] rounded-lg hover:bg-[#292a2c] transition-colors">
                  Save to Notes →
                </button>
                <button className="w-full text-left px-3 py-2 text-xs text-[#c5c5d6] rounded-lg hover:bg-[#292a2c] transition-colors">
                  Create Todo →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
