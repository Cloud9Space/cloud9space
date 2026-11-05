import { Link } from "react-router-dom";
import { ArrowRight, Database, Server } from "lucide-react";
import { startupProgrammes, techEcosystem, type EcosystemItem } from "@/content/site";
import { brandIcons, type BrandIcon, type BrandKey } from "@/content/brandIcons";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";

// Open-source projects without an official mark get a generic icon instead.
const fallbackIcons: Record<string, typeof Database> = { PostGIS: Database, GeoServer: Server };

// Full-colour logo where the brand has one, otherwise the mark in its brand colour.
const BrandMark = ({ logo, className }: { logo: BrandKey; className?: string }) => {
  const icon: BrandIcon = brandIcons[logo];
  return icon.colour ? (
    <svg viewBox={icon.colour.viewBox} aria-hidden className={className}>
      {icon.colour.layers.map((l) => (
        <path key={l.fill} fill={l.fill} d={l.d} />
      ))}
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill={icon.hex}>
      <path d={icon.path} />
    </svg>
  );
};

const TechItem = ({ item }: { item: EcosystemItem }) => {
  const Fallback = fallbackIcons[item.name] ?? Database;
  return (
    <li
      className="flex items-center gap-2.5 rounded-full border border-border bg-card py-2 pl-3 pr-4 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/30 hover:text-foreground"
    >
      {item.logo ? (
        <BrandMark logo={item.logo} className="h-[18px] w-[18px] shrink-0" />
      ) : (
        <Fallback size={18} strokeWidth={1.75} aria-hidden className="shrink-0 text-primary" />
      )}
      {item.name}
    </li>
  );
};

export const Ecosystem = ({ className }: { className?: string }) => (
  <Section labelledBy="ecosystem-title" className={className}>
    <SectionHeader
      id="ecosystem-title"
      eyebrow="Ecosystem"
      title="Backed by leading startup programmes. Built on proven platforms."
      lead="Cloud9Space is supported by the startup programmes of the world's largest AI and cloud companies. That gives our clients access to the latest infrastructure, models and technical expertise, without being tied to a single vendor."
    />

    <h3 className="t-meta mt-12 uppercase tracking-[0.14em]">Startup programmes</h3>
    <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {startupProgrammes.map((p, i) => (
        <Reveal as="li" key={p.name} delay={i * 60} className="panel flex flex-col p-6">
          <BrandMark logo={p.logo} className="h-10 w-10" />
          <p className="mt-5 font-heading text-lg font-bold text-foreground">{p.name}</p>
          <p className="t-body mt-2 text-sm">{p.detail}</p>
        </Reveal>
      ))}
    </ul>

    <h3 className="t-meta mt-16 uppercase tracking-[0.14em]">Technology ecosystem</h3>
    <ul className="mt-5 border-b border-border">
      {techEcosystem.map((group) => (
        <Reveal as="li" key={group.name} className="grid gap-4 border-t border-border py-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h4 className="font-heading text-lg font-bold text-foreground">{group.name}</h4>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">{group.detail}</p>
          </div>
          <div className="lg:col-span-8">
            <ul className="flex flex-wrap gap-2.5" aria-label={group.name}>
              {group.items.map((item) => (
                <TechItem key={item.name} item={item} />
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </ul>

    <Reveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="t-body max-w-2xl">
        We choose tools for fit, not fashion: the right model, platform and cloud for your data, your team and your
        budget. Already committed to a stack? We work inside it.
      </p>
      <Link to="/contact" className="link-arrow shrink-0">
        Talk to us about your stack <ArrowRight size={14} aria-hidden />
      </Link>
    </Reveal>
  </Section>
);
