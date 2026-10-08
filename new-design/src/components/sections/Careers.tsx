import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { careerTracks } from "@/content/site";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";

export const CareersSection = () => (
  <Section labelledBy="careers-title">
    <SectionHeader
      id="careers-title"
      eyebrow="Careers"
      title="Build what matters."
      lead="We are building teams across AI, software, data, GIS, cloud and quality engineering — people who want their work to run in production and be used."
    />
    <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-10">
      <Reveal className="tone-blue ink-panel flex flex-col justify-between gap-8 p-8 sm:p-10 lg:col-span-4">
        <div aria-hidden className="absolute inset-0 bg-grid" />
        <div className="relative">
          <p className="font-heading text-2xl font-semibold leading-snug">Open roles are posted on LinkedIn.</p>
          <p className="mt-3 text-sm text-muted-foreground">Or send us your CV and a note on something you have built.</p>
        </div>
        <Link to="/careers" className="btn-light relative self-start">
          View Open Positions <ArrowRight size={16} aria-hidden />
        </Link>
      </Reveal>
      <ul className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:col-span-8">
        {careerTracks.map((t) => (
          <li key={t.name} className="bg-card p-5 sm:p-6">
            <p className="font-heading font-semibold text-foreground">{t.name}</p>
            <p className="t-body mt-1.5 text-sm">{t.body}</p>
          </li>
        ))}
      </ul>
    </div>
  </Section>
);
