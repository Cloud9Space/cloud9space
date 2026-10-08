import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { company } from "@/content/site";
import { Reveal } from "@/components/kit/Reveal";

export const FinalCTA = () => (
  <section className="relative py-10 lg:py-12" aria-labelledby="cta-title">
    <div className="container">
      <Reveal className="tone-ink ink-panel px-6 py-16 text-center sm:px-10 sm:py-20 lg:py-24">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative">
          <p className="eyebrow mb-6 !border-white/15 !bg-white/10 !text-foreground">Start a conversation</p>
          <h2 id="cta-title" className="t-h1 mx-auto max-w-3xl">
            Have a complex technology problem?
          </h2>
          <p className="t-lead mx-auto mt-5 max-w-xl">
            Let&apos;s engineer the solution. Tell us what you are trying to build and the constraints you are working
            within.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="btn-light">
              Talk to an Expert <ArrowRight size={16} aria-hidden />
            </Link>
            <a href={`mailto:${company.email}`} className="btn-outline">
              Start a Conversation
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
