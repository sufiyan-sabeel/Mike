export default function PrivacyPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="font-display text-2xl font-bold mb-8">Privacy</h1>

        <div className="space-y-8 text-[#AEB0B4]">
          <section>
            <h2 className="text-base font-semibold text-white mb-3">Temporary by design</h2>
            <p className="text-sm leading-relaxed">
              Every MIKE inbox has a defined lifetime. When it expires, your inbox and all its messages are permanently deleted from our servers. This isn&apos;t a vague promise — it&apos;s how the system is built.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-3">Manual deletion</h2>
            <p className="text-sm leading-relaxed">
              You can delete your inbox at any time. Deletion is immediate and irreversible. There is no recovery mechanism.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-3">No account required</h2>
            <p className="text-sm leading-relaxed">
              MIKE works without creating an account. Your inbox is tied to your browser session, not your identity.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-3">AI data processing</h2>
            <p className="text-sm leading-relaxed">
              When AI processing is enabled, message content is sent to our AI provider to generate summaries and extract information. This processing happens in real-time for your session only. You can disable AI processing at any time in Settings.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-3">What we don&apos;t do</h2>
            <ul className="text-sm space-y-2 leading-relaxed">
              <li className="flex gap-2"><span className="text-[#6C87FF]">·</span>We don&apos;t send outbound email — receive-only architecture</li>
              <li className="flex gap-2"><span className="text-[#6C87FF]">·</span>We don&apos;t track message content in analytics</li>
              <li className="flex gap-2"><span className="text-[#6C87FF]">·</span>We don&apos;t sell or share your data with third parties</li>
              <li className="flex gap-2"><span className="text-[#6C87FF]">·</span>We don&apos;t claim legal-grade anonymity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-3">Acceptable use</h2>
            <p className="text-sm leading-relaxed">
              MIKE is designed for legitimate, temporary email needs. We don&apos;t allow use for illegal activity, harassment, or bypassing another service&apos;s fraud protections. We run our own service responsibly.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
