export function PrivacySection() {
  return (
    <section className="py-20 md:py-32 px-5 md:px-10" id="privacy">
      <div className="max-w-[800px] mx-auto">
        <div className="anim-slide-up">
          <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#6C87FF] mb-4">Privacy</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Private by architecture,<br />not by promise
          </h2>
          <div className="space-y-6 text-[#c5c5d6] text-lg leading-relaxed">
            <p>
              Every inbox has a defined lifetime. When it expires, your data is deleted — not hidden, not archived, deleted.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              {[
                { label: 'Temporary', desc: 'Inboxes exist only as long as you need them' },
                { label: 'Deletable', desc: 'Delete anytime — immediate, irreversible' },
                { label: 'No account needed', desc: 'Use MIKE without signing up for anything' },
                { label: 'AI opt-out', desc: 'Disable AI processing at any time' },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl bg-[#1f2022] border border-[#444653]/30">
                  <p className="text-sm font-medium text-[#e3e2e5] mb-1">{item.label}</p>
                  <p className="text-sm text-[#c5c5d6]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
