interface LegalViewProps {
  route: '/privacy-policy' | '/terms-and-conditions' | '/404';
  onBackHome: () => void;
}

export function LegalView({ route, onBackHome }: LegalViewProps) {
  if (route === '/404') {
    return (
      <main className="relative z-10 mx-auto max-w-3xl px-6 py-32 [text-shadow:0_2px_10px_rgba(7,8,13,0.95)]">
        <div className="rounded-xl border border-white/15 bg-transparent p-10">
          <p className="font-mono text-xs uppercase tracking-widest text-[#E5A93C]">404</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-[#F5F2EB]">
            Page Not Found
          </h1>
          <p className="mt-4 text-base text-[#A6A095] leading-relaxed">
            This sky coordinate has no celebration page. Return to the main birthday tribute for Fahad.
          </p>
          <button
            type="button"
            onClick={onBackHome}
            className="mt-8 rounded-md bg-[#E5A93C] px-5 py-2.5 text-xs font-semibold text-[#07080D] hover:bg-[#F3C669] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F2EB] [text-shadow:none]"
          >
            Back to Celebration
          </button>
        </div>
      </main>
    );
  }

  const isPrivacy = route === '/privacy-policy';

  return (
    <main className="relative z-10 mx-auto max-w-3xl px-6 py-24 [text-shadow:0_2px_10px_rgba(7,8,13,0.95)]">
      <article className="rounded-xl border border-white/15 bg-transparent p-8 sm:p-10">
        <p className="text-xs uppercase tracking-widest text-[#E5A93C]">Notice</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-[#F5F2EB]">
          {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
        </h1>
        <p className="mt-2 text-xs text-[#A6A095]">Last updated: November 2026</p>

        <div className="mt-8 space-y-5 text-sm text-[#D6D0C4] leading-relaxed">
          {isPrivacy ? (
            <>
              <p>
                This personal birthday tribute website for Fahad runs entirely in your browser. It does not collect, store, transmit, or sell personal information, cookies, or analytics data.
              </p>
              <p>
                Any birthday wish you type in the sparkler ritual remains strictly in your local browser session and is cleared when you reload or close the page.
              </p>
              <p>
                Site maintainer contact: [Owner Name / Contact Email Placeholder].
              </p>
            </>
          ) : (
            <>
              <p>
                This website is a private, non-commercial birthday celebration page created for Fahad. All interactive pyrotechnic animations, procedural audio effects, and curated Urdu couplets are provided as-is for personal enjoyment.
              </p>
              <p>
                Operator / Publisher: [Owner Name / Organization Placeholder].
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={onBackHome}
          className="mt-8 rounded-md bg-[#E5A93C] px-5 py-2.5 text-xs font-semibold text-[#07080D] hover:bg-[#F3C669] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F2EB]"
        >
          Return to Tribute
        </button>
      </article>
    </main>
  );
}
