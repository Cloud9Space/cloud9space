import { clientLogos, clientNames } from "@/content/site";

export const ClientStrip = () => (
  <section className="bg-background border-y border-border" aria-labelledby="clients-title">
    <div className="container flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:gap-16">
      <h2 id="clients-title" className="t-meta max-w-[15rem] shrink-0 uppercase tracking-[0.14em] leading-relaxed">
        Trusted by teams across enterprise, consulting and technology
      </h2>
      <ul className="flex flex-1 flex-wrap items-center gap-x-12 gap-y-6 lg:justify-between">
        {clientLogos.map((l) => (
          <li key={l.name}>
            <img
              src={l.src}
              alt={l.name}
              style={{ height: l.height }}
              className="w-auto opacity-70 transition-opacity hover:opacity-100"
              loading="lazy"
              decoding="async"
            />
          </li>
        ))}
        {clientNames.map((n) => (
          <li key={n} className="font-heading text-xl font-bold tracking-tight text-foreground/70">
            {n}
          </li>
        ))}
      </ul>
    </div>
  </section>
);
