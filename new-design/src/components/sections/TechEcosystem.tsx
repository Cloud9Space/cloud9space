import { techLayers } from "@/content/site";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";

/** Technology shown as an architecture stack rather than a logo wall. */
export const TechEcosystem = () => (
  <Section tone="dark" labelledBy="tech-title">
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <SectionHeader
          id="tech-title"
          eyebrow="Technology ecosystem"
          title="A stack chosen per problem."
          lead="We are tool-agnostic within a set of technologies we know deeply. This is the stack our teams work in, from the interface down to the infrastructure."
        />
      </div>
      <Reveal className="relative lg:col-span-8">
        <div aria-hidden className="absolute bottom-6 left-[11px] top-6 w-px bg-border sm:left-[147px]" />
        <ol className="relative">
          {techLayers.map((l, i) => (
            <li key={l.layer} className="relative grid gap-3 py-4 pl-9 sm:grid-cols-[140px_1fr] sm:gap-8 sm:pl-0">
              <span
                aria-hidden
                className="absolute left-[6px] top-[22px] h-[11px] w-[11px] rounded-full border-2 bg-background sm:left-[142px]"
                style={{ borderColor: i % 2 ? "hsl(var(--secondary))" : "hsl(var(--primary))" }}
              />
              <p className="t-meta pt-1.5 uppercase tracking-[0.12em] text-foreground sm:text-right sm:pr-6">{l.layer}</p>
              <ul className="flex flex-wrap gap-2 sm:pl-6">
                {l.items.map((t) => (
                  <li key={t} className="rounded border border-border bg-card px-3 py-1.5 text-sm text-foreground">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  </Section>
);
