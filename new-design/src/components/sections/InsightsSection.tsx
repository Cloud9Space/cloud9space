import { Link } from "react-router-dom";
import { ArrowRight, Linkedin } from "lucide-react";
import { company, insightCategories, insights } from "@/content/site";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";

export const InsightList = ({ limit }: { limit?: number }) => {
  const items = [...insights].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);

  if (!items.length) {
    return (
      <Reveal className="panel flex flex-col gap-6 p-7 sm:p-9 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow">In preparation</p>
          <p className="mt-3 font-heading text-xl font-semibold leading-snug text-foreground">
            Our first engineering notes are being written — starting with lessons from building text-to-SQL over governed
            metric layers, and geospatial data engineering with cloud-native formats.
          </p>
          <p className="t-body mt-3 text-sm">We will only publish what our teams have actually built and learned.</p>
        </div>
        <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline shrink-0">
          <Linkedin size={16} aria-hidden /> Follow on LinkedIn
        </a>
      </Reveal>
    );
  }

  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {items.map((a) => (
        <li key={a.href} className="panel flex flex-col p-6">
          <p className="t-meta">
            <span className="text-accent">{a.category}</span> ·{" "}
            {new Date(a.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
            {a.readMinutes ? ` · ${a.readMinutes} min` : ""}
          </p>
          <h3 className="t-h3 mt-3">
            <a href={a.href} className="hover:text-primary">
              {a.title}
            </a>
          </h3>
          <p className="t-body mt-3 text-sm">{a.summary}</p>
        </li>
      ))}
    </ul>
  );
};

export const InsightsSection = () => (
  <Section tone="light" labelledBy="insights-title" className="!py-20">
    <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <SectionHeader id="insights-title" eyebrow="Insights" title="Engineering notes." />
      <ul className="flex flex-wrap gap-2" aria-label="Topics">
        {insightCategories.map((c) => (
          <li key={c} className="chip">
            {c}
          </li>
        ))}
      </ul>
    </div>
    <InsightList limit={3} />
    {insights.length > 0 && (
      <Link to="/insights" className="link-arrow mt-8">
        All insights <ArrowRight size={14} aria-hidden />
      </Link>
    )}
  </Section>
);
