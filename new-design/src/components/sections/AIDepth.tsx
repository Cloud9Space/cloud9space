import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";
import { AIPipeline } from "@/components/visuals/AIPipeline";

const stalls = [
  {
    problem: "The demo used a clean sample.",
    answer: "We profile the real data first — coverage, freshness, permissions — and design retrieval and features around it.",
  },
  {
    problem: "Nobody agreed what “good” looks like.",
    answer: "Every AI feature gets an evaluation set and an acceptance bar agreed with the business before it ships.",
  },
  {
    problem: "It worked once, then quietly drifted.",
    answer: "Prompts and models are versioned, regression-tested in CI and monitored for quality and cost in production.",
  },
];

const topics = [
  "AI strategy & use-case selection",
  "Retrieval-augmented generation",
  "Agentic workflows & tool use",
  "LLM applications",
  "AI-assisted workflows",
  "Computer vision",
  "Predictive models",
  "Model evaluation",
  "MLOps",
  "Production deployment",
];

export const AIDepth = () => (
  <Section labelledBy="ai-title">
    <SectionHeader
        id="ai-title"
        eyebrow="AI engineering"
        title="From AI experiments to production systems."
        lead="Calling a model API is the easy part. Useful AI depends on the data underneath it, the architecture around it, an honest way to measure it, and the engineering to run it every day."
      />

    <div className="tone-blue mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
      {stalls.map((s, i) => (
        <Reveal key={s.problem} delay={i * 80} className="bg-card p-6 sm:p-7">
          <p className="t-meta uppercase tracking-[0.12em] text-destructive/90">Why AI stalls</p>
          <p className="mt-2 font-heading text-lg font-semibold text-foreground">{s.problem}</p>
          <p className="t-meta mt-6 uppercase tracking-[0.12em] text-accent">What we do</p>
          <p className="t-body mt-2 text-sm">{s.answer}</p>
        </Reveal>
      ))}
    </div>

    <Reveal className="tone-blue ink-panel mt-6 p-6 sm:p-8">
      <div aria-hidden className="absolute inset-0 bg-grid" />
      <div className="relative">
        <AIPipeline />
      </div>
    </Reveal>

    <div className="mt-14 flex flex-col gap-8 border-t border-border pt-10 lg:flex-row lg:items-start lg:justify-between">
      <ul className="grid flex-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t) => (
          <li key={t} className="flex items-center gap-3 text-sm text-foreground">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {t}
          </li>
        ))}
      </ul>
      <Link to="/ai" className="link-arrow shrink-0">
        AI & Intelligent Systems <ArrowRight size={14} aria-hidden />
      </Link>
    </div>
  </Section>
);
