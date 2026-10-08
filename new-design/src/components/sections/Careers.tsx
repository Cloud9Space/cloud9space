import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { careerTracks } from "@/content/site";
import { Section } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";

export const CareersSection = () => (
  <Section tone="light" labelledBy="careers-title">
    <div className="grid gap-12 lg:grid-cols-12">
      <Reveal className="lg:col-span-5">
        <p className="eyebrow mb-4">Careers</p>
        <h2 id="careers-title" className="t-h2">
          Build what matters.
        </h2>
        <p className="t-lead mt-5">
          We are building teams across AI, software, data, GIS, cloud and quality engineering — people who want their
          work to run in production and be used.
        </p>
        <Link to="/careers" className="btn-primary mt-8">
          View Open Positions <ArrowRight size={16} aria-hidden />
        </Link>
      </Reveal>
      <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:col-span-7">
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
