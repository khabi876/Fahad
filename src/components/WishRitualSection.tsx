import { Flame, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface WishRitualSectionProps {
  onIgniteWish: () => void;
}

const PRESET_WISHES = [
  'May this year bring lasting peace, strong health, and effortless success.',
  'New chapters, fearless dreams, and endless reasons to celebrate.',
  'Keep shining like a lantern for everyone fortunate enough to know you.',
];

interface MiniSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  hue: number;
}

export function WishRitualSection({ onIgniteWish }: WishRitualSectionProps) {
  const [wishText, setWishText] = useState(PRESET_WISHES[0]);
  const [sparklerLit, setSparklerLit] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!sparklerLit) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const sparks: MiniSpark[] = [];
    let rafId = 0;

    const loop = () => {
      ctx.clearRect(0, 0, 220, 240);
      for (let i = 0; i < 4; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.4 + Math.random() * 3.8;
        sparks.push({
          x: 110 + (Math.random() - 0.5) * 4,
          y: 94 + (Math.random() - 0.5) * 4,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4,
          alpha: 1,
          decay: 0.035 + Math.random() * 0.025,
          hue: 36 + Math.random() * 14,
        });
      }

      ctx.globalCompositeOperation = 'lighter';
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.08;
        s.vx *= 0.96;
        s.alpha -= s.decay;

        if (s.alpha <= 0.02) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `hsla(${s.hue}, 100%, 78%, ${s.alpha})`;
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 2.1, s.y - s.vy * 2.1);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';
      rafId = window.requestAnimationFrame(loop);
    };

    rafId = window.requestAnimationFrame(loop);
    return () => {
      window.cancelAnimationFrame(rafId);
      ctx.clearRect(0, 0, 220, 240);
    };
  }, [sparklerLit]);

  const handleLightSparkler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;
    setSparklerLit(true);
    onIgniteWish();
  };

  const handleReset = () => {
    setSparklerLit(false);
  };

  return (
    <section id="make-a-wish" className="relative z-10 mx-auto max-w-6xl px-6 py-24 [text-shadow:0_2px_10px_rgba(7,8,13,0.95)]">
      <div className="rounded-xl border border-white/15 bg-transparent p-8 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Interactive Sparkler Visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center rounded-xl border border-white/15 bg-transparent p-8 min-h-[300px] relative overflow-hidden">
            <div
              className={`transition-opacity duration-500 ${
                sparklerLit ? 'opacity-100' : 'opacity-20'
              } absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(229,169,60,0.22),transparent_65%)] pointer-events-none`}
            />

            <div className="relative h-56 w-52 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={220}
                height={240}
                className="pointer-events-none absolute inset-0 h-full w-full"
              />
              <svg
                viewBox="0 0 180 220"
                className="h-52 w-44 overflow-visible relative z-10"
                aria-hidden="true"
              >
                <line
                  x1="90"
                  y1="210"
                  x2="90"
                  y2="82"
                  stroke="#7A756B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="90"
                  y1="145"
                  x2="90"
                  y2="82"
                  stroke={sparklerLit ? '#C88D32' : '#4A463F'}
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                {sparklerLit ? (
                  <g transform="translate(90, 82)">
                    <circle r="18" fill="rgba(243, 198, 105, 0.25)" />
                    <circle r="7" fill="#FFF3CC" />
                  </g>
                ) : (
                  <circle cx="90" cy="82" r="4.5" fill="#6F6A60" />
                )}
              </svg>
            </div>

            <p className="mt-2 text-xs text-[#A6A095] text-center">
              {sparklerLit
                ? 'Sparkler lit — wishing you an unforgettable year ahead, Fahad.'
                : 'Enter or pick a birthday prayer, then ignite the sparkler.'}
            </p>
          </div>

          {/* Right: Wish Form / Keepsake */}
          <div className="lg:col-span-7">
            <p className="text-xs font-medium tracking-widest uppercase text-[#E5A93C]">
              Closing Ritual
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#F5F2EB] text-balance">
              Make a Birthday Wish, Fahad
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#A6A095] leading-relaxed">
              Every birthday deserves one quiet wish before the final salvo lights up the sky. Seal yours below and ignite the celebratory sparkler.
            </p>

            {!sparklerLit ? (
              <form onSubmit={handleLightSparkler} className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="fahad-wish-input"
                    className="block text-xs font-medium text-[#B8B2A6] mb-2"
                  >
                    Your Wish or Dua for the Year Ahead
                  </label>
                  <textarea
                    id="fahad-wish-input"
                    rows={3}
                    maxLength={240}
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="Write a birthday wish..."
                    className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-sm text-[#F5F2EB] placeholder:text-[#6B665D] focus:border-[#E5A93C] focus:outline-none focus:ring-1 focus:ring-[#E5A93C]"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {PRESET_WISHES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setWishText(preset)}
                      className="rounded-md border border-white/15 bg-transparent px-3 py-1.5 text-xs text-[#B8B2A6] hover:border-white/35 hover:text-[#F5F2EB] transition-colors text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C]"
                    >
                      Preset {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-[#E5A93C] px-6 py-3 text-sm font-semibold text-[#07080D] hover:bg-[#F3C669] active:scale-[0.98] transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F2EB] [text-shadow:none]"
                >
                  <Flame className="h-4 w-4" />
                  <span>Light the Sparkler</span>
                </button>
              </form>
            ) : (
              <div className="mt-6 rounded-xl border border-[#E5A93C]/40 bg-transparent p-6">
                <div className="text-xs text-[#E5A93C]">Sealed Birthday Wish · Fahad</div>
                <p className="mt-3 font-display text-2xl italic text-[#F5F2EB] leading-snug">
                  “{wishText}”
                </p>
                <p className="mt-3 font-urdu text-right text-lg text-[#F3C669]" dir="rtl" lang="ur">
                  آمین ثم آمین — سالگرہ بہت بہت مبارک ہو فہد!
                </p>
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-[#A6A095]">Salute launched into the midnight sky.</span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#B8B2A6] hover:text-[#F5F2EB] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C] rounded-sm"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Write another</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
