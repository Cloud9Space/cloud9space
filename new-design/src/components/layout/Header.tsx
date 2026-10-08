import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { capabilities, industries } from "@/content/site";
import logo from "@/assets/logo-mark.png";

type MenuKey = "capabilities" | "industries";

const simpleLinks = [
  { label: "Client Success", to: "/work" },
  { label: "Insights", to: "/insights" },
  { label: "About", to: "/about" },
  { label: "Careers", to: "/careers" },
];

export const Brand = ({ className }: { className?: string }) => (
  <Link to="/" className={cn("flex items-center gap-2.5 shrink-0", className)} aria-label="Cloud9Space home">
    <img src={logo} alt="" width={56} height={32} className="h-8 w-auto" />
    <span className="font-heading text-[1.15rem] font-bold tracking-tight text-foreground">Cloud9Space</span>
  </Link>
);

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number>();
  const triggers = useRef<Record<MenuKey, HTMLButtonElement | null>>({ capabilities: null, industries: null });
  const location = useLocation();
  const panelId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  // Escape closes whichever menu is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open) {
        triggers.current[open]?.focus();
        setOpen(null);
      }
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const show = (key: MenuKey) => {
    window.clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  };

  const navItem =
    "relative px-3 py-2 text-[0.9rem] font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md";

  return (
    <header
      className={cn(
        "tone-deep fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        scrolled || open || mobileOpen
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-background/40 backdrop-blur-sm border-b border-transparent",
      )}
      onMouseLeave={scheduleClose}
    >
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <Brand />

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-0.5">
          {(
            [
              ["capabilities", "What We Do"],
              ["industries", "Industries"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              ref={(el) => (triggers.current[key] = el)}
              type="button"
              aria-expanded={open === key}
              aria-controls={`${panelId}-${key}`}
              onClick={() => setOpen(open === key ? null : key)}
              onMouseEnter={() => show(key)}
              className={cn(navItem, "inline-flex items-center gap-1", open === key && "text-foreground")}
            >
              {label}
              <ChevronDown size={14} className={cn("transition-transform", open === key && "rotate-180")} aria-hidden />
            </button>
          ))}
          {simpleLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onMouseEnter={scheduleClose}
              className={({ isActive }) => cn(navItem, isActive && "text-foreground")}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/contact" className="btn-primary hidden sm:inline-flex py-2.5 px-4">
            Talk to Us
          </Link>
          <button
            type="button"
            className="lg:hidden -mr-2 p-2 text-foreground"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={`${panelId}-mobile`}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Desktop mega menus */}
      <div
        id={`${panelId}-capabilities`}
        hidden={open !== "capabilities"}
        onMouseEnter={() => show("capabilities")}
        className={cn("hidden border-t border-border bg-background", open === "capabilities" && "lg:block")}
      >
        <div className="container grid grid-cols-12 gap-10 py-10">
          <div className="col-span-8">
            <p className="eyebrow mb-5">What we engineer</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1">
              {capabilities.map((c) => (
                <li key={c.slug}>
                  <Link to={c.path} className="group flex gap-4 rounded-md p-3 -mx-3 hover:bg-muted/60 transition-colors">
                    <span className="t-meta pt-1 text-accent">{c.num}</span>
                    <span>
                      <span className="block font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                        {c.name}
                      </span>
                      <span className="block text-sm text-muted-foreground mt-0.5">{c.navBlurb}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 panel p-6 flex flex-col justify-between bg-grid">
            <div>
              <p className="eyebrow mb-3">Our differentiator</p>
              <p className="font-heading text-lg font-semibold leading-snug">
                AI, data and geospatial engineering in one team — not three vendors.
              </p>
            </div>
            <Link to="/#convergence" className="link-arrow mt-6">
              See how they connect <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div
        id={`${panelId}-industries`}
        hidden={open !== "industries"}
        onMouseEnter={() => show("industries")}
        className={cn("hidden border-t border-border bg-background", open === "industries" && "lg:block")}
      >
        <div className="container grid grid-cols-12 gap-10 py-10">
          <div className="col-span-8">
            <p className="eyebrow mb-5">Where we have delivered</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1">
              {industries.map((i) => (
                <li key={i.id}>
                  <Link
                    to={`/industries#${i.id}`}
                    className="group block rounded-md p-3 -mx-3 hover:bg-muted/60 transition-colors"
                  >
                    <span className="block font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                      {i.name}
                    </span>
                    <span className="block text-sm text-muted-foreground mt-0.5">{i.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 panel p-6 flex flex-col justify-between">
            <div>
              <p className="eyebrow mb-3">Client success</p>
              <p className="font-heading text-lg font-semibold leading-snug">
                Field intelligence, route-to-market analytics and GIS planning — see the architecture behind the work.
              </p>
            </div>
            <Link to="/work" className="link-arrow mt-6">
              View engagements <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id={`${panelId}-mobile`}
        hidden={!mobileOpen}
        className="lg:hidden h-[calc(100dvh-72px)] overflow-y-auto border-t border-border bg-background"
      >
        <nav aria-label="Mobile" className="container py-6 flex flex-col">
          <MobileGroup title="What We Do">
            {capabilities.map((c) => (
              <Link key={c.slug} to={c.path} className="flex items-baseline gap-3 py-2.5">
                <span className="t-meta text-accent">{c.num}</span>
                <span className="text-foreground">{c.name}</span>
              </Link>
            ))}
          </MobileGroup>
          <MobileGroup title="Industries">
            {industries.map((i) => (
              <Link key={i.id} to={`/industries#${i.id}`} className="block py-2.5 text-foreground">
                {i.name}
              </Link>
            ))}
          </MobileGroup>
          {simpleLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="border-b border-border py-4 font-heading text-lg font-semibold text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="btn-primary mt-8 w-full py-3.5">
            Talk to Us <ArrowRight size={16} />
          </Link>
        </nav>
      </div>
    </header>
  );
};

const MobileGroup = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  return (
    <div className="border-b border-border">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between py-4 font-heading text-lg font-semibold text-foreground"
      >
        {title}
        <ChevronDown size={18} className={cn("transition-transform", expanded && "rotate-180")} aria-hidden />
      </button>
      <div id={id} hidden={!expanded} className="pb-3 pl-1">
        {children}
      </div>
    </div>
  );
};
