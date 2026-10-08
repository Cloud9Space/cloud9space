import { caseStudies } from "@/content/site";
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
      <Section key={cs.id} id={cs.id} labelledBy={`${cs.id}-title`} className="scroll-mt-16">
        <Reveal>
          <p className="eyebrow mb-6">
            {String(i + 1).padStart(2, "0")} · {cs.sector}
          </p>
          <CaseStudyBody cs={cs} headingLevel="h2" />
        </Reveal>
      </Section>
    ))}

    <FinalCTA />
  </>
);

export default WorkPage;
