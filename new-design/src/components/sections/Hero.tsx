import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { capabilities, company, industries } from "@/content/site";
import { HeroVisual } from "@/components/visuals/HeroVisual";
import { Parallax } from "@/components/kit/Parallax";

const facts = [
  { value: String(company.founded), label: "Founded in Pune" },
  { value: String(capabilities.length), label: "Engineering disciplines" },
  { value: String(industries.length), label: "Industries delivered in" },
];

/** Full-bleed navy hero: the pitch on the left, the turning globe filling the right. */
export const Hero = () => (
  <section className="tone-ink relative overflow-hidden bg-background pt-[72px]" aria-labelledby="hero-title">
    <div aria-hidden className="absolute inset-0 bg-grid" />
    <div className="container relative grid items-center gap-10 py-14 lg:min-h-[calc(100svh-72px)] lg:grid-cols-12 lg:py-16">
      <div className="flex flex-col lg:col-span-6">
        <p className="eyebrow self-start">AI · Data · Geospatial · Engineering</p>
        <h1 id="hero-title" className="t-display mt-7">
          Engineering intelligent systems for a data&#8209;driven world.
        </h1>
        <p className="t-lead mt-6 max-w-xl">
          Cloud9Space helps enterprises build intelligent products, data platforms and geospatial systems using AI,
          modern software engineering and cloud technologies.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#capabilities" className="btn-light">
            Explore Our Capabilities <ArrowRight size={16} aria-hidden />
          </a>
          <Link to="/contact" className="btn-outline">
            Talk to Our Team
          </Link>
        </div>

        <div className="relative mt-12 max-w-xl">
          <Link
            to="/about"
            aria-label="About Cloud9Space"
            className="absolute -top-5 right-8 z-10 flex h-11 w-11 items-center justify-center rounded-full border-4 border-background text-[hsl(232_46%_12%)] transition-transform hover:rotate-45"
            style={{ background: "hsl(var(--gold))" }}
          >
            <ArrowUpRight size={18} aria-hidden />
          </Link>
          <dl className="glass grid grid-cols-3 gap-4 !rounded-3xl p-5 sm:p-7">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-heading text-3xl font-medium tracking-tight text-foreground sm:text-[2.6rem]">{f.value}</dd>
                <dd className="mt-2 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-muted-foreground sm:text-xs">
                  {f.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:col-span-6">
        <Parallax distance={24}>
          <HeroVisual />
        </Parallax>
        <div className="glass p-5">
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">What we engineer</p>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Capabilities">
            {capabilities.map((c) => (
              <li key={c.slug}>
                <Link
                  to={c.path}
                  className="inline-flex rounded-full border border-white/15 px-3 py-1 text-xs text-foreground/90 transition-colors hover:border-white/40 hover:text-foreground"
                >
                  {c.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);
