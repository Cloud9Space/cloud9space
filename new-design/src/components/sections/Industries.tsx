import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { industries } from "@/content/site";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";

export const Industries = () => (
  <Section tone="light" labelledBy="ind-title">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <SectionHeader
        id="ind-title"
        eyebrow="Industries"
        title="Focused where we have delivered."
        lead="We list sectors where Cloud9Space has built and shipped systems — not every industry we could theoretically serve."
      />
      <Link to="/industries" className="link-arrow shrink-0">
        All industries <ArrowRight size={14} aria-hidden />
      </Link>
    </div>
    <ul className="mt-14 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((ind, i) => (
        <Reveal as="li" key={ind.id} delay={(i % 3) * 70} className="border-b border-r border-border">
          <Link to={`/industries#${ind.id}`} className="group flex h-full flex-col p-6 sm:p-7 hover:bg-card transition-colors">
            <h3 className="t-h3 group-hover:text-primary transition-colors">{ind.name}</h3>
            <p className="t-body mt-3 text-sm">{ind.summary}</p>
            <p className="t-meta mt-auto pt-6">
              <span className="text-accent">Delivered ·</span> {ind.work.join(" · ")}
            </p>
          </Link>
        </Reveal>
      ))}
    </ul>
  </Section>
);
