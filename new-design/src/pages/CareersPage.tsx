import { Link } from "react-router-dom";
import { ArrowRight, Linkedin, Mail } from "lucide-react";
import { careerPrinciples, careerTracks, company } from "@/content/site";
import { posts } from "@/content/insights";
import { Seo } from "@/components/kit/Seo";
import { PageHero } from "@/components/kit/PageHero";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";

const CareersPage = () => (
  <>
    <Seo path="/careers" />
    <PageHero
      crumb="Careers"
      eyebrow="Careers at Cloud9Space"
      title="Build what matters."
      lead="Production AI, data platforms, GIS systems and cloud infrastructure, used by field teams, planners and analysts. We hire engineers who care how their work behaves after release."
    >
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a href="#apply" className="btn-primary">
          View Open Positions <ArrowRight size={16} aria-hidden />
        </a>
        <a href={company.careersHref} className="btn-outline">
          <Mail size={16} aria-hidden /> Email your CV
        </a>
      </div>
    </PageHero>

    <Section labelledBy="why-title">
      <SectionHeader id="why-title" eyebrow="Working here" title="What the work is like." />
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {careerPrinciples.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 70} className="panel p-7">
            <span className="t-meta text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="t-h3 mt-4">{p.title}</h3>
            <p className="t-body mt-2">{p.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>

    <Section labelledBy="tracks-title">
      <SectionHeader id="tracks-title" eyebrow="Teams" title="Where you could work." />
      <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {careerTracks.map((t, i) => (
          <li key={t.name} className="flex items-center gap-4 bg-card px-6 py-5">
            <span className="t-meta text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="t-h3">{t.name}</h3>
          </li>
        ))}
      </ul>
    </Section>

    {posts.length > 0 && (
      <Section labelledBy="writing-title">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader id="writing-title" eyebrow="From the team" title="Read what our engineers write." />
          <Link to="/insights" className="link-arrow shrink-0">
            All insights <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {posts.slice(0, 3).map((p) => (
            <li key={p.slug}>
              <Link
                to={p.path}
                className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <span className="font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {p.title}
                </span>
                <span className="t-meta shrink-0">{p.author.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    )}

    <Section id="apply" labelledBy="apply-title" className="scroll-mt-16">
      <div className="tone-ink ink-panel px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 !border-white/15 !bg-white/10 !text-foreground">Apply</p>
            <h2 id="apply-title" className="t-h2">
              Ready to build with us?
            </h2>
            <p className="t-lead mt-4 max-w-xl">
              Open roles are posted on LinkedIn. Don&apos;t see the right one? Email your CV with the role in the
              subject line and a short note on something you have built.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-5">
            <a href={company.careersHref} className="btn-light justify-center">
              <Mail size={16} aria-hidden /> <span>{company.hrEmail}</span>
            </a>
            <a href={company.jobsHref} target="_blank" rel="noopener noreferrer" className="btn-outline justify-center">
              <Linkedin size={16} aria-hidden /> Open roles on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </Section>
  </>
);

export default CareersPage;
