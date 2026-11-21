import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { FireworksEngine, PyrotechnicType } from '../utils/fireworksEngine';

export interface FireworksHandle {
  launchShell: (type?: PyrotechnicType, hue?: number) => void;
  launchAt: (x: number, y: number, type?: PyrotechnicType, hue?: number) => void;
  launchFinale: () => void;
}

interface FireworksCanvasProps {
  autoShow: boolean;
  onCountIncrement: (delta: number) => void;
}

export const FireworksCanvas = forwardRef<FireworksHandle, FireworksCanvasProps>(
  function FireworksCanvas({ autoShow, onCountIncrement }, ref) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const engineRef = useRef<FireworksEngine | null>(null);
    const autoShowRef = useRef(autoShow);

    useEffect(() => {
      autoShowRef.current = autoShow;
    }, [autoShow]);

    useImperativeHandle(ref, () => ({
      launchShell: (type?: PyrotechnicType, hue?: number) => {
        engineRef.current?.launchShell(undefined, undefined, type, hue);
      },
      launchAt: (x: number, y: number, type?: PyrotechnicType, hue?: number) => {
        engineRef.current?.launchShell(x, y, type, hue);
      },
      launchFinale: () => {
        engineRef.current?.launchFinale();
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const engine = new FireworksEngine(onCountIncrement);
      engineRef.current = engine;

      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      let reducedMotion = motionQuery.matches;
      const handleMotionChange = (e: MediaQueryListEvent) => {
        reducedMotion = e.matches;
      };
      motionQuery.addEventListener('change', handleMotionChange);

      const updateSize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        engine.resize(w, h);
      };

      updateSize();
      window.addEventListener('resize', updateSize);

      // Opening celebratory salvo if motion is allowed
      if (!reducedMotion) {
        window.setTimeout(() => engine.launchShell(window.innerWidth * 0.28, window.innerHeight * 0.28, 'willow'), 250);
        window.setTimeout(() => engine.launchShell(window.innerWidth * 0.72, window.innerHeight * 0.24, 'chrysanthemum'), 650);
        window.setTimeout(() => engine.launchShell(window.innerWidth * 0.5, window.innerHeight * 0.2, 'crackler'), 1100);
      }

      let rafId = 0;
      let frameCounter = 0;

      const render = () => {
        frameCounter++;
        if (autoShowRef.current && !reducedMotion) {
          if (frameCounter % 95 === 0) {
            engine.launchShell();
          }
          if (frameCounter % 270 === 0) {
            const crackerType = Math.random() > 0.45 ? 'anar' : 'chakri';
            engine.spawnGroundCracker(
              window.innerWidth * (0.18 + Math.random() * 0.64),
              window.innerHeight - 24,
              crackerType
            );
          }
        }
        engine.step(ctx, reducedMotion);
        rafId = window.requestAnimationFrame(render);
      };

      rafId = window.requestAnimationFrame(render);

      return () => {
        window.cancelAnimationFrame(rafId);
        window.removeEventListener('resize', updateSize);
        motionQuery.removeEventListener('change', handleMotionChange);
      };
    }, [onCountIncrement]);

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (y > rect.height * 0.78) {
        engineRef.current?.spawnGroundCracker(x, Math.min(rect.height - 20, y), Math.random() > 0.5 ? 'anar' : 'chakri');
      } else {
        engineRef.current?.launchShell(x, y);
      }
    };

    return (
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        aria-label="Interactive night sky fireworks canvas — click anywhere to launch fireworks"
        className="fixed inset-0 z-0 h-full w-full cursor-crosshair"
      />
    );
  }
);
