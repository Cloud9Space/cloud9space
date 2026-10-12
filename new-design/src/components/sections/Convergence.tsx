import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";
import { ConvergenceDiagram } from "@/components/visuals/ConvergenceDiagram";
import { Parallax } from "@/components/kit/Parallax";

const roles = [
  { name: "AI", role: "Intelligence", body: "Models that classify, predict, retrieve and reason, evaluated against real cases." },
  { name: "Data", role: "Foundation", body: "Governed pipelines and metric layers that every model and dashboard can trust." },
  { name: "Geospatial", role: "Context", body: "Where things happen: territories, parcels, routes, terrain and exposure to risk." },
  { name: "Engineering", role: "Execution", body: "Applications, APIs and cloud infrastructure that put the result in front of users." },
];

export const Convergence = () => (
  <Section id="convergence" labelledBy="conv-title" className="overflow-hidden">
    <SectionHeader
      id="conv-title"
      eyebrow="Our differentiator"
      title="Four disciplines. One system."
      lead="Most firms are strong in one of these. Real operational problems need all four at once, so we design them together from day one."
    />
    <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
      <Reveal className="tone-ink ink-panel p-6 sm:p-8 lg:col-span-5">
        <Parallax distance={30} className="mx-auto max-w-[380px]">
          <ConvergenceDiagram />
        </Parallax>
      </Reveal>
      <dl className="grid overflow-hidden rounded-3xl border border-border bg-card sm:grid-cols-2 lg:col-span-7 lg:self-stretch">
        {roles.map((r, i) => (
          <Reveal key={r.name} delay={i * 70} className="flex flex-col justify-center border-border p-6 sm:p-8 [&:not(:last-child)]:border-b sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(n+3)]:border-b-0">
            <dt>
              <span className="t-meta uppercase tracking-[0.14em] text-primary">{r.role}</span>
              <span className="mt-2 block font-heading text-xl font-semibold text-foreground">{r.name}</span>
            </dt>
            <dd className="t-body mt-2">{r.body}</dd>
          </Reveal>
        ))}
      </dl>
    </div>
  </Section>
);
