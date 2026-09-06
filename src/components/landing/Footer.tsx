export function Footer() {
  return (
    <footer className="border-t border-[#26282C] py-12 px-6 md:px-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-display text-lg font-bold tracking-tight">MIKE</div>
        <div className="flex items-center gap-6 text-sm text-[#6E7075]">
          <a href="#privacy" className="hover:text-[#AEB0B4] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#AEB0B4] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#AEB0B4] transition-colors">Help</a>
        </div>
        <p className="text-xs text-[#6E7075]">&copy; 2026 MIKE. All rights reserved.</p>
      </div>
    </footer>
  )
}
