import { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { BelatedNoteSection } from './components/BelatedNoteSection';
import { FireworksCanvas, FireworksHandle } from './components/FireworksCanvas';
import { Header } from './components/Header';
import { LegalView } from './components/LegalPages';
import { PyroControlDock } from './components/PyroControlDock';
import { UrduQuotesSection } from './components/UrduQuotesSection';
import { WishRitualSection } from './components/WishRitualSection';
import { PyrotechnicType } from './utils/fireworksEngine';
import { pyroAudio } from './utils/pyroAudio';

type AppRoute = '/' | '/privacy-policy' | '/terms-and-conditions' | '/404';

function resolveRoute(pathname: string): AppRoute {
  if (pathname === '/' || pathname === '') return '/';
  if (pathname === '/privacy-policy') return '/privacy-policy';
  if (pathname === '/terms-and-conditions') return '/terms-and-conditions';
  return '/404';
}

export default function App() {
  const fireworksRef = useRef<FireworksHandle | null>(null);
  const [autoShow, setAutoShow] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [launchCount, setLaunchCount] = useState(0);
  const [heroImgError, setHeroImgError] = useState(false);
  const [route, setRoute] = useState<AppRoute>(() =>
    typeof window !== 'undefined' ? resolveRoute(window.location.pathname) : '/'
  );

  useEffect(() => {
    const onPopState = () => {
      setRoute(resolveRoute(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigateTo = useCallback((nextRoute: AppRoute) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', nextRoute);
      setRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleCountIncrement = useCallback((delta: number) => {
    setLaunchCount((prev) => prev + delta);
  }, []);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      pyroAudio.setEnabled(next);
      return next;
    });
  }, []);

  const handleLaunchFinale = useCallback(() => {
    if (!soundEnabled) {
      pyroAudio.setEnabled(true);
      setSoundEnabled(true);
    }
    fireworksRef.current?.launchFinale();
  }, [soundEnabled]);

  const handleLaunchType = useCallback((type: PyrotechnicType) => {
    fireworksRef.current?.launchShell(type);
  }, []);

  const handleSendSalute = useCallback((hue: number) => {
    fireworksRef.current?.launchAt(
      window.innerWidth * (0.3 + Math.random() * 0.4),
      window.innerHeight * (0.18 + Math.random() * 0.2),
      'dahlia',
      hue
    );
  }, []);

  const handleSealBroken = useCallback(() => {
    fireworksRef.current?.launchShell('willow', 42);
    window.setTimeout(() => fireworksRef.current?.launchShell('willow', 38), 260);
  }, []);

  const handleIgniteWish = useCallback(() => {
    if (!soundEnabled) {
      pyroAudio.setEnabled(true);
      setSoundEnabled(true);
    }
    fireworksRef.current?.launchFinale();
  }, [soundEnabled]);

  return (
    <div id="top" className="relative min-h-screen bg-[#07080D] text-[#F5F2EB]">
      {/* Interactive Full-Viewport Fireworks & Crackers Sky */}
      <FireworksCanvas
        ref={fireworksRef}
        autoShow={autoShow}
        onCountIncrement={handleCountIncrement}
      />

      {/* Sticky 3-Zone Top Bar */}
      <Header
        onLaunchFinale={handleLaunchFinale}
        onNavigateHome={() => {
          if (route !== '/') navigateTo('/');
        }}
      />

      {route !== '/' ? (
        <LegalView route={route} onBackHome={() => navigateTo('/')} />
      ) : (
        <main className="pointer-events-none relative z-10">
          {/* Hero Section — pointers fall through empty sky to canvas */}
          <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              <div className="pointer-events-auto lg:col-span-7 flex flex-col justify-center rounded-xl border border-white/15 bg-transparent p-8 sm:p-12 [text-shadow:0_2px_12px_rgba(7,8,13,0.95)]">
                <p className="text-xs font-medium tracking-widest uppercase text-[#E5A93C]">
                  Belated Birthday Tribute · November 2026
                </p>

                <h1 className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#F5F2EB] leading-[1.05] text-balance">
                  Happy Birthday, Fahad.
                </h1>

                <p className="mt-5 max-w-xl text-base sm:text-lg text-[#D6D0C4] leading-relaxed">
                  Sorry for late wish — some celebrations deserve more than a rushed message. Tonight the sky lights up for you, with realistic crackers, fireworks, and heartfelt Urdu couplets.
                </p>

                <p
                  dir="rtl"
                  lang="ur"
                  className="font-urdu mt-6 text-right text-xl sm:text-2xl text-[#F3C669]"
                >
                  دیر سے سہی، مگر دل کی گہرائیوں سے سالگرہ مبارک ہو فہد
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleLaunchFinale}
                    className="rounded-md bg-[#E5A93C] px-6 py-3 text-sm font-semibold text-[#07080D] hover:bg-[#F3C669] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F2EB] [text-shadow:none]"
                  >
                    Ignite Grand Finale
                  </button>

                  <a
                    href="#the-note"
                    className="rounded-md border border-white/25 bg-transparent px-5 py-3 text-sm font-medium text-[#F5F2EB] hover:border-white/45 hover:bg-white/5 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C]"
                  >
                    Read Late-Wish Note
                  </a>

                  <button
                    type="button"
                    onClick={handleToggleSound}
                    className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-transparent px-4 py-3 text-xs font-medium text-[#B8B2A6] hover:text-[#F5F2EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C]"
                  >
                    {soundEnabled ? (
                      <Volume2 className="h-4 w-4 text-[#E5A93C]" />
                    ) : (
                      <VolumeX className="h-4 w-4" />
                    )}
                    <span>{soundEnabled ? 'Sound On' : 'Enable Sound'}</span>
                  </button>
                </div>

                <p className="mt-6 text-xs text-[#A6A095]">
                  Tip: Click or tap anywhere on the open dark sky to launch fireworks &amp; ground crackers.
                </p>
              </div>

              {/* Hero Visual Card */}
              <figure className="pointer-events-auto lg:col-span-5 flex flex-col">
                <div className="relative flex-1 overflow-hidden rounded-xl border border-white/15 bg-transparent min-h-[280px]">
                  {!heroImgError ? (
                    <img
                      src="/src/assets/images/hero_fahad_celebration_1795263108000.jpg"
                      alt="Golden handheld sparklers glowing warmly at midnight over a city skyline"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgError(true)}
                      className="h-full w-full object-cover opacity-85"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-transparent p-8 text-center">
                      <span className="font-display text-3xl text-[#E5A93C]">Fahad · 2026</span>
                      <span className="mt-2 text-xs text-[#A6A095]">Midnight Sparkler Tribute</span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07080D]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 [text-shadow:0_2px_10px_rgba(7,8,13,0.95)]">
                    <p className="font-display text-xl italic text-[#F5F2EB]">
                      “Better late than never — never less sincere.”
                    </p>
                  </div>
                </div>
              </figure>
            </div>
          </section>

          {/* Interactive Content Sections */}
          <div className="pointer-events-auto">
            <BelatedNoteSection onSealBroken={handleSealBroken} />
            <PyroControlDock
              autoShow={autoShow}
              soundEnabled={soundEnabled}
              launchCount={launchCount}
              onToggleAutoShow={() => setAutoShow((prev) => !prev)}
              onToggleSound={handleToggleSound}
              onLaunchType={handleLaunchType}
              onLaunchFinale={handleLaunchFinale}
            />
            <UrduQuotesSection onSendSalute={handleSendSalute} />
            <WishRitualSection onIgniteWish={handleIgniteWish} />
          </div>
        </main>
      )}

      {/* Quiet Editorial Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-transparent">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 px-6 py-8 text-xs text-[#A6A095]">
          <div className="flex items-center gap-3">
            <span className="font-display text-base font-semibold text-[#F5F2EB]">Fahad</span>
            <span aria-hidden="true">·</span>
            <span>Belated Birthday Tribute · 2026</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/privacy-policy');
              }}
              className="hover:text-[#F5F2EB] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-and-conditions"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/terms-and-conditions');
              }}
              className="hover:text-[#F5F2EB] transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
