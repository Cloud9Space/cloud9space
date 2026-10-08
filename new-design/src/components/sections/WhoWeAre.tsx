import { company } from "@/content/site";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";

const facts = [
  { term: "Founded", value: `${company.founded} · ${company.city}, India` },
  { term: "Disciplines", value: "AI · Data · Geospatial · Software · Cloud" },
  { term: "Work with", value: "Enterprises, consulting firms and technology companies" },
];

export const WhoWeAre = () => (
  <Section labelledBy="who-title">
    <SectionHeader id="who-title" eyebrow="Who we are" title="Technology expertise. Engineering execution. Business outcomes." />
    <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-10">
      <Reveal className="tone-blue ink-panel p-8 sm:p-10 lg:col-span-5">
        <div aria-hidden className="absolute inset-0 bg-grid" />
        <dl className="relative grid gap-8">
          {facts.map((f) => (
            <div key={f.term} className="border-t border-border pt-4 first:border-0 first:pt-0">
              <dt className="t-meta uppercase tracking-[0.12em]">{f.term}</dt>
              <dd className="mt-2 font-heading text-lg font-semibold leading-snug text-foreground">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
      <Reveal className="lg:col-span-7 lg:self-center" delay={100}>
        <p className="t-lead text-foreground">
          We design and build data platforms, AI applications and geospatial systems that turn complex operational
          data into usable intelligence.
        </p>
        <p className="t-body mt-5">
          Most real business problems do not sit neatly inside one discipline. Planning a sales territory, scoring a
          farm's climate risk or running a field programme needs data pipelines, location context, models and an
          application people can use — built to work together. Cloud9Space brings those disciplines into one
          engineering team, so the system is designed as a whole rather than stitched together across vendors.
        </p>
      </Reveal>
    </div>
  </Section>
);
