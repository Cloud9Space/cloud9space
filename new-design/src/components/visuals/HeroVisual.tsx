import { useEffect, useRef } from "react";

/**
 * Hero illustration: a slowly turning dotted globe with a handful of live connections and an
 * orbiting satellite. Drawn on canvas (one draw pass per frame) and coloured from the section's
 * CSS tokens, so it follows theme / tone changes. Purely decorative.
 */

const DEG = Math.PI / 180;
const TILT = 0.38; // rad — tips the north pole toward the viewer
const SPIN = (Math.PI * 2) / 110_000; // one revolution every ~110 s
const DOTS = 1600;

type Vec = [number, number, number];

const fromLatLon = (lat: number, lon: number): Vec => {
  const cl = Math.cos(lat * DEG);
  return [cl * Math.sin(lon * DEG), Math.sin(lat * DEG), cl * Math.cos(lon * DEG)];
};

/** Abstract "landmass" field — gives the globe structure without shipping real geodata. */
const land = (lat: number, lon: number) =>
  Math.sin(lon * 2.1 + 0.6) * Math.cos(lat * 2.6) +
  0.55 * Math.sin(lon * 4.7 + lat * 1.9 + 1.3) +
  0.35 * Math.cos(lon * 1.3 - lat * 3.7);

// Fibonacci sphere: evenly spread points, split into land / sea.
const POINTS = Array.from({ length: DOTS }, (_, i) => {
  const y = 1 - (2 * (i + 0.5)) / DOTS;
  const r = Math.sqrt(1 - y * y);
  const phi = i * Math.PI * (3 - Math.sqrt(5));
  const v: Vec = [r * Math.sin(phi), y, r * Math.cos(phi)];
  return { v, land: land(Math.asin(y), phi % (Math.PI * 2)) > 0.45 };
});

const SITES: Vec[] = [
  fromLatLon(18.5, 73.8), // 0 Pune
  fromLatLon(51.5, -0.1), // 1 London
  fromLatLon(1.35, 103.8), // 2 Singapore
  fromLatLon(25.2, 55.3), // 3 Dubai
  fromLatLon(40.7, -74), // 4 New York
  fromLatLon(-33.9, 151.2), // 5 Sydney
];
const ROUTES: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 4],
  [2, 5],
];

const slerp = (a: Vec, b: Vec, t: number): Vec => {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const w = Math.acos(dot);
  const s = Math.sin(w) || 1;
  const k1 = Math.sin((1 - t) * w) / s;
  const k2 = Math.sin(t * w) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
};

// Pre-computed lifted great-circle arcs (world space).
const ARCS = ROUTES.map(([a, b]) => {
  const A = SITES[a];
  const B = SITES[b];
  const angle = Math.acos(A[0] * B[0] + A[1] * B[1] + A[2] * B[2]);
  const lift = 0.06 + 0.22 * (angle / Math.PI);
  return Array.from({ length: 64 }, (_, i) => {
    const t = i / 63;
    const p = slerp(A, B, t);
    const h = 1 + lift * Math.sin(Math.PI * t);
    return [p[0] * h, p[1] * h, p[2] * h] as Vec;
  });
});

const ORBIT: Vec[] = Array.from({ length: 160 }, (_, i) => {
  const th = (i / 160) * Math.PI * 2;
  const inc = 0.42;
  const x = 1.34 * Math.cos(th);
  const z = 1.34 * Math.sin(th);
  return [x * Math.cos(inc), x * Math.sin(inc), z];
});

const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

export const HeroVisual = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let size = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let start = performance.now();
    let colors = { primary: "", accent: "", fg: "", card: "", bg: "" };

    const readColors = () => {
      const cs = getComputedStyle(canvas);
      const get = (n: string) => cs.getPropertyValue(`--${n}`).trim();
      colors = { primary: get("primary"), accent: get("accent"), fg: get("foreground"), card: get("card"), bg: get("background") };
    };
    const c = (token: string, a: number) => `hsl(${token} / ${a})`;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = wrap.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
    };

    const draw = (now: number) => {
      const t = reduced ? 4000 : Math.max(0, now - start);
      const intro = reduced ? 1 : easeOut(t / 1600);
      const rot = -1.1 + t * SPIN;
      const cr = Math.cos(rot);
      const sr = Math.sin(rot);
      const ct = Math.cos(TILT);
      const st = Math.sin(TILT);
      const cx = size / 2;
      const cy = size / 2;
      const R = size * 0.34 * (0.94 + 0.06 * intro);
      const unit = size / 560;

      // world → view: spin about Y, then tilt about X.
      const view = (v: Vec): Vec => {
        const x = v[0] * cr + v[2] * sr;
        const z0 = v[2] * cr - v[0] * sr;
        return [x, v[1] * ct - z0 * st, v[1] * st + z0 * ct];
      };
      const hidden = (p: Vec) => p[2] < 0 && p[0] * p[0] + p[1] * p[1] < 1;
      const sx = (p: Vec) => cx + R * p[0];
      const sy = (p: Vec) => cy - R * p[1];

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      ctx.globalAlpha = intro;

      // Halo
      const halo = ctx.createRadialGradient(cx, cy, R * 0.75, cx, cy, R * 1.44);
      halo.addColorStop(0, c(colors.primary, 0.16));
      halo.addColorStop(1, c(colors.primary, 0));
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, size, size);

      // Orbit — back half (behind the globe)
      const orbit = ORBIT.map(view);
      const strokeOrbit = (front: boolean) => {
        ctx.beginPath();
        let pen = false;
        orbit.forEach((p, i) => {
          const isFront = p[2] >= 0;
          if (isFront !== front) {
            pen = false;
            return;
          }
          if (!pen) ctx.moveTo(sx(p), sy(p));
          else ctx.lineTo(sx(p), sy(p));
          pen = true;
          if (i === orbit.length - 1 && orbit[0][2] >= 0 === front) ctx.lineTo(sx(orbit[0]), sy(orbit[0]));
        });
        ctx.strokeStyle = c(colors.fg, front ? 0.16 : 0.07);
        ctx.lineWidth = unit;
        ctx.setLineDash([2 * unit, 5 * unit]);
        ctx.stroke();
        ctx.setLineDash([]);
      };
      strokeOrbit(false);

      // Satellite position along the orbit
      const satIdx = Math.floor(((t / 26_000) % 1) * ORBIT.length);
      const sat = orbit[satIdx];
      const drawSat = () => {
        const x = sx(sat);
        const y = sy(sat);
        const g = ctx.createRadialGradient(x, y, 0, x, y, 14 * unit);
        g.addColorStop(0, c(colors.accent, 0.55));
        g.addColorStop(1, c(colors.accent, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 14 * unit, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = c(colors.accent, 1);
        ctx.beginPath();
        ctx.arc(x, y, 2.6 * unit, 0, Math.PI * 2);
        ctx.fill();
      };
      if (sat[2] < 0) drawSat();

      // Sphere body
      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, c(colors.card, 1));
      body.addColorStop(1, c(colors.bg, 1));
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Graticule: equator + two parallels (static under spin)
      ctx.lineWidth = unit;
      [-30, 0, 30].forEach((lat) => {
        const yc = cy - R * Math.sin(lat * DEG) * ct;
        const rx = R * Math.cos(lat * DEG);
        ctx.beginPath();
        ctx.ellipse(cx, yc, rx, rx * st, 0, 0, Math.PI); // front half only
        ctx.strokeStyle = c(colors.fg, lat === 0 ? 0.08 : 0.05);
        ctx.stroke();
      });

      // Dots
      for (const pt of POINTS) {
        const p = view(pt.v);
        if (p[2] < -0.15) continue;
        const depth = (p[2] + 1) / 2; // 0 back → 1 front
        const a = pt.land ? 0.12 + 0.85 * depth * depth : 0.03 + 0.1 * depth;
        const r = (pt.land ? 1.5 : 0.8) * (0.55 + 0.45 * depth) * unit;
        ctx.fillStyle = pt.land ? c(colors.primary, a) : c(colors.fg, a);
        ctx.beginPath();
        ctx.arc(sx(p), sy(p), r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Rim light
      const rim = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      rim.addColorStop(0, c(colors.primary, 0.55));
      rim.addColorStop(0.5, c(colors.primary, 0.08));
      rim.addColorStop(1, c(colors.primary, 0.3));
      ctx.strokeStyle = rim;
      ctx.lineWidth = 1.2 * unit;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // Arcs with travelling pulses
      const arcIntro = reduced ? 1 : easeOut((t - 900) / 1400);
      ARCS.forEach((arc, ai) => {
        const pts = arc.map(view);
        const drawn = Math.floor(arcIntro * (pts.length - 1));
        ctx.beginPath();
        let pen = false;
        for (let i = 0; i <= drawn; i++) {
          const p = pts[i];
          if (hidden(p)) {
            pen = false;
            continue;
          }
          if (!pen) ctx.moveTo(sx(p), sy(p));
          else ctx.lineTo(sx(p), sy(p));
          pen = true;
        }
        ctx.strokeStyle = c(colors.primary, 0.45);
        ctx.lineWidth = 1.1 * unit;
        ctx.stroke();

        if (reduced || arcIntro < 1) return;
        const phase = ((t / 3400 + ai * 0.37) % 1) * 1.25; // 0..1 travel, then a short rest
        if (phase > 1) return;
        const head = Math.floor(phase * (pts.length - 1));
        const tail = 14;
        for (let k = 0; k < tail; k++) {
          const i = head - k;
          if (i < 1) break;
          const p0 = pts[i - 1];
          const p1 = pts[i];
          if (hidden(p0) || hidden(p1)) continue;
          ctx.strokeStyle = c(colors.accent, 0.9 * (1 - k / tail));
          ctx.lineWidth = 1.8 * unit;
          ctx.beginPath();
          ctx.moveTo(sx(p0), sy(p0));
          ctx.lineTo(sx(p1), sy(p1));
          ctx.stroke();
        }
      });

      // Sites
      SITES.forEach((s, i) => {
        const p = view(s);
        if (p[2] < 0.05) return;
        const x = sx(p);
        const y = sy(p);
        const fade = Math.min(1, p[2] * 4);
        if (!reduced) {
          const k = ((t / 2600 + i * 0.29) % 1);
          ctx.strokeStyle = c(colors.primary, 0.5 * (1 - k) * fade);
          ctx.lineWidth = unit;
          ctx.beginPath();
          ctx.arc(x, y, (3 + 13 * k) * unit, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = c(i === 0 ? colors.accent : colors.fg, 0.95 * fade);
        ctx.beginPath();
        ctx.arc(x, y, (i === 0 ? 3.2 : 2.4) * unit, 0, Math.PI * 2);
        ctx.fill();
      });

      // Orbit — front half and satellite
      strokeOrbit(true);
      if (sat[2] >= 0) drawSat();
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
      aria-label="A turning globe with connected locations, representing AI, data and geospatial systems working together"
      className="relative mx-auto aspect-square w-full max-w-[560px]"
    >
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0" />
      <Chip className="left-[2%] top-[16%]" delay="1.2s" dot="bg-primary">
        AI models
      </Chip>
      <Chip className="right-0 top-[44%]" delay="1.45s" dot="bg-accent">
        Data platforms
      </Chip>
      <Chip className="bottom-[13%] left-[8%]" delay="1.7s" dot="bg-success">
        Geospatial intelligence
      </Chip>
    </div>
  );
};

const Chip = ({
  className,
  delay,
  dot,
  children,
}: {
  className: string;
  delay: string;
  dot: string;
  children: React.ReactNode;
}) => (
  <div aria-hidden className={`hero-chip absolute hidden sm:block ${className}`} style={{ animationDelay: delay }}>
    <div style={{ animationDelay: `-${delay}` }} className="float-slow flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 text-xs font-medium text-foreground/90 shadow-lg shadow-black/10 backdrop-blur-md">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </div>
  </div>
);
