import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";
import { NeuralField } from "@/components/visuals/NeuralField";

const traits = [
  { title: "Specialists", body: "AI, data and geospatial engineering is all we do." },
  { title: "One team", body: "The same engineers own the system end to end." },
  { title: "Built to run", body: "We measure success in production, not in demos." },
];

export const WhoWeAre = () => (
  <Section labelledBy="who-title">
    <SectionHeader id="who-title" eyebrow="Who we are" title="Where AI meets data and geography." />
    <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <Reveal className="tone-blue ink-panel overflow-hidden lg:col-span-6">
        <div aria-hidden className="absolute inset-0 bg-grid" />
        <div className="relative">
          <NeuralField />
        </div>
      </Reveal>
      <Reveal className="lg:col-span-6" delay={100}>
        <p className="t-lead max-w-xl text-foreground">
          We build AI systems that understand your data and the world it describes.
        </p>
        <p className="t-body mt-4 max-w-xl">
          Cloud9Space is an engineering company founded in Pune in 2023. We started with geospatial systems and grew
          into data platforms and applied AI. Today we build complete products for enterprises, consulting firms and
          technology companies.
        </p>
        <dl className="mt-8 grid gap-5 border-t border-border pt-6 sm:grid-cols-3">
          {traits.map((t) => (
            <div key={t.title}>
              <dt className="font-heading font-semibold text-foreground">{t.title}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{t.body}</dd>
            </div>
          ))}
        </dl>
        <Link to="/about" className="link-arrow mt-8">
          More about us <ArrowRight size={14} aria-hidden />
        </Link>
      </Reveal>
    </div>
  </Section>
);
