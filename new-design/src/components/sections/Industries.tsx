import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { industries } from "@/content/site";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";
import { industryImages } from "@/content/images";

export const Industries = () => (
  <Section labelledBy="ind-title">
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
    <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((ind, i) => (
        <Reveal as="li" key={ind.id} delay={(i % 3) * 70}>
          <Link to={`/industries#${ind.id}`} className="panel group flex h-full flex-col overflow-hidden p-2 transition duration-300 hover:-translate-y-1">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
              <img
                src={industryImages[ind.id]?.src}
                alt={industryImages[ind.id]?.alt ?? ""}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h3 className="t-h3 group-hover:text-primary transition-colors">{ind.name}</h3>
              <p className="t-body mt-3 text-sm">{ind.summary}</p>
              <p className="t-meta mt-auto pt-6">
                <span className="text-accent">Delivered ·</span> {ind.work.join(" · ")}
              </p>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  </Section>
);
