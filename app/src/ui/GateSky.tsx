import { useEffect, useRef } from 'react';

/**
 * Fundo próprio do portal: céu de madrugada com aurora lenta, estrelas
 * piscando e anéis de luz orbitando a marca. Canvas 2D, leve e sem assets.
 */
export function GateSky({ className = 'gate__bg', rings = true }: { className?: string; rings?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext('2d')!;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const stars = Array.from({ length: 260 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.1 + 0.25,
      s: Math.random() * 2 + 0.5,
      p: Math.random() * Math.PI * 2,
    }));
    const orbit = Array.from({ length: 90 }, (_, i) => ({
      ring: i % 3,
      a: Math.random() * Math.PI * 2,
      v: (0.04 + Math.random() * 0.05) * (i % 2 ? 1 : -1),
      r: Math.random() * 1.4 + 0.4,
    }));

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener('resize', resize);

    const aurora = (t: number, hue: string, y0: number, amp: number, k: number, ph: number) => {
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w + 20; x += 20) {
        const y = h * y0 + Math.sin(x * k + t * 0.18 + ph) * amp + Math.sin(x * k * 2.3 - t * 0.11 + ph) * amp * 0.4;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      const g = ctx.createLinearGradient(0, h * (y0 - 0.2), 0, h * (y0 + 0.35));
      g.addColorStop(0, 'transparent');
      g.addColorStop(0.35, hue);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fill();
    };

    const draw = (ms: number) => {
      const t = ms / 1000;
      // céu: degradê fundo azul-violeta
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#05060b');
      bg.addColorStop(0.6, '#0a0c18');
      bg.addColorStop(1, '#120f24');
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // estrelas
      for (const s of stars) {
        const a = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * s.s + s.p));
        const x = ((s.x + t * 0.002 * s.r) % 1) * w;
        ctx.globalAlpha = a * (1 - s.y * 0.65);
        ctx.fillStyle = '#e8eaff';
        ctx.beginPath();
        ctx.arc(x, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // aurora em camadas
      ctx.globalCompositeOperation = 'lighter';
      aurora(t, 'rgba(120, 96, 220, 0.16)', 0.62, h * 0.06, 0.0032, 0);
      aurora(t, 'rgba(80, 170, 200, 0.10)', 0.7, h * 0.05, 0.0024, 2.1);
      aurora(t, 'rgba(165, 150, 242, 0.08)', 0.55, h * 0.08, 0.0018, 4.2);

      // brilho central atrás da marca
      const cx = w / 2;
      const cy = h * 0.4;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.45);
      glow.addColorStop(0, 'rgba(139, 112, 246, 0.22)');
      glow.addColorStop(0.5, 'rgba(90, 70, 190, 0.06)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // anéis orbitando a marca (elipses inclinadas)
      const base = Math.min(w, h) * 0.16;
      if (rings) {
      for (let r = 0; r < 3; r++) {
        ctx.strokeStyle = `rgba(165, 150, 242, ${0.07 - r * 0.015})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, base * (1 + r * 0.55), base * (0.32 + r * 0.16), -0.18 + r * 0.12, 0, Math.PI * 2);
        ctx.stroke();
      }
      for (const o of orbit) {
        const rr = base * (1 + o.ring * 0.55);
        const ry = base * (0.32 + o.ring * 0.16);
        const rot = -0.18 + o.ring * 0.12;
        const a = o.a + t * o.v;
        const ex = Math.cos(a) * rr;
        const ey = Math.sin(a) * ry;
        const x = cx + ex * Math.cos(rot) - ey * Math.sin(rot);
        const y = cy + ex * Math.sin(rot) + ey * Math.cos(rot);
        const front = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(a));
        ctx.globalAlpha = front * 0.8;
        ctx.fillStyle = o.ring === 1 ? '#8fd3df' : '#b9adff';
        ctx.beginPath();
        ctx.arc(x, y, o.r * front, 0, Math.PI * 2);
        ctx.fill();
      }
      }
      ctx.globalAlpha = 1;

      // névoa baixa
      ctx.globalCompositeOperation = 'source-over';
      const mist = ctx.createLinearGradient(0, h * 0.75, 0, h);
      mist.addColorStop(0, 'transparent');
      mist.addColorStop(1, 'rgba(18, 15, 36, 0.9)');
      ctx.fillStyle = mist;
      ctx.fillRect(0, h * 0.75, w, h * 0.25);

      if (!reduce && !document.hidden) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    // aba escondida: para de desenhar; ao voltar, retoma
    const vis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };
    document.addEventListener('visibilitychange', vis);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', vis);
      removeEventListener('resize', resize);
    };
  }, [rings]);

  return <canvas className={className} ref={ref} aria-hidden="true" />;
}
