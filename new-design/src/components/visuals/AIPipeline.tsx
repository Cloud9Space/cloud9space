import { Fragment } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

const stages = [
  { name: "Data foundations", detail: "Quality, coverage, governance" },
  { name: "Retrieval & context", detail: "Indexes, semantic & spatial joins" },
  { name: "Models & agents", detail: "LLMs, ML, vision, tool use" },
  { name: "Evaluation", detail: "Test sets, acceptance bars" },
  { name: "Deployment", detail: "APIs, CI/CD, access control" },
  { name: "Monitoring", detail: "Drift, cost, feedback" },
];

/** Production AI lifecycle with a feedback loop back to the data layer. */
export const AIPipeline = () => (
  <figure aria-label="Production AI lifecycle">
    <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-[repeat(5,minmax(0,1fr)_20px)_minmax(0,1fr)] lg:items-stretch">
      {stages.map((s, i) => (
        <Fragment key={s.name}>
          <li className="panel p-4">
            <span className="t-meta text-accent">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-2 font-heading text-[0.95rem] font-semibold leading-tight text-foreground">{s.name}</p>
            <p className="mt-1.5 text-xs leading-snug text-muted-foreground">{s.detail}</p>
          </li>
          {i < stages.length - 1 && (
            <li aria-hidden className="hidden items-center justify-center text-muted-foreground lg:flex">
              <ArrowRight size={16} />
            </li>
          )}
        </Fragment>
      ))}
    </ol>
    <figcaption className="mt-4 flex items-center gap-2 t-meta">
      <RotateCcw size={14} className="text-accent" aria-hidden />
      Monitoring feeds back into data and evaluation — the loop that keeps AI reliable after launch.
    </figcaption>
  </figure>
);
