import { approach, engagementModels } from "@/content/site";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";

export const Approach = ({ showModels = true }: { showModels?: boolean }) => (
  <Section labelledBy="approach-title">
    <SectionHeader
      id="approach-title"
      eyebrow="Engineering approach"
      title="From problem to production."
      lead="A delivery framework built around engineering checkpoints, not agency phases. Each stage produces something you can inspect."
    />

    <div className="relative mt-16">
    <div aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-border lg:block" />
    <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
      {approach.map((s, i) => (
        <Reveal as="li" key={s.num} delay={i * 60} className="relative flex flex-col border-l border-border pl-6 lg:border-l-0 lg:pl-0">
          <span aria-hidden className="absolute -left-[5px] top-1 h-[9px] w-[9px] rounded-full border-2 border-primary bg-background lg:static lg:block lg:mb-6 lg:h-[15px] lg:w-[15px]" />
          <p className="t-meta text-accent">{s.num}</p>
          <h3 className="t-h3 mt-1">{s.title}</h3>
          <p className="t-body mb-4 mt-3 text-sm">{s.body}</p>
          <p className="t-meta mt-auto border-t border-border pt-3">{s.output}</p>
        </Reveal>
      ))}
    </ol>
    </div>

    {showModels && (
      <div className="mt-20">
        <h3 className="t-meta uppercase tracking-[0.14em]">How we engage</h3>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {engagementModels.map((m) => (
            <li key={m.title} className="panel p-6">
              <p className="font-heading text-lg font-semibold text-foreground">{m.title}</p>
              <p className="t-body mt-2 text-sm">{m.body}</p>
            </li>
          ))}
        </ul>
      </div>
    )}
  </Section>
);
