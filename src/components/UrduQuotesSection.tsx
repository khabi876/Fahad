import { Check, Copy, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { QuoteCategory, URDU_QUOTES, UrduQuote } from '../data/quotes';

interface UrduQuotesSectionProps {
  onSendSalute: (hue: number) => void;
}

const HUE_MAP: Record<UrduQuote['accentHue'], number> = {
  gold: 42,
  crimson: 350,
  emerald: 158,
  sapphire: 210,
};

const FILTERS: Array<{ id: QuoteCategory; label: string }> = [
  { id: 'all', label: 'All Quotes' },
  { id: 'late-wish', label: 'Late Wish' },
  { id: 'duas', label: 'Duas & Blessings' },
  { id: 'friendship', label: 'Brotherhood' },
];

export function UrduQuotesSection({ onSendSalute }: UrduQuotesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<QuoteCategory>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [salutedId, setSalutedId] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const visibleQuotes =
    activeFilter === 'all'
      ? URDU_QUOTES
      : URDU_QUOTES.filter((q) => q.category === activeFilter);

  const handleCopy = async (quote: UrduQuote) => {
    try {
      await navigator.clipboard.writeText(`${quote.urdu}\n\n"${quote.english}"`);
      setCopiedId(quote.id);
      window.setTimeout(() => {
        setCopiedId((prev) => (prev === quote.id ? null : prev));
      }, 1800);
    } catch {
      // Clipboard blocked in some restricted iframes; silently fail gracefully
    }
  };

  const handleSalute = (quote: UrduQuote) => {
    setSalutedId(quote.id);
    onSendSalute(HUE_MAP[quote.accentHue]);
    window.setTimeout(() => {
      setSalutedId((prev) => (prev === quote.id ? null : prev));
    }, 1200);
  };

  return (
    <section id="urdu-quotes" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      {/* Editorial Calligraphy Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-white/10 bg-[#0E1017]/85 p-8 backdrop-blur-md">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-[#E5A93C]">
              Alfaz-e-Dua · Urdu Couplets &amp; Quotes
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-semibold text-[#F5F2EB] text-balance">
              Words Written Slowly, Meant Deeply
            </h2>
            <p className="mt-4 max-w-2xl text-base text-[#A6A095] leading-relaxed">
              Some wishes sound best in Urdu — where every word carries warmth, sincerity, and prayer. Filter by theme or send a matching sky-salute for any couplet.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-1.5 rounded-lg bg-[#131620] p-1.5 w-fit border border-white/10">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C] ${
                  activeFilter === f.id
                    ? 'bg-[#E5A93C] text-[#07080D]'
                    : 'text-[#B8B2A6] hover:text-[#F5F2EB]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <figure className="lg:col-span-5 flex flex-col">
          <div className="relative flex-1 overflow-hidden rounded-xl border border-white/10 bg-[#131620] min-h-[240px]">
            {!imgError ? (
              <img
                src="/src/assets/images/urdu_qalam_desk_1795263109771.jpg"
                alt="Traditional bamboo reed qalam pen, brass inkwell, and parchment paper under warm lantern light"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#191612] to-[#0E1017] p-8 text-center">
                <span className="font-urdu text-2xl text-[#E5A93C]" dir="rtl" lang="ur">
                  الفاظِ دعا
                </span>
                <span className="mt-2 text-xs text-[#A6A095]">Calligraphy &amp; Parchment</span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07080D]/80 via-transparent to-transparent" />
          </div>
          <figcaption className="mt-2.5 text-xs italic text-[#A6A095]">
            Fig. 2 — Traditional reed qalam &amp; parchment, in honour of Urdu verse.
          </figcaption>
        </figure>
      </div>

      {/* Quotes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleQuotes.map((quote) => {
          const isCopied = copiedId === quote.id;
          const isSaluted = salutedId === quote.id;
          return (
            <article
              key={quote.id}
              className={`flex flex-col justify-between rounded-xl border p-7 backdrop-blur-md transition-colors duration-200 ${
                isSaluted
                  ? 'border-[#E5A93C]/65 bg-[#171A24]/95'
                  : 'border-white/10 bg-[#0E1017]/85 hover:border-white/20'
              }`}
            >
              <div>
                {/* Zero-pill clean metadata separator */}
                <div className="flex items-center justify-between gap-4 text-xs text-[#A6A095]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono tabular-nums text-[#E5A93C]">{quote.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{quote.categoryLabel}</span>
                  </div>
                </div>

                {/* Authentic Urdu Nastaliq Verse */}
                <p
                  dir="rtl"
                  lang="ur"
                  className="font-urdu mt-6 text-right text-xl sm:text-2xl text-[#F5F2EB]"
                >
                  {quote.urdu}
                </p>

                <div className="my-5 h-px w-full bg-white/10" />

                <p className="text-sm italic text-[#D6D0C4] leading-relaxed">
                  “{quote.roman}”
                </p>
                <p className="mt-2.5 text-sm text-[#A6A095] leading-relaxed">
                  {quote.english}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleSalute(quote)}
                  className="inline-flex items-center gap-2 rounded-md border border-[#E5A93C]/35 bg-[#E5A93C]/10 px-3.5 py-2 text-xs font-medium text-[#F3C669] hover:bg-[#E5A93C]/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C]"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{isSaluted ? 'Salute Fired' : 'Firework Salute'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy(quote)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-[#B8B2A6] hover:text-[#F5F2EB] hover:border-white/25 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C]"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#E5A93C]" />
                      <span className="text-[#F5F2EB]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Verse</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
