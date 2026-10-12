import { useMemo } from "react";
import { contourPath, noise, tok } from "./primitives";

/**
 * Isometric stack of geospatial layers: imagery → terrain → vectors → analytics.
 * Each layer is drawn in a flat 240×240 space and projected with an isometric matrix.
 */
const ISO = "matrix(0.866 0.5 -0.866 0.5 0 0)";
const LAYER_GAP = 78;

const layerMeta = [
  { label: "Insight", detail: "Risk & coverage scores" },
  { label: "Vector", detail: "Parcels · roads · outlets" },
  { label: "Terrain", detail: "Elevation · contours" },
  { label: "Imagery", detail: "Satellite · COG tiles" },
];

export const GeoLayers = () => {
  const raster = useMemo(() => {
    const out: { x: number; y: number; v: number }[] = [];
    for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) out.push({ x: i, y: j, v: noise(i * 0.8, j * 0.8) });
    return out;
  }, []);
  const contours = useMemo(() => Array.from({ length: 7 }, (_, k) => contourPath(120, 130, 18 + k * 15, k * 0.7, 0.9, 72)), []);

  const base = (fill: string) => (
    <rect width="240" height="240" rx="6" strokeWidth="1" style={{ fill, stroke: tok("foreground", 0.22) }} />
  );

  const layers = [
    // Insight (top)
    <g key="insight">
      {base(tok("background", 0.35))}
      {[
        [60, 70, 34],
        [160, 90, 26],
        [110, 170, 40],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} style={{ fill: tok(i === 1 ? "accent" : "secondary", 0.22) }} />
          <circle cx={x} cy={y} r={r * 0.45} style={{ fill: tok(i === 1 ? "accent" : "secondary", 0.45) }} />
        </g>
      ))}
    </g>,
    // Vector
    <g key="vector">
      {base(tok("background", 0.35))}
      <path d="M0,150 C60,140 90,90 150,96 S220,60 240,70" fill="none" strokeWidth="2.5" style={{ stroke: tok("foreground", 0.55) }} />
      <path d="M90,0 C96,80 130,150 120,240" fill="none" strokeWidth="2" style={{ stroke: tok("foreground", 0.4) }} />
      {[
        "20,20 70,16 76,60 26,66",
        "150,130 210,124 216,180 160,190",
        "30,170 84,166 90,220 36,226",
        "150,20 206,16 212,58 156,62",
      ].map((p) => (
        <polygon key={p} points={p} strokeWidth="1.4" style={{ fill: tok("accent", 0.1), stroke: tok("accent", 0.85) }} />
      ))}
      {[
        [110, 120],
        [190, 100],
        [60, 110],
        [140, 210],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4" style={{ fill: tok("foreground") }} />
      ))}
    </g>,
    // Terrain
    <g key="terrain">
      {base(tok("background", 0.35))}
      {contours.map((d, k) => (
        <path key={k} d={d} fill="none" strokeWidth={k % 3 === 2 ? 1.4 : 0.9} style={{ stroke: tok("primary", k % 3 === 2 ? 0.9 : 0.55) }} />
      ))}
    </g>,
    // Imagery (bottom)
    <g key="imagery">
      {base(tok("background", 0.5))}
      {raster.map((c) => (
        <rect
          key={`${c.x}-${c.y}`}
          x={c.x * 20}
          y={c.y * 20}
          width="20"
          height="20"
          style={{ fill: c.v > 0.55 ? tok("success", (c.v - 0.35) * 0.55) : tok("primary", 0.08 + c.v * 0.25) }}
        />
      ))}
    </g>,
  ];

  return (
    <svg
      viewBox="0 0 660 540"
      role="img"
      aria-label="Isometric stack of geospatial layers: satellite imagery, terrain contours, vector features and analytical insight"
      className="h-auto w-full"
    >
      {/* Paint bottom layer first so upper layers sit on top. */}
      {[...layers.keys()].reverse().map((i) => {
        const layer = layers[i];
        const y = 30 + i * LAYER_GAP;
        return (
          <g key={i}>
            <g transform={`translate(230 ${y}) ${ISO}`}>{layer}</g>
            {/* Connector and label */}
            <line x1="438" x2="470" y1={y + 120} y2={y + 120} style={{ stroke: tok("foreground", 0.3) }} />
            <text x="478" y={y + 116} className="font-heading" fontSize="15" fontWeight="700" style={{ fill: tok("foreground") }}>
              {layerMeta[i].label}
            </text>
            <text x="478" y={y + 134} className="font-mono" fontSize="10.5" style={{ fill: tok("muted-foreground") }}>
              {layerMeta[i].detail}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
