import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { capabilities } from "@/content/site";
import { HeroVisual } from "@/components/visuals/HeroVisual";

export const Hero = () => (
  <section className="tone-deep relative overflow-hidden bg-background pt-[72px]" aria-labelledby="hero-title">
    <div aria-hidden className="absolute inset-0 bg-grid bg-grid-fade opacity-80" />
    <div
      aria-hidden
      className="absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full opacity-40 blur-3xl"
      style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.35), transparent 65%)" }}
    />
    <div className="container relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24 xl:py-28">
      <div className="lg:col-span-6">
        <p className="eyebrow mb-6">AI · Data · Geospatial · Engineering</p>
        <h1 id="hero-title" className="t-display">
          Engineering intelligent systems for a data&#8209;driven world.
        </h1>
        <p className="t-lead mt-6 max-w-xl">
          Cloud9Space helps enterprises build intelligent products, data platforms and geospatial systems using AI,
          modern software engineering and cloud technologies.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#capabilities" className="btn-primary">
            Explore Our Capabilities <ArrowRight size={16} aria-hidden />
          </a>
          <Link to="/contact" className="btn-outline">
            Talk to Our Team
          </Link>
        </div>
        <ul className="mt-12 hidden flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6 sm:flex" aria-label="Capabilities">
          {capabilities.map((c) => (
            <li key={c.slug}>
              <Link to={c.path} className="t-meta hover:text-foreground transition-colors">
                <span className="text-accent">{c.num}</span> {c.navLabel}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:col-span-6">
        <HeroVisual />
      </div>
    </div>
  </section>
);
