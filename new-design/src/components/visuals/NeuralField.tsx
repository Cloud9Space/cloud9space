import { useEffect, useRef } from "react";

/**
 * "Who we are" illustration: data, enriched with location, flows through AI models into a single
 * decision. Each stage is a layer with its own colour and caption; signals cross slowly and sparsely. Canvas, coloured from the surrounding
 * CSS tokens, paused off-screen and static under reduced motion. Purely decorative.
 */

const LAYERS = [3, 4, 5, 1];
/** Caption and colour token per layer. */
export const STAGES = [
  { label: "Data", tone: "foreground" },
  { label: "Location", tone: "success" },
  { label: "AI models", tone: "primary" },
  { label: "Decision", tone: "accent" },
] as const;
const X0 = 0.14;
const X_SPAN = 0.72;
const WAVE_MS = 3600; // time for one signal to cross the network
const WAVE_GAP = 3000; // a new signal starts this often

const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

/** Deterministic hash → [0, 1); decides which paths each signal takes. */
const rand = (a: number, b: number) => {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

// Edge list between adjacent layers, with a stable index for hashing.
const EDGES: { l: number; i: number; j: number; k: number }[] = [];
for (let l = 0; l < LAYERS.length - 1; l++)
  for (let i = 0; i < LAYERS[l]; i++) for (let j = 0; j < LAYERS[l + 1]; j++) EDGES.push({ l, i, j, k: EDGES.length });

export const NeuralField = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let start = performance.now();
    let colors: Record<string, string> = {};

    const readColors = () => {
      const cs = getComputedStyle(canvas);
      const get = (n: string) => cs.getPropertyValue(`--${n}`).trim();
      colors = { primary: get("primary"), accent: get("accent"), success: get("success"), foreground: get("foreground"), fg: get("foreground") };
    };
    const c = (token: string, a: number) => `hsl(${token} / ${a})`;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
    };

    const draw = (now: number) => {
      const t = reduced ? 1800 : Math.max(0, now - start);
      const intro = reduced ? 1 : easeOut(t / 1200);
      const unit = W / 480;
      const span = LAYERS.length - 1;

      // Node positions, with a slow vertical drift so the network feels alive.
      const pos = (l: number, i: number) => {
        const n = LAYERS[l];
        const x = W * (X0 + (X_SPAN * l) / span);
        const gap = Math.min(H * 0.16, (H * 0.62) / Math.max(1, n - 1));
        const y = H * 0.46 + (i - (n - 1) / 2) * gap + Math.sin(t / 3000 + l * 1.3 + i * 0.9) * 2 * unit;
        return [x, y] as const;
      };
      const edgePoint = (ax: number, ay: number, bx: number, by: number, u: number) => {
        // Cubic with horizontal tangents
        const mx = (ax + bx) / 2;
        const a = (1 - u) ** 3;
        const b = 3 * (1 - u) ** 2 * u;
        const d = 3 * (1 - u) * u * u;
        const e = u ** 3;
        return [a * ax + b * mx + d * mx + e * bx, a * ay + b * ay + d * by + e * by] as const;
      };

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = intro;

      // Soft glow behind the output
      const [ox, oy] = pos(span, 0);
      const glow = ctx.createRadialGradient(ox, oy, 0, ox, oy, W * 0.32);
      glow.addColorStop(0, c(colors.accent, 0.1));
      glow.addColorStop(1, c(colors.accent, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // Static connections
      ctx.lineWidth = unit * 0.8;
      for (const e of EDGES) {
        const [ax, ay] = pos(e.l, e.i);
        const [bx, by] = pos(e.l + 1, e.j);
        ctx.strokeStyle = c(colors.fg, 0.06);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.bezierCurveTo((ax + bx) / 2, ay, (ax + bx) / 2, by, bx, by);
        ctx.stroke();
      }

      // Active signals: each wave lights a sparse, stable set of paths.
      const activation = LAYERS.map((n) => new Array(n).fill(0));
      const waves: { id: number; p: number }[] = [];
      if (!reduced) {
        const latest = Math.floor(t / WAVE_GAP);
        for (let id = latest; id >= 0 && id > latest - 2; id--) {
          const p = ((t - id * WAVE_GAP) / WAVE_MS) * span;
          if (p >= 0 && p <= span + 0.8) waves.push({ id, p });
        }
      } else {
        waves.push({ id: 1, p: span * 0.62 });
      }

      for (const { id, p } of waves) {
        for (const e of EDGES) {
          if (rand(id, e.k) > (e.l === span - 1 ? 0.6 : 0.22)) continue;
          const u = p - e.l;
          const [ax, ay] = pos(e.l, e.i);
          const [bx, by] = pos(e.l + 1, e.j);

          // Lit path behind the pulse
          if (u > 0) {
            const fade = Math.max(0, 1 - (u - 1) * 1.6);
            ctx.strokeStyle = c(colors[STAGES[e.l + 1].tone], 0.28 * Math.min(1, u) * fade);
            ctx.lineWidth = unit;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.bezierCurveTo((ax + bx) / 2, ay, (ax + bx) / 2, by, bx, by);
            ctx.stroke();
          }
          // Pulse head with a short trail
          if (u > 0 && u < 1) {
            for (let k = 0; k < 8; k++) {
              const u1 = u - k * 0.03;
              const u0 = u1 - 0.03;
              if (u0 < 0) break;
              const [x0, y0] = edgePoint(ax, ay, bx, by, u0);
              const [x1, y1] = edgePoint(ax, ay, bx, by, u1);
              ctx.strokeStyle = c(colors[STAGES[e.l + 1].tone], 0.9 * (1 - k / 8));
              ctx.lineWidth = 1.6 * unit;
              ctx.beginPath();
              ctx.moveTo(x0, y0);
              ctx.lineTo(x1, y1);
              ctx.stroke();
            }
          }
          // Nodes light up as the signal leaves and arrives
          const leave = Math.max(0, 1 - Math.abs(u) * 1.4);
          const arrive = Math.max(0, 1 - Math.abs(u - 1) * 1.4);
          activation[e.l][e.i] = Math.max(activation[e.l][e.i], leave);
          activation[e.l + 1][e.j] = Math.max(activation[e.l + 1][e.j], arrive);
        }
      }

      // Nodes
      LAYERS.forEach((n, l) => {
        for (let i = 0; i < n; i++) {
          const [x, y] = pos(l, i);
          const a = activation[l][i];
          const out = l === span;
          const r = (out ? 7 : 4.2) * unit;
          const tone = colors[STAGES[l].tone];
          if (a > 0.02) {
            const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4.5);
            g.addColorStop(0, c(tone, 0.32 * a));
            g.addColorStop(1, c(tone, 0));
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(x, y, r * 4.5, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = c(tone, out ? 0.55 + 0.45 * a : 0.22 + 0.78 * a);
          ctx.strokeStyle = c(colors.fg, 0.35);
          ctx.lineWidth = unit;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          if (out) {
            ctx.strokeStyle = c(colors.accent, 0.2 + 0.5 * a);
            ctx.beginPath();
            ctx.arc(x, y, r + (6 + 8 * a) * unit, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      });

      ctx.globalAlpha = 1;
    };

    let frame = 0;
    const loop = (now: number) => {
      if (++frame % 60 === 0) readColors();
      draw(now);
      if (visible && !reduced) raf = requestAnimationFrame(loop);
    };

    readColors();
    resize();
    start = performance.now();
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced || !visible) draw(performance.now());
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduced) raf = requestAnimationFrame(loop);
      if (!visible) cancelAnimationFrame(raf);
    });
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label="Data, enriched with location, flowing through AI models into a single decision"
      className="relative aspect-[4/3] w-full"
    >
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0" />
      <ul aria-hidden className="absolute inset-x-0 bottom-[7%]">
        {STAGES.map((s, l) => (
          <li
            key={s.label}
            className="absolute -translate-x-1/2 whitespace-nowrap text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted-foreground sm:text-xs"
            style={{ left: `${(X0 + (X_SPAN * l) / (LAYERS.length - 1)) * 100}%` }}
          >
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: `hsl(var(--${s.tone}))` }} />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
