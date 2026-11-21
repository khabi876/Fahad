import { pyroAudio } from './pyroAudio';

export type PyrotechnicType =
  | 'chrysanthemum'
  | 'willow'
  | 'crackler'
  | 'dahlia'
  | 'crossette'
  | 'anar'
  | 'chakri'
  | 'ladi';

interface TrailPoint {
  x: number;
  y: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  gravity: number;
  drag: number;
  hue: number;
  saturation: number;
  lightness: number;
  size: number;
  trail: TrailPoint[];
  maxTrail: number;
  twinkle: boolean;
  canCrackle: boolean;
  crackleDelay: number;
  crackled: boolean;
  splitChild?: boolean;
}

interface Shell {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  type: PyrotechnicType;
  hue: number;
  trail: TrailPoint[];
  exploded: boolean;
  isSubShell?: boolean;
  subLife?: number;
}

interface GroundCracker {
  x: number;
  y: number;
  type: 'anar' | 'chakri' | 'ladi';
  life: number;
  maxLife: number;
  angle: number;
  spinSpeed: number;
  hue: number;
  ladiStep?: number;
  ladiDirection?: number;
}

interface SmokePuff {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  hue: number;
}

interface SkyFlash {
  x: number;
  y: number;
  radius: number;
  hue: number;
  alpha: number;
}

interface Star {
  xRatio: number;
  yRatio: number;
  size: number;
  baseAlpha: number;
  phase: number;
  speed: number;
}

const PALETTES: Record<PyrotechnicType, number[]> = {
  chrysanthemum: [42, 34, 14, 352, 196],
  willow: [43, 38, 32],
  crackler: [38, 18, 48, 355],
  dahlia: [345, 160, 212, 42],
  crossette: [44, 198, 348, 152],
  anar: [40, 32, 48],
  chakri: [44, 24, 12],
  ladi: [10, 38, 48],
};

export class FireworksEngine {
  private shells: Shell[] = [];
  private sparks: Spark[] = [];
  private groundCrackers: GroundCracker[] = [];
  private smokePuffs: SmokePuff[] = [];
  private flashes: SkyFlash[] = [];
  private stars: Star[] = [];
  private width = 1440;
  private height = 900;
  private tick = 0;
  private onLaunchCountChange?: (delta: number) => void;

  constructor(onLaunchCountChange?: (delta: number) => void) {
    this.onLaunchCountChange = onLaunchCountChange;
    for (let i = 0; i < 115; i++) {
      this.stars.push({
        xRatio: Math.random(),
        yRatio: Math.random() * 0.72,
        size: Math.random() * 1.35 + 0.4,
        baseAlpha: Math.random() * 0.45 + 0.15,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.008,
      });
    }
  }

  public resize(width: number, height: number): void {
    this.width = Math.max(width, 320);
    this.height = Math.max(height, 320);
  }

  public launchShell(
    targetX?: number,
    targetY?: number,
    forcedType?: PyrotechnicType,
    forcedHue?: number
  ): void {
    const types: PyrotechnicType[] = [
      'chrysanthemum',
      'willow',
      'crackler',
      'dahlia',
      'crossette',
    ];
    const type = forcedType ?? types[Math.floor(Math.random() * types.length)];

    if (type === 'anar' || type === 'chakri' || type === 'ladi') {
      const gx = targetX ?? this.width * (0.2 + Math.random() * 0.6);
      const gy = Math.min(
        this.height - 24,
        Math.max(this.height * 0.68, targetY ?? this.height - 26)
      );
      this.spawnGroundCracker(gx, gy, type);
      return;
    }

    const startX =
      targetX !== undefined
        ? targetX + (Math.random() - 0.5) * 80
        : this.width * (0.15 + Math.random() * 0.7);
    const startY = this.height + 10;

    const destX = targetX ?? startX + (Math.random() - 0.5) * 140;
    const destY =
      targetY !== undefined
        ? Math.min(targetY, this.height * 0.65)
        : this.height * (0.14 + Math.random() * 0.32);

    const dy = startY - destY;
    const gravity = 0.085;
    const travelFrames = 42 + Math.random() * 16;
    const vy = -(dy / travelFrames + 0.5 * gravity * travelFrames);
    const vx = (destX - startX) / travelFrames;

    const palette = PALETTES[type];
    const hue = forcedHue ?? palette[Math.floor(Math.random() * palette.length)];

    this.shells.push({
      x: startX,
      y: startY,
      vx,
      vy,
      targetY: destY,
      type,
      hue,
      trail: [{ x: startX, y: startY }],
      exploded: false,
    });

    pyroAudio.playLaunch();
    this.onLaunchCountChange?.(1);
  }

  public spawnGroundCracker(
    x: number,
    y: number,
    type: 'anar' | 'chakri' | 'ladi'
  ): void {
    const palette = PALETTES[type];
    this.groundCrackers.push({
      x,
      y,
      type,
      life: 0,
      maxLife: type === 'anar' ? 140 : type === 'ladi' ? 96 : 120,
      angle: Math.random() * Math.PI * 2,
      spinSpeed: type === 'chakri' ? 0.44 : 0,
      hue: palette[Math.floor(Math.random() * palette.length)],
      ladiStep: 0,
      ladiDirection: x < this.width * 0.5 ? 1 : -1,
    });
    pyroAudio.playCracklePop();
    this.onLaunchCountChange?.(1);
  }

  public launchFinale(): void {
    const sequence: Array<{
      delay: number;
      xRatio: number;
      yRatio: number;
      type: PyrotechnicType;
    }> = [
      { delay: 0, xRatio: 0.2, yRatio: 0.28, type: 'willow' },
      { delay: 140, xRatio: 0.8, yRatio: 0.26, type: 'willow' },
      { delay: 260, xRatio: 0.5, yRatio: 0.22, type: 'crossette' },
      { delay: 400, xRatio: 0.3, yRatio: 0.92, type: 'anar' },
      { delay: 440, xRatio: 0.7, yRatio: 0.92, type: 'anar' },
      { delay: 560, xRatio: 0.22, yRatio: 0.93, type: 'ladi' },
      { delay: 680, xRatio: 0.36, yRatio: 0.24, type: 'crackler' },
      { delay: 820, xRatio: 0.64, yRatio: 0.22, type: 'crackler' },
      { delay: 980, xRatio: 0.5, yRatio: 0.92, type: 'chakri' },
      { delay: 1120, xRatio: 0.5, yRatio: 0.18, type: 'dahlia' },
      { delay: 1320, xRatio: 0.24, yRatio: 0.2, type: 'willow' },
      { delay: 1440, xRatio: 0.76, yRatio: 0.2, type: 'willow' },
      { delay: 1580, xRatio: 0.5, yRatio: 0.24, type: 'chrysanthemum' },
    ];

    sequence.forEach((item) => {
      window.setTimeout(() => {
        this.launchShell(
          this.width * item.xRatio,
          this.height * item.yRatio,
          item.type
        );
      }, item.delay);
    });
  }

  private addSmoke(x: number, y: number, hue: number, count = 4): void {
    for (let i = 0; i < count; i++) {
      this.smokePuffs.push({
        x: x + (Math.random() - 0.5) * 26,
        y: y + (Math.random() - 0.5) * 26,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -0.25 - Math.random() * 0.35,
        radius: 22 + Math.random() * 28,
        alpha: 0.085,
        hue,
      });
    }
  }

  private detonate(shell: Shell): void {
    shell.exploded = true;

    this.flashes.push({
      x: shell.x,
      y: shell.y,
      radius: shell.isSubShell ? 95 : shell.type === 'willow' ? 225 : 185,
      hue: shell.hue,
      alpha: shell.isSubShell ? 0.24 : 0.38,
    });

    if (!shell.isSubShell) {
      this.addSmoke(shell.x, shell.y, shell.hue, 5);
    }

    if (shell.type === 'crackler' || shell.isSubShell) {
      pyroAudio.playBurst('cracker');
    } else if (shell.type === 'willow') {
      pyroAudio.playBurst('soft');
    } else {
      pyroAudio.playBurst('heavy');
    }

    if (shell.type === 'crossette' && !shell.isSubShell) {
      // Split into 5 bright comet sub-shells that burst 22 frames later
      const subCount = 5;
      for (let i = 0; i < subCount; i++) {
        const angle = (Math.PI * 2 * i) / subCount + (Math.random() - 0.5) * 0.2;
        const speed = 3.2 + Math.random() * 1.4;
        this.shells.push({
          x: shell.x,
          y: shell.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8,
          targetY: -999,
          type: 'chrysanthemum',
          hue: (shell.hue + i * 28) % 360,
          trail: [{ x: shell.x, y: shell.y }],
          exploded: false,
          isSubShell: true,
          subLife: 20 + Math.floor(Math.random() * 8),
        });
      }
      return;
    }

    if (shell.isSubShell) {
      for (let i = 0; i < 34; i++) {
        const angle = (Math.PI * 2 * i) / 34 + (Math.random() - 0.5) * 0.12;
        const speed = 1.8 + Math.random() * 2.8;
        this.sparks.push({
          x: shell.x,
          y: shell.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.019 + Math.random() * 0.008,
          gravity: 0.045,
          drag: 0.97,
          hue: shell.hue,
          saturation: 94,
          lightness: 74,
          size: 1.9,
          trail: [],
          maxTrail: 7,
          twinkle: true,
          canCrackle: false,
          crackleDelay: 0,
          crackled: false,
        });
      }
      return;
    }

    if (shell.type === 'chrysanthemum') {
      const count = 98;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.08;
        const speed = 3.2 + Math.random() * 4.5;
        this.sparks.push({
          x: shell.x,
          y: shell.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.011 + Math.random() * 0.008,
          gravity: 0.048,
          drag: 0.976,
          hue: shell.hue + (Math.random() - 0.5) * 14,
          saturation: 92,
          lightness: 68,
          size: 2.1,
          trail: [],
          maxTrail: 9,
          twinkle: false,
          canCrackle: false,
          crackleDelay: 0,
          crackled: false,
        });
      }
      for (let i = 0; i < 28; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.1 + Math.random() * 1.9;
        this.sparks.push({
          x: shell.x,
          y: shell.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.018,
          gravity: 0.035,
          drag: 0.97,
          hue: 46,
          saturation: 100,
          lightness: 84,
          size: 1.8,
          trail: [],
          maxTrail: 5,
          twinkle: true,
          canCrackle: false,
          crackleDelay: 0,
          crackled: false,
        });
      }
    } else if (shell.type === 'willow') {
      const count = 82;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.6 + Math.random() * 4.3;
        this.sparks.push({
          x: shell.x,
          y: shell.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          alpha: 1,
          decay: 0.0066 + Math.random() * 0.004,
          gravity: 0.068,
          drag: 0.968,
          hue: 38 + Math.random() * 10,
          saturation: 95,
          lightness: 72,
          size: 2.0,
          trail: [],
          maxTrail: 14,
          twinkle: true,
          canCrackle: false,
          crackleDelay: 0,
          crackled: false,
        });
      }
    } else if (shell.type === 'crackler') {
      const count = 44;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.4 + Math.random() * 4.5;
        this.sparks.push({
          x: shell.x,
          y: shell.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.015 + Math.random() * 0.008,
          gravity: 0.052,
          drag: 0.974,
          hue: shell.hue,
          saturation: 90,
          lightness: 78,
          size: 2.3,
          trail: [],
          maxTrail: 7,
          twinkle: true,
          canCrackle: true,
          crackleDelay: 18 + Math.floor(Math.random() * 20),
          crackled: false,
        });
      }
    } else {
      const count = 86;
      const secondaryHue = (shell.hue + 145) % 360;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const ring = i % 2 === 0 ? 5.2 : 3.4;
        const speed = ring + (Math.random() - 0.5) * 0.6;
        this.sparks.push({
          x: shell.x,
          y: shell.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.012 + Math.random() * 0.006,
          gravity: 0.04,
          drag: 0.978,
          hue: i % 2 === 0 ? shell.hue : secondaryHue,
          saturation: 94,
          lightness: 68,
          size: i % 2 === 0 ? 2.4 : 1.9,
          trail: [],
          maxTrail: 8,
          twinkle: true,
          canCrackle: false,
          crackleDelay: 0,
          crackled: false,
        });
      }
    }
  }

  public step(ctx: CanvasRenderingContext2D, reducedMotion: boolean): void {
    this.tick++;

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = reducedMotion ? 'rgba(7, 8, 13, 0.45)' : 'rgba(7, 8, 13, 0.22)';
    ctx.fillRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];
      const alpha = reducedMotion
        ? s.baseAlpha
        : s.baseAlpha + Math.sin(this.tick * s.speed + s.phase) * 0.22;
      ctx.fillStyle = `rgba(245, 242, 235, ${Math.max(0.05, alpha)})`;
      ctx.beginPath();
      ctx.arc(s.xRatio * this.width, s.yRatio * this.height, s.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Drifting ambient smoke puffs
    for (let i = this.smokePuffs.length - 1; i >= 0; i--) {
      const sm = this.smokePuffs[i];
      sm.x += sm.vx;
      sm.y += sm.vy;
      sm.radius += 0.22;
      sm.alpha -= 0.0008;
      if (sm.alpha <= 0) {
        this.smokePuffs.splice(i, 1);
        continue;
      }
      const grad = ctx.createRadialGradient(sm.x, sm.y, 0, sm.x, sm.y, sm.radius);
      grad.addColorStop(0, `hsla(${sm.hue}, 25%, 55%, ${sm.alpha})`);
      grad.addColorStop(1, 'rgba(7, 8, 13, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(sm.x, sm.y, sm.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'lighter';

    for (let i = this.flashes.length - 1; i >= 0; i--) {
      const f = this.flashes[i];
      const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
      grad.addColorStop(0, `hsla(${f.hue}, 95%, 70%, ${f.alpha})`);
      grad.addColorStop(0.45, `hsla(${f.hue}, 90%, 55%, ${f.alpha * 0.35})`);
      grad.addColorStop(1, `hsla(${f.hue}, 80%, 40%, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fill();
      f.alpha -= 0.025;
      if (f.alpha <= 0) this.flashes.splice(i, 1);
    }

    for (let i = this.shells.length - 1; i >= 0; i--) {
      const s = this.shells[i];
      s.trail.push({ x: s.x, y: s.y });
      if (s.trail.length > 7) s.trail.shift();

      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.085;

      if (s.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(s.trail[0].x, s.trail[0].y);
        for (let t = 1; t < s.trail.length; t++) {
          ctx.lineTo(s.trail[t].x, s.trail[t].y);
        }
        ctx.strokeStyle = `hsla(${s.hue}, 95%, 76%, 0.78)`;
        ctx.lineWidth = s.isSubShell ? 1.8 : 2.2;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      ctx.fillStyle = '#FFF5D6';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.isSubShell ? 2.0 : 2.4, 0, Math.PI * 2);
      ctx.fill();

      if (s.isSubShell) {
        s.subLife = (s.subLife ?? 1) - 1;
        if (s.subLife <= 0) {
          this.detonate(s);
          this.shells.splice(i, 1);
        }
      } else if (s.vy >= -0.35 || s.y <= s.targetY) {
        this.detonate(s);
        this.shells.splice(i, 1);
      }
    }

    for (let i = this.groundCrackers.length - 1; i >= 0; i--) {
      const gc = this.groundCrackers[i];
      gc.life++;

      if (gc.type === 'anar') {
        const sparksPerFrame = 4;
        for (let k = 0; k < sparksPerFrame; k++) {
          const spread = (Math.random() - 0.5) * 0.42;
          const angle = -Math.PI / 2 + spread;
          const speed = 5.4 + Math.random() * 5.8;
          this.sparks.push({
            x: gc.x + (Math.random() - 0.5) * 4,
            y: gc.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            decay: 0.017 + Math.random() * 0.01,
            gravity: 0.14,
            drag: 0.985,
            hue: Math.random() > 0.25 ? 42 : 24,
            saturation: 98,
            lightness: Math.random() > 0.3 ? 82 : 66,
            size: 1.9,
            trail: [],
            maxTrail: 6,
            twinkle: true,
            canCrackle: Math.random() > 0.92,
            crackleDelay: 12,
            crackled: false,
          });
        }
        const coneGrad = ctx.createRadialGradient(gc.x, gc.y, 2, gc.x, gc.y, 44);
        coneGrad.addColorStop(0, 'rgba(255, 236, 179, 0.75)');
        coneGrad.addColorStop(1, 'rgba(229, 169, 60, 0)');
        ctx.fillStyle = coneGrad;
        ctx.beginPath();
        ctx.arc(gc.x, gc.y, 44, 0, Math.PI * 2);
        ctx.fill();
      } else if (gc.type === 'chakri') {
        gc.angle += gc.spinSpeed;
        for (let arm = 0; arm < 2; arm++) {
          const a = gc.angle + arm * Math.PI;
          const tangent = a + Math.PI / 2;
          const speed = 3.2 + Math.random() * 2.4;
          this.sparks.push({
            x: gc.x + Math.cos(a) * 8,
            y: gc.y - 12 + Math.sin(a) * 8,
            vx: Math.cos(tangent) * speed,
            vy: Math.sin(tangent) * speed * 0.55 - 0.4,
            alpha: 1,
            decay: 0.025 + Math.random() * 0.012,
            gravity: 0.06,
            drag: 0.96,
            hue: gc.hue + Math.random() * 14,
            saturation: 96,
            lightness: 75,
            size: 1.8,
            trail: [],
            maxTrail: 5,
            twinkle: true,
            canCrackle: false,
            crackleDelay: 0,
            crackled: false,
          });
        }
      } else {
        // Ladi string cracker chain: sequential rapid-fire pops racing horizontally
        if (gc.life % 6 === 1) {
          const step = gc.ladiStep ?? 0;
          const dir = gc.ladiDirection ?? 1;
          const popX = Math.max(
            40,
            Math.min(this.width - 40, gc.x + dir * step * 24)
          );
          const popY = gc.y - Math.random() * 8;
          gc.ladiStep = step + 1;

          pyroAudio.playCracklePop();
          this.flashes.push({
            x: popX,
            y: popY,
            radius: 42,
            hue: 16,
            alpha: 0.45,
          });
          this.addSmoke(popX, popY, 20, 1);

          for (let k = 0; k < 16; k++) {
            const a = -Math.PI + Math.random() * Math.PI;
            const sp = 2.0 + Math.random() * 4.2;
            this.sparks.push({
              x: popX,
              y: popY,
              vx: Math.cos(a) * sp,
              vy: Math.sin(a) * sp - 1.2,
              alpha: 1,
              decay: 0.038 + Math.random() * 0.02,
              gravity: 0.11,
              drag: 0.95,
              hue: Math.random() > 0.4 ? 14 : 44,
              saturation: 100,
              lightness: 78,
              size: 1.8,
              trail: [],
              maxTrail: 4,
              twinkle: true,
              canCrackle: false,
              crackleDelay: 0,
              crackled: false,
            });
          }
        }
      }

      if (gc.type !== 'ladi' && gc.life % 18 === 0) {
        pyroAudio.playCracklePop();
      }

      if (gc.life >= gc.maxLife) {
        this.groundCrackers.splice(i, 1);
      }
    }

    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const p = this.sparks[i];
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > p.maxTrail) p.trail.shift();

      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.canCrackle && !p.crackled) {
        p.crackleDelay--;
        if (p.crackleDelay <= 0) {
          p.crackled = true;
          pyroAudio.playCracklePop();
          for (let c = 0; c < 6; c++) {
            const ca = Math.random() * Math.PI * 2;
            const cs = 1.2 + Math.random() * 2.4;
            this.sparks.push({
              x: p.x,
              y: p.y,
              vx: Math.cos(ca) * cs,
              vy: Math.sin(ca) * cs,
              alpha: 0.95,
              decay: 0.045 + Math.random() * 0.02,
              gravity: 0.05,
              drag: 0.94,
              hue: 48,
              saturation: 100,
              lightness: 88,
              size: 1.5,
              trail: [],
              maxTrail: 3,
              twinkle: true,
              canCrackle: false,
              crackleDelay: 0,
              crackled: false,
            });
          }
        }
      }

      if (p.alpha <= 0.02) {
        this.sparks.splice(i, 1);
        continue;
      }

      const flicker = p.twinkle ? 0.65 + Math.random() * 0.35 : 1;
      const drawAlpha = Math.max(0, Math.min(1, p.alpha * flicker));

      if (p.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(p.trail[0].x, p.trail[0].y);
        for (let t = 1; t < p.trail.length; t++) {
          ctx.lineTo(p.trail[t].x, p.trail[t].y);
        }
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${drawAlpha * 0.72})`;
        ctx.lineWidth = p.size * 0.85;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      ctx.fillStyle = `hsla(${p.hue}, 100%, ${Math.min(96, p.lightness + 16)}%, ${drawAlpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.72, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
  }
}
