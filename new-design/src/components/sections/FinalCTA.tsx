import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { company } from "@/content/site";
import { Reveal } from "@/components/kit/Reveal";

export const FinalCTA = () => (
  <section className="tone-deep relative overflow-hidden bg-background" aria-labelledby="cta-title">
    <div aria-hidden className="absolute inset-0 bg-grid bg-grid-fade opacity-70" />
    <div
      aria-hidden
      className="absolute -bottom-48 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
      style={{ background: "radial-gradient(ellipse, hsl(var(--primary) / 0.3), transparent 65%)" }}
    />
    <Reveal className="container relative py-24 text-center sm:py-28 lg:py-32">
      <p className="eyebrow mb-5">Start a conversation</p>
      <h2 id="cta-title" className="t-h1 mx-auto max-w-3xl">
        Have a complex technology problem?
      </h2>
      <p className="t-lead mx-auto mt-5 max-w-xl">
        Let&apos;s engineer the solution. Tell us what you are trying to build and the constraints you are working
        within.
      </p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/contact" className="btn-primary">
          Talk to an Expert <ArrowRight size={16} aria-hidden />
        </Link>
        <a href={`mailto:${company.email}`} className="btn-outline">
          Start a Conversation
        </a>
      </div>
    </Reveal>
  </section>
);
