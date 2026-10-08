import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";
import { ConvergenceDiagram } from "@/components/visuals/ConvergenceDiagram";
import { Parallax } from "@/components/kit/Parallax";

const roles = [
  { name: "AI", role: "Intelligence", body: "Models that classify, predict, retrieve and reason — evaluated against real cases." },
  { name: "Data", role: "Foundation", body: "Governed pipelines and metric layers that every model and dashboard can trust." },
  { name: "Geospatial", role: "Context", body: "Where things happen: territories, parcels, routes, terrain and exposure to risk." },
  { name: "Engineering", role: "Execution", body: "Applications, APIs and cloud infrastructure that put the result in front of users." },
];

export const Convergence = () => (
  <Section id="convergence" labelledBy="conv-title" className="overflow-hidden">
    <SectionHeader
      id="conv-title"
      eyebrow="Our differentiator"
      title="Where AI meets data and geography."
      lead="Most firms are strong in one of these. Real operational problems need all four at once — and they need to be designed together."
    />
    <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
      <Reveal className="tone-ink ink-panel p-6 sm:p-10 lg:col-span-6">
        <Parallax distance={30}>
          <ConvergenceDiagram />
        </Parallax>
      </Reveal>
      <div className="lg:col-span-6">
        <dl className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          {roles.map((r, i) => (
            <Reveal key={r.name} delay={i * 70}>
              <dt className="flex items-baseline gap-3">
                <span className="font-heading text-lg font-bold text-foreground">{r.name}</span>
                <span className="t-meta uppercase tracking-[0.14em] text-primary">{r.role}</span>
              </dt>
              <dd className="t-body mt-2 text-sm">{r.body}</dd>
            </Reveal>
          ))}
        </dl>
        <Reveal className="mt-10 border-l-2 border-primary pl-5">
          <p className="text-[0.95rem] leading-relaxed text-foreground">
            A route-to-market platform is a good example: sales pipelines (data), outlets and beats on a map
            (geospatial), signals that flag under-served territories (AI), and an application regional managers
            actually use (engineering). Remove any one and the system stops being useful.
          </p>
        </Reveal>
      </div>
    </div>
  </Section>
);
