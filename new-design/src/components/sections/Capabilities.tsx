import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { capabilities } from "@/content/site";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";
import { TechChips } from "@/components/kit/TechChips";
import { cn } from "@/lib/utils";

/** Editorial capability index: tab list (scrollable chips on mobile) with a detail panel. */
export const Capabilities = () => {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const cap = capabilities[active];

  const onKeyDown = (e: KeyboardEvent) => {
    const delta = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + capabilities.length) % capabilities.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <Section id="capabilities" labelledBy="cap-title">
      <SectionHeader
        id="cap-title"
        eyebrow="What we engineer"
        title="Five capabilities, designed to work as one system."
        lead="Each practice stands on its own. The value comes from how they combine — data that feeds models, models that understand location, and software that puts both in front of people."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-12">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Capabilities"
          onKeyDown={onKeyDown}
          className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0 lg:col-span-5 lg:flex-col lg:gap-0 lg:overflow-visible"
        >
          {capabilities.map((c, i) => (
            <button
              key={c.slug}
              ref={(el) => (tabs.current[i] = el)}
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "group shrink-0 text-left transition-colors",
                "rounded-md border px-4 py-2.5 lg:flex lg:flex-1 lg:items-center lg:rounded-none lg:border-0 lg:border-t lg:px-0 lg:py-4",
                i === active
                  ? "border-primary bg-primary/10 lg:bg-transparent lg:border-t-primary"
                  : "border-border hover:border-foreground/40",
              )}
            >
              <span className="flex items-baseline gap-4">
                <span className={cn("t-meta", i === active ? "text-accent" : "")}>{c.num}</span>
                <span
                  className={cn(
                    "font-heading font-semibold whitespace-nowrap lg:text-xl lg:tracking-tight",
                    i === active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {c.name}
                </span>
              </span>
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${active}`}
          className="panel relative overflow-hidden p-6 sm:p-8 lg:col-span-7 lg:p-10"
        >
          <div aria-hidden className="pointer-events-none absolute right-6 top-2 font-heading text-[7rem] font-bold leading-none text-foreground/[0.04] sm:text-[9rem]">
            {cap.num}
          </div>
          <Reveal key={cap.slug} className="relative">
            <p className="eyebrow mb-3">{cap.name}</p>
            <h3 className="t-h2 !text-[clamp(1.4rem,1.1rem+1vw,2rem)]">{cap.headline}</h3>
            <p className="t-body mt-4 max-w-xl">{cap.summary}</p>
            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {cap.items.map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-border pb-3 text-sm text-foreground">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <TechChips items={cap.tech.slice(0, 6)} className="mt-8" />
            <Link to={cap.path} className="link-arrow mt-8">
              Explore {cap.navLabel} <ArrowRight size={14} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};
