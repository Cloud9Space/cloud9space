import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { company } from "@/content/site";
import { Seo } from "@/components/kit/Seo";
import { PageHero } from "@/components/kit/PageHero";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";
import { ConvergenceDiagram } from "@/components/visuals/ConvergenceDiagram";
import { Credentials, LeaderCards } from "@/components/sections/CompanyLeadership";
import { Approach } from "@/components/sections/Approach";
import { FinalCTA } from "@/components/sections/FinalCTA";

const facts = [
  ["Legal name", company.legalName],
  ["Founded", String(company.founded)],
  ["Headquarters", `${company.address.city}, ${company.address.region}, India`],
  ["Disciplines", "AI · Data · Geospatial · Software · Cloud"],
];

const AboutPage = () => (
  <>
    <Seo path="/about" />
    <PageHero
      crumb="About"
      eyebrow="About Cloud9Space"
      title="A specialist engineering company for AI, data and geospatial systems."
      lead="Founded in Pune in 2023, Cloud9Space builds the systems that sit between raw operational data and real decisions."
    />

    <Section tone="light" labelledBy="story-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-4">Our story</p>
          <h2 id="story-title" className="t-h2">
            Complex problems need more than isolated software development.
          </h2>
        </Reveal>
        <Reveal className="space-y-5 lg:col-span-7" delay={100}>
          <p className="t-lead text-foreground">
            Cloud9Space was founded on the belief that the hardest real-world problems sit across disciplines — and that
            the systems solving them should be designed by one team that understands all of the pieces.
          </p>
          <p className="t-body">
            We started with geospatial engineering: satellite imagery, land parcels, terrain and the maps that make them
            usable. That work pulled us into data platforms, because spatial analysis is only as good as the data
            underneath it, and into applied AI, because imagery and operational data are where models earn their keep.
          </p>
          <p className="t-body">
            Today we combine AI, data engineering, geospatial intelligence and software engineering to build practical
            systems for agritech platforms, consumer-goods businesses, real-estate analytics, public-health programmes
            and the consulting and technology firms that deliver for their own clients.
          </p>
          <p className="t-body">
            We are deliberately a specialist firm. We would rather be the team you call for a hard, cross-disciplinary
            problem than one more vendor on a long list.
          </p>
        </Reveal>
      </div>
    </Section>

    <Section tone="deep" labelledBy="what-title" className="overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeader
            id="what-title"
            eyebrow="What makes us different"
            title="Four disciplines, one engineering team."
            lead="AI provides intelligence, data the foundation, geospatial the context and engineering the execution. We design them together, so they work together."
          />
          <Link to="/#convergence" className="link-arrow mt-8">
            How they connect <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
        <Reveal className="lg:col-span-6">
          <ConvergenceDiagram />
        </Reveal>
      </div>
    </Section>

    <Section tone="surface" labelledBy="leaders-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader id="leaders-title" eyebrow="Leadership" title="Who leads the work." />
        </div>
        <div className="lg:col-span-8">
          <LeaderCards />
        </div>
      </div>
    </Section>

    <Section tone="light" labelledBy="facts-title" className="!py-16">
      <h2 id="facts-title" className="t-meta uppercase tracking-[0.14em]">
        Company details
      </h2>
      <dl className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {facts.map(([k, v]) => (
          <div key={k} className="bg-card p-5">
            <dt className="t-meta uppercase tracking-[0.12em]">{k}</dt>
            <dd className="mt-2 font-heading font-semibold leading-snug text-foreground">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-12">
        <Credentials />
      </div>
    </Section>

    <Approach />
    <FinalCTA />
  </>
);

export default AboutPage;
