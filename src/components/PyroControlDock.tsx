import { Flame, Pause, Play, Sparkles, Volume2, VolumeX, Zap } from 'lucide-react';
import { PyrotechnicType } from '../utils/fireworksEngine';

interface PyroControlDockProps {
  autoShow: boolean;
  soundEnabled: boolean;
  launchCount: number;
  onToggleAutoShow: () => void;
  onToggleSound: () => void;
  onLaunchType: (type: PyrotechnicType) => void;
  onLaunchFinale: () => void;
}

const PYRO_OPTIONS: Array<{
  type: PyrotechnicType;
  name: string;
  subtitle: string;
}> = [
  {
    type: 'chrysanthemum',
    name: 'Chrysanthemum Burst',
    subtitle: 'Dense spherical star trails with bright pistil core',
  },
  {
    type: 'willow',
    name: 'Golden Willow',
    subtitle: 'Slow cascading molten gold embers across the sky',
  },
  {
    type: 'crackler',
    name: 'Crackling Patakha',
    subtitle: 'High-energy shells splitting into secondary micro-pops',
  },
  {
    type: 'dahlia',
    name: 'Royal Dahlia Ring',
    subtitle: 'Dual-tone jewel peony burst in ruby, emerald, and gold',
  },
  {
    type: 'anar',
    name: 'Anar Fountain',
    subtitle: 'Roaring ground cone showering silver-gold sparks upward',
  },
  {
    type: 'chakri',
    name: 'Chakri Spinner',
    subtitle: 'Spinning ground wheel throwing fiery tangential arcs',
  },
];

export function PyroControlDock({
  autoShow,
  soundEnabled,
  launchCount,
  onToggleAutoShow,
  onToggleSound,
  onLaunchType,
  onLaunchFinale,
}: PyroControlDockProps) {
  return (
    <section id="fireworks" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <div className="rounded-xl border border-white/10 bg-[#0E1017]/85 p-6 sm:p-10 backdrop-blur-md">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest uppercase text-[#E5A93C]">
              Interactive Pyrotechnic Deck
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#F5F2EB] text-balance">
              Fireworks &amp; Crackers on Demand
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#A6A095] leading-relaxed">
              Click any cracker or aerial shell below — or tap directly anywhere in the midnight sky — to ignite realistic physics-driven fireworks for Fahad.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="mr-2 text-left sm:text-right">
              <div className="text-xs text-[#A6A095]">Shells Ignited</div>
              <div className="font-mono text-xl font-semibold text-[#F5F2EB] tabular-nums">
                {launchCount}
              </div>
            </div>

            <button
              type="button"
              onClick={onToggleAutoShow}
              className={`inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C] ${
                autoShow
                  ? 'border-[#E5A93C]/50 bg-[#E5A93C]/15 text-[#F5F2EB]'
                  : 'border-white/15 bg-white/5 text-[#B8B2A6] hover:text-[#F5F2EB]'
              }`}
            >
              {autoShow ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{autoShow ? 'Auto Show On' : 'Auto Show Paused'}</span>
            </button>

            <button
              type="button"
              onClick={onToggleSound}
              className={`inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C] ${
                soundEnabled
                  ? 'border-[#E5A93C]/50 bg-[#E5A93C]/15 text-[#F5F2EB]'
                  : 'border-white/15 bg-white/5 text-[#B8B2A6] hover:text-[#F5F2EB]'
              }`}
            >
              {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              <span>{soundEnabled ? 'Audio On' : 'Audio Muted'}</span>
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PYRO_OPTIONS.map((item) => (
            <button
              key={item.type}
              type="button"
              onClick={() => onLaunchType(item.type)}
              className="group flex flex-col justify-between rounded-lg border border-white/10 bg-[#131620]/90 p-5 text-left transition-all duration-150 hover:border-[#E5A93C]/55 hover:bg-[#171B27] active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C]"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-base font-semibold text-[#F5F2EB] group-hover:text-[#F3C669] transition-colors">
                    {item.name}
                  </span>
                  {item.type === 'anar' || item.type === 'chakri' ? (
                    <Flame className="h-4 w-4 text-[#E5A93C] shrink-0" />
                  ) : item.type === 'crackler' || item.type === 'ladi' ? (
                    <Zap className="h-4 w-4 text-[#E5A93C] shrink-0" />
                  ) : (
                    <Sparkles className="h-4 w-4 text-[#E5A93C] shrink-0" />
                  )}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#A6A095]">
                  {item.subtitle}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-xs font-medium text-[#E5A93C]">
                Ignite now
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg border border-[#E5A93C]/25 bg-[#E5A93C]/10 px-5 py-4">
          <p className="text-sm text-[#F5F2EB]">
            Ready for the full nocturnal salute? Launch an 11-shell synchronized barrage with fountains and crackling patakhas.
          </p>
          <button
            type="button"
            onClick={onLaunchFinale}
            className="px-5 py-2.5 text-xs font-semibold text-[#07080D] bg-[#E5A93C] hover:bg-[#F3C669] active:scale-[0.98] transition-all duration-150 rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F2EB]"
          >
            Ignite 11-Shell Finale
          </button>
        </div>
      </div>
    </section>
  );
}
