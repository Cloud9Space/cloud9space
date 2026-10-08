import { useMemo } from "react";
import { contourPath, noise, tok } from "./primitives";

/**
 * "Operations console" illustration: a map canvas with raster, contour, vector and network
 * layers, alongside pipeline / model / layer panels. Purely decorative.
 */
export const HeroVisual = () => {
  const cells = useMemo(() => {
    const out: { x: number; y: number; v: number }[] = [];
    for (let i = 0; i < 10; i++) for (let j = 0; j < 9; j++) out.push({ x: i, y: j, v: noise(i, j) });
    return out;
  }, []);

  const contours = useMemo(
    () => Array.from({ length: 8 }, (_, k) => contourPath(250, 220, 26 + k * 20, k * 0.6 + 1, 0.74)),
    [],
  );

  const nodes = [
    { x: 92, y: 118 },
    { x: 178, y: 300 },
    { x: 250, y: 214 },
    { x: 352, y: 118 },
    { x: 382, y: 318 },
    { x: 120, y: 362 },
  ];
  const links: [number, number][] = [
    [0, 2],
    [2, 3],
    [2, 1],
    [1, 5],
    [2, 4],
    [3, 4],
  ];

  return (
    <svg
      viewBox="0 0 640 520"
      role="img"
      aria-label="Illustration of a geospatial operations console combining map layers, data pipelines and model monitoring"
      className="h-auto w-full"
    >
      <defs>
        <clipPath id="hv-map">
          <rect x="20" y="56" width="400" height="360" rx="6" />
        </clipPath>
        <linearGradient id="hv-scan" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="hsl(var(--primary))" stopOpacity="0" />
          <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0.28" />
        </linearGradient>
      </defs>

      {/* Frame */}
      <rect x="0.5" y="0.5" width="639" height="519" rx="12" style={{ fill: tok("card", 0.85), stroke: tok("border") }} />
      <g style={{ fill: tok("muted-foreground", 0.5) }}>
        <circle cx="22" cy="26" r="4" />
        <circle cx="36" cy="26" r="4" />
        <circle cx="50" cy="26" r="4" />
      </g>
      <text x="72" y="30" className="font-mono" fontSize="11" style={{ fill: tok("muted-foreground") }}>
        c9s · operations console
      </text>
      <g className="font-mono" fontSize="10.5">
        <text x="440" y="30" style={{ fill: tok("foreground") }}>
          Layers
        </text>
        <text x="496" y="30" style={{ fill: tok("muted-foreground") }}>
          Pipeline
        </text>
        <text x="564" y="30" style={{ fill: tok("muted-foreground") }}>
          Models
        </text>
      </g>
      <line x1="0" x2="640" y1="44" y2="44" style={{ stroke: tok("border") }} />

      {/* Map canvas */}
      <g clipPath="url(#hv-map)">
        <rect x="20" y="56" width="400" height="360" style={{ fill: tok("background", 0.9) }} />
        {/* Raster layer */}
        {cells.map((c) => (
          <rect
            key={`${c.x}-${c.y}`}
            x={20 + c.x * 40}
            y={56 + c.y * 40}
            width="40"
            height="40"
            style={{ fill: c.v > 0.6 ? tok("secondary", (c.v - 0.45) * 0.55) : tok("primary", c.v * 0.16) }}
          />
        ))}
        {/* Tile grid */}
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`v${i}`} x1={20 + i * 40} x2={20 + i * 40} y1="56" y2="416" style={{ stroke: tok("grid-line") }} />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`h${i}`} x1="20" x2="420" y1={56 + i * 40} y2={56 + i * 40} style={{ stroke: tok("grid-line") }} />
        ))}
        {/* Topographic contours */}
        {contours.map((d, k) => (
          <path
            key={k}
            d={d}
            fill="none"
            strokeWidth={k % 4 === 3 ? 1.3 : 0.8}
            style={{ stroke: tok("foreground", k % 4 === 3 ? 0.32 : 0.14) }}
          />
        ))}
        {/* Vector: roads and parcels */}
        <path
          d="M20,270 C110,250 160,190 250,200 S390,150 420,170"
          fill="none"
          strokeWidth="2"
          style={{ stroke: tok("foreground", 0.28) }}
        />
        <path d="M140,56 C150,150 200,260 190,416" fill="none" strokeWidth="1.4" style={{ stroke: tok("foreground", 0.2) }} />
        <polygon
          points="286,250 344,238 362,286 300,304"
          strokeWidth="1.4"
          style={{ fill: tok("accent", 0.12), stroke: tok("accent", 0.85) }}
        />
        <polygon
          points="56,180 106,168 116,214 64,224"
          strokeWidth="1.2"
          style={{ fill: tok("primary", 0.1), stroke: tok("primary", 0.7) }}
        />
        {/* Network */}
        {links.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            strokeWidth="1.3"
            className="flow-line"
            style={{ stroke: tok("primary", 0.85) }}
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="10" className="pulse-dot" style={{ fill: tok("primary", 0.18) }} />
            <circle cx={n.x} cy={n.y} r="3.6" style={{ fill: tok("foreground") }} />
          </g>
        ))}
        {/* Scan line */}
        <rect x="20" y="40" width="400" height="56" fill="url(#hv-scan)" className="scan" />
      </g>
      <rect x="20" y="56" width="400" height="360" rx="6" fill="none" style={{ stroke: tok("border") }} />
      <g className="font-mono" fontSize="10">
        <rect x="30" y="384" width="168" height="22" rx="4" style={{ fill: tok("background", 0.85) }} />
        <text x="40" y="399" style={{ fill: tok("muted-foreground") }}>
          18.5590° N · 73.7868° E
        </text>
        <rect x="296" y="66" width="114" height="22" rx="4" style={{ fill: tok("background", 0.85) }} />
        <text x="306" y="81" style={{ fill: tok("accent") }}>
          parcel · selected
        </text>
      </g>

      {/* Right column: layers */}
      <g className="font-mono" fontSize="10.5">
        <rect x="436" y="56" width="184" height="124" rx="6" style={{ fill: tok("background", 0.6), stroke: tok("border") }} />
        <text x="450" y="78" style={{ fill: tok("muted-foreground") }}>
          LAYERS
        </text>
        {[
          ["Satellite · COG", "primary"],
          ["Parcels · vector", "accent"],
          ["Outlets · points", "foreground"],
          ["Risk index", "secondary"],
        ].map(([label, color], i) => (
          <g key={label} transform={`translate(450 ${96 + i * 20})`}>
            <rect width="9" height="9" rx="2" y="-8" style={{ fill: tok(color, 0.85) }} />
            <text x="18" style={{ fill: tok("foreground", 0.9) }}>
              {label}
            </text>
          </g>
        ))}

        {/* Pipeline */}
        <rect x="436" y="192" width="184" height="118" rx="6" style={{ fill: tok("background", 0.6), stroke: tok("border") }} />
        <text x="450" y="214" style={{ fill: tok("muted-foreground") }}>
          PIPELINE
        </text>
        {["ingest", "validate", "enrich", "serve"].map((s, i) => (
          <g key={s} transform={`translate(450 ${234 + i * 19})`}>
            <circle
              cx="4"
              cy="-3.5"
              r="3.5"
              className={i === 2 ? "pulse-dot" : undefined}
              style={{ fill: i === 2 ? tok("accent") : tok("success") }}
            />
            <text x="16" style={{ fill: tok("foreground", 0.9) }}>
              {s}
            </text>
            <line x1="90" x2="160" y1="-3.5" y2="-3.5" strokeWidth="3" strokeLinecap="round" style={{ stroke: tok("border") }} />
            <line
              x1="90"
              x2={i < 2 ? 160 : i === 2 ? 128 : 90}
              y1="-3.5"
              y2="-3.5"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ stroke: i === 2 ? tok("accent") : tok("success", 0.85) }}
            />
          </g>
        ))}

        {/* Model monitor */}
        <rect x="436" y="322" width="184" height="94" rx="6" style={{ fill: tok("background", 0.6), stroke: tok("border") }} />
        <text x="450" y="344" style={{ fill: tok("muted-foreground") }}>
          MODEL · EVAL
        </text>
        <polyline
          points="450,398 470,390 490,393 510,380 530,384 550,372 570,375 590,366 606,368"
          fill="none"
          strokeWidth="1.6"
          style={{ stroke: tok("primary") }}
        />
        <line x1="450" x2="606" y1="404" y2="404" style={{ stroke: tok("border") }} />
      </g>

      {/* Log strip */}
      <g className="font-mono" fontSize="10">
        <line x1="0" x2="640" y1="432" y2="432" style={{ stroke: tok("border") }} />
        <text x="22" y="456" style={{ fill: tok("muted-foreground") }}>
          <tspan style={{ fill: tok("success") }}>●</tspan> tiles/raster/12 served from COG
        </text>
        <text x="22" y="476" style={{ fill: tok("muted-foreground") }}>
          <tspan style={{ fill: tok("success") }}>●</tspan> pipeline.outlets: quality checks passed
        </text>
        <text x="22" y="496" style={{ fill: tok("muted-foreground") }}>
          <tspan style={{ fill: tok("accent") }}>●</tspan> retrieval index refreshing · spatial join on territories
        </text>
      </g>
    </svg>
  );
};
