import { useMemo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { capabilities, capabilityBySlug, caseById, company, type CapabilitySlug } from "@/content/site";
import seo from "@/content/seo.json";
import { Seo } from "@/components/kit/Seo";
import { PageHero } from "@/components/kit/PageHero";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";
import { TechChips } from "@/components/kit/TechChips";
import { AIPipeline } from "@/components/visuals/AIPipeline";
import { GeoLayers } from "@/components/visuals/GeoLayers";
import { ArchitectureDiagram } from "@/components/visuals/ArchitectureDiagram";
import { FinalCTA } from "@/components/sections/FinalCTA";

/** Reference architecture shown on each capability page. */
const reference: Record<CapabilitySlug, { title: string; visual: ReactNode }> = {
  ai: { title: "The production AI lifecycle", visual: <AIPipeline /> },
  geospatial: { title: "How spatial layers become decisions", visual: <div className="mx-auto max-w-3xl"><GeoLayers /></div> },
  data: {
    title: "Reference data platform",
    visual: (
      <ArchitectureDiagram
        columns={[
          { label: "Sources", nodes: ["Operational databases", "SaaS & files", "Devices & feeds"] },
          { label: "Ingest", nodes: ["Batch loads", "Streaming / CDC"] },
          { label: "Platform", nodes: ["Lakehouse / warehouse", "Metric layer", "Quality checks"] },
          { label: "Consume", nodes: ["Dashboards", "APIs", "AI & ML"] },
        ]}
      />
    ),
  },
  software: {
    title: "Reference application architecture",
    visual: (
      <ArchitectureDiagram
        columns={[
          { label: "Users", nodes: ["Web", "Mobile & field"] },
          { label: "Experience", nodes: ["React / Next.js", "Offline sync"] },
          { label: "Services", nodes: ["REST APIs", "Integrations (CRM, ERP)"] },
          { label: "Data", nodes: ["PostgreSQL / PostGIS", "Object storage"] },
        ]}
      />
    ),
  },
  cloud: {
    title: "Reference delivery pipeline",
    visual: (
      <ArchitectureDiagram
        columns={[
          { label: "Code", nodes: ["Application repo", "Infrastructure as code"] },
          { label: "Pipeline", nodes: ["Build & test", "Security checks"] },
          { label: "Runtime", nodes: ["Serverless", "Containers", "Managed databases"] },
          { label: "Operate", nodes: ["Logs & metrics", "Alerts", "Cost reports"] },
        ]}
      />
    ),
  },
};

const CapabilityPage = ({ slug }: { slug: CapabilitySlug }) => {
  const cap = capabilityBySlug[slug];
  const path = cap.path as keyof typeof seo.routes;
  const related = cap.caseIds.map((id) => caseById[id]).filter(Boolean);
  const others = capabilities.filter((c) => c.slug !== slug);

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: cap.name,
      serviceType: cap.name,
      description: seo.routes[path].description,
      url: seo.siteUrl + cap.path,
      provider: { "@type": "Organization", name: company.legalName, url: seo.siteUrl },
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: cap.name,
        itemListElement: cap.offerings.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o.title } })),
      },
    }),
    [cap, path],
  );

  return (
    <>
      <Seo path={path} jsonLd={jsonLd} />
      <PageHero
        eyebrow={`${cap.num} — ${cap.name}`}
        title={cap.headline}
        lead={cap.summary}
        crumb={cap.name}
      >
        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Focus areas">
          {cap.items.map((i) => (
            <li key={i} className="chip text-foreground">
              {i}
            </li>
          ))}
        </ul>
      </PageHero>

      <Section labelledBy="offer-title">
        <SectionHeader id="offer-title" eyebrow="What we build" title={`${cap.name}, in practice.`} />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {cap.offerings.map((o, i) => (
            <Reveal as="li" key={o.title} delay={(i % 3) * 60} className="bg-card p-6 sm:p-7">
              <h3 className="t-h3">{o.title}</h3>
              <p className="t-body mt-3 text-sm">{o.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section labelledBy="ref-title">
        <SectionHeader id="ref-title" eyebrow="Architecture" title={reference[slug].title} />
        <Reveal className="mt-12">{reference[slug].visual}</Reveal>
      </Section>

      <Section labelledBy="principles-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader id="principles-title" eyebrow="How we work" title="Engineering principles." />
            <TechChips items={cap.tech} className="mt-8" />
          </div>
          <ol className="grid gap-8 lg:col-span-8 md:grid-cols-3">
            {cap.principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 60} className="border-t-2 border-primary pt-5">
                <p className="t-meta text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-2">{p.title}</h3>
                <p className="t-body mt-3 text-sm">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {related.length > 0 && (
        <Section labelledBy="related-title">
          <SectionHeader id="related-title" eyebrow="Related work" title="Where we have applied this." />
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <li key={c.id}>
                <Link to={`/work#${c.id}`} className="panel group flex h-full flex-col p-6 hover:border-primary transition-colors">
                  <p className="t-meta">{c.sector}</p>
                  <h3 className="t-h3 mt-2 group-hover:text-primary transition-colors">{c.title}</h3>
                  <p className="t-body mt-3 line-clamp-4 text-sm">{c.challenge}</p>
                  <span className="link-arrow mt-auto pt-6">
                    Read the case <ArrowRight size={14} aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section labelledBy="other-title">
        <h2 id="other-title" className="t-meta uppercase tracking-[0.14em]">
          Other capabilities
        </h2>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {others.map((c) => (
            <li key={c.slug} className="bg-background">
              <Link to={c.path} className="group flex h-full items-baseline gap-3 p-5 hover:bg-card transition-colors">
                <span className="t-meta text-accent">{c.num}</span>
                <span className="font-heading font-semibold text-foreground group-hover:text-primary">{c.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCTA />
    </>
  );
};

export default CapabilityPage;
