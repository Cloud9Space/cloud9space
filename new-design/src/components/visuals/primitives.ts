/** Shared helpers for the hand-built SVG visuals. */

/** Theme-aware colour from a CSS token, usable in SVG `style` props. */
export const tok = (name: string, alpha = 1) => `hsl(var(--${name}) / ${alpha})`;

/** Deterministic pseudo-noise in [0, 1] — keeps visuals stable between renders. */
export const noise = (x: number, y: number) =>
  (Math.sin(x * 1.31 + y * 0.67) + Math.sin(x * 0.41 - y * 1.13) + Math.cos((x + y) * 0.53) + 3) / 6;

/** Closed, organic contour ring around (cx, cy) — used for topographic lines. */
export const contourPath = (cx: number, cy: number, r: number, seed: number, squash = 0.72, steps = 96) => {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const rr =
      r *
      (1 +
        0.11 * Math.sin(3 * t + seed) +
        0.06 * Math.sin(5 * t + seed * 2.1) +
        0.035 * Math.cos(7 * t + seed * 1.7));
    const x = cx + rr * Math.cos(t);
    const y = cy + rr * squash * Math.sin(t);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return d + "Z";
};
