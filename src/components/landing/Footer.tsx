export function Footer() {
  return (
    <footer className="w-full py-16 bg-[#121315] border-t border-[#444653]/10 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-[800px] mx-auto px-5 gap-6">
        <span className="font-display text-lg font-bold text-[#e3e2e5]">MIKE</span>
        <nav className="flex flex-wrap justify-center gap-6 text-xs font-medium tracking-[0.1em] uppercase">
          <a className="text-[#8e909f] hover:text-[#6C87FF] transition-colors duration-300" href="#privacy">Privacy Policy</a>
          <a className="text-[#8e909f] hover:text-[#6C87FF] transition-colors duration-300" href="#">Terms of Service</a>
          <a className="text-[#8e909f] hover:text-[#6C87FF] transition-colors duration-300" href="#">Status</a>
          <a className="text-[#8e909f] hover:text-[#6C87FF] transition-colors duration-300" href="#">Contact</a>
        </nav>
        <span className="text-xs text-[#8e909f]">
          &copy; 2026 MIKE. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
