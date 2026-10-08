import { ArrowRight, Mail } from "lucide-react";
import { careerPrinciples, careerTracks, company } from "@/content/site";
import { Seo } from "@/components/kit/Seo";
import { PageHero } from "@/components/kit/PageHero";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";

const CareersPage = () => (
  <>
    <Seo path="/careers" />
    <PageHero
      crumb="Careers"
      eyebrow="Careers at Cloud9Space"
      title="Build what matters."
      lead="Production AI, data platforms, GIS systems and cloud infrastructure — used by field teams, planners and analysts. We hire engineers who care how their work behaves after release."
    >
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a href="#open-positions" className="btn-primary">
          View Open Positions <ArrowRight size={16} aria-hidden />
        </a>
      </div>
    </PageHero>

    <Section labelledBy="why-title">
      <SectionHeader id="why-title" eyebrow="Working here" title="What the work is like." />
      <ol className="mt-12 grid gap-8 md:grid-cols-3">
        {careerPrinciples.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 60} className="border-t-2 border-primary pt-5">
            <p className="t-meta text-accent">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="t-h3 mt-2">{p.title}</h3>
            <p className="t-body mt-3 text-sm">{p.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>

    <Section labelledBy="tracks-title">
      <SectionHeader
        id="tracks-title"
        eyebrow="Teams"
        title="Where you could work."
        lead="Teams are cross-functional: most projects involve at least two of these disciplines."
      />
      <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {careerTracks.map((t) => (
          <li key={t.name} className="bg-card p-6">
            <h3 className="t-h3">{t.name}</h3>
            <p className="t-body mt-2 text-sm">{t.body}</p>
          </li>
        ))}
      </ul>
    </Section>

    <Section id="open-positions" labelledBy="open-title" className="scroll-mt-16">
      <div className="panel flex flex-col gap-8 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">Open positions</p>
          <h2 id="open-title" className="t-h2 !text-[clamp(1.5rem,1.2rem+1vw,2rem)]">
            Current openings are posted on LinkedIn.
          </h2>
          <p className="t-body mt-3">
            Don&apos;t see the right role? Send us your CV and a short note on something you have built.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
          <a href={company.jobsHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
            View openings on LinkedIn <ArrowRight size={16} aria-hidden />
          </a>
          <a href={company.careersHref} className="btn-outline">
            <Mail size={16} aria-hidden /> Send your CV
          </a>
        </div>
      </div>
    </Section>
  </>
);

export default CareersPage;
