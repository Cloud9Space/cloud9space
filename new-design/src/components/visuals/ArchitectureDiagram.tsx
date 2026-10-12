import { Fragment } from "react";
import { cn } from "@/lib/utils";

type Column = { label: string; nodes: string[] };

/** Left-to-right system diagram rendered from case-study data. Stacks vertically on small screens. */
export const ArchitectureDiagram = ({ columns, className }: { columns: Column[]; className?: string }) => (
  <figure className={cn("panel bg-grid p-5 sm:p-6", className)} aria-label="System architecture">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
      {columns.map((col, i) => (
        <Fragment key={col.label}>
          <div className="flex flex-1 flex-col gap-2 sm:min-w-0">
            <p className="t-meta uppercase tracking-[0.14em] text-accent">{col.label}</p>
            {col.nodes.map((n) => (
              <div
                key={n}
                className="rounded border border-border bg-background/80 px-3 py-2.5 text-[0.8rem] font-medium leading-tight text-foreground"
              >
                {n}
              </div>
            ))}
          </div>
          {i < columns.length - 1 && (
            <div aria-hidden className="flex shrink-0 items-center justify-center sm:pt-6">
              <svg viewBox="0 0 28 12" className="h-3 w-7 rotate-90 sm:rotate-0">
                <line x1="0" y1="6" x2="22" y2="6" className="flow-line" style={{ stroke: "hsl(var(--primary))" }} strokeWidth="1.5" />
                <path d="M20,1 L27,6 L20,11" fill="none" style={{ stroke: "hsl(var(--primary))" }} strokeWidth="1.5" />
              </svg>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  </figure>
);
