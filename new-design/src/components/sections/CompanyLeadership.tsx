import { Link } from "react-router-dom";
import { ArrowRight, Linkedin } from "lucide-react";
import { credentials, leadership } from "@/content/site";
import { Section } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";

export const LeaderCards = () => (
  <ul className="grid gap-6">
    {leadership.map((p) => (
      <li key={p.name} className="panel flex flex-col gap-6 p-6 sm:flex-row sm:p-8">
        <div
          aria-hidden
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md border border-border bg-grid font-heading text-2xl font-bold text-foreground"
        >
          {p.initials}
        </div>
        <div>
          <p className="font-heading text-xl font-bold text-foreground">{p.name}</p>
          <p className="t-meta mt-1 text-accent">{p.role}</p>
          <p className="t-body mt-4 text-sm">{p.bio}</p>
          {p.linkedin && (
            <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="link-arrow mt-4">
              <Linkedin size={14} aria-hidden /> LinkedIn
            </a>
          )}
        </div>
      </li>
    ))}
  </ul>
);

export const Credentials = () =>
  credentials.length ? (
    <div>
      <h3 className="t-meta uppercase tracking-[0.14em]">Recognition & registrations</h3>
      <ul className="mt-5 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {credentials.map((c) => (
          <li key={c.name} className="bg-card p-5">
            <p className="font-heading font-semibold text-foreground">{c.name}</p>
            <p className="t-meta mt-1">{c.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  ) : null;

export const CompanyLeadership = () => (
  <Section tone="surface" labelledBy="company-title">
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <Reveal className="lg:col-span-6">
        <p className="eyebrow mb-4">Company</p>
        <h2 id="company-title" className="t-h2">
          Built by engineers who had to make these systems work.
        </h2>
        <p className="t-body mt-5">
          Cloud9Space was founded in 2023 on a simple observation: complex real-world problems need more than isolated
          software development. A crop-risk model is useless without reliable field and satellite data; a sales map is
          useless if nobody trusts the numbers on it.
        </p>
        <p className="t-body mt-4">
          We started in geospatial engineering, grew into data platforms and applied AI, and now build complete systems
          across all of them — for enterprises, consulting firms and growing technology companies.
        </p>
        <Link to="/about" className="link-arrow mt-8">
          About Cloud9Space <ArrowRight size={14} aria-hidden />
        </Link>
      </Reveal>
      <Reveal className="lg:col-span-6" delay={100}>
        <p className="t-meta mb-4 uppercase tracking-[0.14em]">Leadership</p>
        <LeaderCards />
      </Reveal>
    </div>
    {credentials.length > 0 && (
      <div className="mt-16">
        <Credentials />
      </div>
    )}
  </Section>
);
