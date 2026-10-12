import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";
import { AIPipeline } from "@/components/visuals/AIPipeline";

export const AIDepth = () => (
  <Section labelledBy="ai-title">
    <SectionHeader
        id="ai-title"
        eyebrow="AI engineering"
        title="From AI experiments to production systems."
        className="max-w-none [&>p.t-lead]:max-w-3xl"
        lead="Calling a model API is the easy part. Useful AI depends on the data underneath it, the architecture around it, an honest way to measure it and the engineering to run it every day."
      />

    <Reveal className="tone-blue ink-panel mt-12 p-6 sm:p-8">
      <div aria-hidden className="absolute inset-0 bg-grid" />
      <div className="relative">
        <AIPipeline />
      </div>
    </Reveal>
  </Section>
);
