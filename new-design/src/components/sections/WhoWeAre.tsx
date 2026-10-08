import { company } from "@/content/site";
import { Section } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";

const facts = [
  { term: "Founded", value: `${company.founded} · ${company.city}, India` },
  { term: "Disciplines", value: "AI · Data · Geospatial · Software · Cloud" },
  { term: "Work with", value: "Enterprises, consulting firms and technology companies" },
];

export const WhoWeAre = () => (
  <Section tone="light" labelledBy="who-title">
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <Reveal className="lg:col-span-6">
        <p className="eyebrow mb-4">Who we are</p>
        <h2 id="who-title" className="t-h2">
          Technology expertise. Engineering execution. Business outcomes.
        </h2>
      </Reveal>
      <Reveal className="lg:col-span-6" delay={100}>
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
        <dl className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
          {facts.map((f) => (
            <div key={f.term}>
              <dt className="t-meta uppercase tracking-[0.12em]">{f.term}</dt>
              <dd className="mt-2 font-heading font-semibold leading-snug text-foreground">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  </Section>
);
