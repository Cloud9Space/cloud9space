import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { caseStudies, engagements } from "@/content/site";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";
import { CaseStudyBody } from "./CaseStudyBody";
import { cn } from "@/lib/utils";

const featured = caseStudies.filter((c) => c.featured);

export const ClientSuccess = () => {
  const [active, setActive] = useState(0);
  const id = useId();
  const cs = featured[active];

  return (
    <Section tone="dark" labelledBy="cs-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          id="cs-title"
          eyebrow="Client success"
          title="Systems in production, not slideware."
          lead="A selection of engagements, described by the problem, the system we built and the engineering behind it."
        />
        <Link to="/work" className="link-arrow shrink-0">
          All engagements <ArrowRight size={14} aria-hidden />
        </Link>
      </div>

      <div role="tablist" aria-label="Case studies" className="no-scrollbar -mx-5 mt-12 flex gap-1 overflow-x-auto border-b border-border px-5 sm:mx-0 sm:px-0">
        {featured.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            id={`${id}-t${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-p`}
            onClick={() => setActive(i)}
            className={cn(
              "-mb-px shrink-0 border-b-2 px-1 pb-4 pr-6 text-left transition-colors",
              i === active ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="t-meta block">{c.sector}</span>
            <span className="mt-1 block font-heading font-semibold">{c.title}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${id}-p`} aria-labelledby={`${id}-t${active}`} className="pt-10">
        <Reveal key={cs.id}>
          <CaseStudyBody cs={cs} headingLevel="h3" />
        </Reveal>
      </div>

      <div className="mt-16 border-t border-border pt-10">
        <h3 className="t-meta uppercase tracking-[0.14em]">Ongoing partnerships</h3>
        <ul className="mt-6 grid gap-8 sm:grid-cols-3">
          {engagements.map((e) => (
            <li key={e.name}>
              <p className="font-heading text-lg font-semibold text-foreground">{e.name}</p>
              <p className="t-body mt-2 text-sm">{e.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
