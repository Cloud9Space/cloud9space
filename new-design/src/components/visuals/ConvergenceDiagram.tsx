import { tok } from "./primitives";

const R = 118;
const pillars = [
  { label: "AI", role: "Intelligence", cx: 260, cy: 168, color: "secondary" },
  { label: "Data", role: "Foundation", cx: 352, cy: 260, color: "primary" },
  { label: "Engineering", role: "Execution", cx: 260, cy: 352, color: "foreground" },
  { label: "Geospatial", role: "Context", cx: 168, cy: 260, color: "accent" },
];

/** Four overlapping disciplines with the integrated system at their intersection. */
export const ConvergenceDiagram = () => (
  <svg
    viewBox="0 0 520 520"
    role="img"
    aria-label="Diagram: AI provides intelligence, data the foundation, geospatial the context and engineering the execution; together they form intelligent business systems"
    className="h-auto w-full max-w-[520px] mx-auto"
  >
    {/* Orbit */}
    <circle cx="260" cy="260" r="236" fill="none" strokeWidth="1" className="flow-line-slow" style={{ stroke: tok("foreground", 0.18) }} />
    <circle cx="260" cy="260" r="200" fill="none" style={{ stroke: tok("border", 0.7) }} />

    {pillars.map((p) => (
      <circle
        key={p.label}
        cx={p.cx}
        cy={p.cy}
        r={R}
        strokeWidth="1.2"
        style={{ fill: tok(p.color, p.color === "foreground" ? 0.04 : 0.08), stroke: tok(p.color, 0.55) }}
      />
    ))}

    {/* Spokes */}
    {pillars.map((p) => (
      <line
        key={`s-${p.label}`}
        x1="260"
        y1="260"
        x2={260 + (p.cx - 260) * 2.1}
        y2={260 + (p.cy - 260) * 2.1}
        strokeWidth="1"
        className="flow-line"
        style={{ stroke: tok(p.color, 0.6) }}
      />
    ))}

    {/* Labels */}
    {pillars.map((p) => {
      const lx = 260 + (p.cx - 260) * 2.05;
      const ly = 260 + (p.cy - 260) * 2.05;
      const anchor = p.cx < 260 ? "start" : p.cx > 260 ? "end" : "middle";
      const dy = p.cy < 260 ? 22 : p.cy > 260 ? -26 : -6;
      return (
        <g key={`l-${p.label}`}>
          <circle cx={lx} cy={ly} r="5" style={{ fill: tok(p.color) }} />
          <text
            x={lx + (anchor === "start" ? 14 : anchor === "end" ? -14 : 0)}
            y={ly + dy}
            textAnchor={anchor}
            className="font-heading"
            fontSize="19"
            fontWeight="700"
            style={{ fill: tok("foreground") }}
          >
            {p.label}
          </text>
          <text
            x={lx + (anchor === "start" ? 14 : anchor === "end" ? -14 : 0)}
            y={ly + dy + 19}
            textAnchor={anchor}
            className="font-mono"
            fontSize="12.5"
            letterSpacing="1.5"
            style={{ fill: tok("muted-foreground") }}
          >
            {p.role.toUpperCase()}
          </text>
        </g>
      );
    })}

    {/* Core */}
    <circle cx="260" cy="260" r="62" style={{ fill: tok("background"), stroke: tok("accent", 0.9) }} strokeWidth="1.4" />
    <circle cx="260" cy="260" r="70" fill="none" className="flow-line-slow" style={{ stroke: tok("accent", 0.6) }} />
    <text x="260" y="252" textAnchor="middle" className="font-heading" fontSize="15" fontWeight="700" style={{ fill: tok("foreground") }}>
      Intelligent
    </text>
    <text x="260" y="271" textAnchor="middle" className="font-heading" fontSize="15" fontWeight="700" style={{ fill: tok("foreground") }}>
      business
    </text>
    <text x="260" y="290" textAnchor="middle" className="font-heading" fontSize="15" fontWeight="700" style={{ fill: tok("foreground") }}>
      systems
    </text>
  </svg>
);
