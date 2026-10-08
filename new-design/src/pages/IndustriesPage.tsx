import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { caseById, industries } from "@/content/site";
import { Seo } from "@/components/kit/Seo";
import { PageHero } from "@/components/kit/PageHero";
import { Section } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";

const IndustriesPage = () => (
  <>
    <Seo path="/industries" />
    <PageHero
      crumb="Industries"
      eyebrow="Industries"
      title="Sectors where location, data and AI decide outcomes."
      lead="We focus on industries where Cloud9Space has delivered working systems. Each one below links to the engagement behind it."
    />
    <Section tone="light" labelledBy="ind-list" className="!pt-6 sm:!pt-8">
      <h2 id="ind-list" className="sr-only">
        Industries we serve
      </h2>
      <ul>
        {industries.map((ind, i) => (
          <Reveal
            as="li"
            key={ind.id}
            className="grid scroll-mt-28 gap-6 border-b border-border py-12 lg:grid-cols-12 lg:gap-12"
          >
            <div id={ind.id} className="lg:col-span-4">
              <p className="t-meta text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="t-h2 mt-2 !text-[clamp(1.5rem,1.2rem+1vw,2rem)]">{ind.name}</h3>
            </div>
            <div className="lg:col-span-5">
              <p className="t-lead !text-[1.05rem] text-foreground">{ind.summary}</p>
              <p className="t-body mt-3">{ind.detail}</p>
            </div>
            <div className="lg:col-span-3">
              <p className="t-meta uppercase tracking-[0.12em]">Delivered</p>
              <ul className="mt-3 space-y-2">
                {ind.work.map((w) => (
                  <li key={w} className="text-sm font-medium text-foreground">
                    {w}
                  </li>
                ))}
              </ul>
              {ind.caseIds.map((id) => (
                <Link key={id} to={`/work#${id}`} className="link-arrow mt-4">
                  {caseById[id].title} <ArrowRight size={14} aria-hidden />
                </Link>
              ))}
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
    <FinalCTA />
  </>
);

export default IndustriesPage;
