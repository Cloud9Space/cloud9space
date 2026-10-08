import { caseStudies, engagements } from "@/content/site";
import { Seo } from "@/components/kit/Seo";
import { PageHero } from "@/components/kit/PageHero";
import { Section } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";
import { CaseStudyBody } from "@/components/sections/CaseStudyBody";
import { FinalCTA } from "@/components/sections/FinalCTA";

const WorkPage = () => (
  <>
    <Seo path="/work" />
    <PageHero
      crumb="Client Success"
      eyebrow="Client success"
      title="The problem, the system, the architecture."
      lead="Selected engagements across geospatial, data, AI and software engineering. Where client names or results cannot be published, we describe the engineering instead."
    >
      <ul className="mt-10 flex flex-wrap gap-2">
        {caseStudies.map((c) => (
          <li key={c.id}>
            <a href={`#${c.id}`} className="chip text-foreground hover:border-primary">
              {c.title}
            </a>
          </li>
        ))}
      </ul>
    </PageHero>

    {caseStudies.map((cs, i) => (
      <Section key={cs.id} id={cs.id} tone={i % 2 ? "dark" : "light"} labelledBy={`${cs.id}-title`} className="scroll-mt-16">
        <Reveal>
          <p className="eyebrow mb-6">
            {String(i + 1).padStart(2, "0")} · {cs.sector}
          </p>
          <CaseStudyBody cs={cs} headingLevel="h2" />
        </Reveal>
      </Section>
    ))}

    <Section tone="surface" labelledBy="partners-title" className="!py-16">
      <h2 id="partners-title" className="t-meta uppercase tracking-[0.14em]">
        Ongoing partnerships
      </h2>
      <ul className="mt-6 grid gap-8 sm:grid-cols-3">
        {engagements.map((e) => (
          <li key={e.name}>
            <p className="font-heading text-lg font-semibold text-foreground">{e.name}</p>
            <p className="t-body mt-2 text-sm">{e.body}</p>
          </li>
        ))}
      </ul>
    </Section>
    <FinalCTA />
  </>
);

export default WorkPage;
