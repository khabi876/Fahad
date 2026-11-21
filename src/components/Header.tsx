interface HeaderProps {
  onLaunchFinale: () => void;
  onNavigateHome: () => void;
}

export function Header({ onLaunchFinale, onNavigateHome }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07080D]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Single-line Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onNavigateHome();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-2xl font-semibold tracking-tight text-[#F5F2EB] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C] rounded-sm"
        >
          Fahad
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#B8B2A6]">
          <a
            href="#the-note"
            onClick={onNavigateHome}
            className="hover:text-[#F5F2EB] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C] rounded-sm"
          >
            The Note
          </a>
          <a
            href="#fireworks"
            onClick={onNavigateHome}
            className="hover:text-[#F5F2EB] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C] rounded-sm"
          >
            Fireworks
          </a>
          <a
            href="#urdu-quotes"
            onClick={onNavigateHome}
            className="hover:text-[#F5F2EB] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C] rounded-sm"
          >
            Urdu Quotes
          </a>
          <a
            href="#make-a-wish"
            onClick={onNavigateHome}
            className="hover:text-[#F5F2EB] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C] rounded-sm"
          >
            Make a Wish
          </a>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onLaunchFinale}
            className="px-4 py-2 text-xs font-semibold tracking-wide text-[#07080D] bg-[#E5A93C] hover:bg-[#F3C669] active:scale-[0.98] transition-all duration-150 rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F2EB]"
          >
            Launch Finale
          </button>
        </div>
      </div>
    </header>
  );
}
