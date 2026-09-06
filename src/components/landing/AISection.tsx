export function AISection() {
  return (
    <section className="py-24 md:py-40 px-6 md:px-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="anim-slide-left">
          <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#6C87FF] mb-4">AI Inbox</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Understand every email,<br />without reading it
          </h2>
          <p className="text-[#AEB0B4] text-lg leading-relaxed mb-8">
            MIKE&apos;s AI reads each message and surfaces what matters — verification codes, important links, action items — so you can act without scrolling through boilerplate.
          </p>
          <ul className="space-y-3">
            {['Automatic summaries', 'One-tap code copy', 'Link extraction', 'Save to Notes or Todo'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-[#AEB0B4]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6C87FF] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#17181C] border border-[#26282C] rounded-[24px] p-6 space-y-4 anim-slide-right">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-[#6C87FF] flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">AI</span>
            </div>
            <span className="text-sm font-medium">AI Insight</span>
          </div>
          <div className="p-4 rounded-[12px] bg-[#0B0C0E] border border-[#26282C]">
            <p className="text-sm text-[#AEB0B4] leading-relaxed">
              <span className="text-[#6C87FF] font-medium">GitHub</span> sent a verification email for your account signup.
            </p>
          </div>
          <div className="p-5 rounded-[12px] bg-[#6C87FF]/10 border border-[#6C87FF]/30 text-center">
            <p className="text-[10px] uppercase tracking-[0.1em] text-[#6C87FF] mb-2 font-medium">Verification code</p>
            <p className="font-mono text-3xl font-bold tracking-[0.1em] text-white">482913</p>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 rounded-full bg-[#6C87FF] text-white text-sm font-medium">Copy code</button>
            <button className="flex-1 py-2.5 rounded-full border border-[#26282C] text-[#AEB0B4] text-sm font-medium hover:border-[#6C87FF] transition-colors">Open email</button>
          </div>
        </div>
      </div>
    </section>
  )
}
