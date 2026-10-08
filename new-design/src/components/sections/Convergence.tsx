import { Section } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";
import { ConvergenceDiagram } from "@/components/visuals/ConvergenceDiagram";

const roles = [
  { name: "AI", role: "Intelligence", body: "Models that classify, predict, retrieve and reason — evaluated against real cases." },
  { name: "Data", role: "Foundation", body: "Governed pipelines and metric layers that every model and dashboard can trust." },
  { name: "Geospatial", role: "Context", body: "Where things happen: territories, parcels, routes, terrain and exposure to risk." },
  { name: "Engineering", role: "Execution", body: "Applications, APIs and cloud infrastructure that put the result in front of users." },
];

export const Convergence = () => (
  <Section id="convergence" tone="deep" labelledBy="conv-title" className="overflow-hidden">
    <div aria-hidden className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
    <div className="relative grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
      <Reveal className="lg:col-span-6 lg:order-2">
        <ConvergenceDiagram />
      </Reveal>
      <div className="lg:col-span-6 lg:order-1">
        <Reveal>
          <p className="eyebrow mb-4">Our differentiator</p>
          <h2 id="conv-title" className="t-h2">
            Where AI meets data and geography.
          </h2>
          <p className="t-lead mt-5">
            Most firms are strong in one of these. Real operational problems need all four at once — and they need to be
            designed together.
          </p>
        </Reveal>
        <dl className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
          {roles.map((r, i) => (
            <Reveal key={r.name} delay={i * 70}>
              <dt className="flex items-baseline gap-3">
                <span className="font-heading text-lg font-bold text-foreground">{r.name}</span>
                <span className="t-meta uppercase tracking-[0.14em] text-accent">{r.role}</span>
              </dt>
              <dd className="t-body mt-2 text-sm">{r.body}</dd>
            </Reveal>
          ))}
        </dl>
        <Reveal className="mt-10 border-l-2 border-accent pl-5">
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
