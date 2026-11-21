import { useState } from 'react';

interface BelatedNoteSectionProps {
  onSealBroken: () => void;
}

export function BelatedNoteSection({ onSealBroken }: BelatedNoteSectionProps) {
  const [sealOpened, setSealOpened] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleToggleSeal = () => {
    const next = !sealOpened;
    setSealOpened(next);
    if (next) {
      onSealBroken();
    }
  };

  return (
    <section id="the-note" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left: Wax Seal Letter Still Life */}
        <figure className="lg:col-span-5 flex flex-col">
          <div className="relative flex-1 overflow-hidden rounded-xl border border-white/10 bg-[#131620] min-h-[280px]">
            {!imgError ? (
              <img
                src="/src/assets/images/letter_wax_seal_1795263109841.jpg"
                alt="Ivory cotton envelope sealed with an antique gold wax stamp beside a brass candle"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#191713] to-[#0E1017] p-8 text-center">
                <span className="font-display text-2xl text-[#E5A93C]">Sealed Note</span>
                <span className="mt-2 text-xs text-[#A6A095]">Better late than never</span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07080D]/60 via-transparent to-transparent" />
          </div>
          <figcaption className="mt-2.5 text-xs italic text-[#A6A095]">
            Fig. 1 — Late by the calendar, punctual in sincerity.
          </figcaption>
        </figure>

        {/* Right: Editorial Belated Apology & Tribute */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-white/10 bg-[#0E1017]/85 p-8 sm:p-10 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#A6A095]">
              <span className="text-[#E5A93C] font-medium uppercase tracking-widest">
                Belated Letter
              </span>
              <span aria-hidden="true">·</span>
              <span>For Fahad</span>
            </div>

            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-[#F5F2EB] text-balance">
              Sorry for the Late Wish — Der Aaye, Durust Aaye
            </h2>

            <div className="mt-6 space-y-4 text-base text-[#D6D0C4] leading-relaxed">
              <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:text-[#E5A93C] first-letter:leading-none">
                Fahad, I owe you an honest apology for arriving past the midnight hour of your birthday. Calendars slip, schedules crowd in, and yet the people who truly matter never leave our thoughts.
              </p>
              <p>
                So rather than sending a hurried two-word text days too late, here is a quiet night sky filled with fireworks, crackers, and Urdu couplets built just for you.
              </p>
            </div>

            {sealOpened && (
              <div className="mt-6 rounded-lg border border-[#E5A93C]/30 bg-[#131620] p-6 transition-opacity duration-200">
                <p className="font-urdu text-right text-xl text-[#F3C669]" dir="rtl" lang="ur">
                  فہد، دیر سے سہی مگر دل سے سالگرہ مبارک — اللہ تمہیں ہمیشہ سلامت اور کامیاب رکھے۔
                </p>
                <p className="mt-3 text-sm text-[#D6D0C4] leading-relaxed">
                  May the year ahead reward your patience, sharpen your ambitions, and surround you with loyal friends and peaceful nights. Happy Belated Birthday, brother.
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleToggleSeal}
              className="rounded-md bg-[#E5A93C] px-5 py-2.5 text-xs font-semibold text-[#07080D] hover:bg-[#F3C669] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F2EB]"
            >
              {sealOpened ? 'Close Sealed Note' : 'Break Seal & Open Note'}
            </button>

            <span className="text-xs text-[#A6A095]">
              Opening the seal fires a Golden Willow salute
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
