import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { team, type TeamMember } from "@/content/site";
import { Section } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";
import { cn } from "@/lib/utils";

const ADVANCE_MS = 2800; // pause on each centred card before gliding to the next
const ARCH = 18; // px each step away from the centre sits lower
const GAP = 20;

const Portrait = ({ member, active }: { member: TeamMember; active: boolean }) => {
  if (member.photo) {
    return (
      <img
        src={member.photo}
        alt=""
        loading="lazy"
        className={cn("absolute inset-0 h-full w-full object-cover transition duration-500", !active && "grayscale")}
      />
    );
  }
  if (member.placeholder) {
    return (
      <svg
        aria-hidden
        viewBox="0 0 120 160"
        className={cn("absolute inset-x-0 bottom-0 h-[88%] w-full transition-colors duration-500", active ? "text-primary/25" : "text-foreground/15")}
      >
        <circle cx="60" cy="58" r="26" fill="currentColor" />
        <path d="M10 160c0-32 22-56 50-56s50 24 50 56z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <span
      aria-hidden
      className={cn(
        "absolute inset-0 flex items-center justify-center pb-12 font-heading text-6xl font-semibold transition-colors duration-500",
        active ? "text-primary" : "text-foreground/70",
      )}
    >
      {member.initials}
    </span>
  );
};

/** Card width tracks the viewport so the centred card and its neighbours fit on phones. */
const useCardWidth = () => {
  const get = () => (typeof window !== "undefined" && window.innerWidth < 640 ? 170 : 210);
  const [width, setWidth] = useState(get);
  useEffect(() => {
    const onResize = () => setWidth(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
};

/** Signed distance from the centred card, wrapped so the row loops: -n/2 … n/2. */
const wrapOffset = (i: number, active: number, n: number) => {
  let d = (((i - active) % n) + n) % n;
  if (d > n / 2) d -= n;
  return d;
};

/**
 * Team carousel. Every few seconds the row glides one card along and stops; the card that lands in the
 * middle is highlighted. Hovering or focusing a card highlights it instead and pauses the row; clicking
 * brings it to the centre. Reduced-motion visitors get a still row they move with the arrow buttons.
 */
export const TeamSection = () => {
  const n = team.length;
  const [active, setActive] = useState(Math.floor(n / 2));
  const [hovered, setHovered] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const reduce = useReducedMotion();
  const cardW = useCardWidth();
  const rowRef = useRef<HTMLDivElement>(null);
  const prevOffsets = useRef<number[]>([]);

  const highlighted = hovered ?? active;
  const paused = hovered !== null || reduce || !inView;

  // Only run while the section is on screen.
  useEffect(() => {
    const el = rowRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % n), ADVANCE_MS);
    return () => window.clearInterval(t);
  }, [paused, n]);

  const step = (delta: number) => setActive((a) => (a + delta + n) % n);
  const offsets = team.map((_, i) => wrapOffset(i, active, n));
  const prev = prevOffsets.current;
  // Remember where each card sat after this render commits, to spot wrap-arounds on the next one.
  useEffect(() => {
    prevOffsets.current = team.map((_, i) => wrapOffset(i, active, n));
  }, [active, n]);

  return (
    <Section id="team" labelledBy="team-title" className="overflow-hidden">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <Reveal className="max-w-3xl">
          <Link to="/careers" className="eyebrow mb-5 hover:border-foreground/30">
            We&apos;re hiring
            <span className="flex items-center gap-1 border-l border-border pl-2 text-muted-foreground">
              Careers <ArrowRight size={12} aria-hidden />
            </span>
          </Link>
          <h2 id="team-title" className="t-h2">
            The team behind the systems.
          </h2>
          <p className="t-lead mt-4">
            Engineers across AI, data, GIS, software and cloud — working as one team on every engagement.
          </p>
        </Reveal>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} aria-label="Previous team member" className="btn-outline !p-3">
            <ArrowLeft size={16} aria-hidden />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next team member" className="btn-outline !p-3">
            <ArrowRight size={16} aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={rowRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Team members"
        className="relative mt-12 h-[360px] sm:h-[400px]"
      >
        <ul>
          {team.map((m, i) => {
            const offset = offsets[i];
            const isOn = i === highlighted;
            const hidden = Math.abs(offset) > 3;
            // A card wrapping from one end to the other jumps instead of flying across the row.
            const wrapped = prev.length > 0 && Math.abs(offset - prev[i]) > 1;
            return (
              <motion.li
                key={`${m.role}-${i}`}
                className="absolute left-1/2 top-6"
                style={{ width: cardW, marginLeft: -cardW / 2, zIndex: isOn ? 20 : 10 - Math.abs(offset) }}
                initial={false}
                animate={{
                  x: offset * (cardW + GAP),
                  y: Math.abs(offset) * ARCH + (isOn ? -14 : 0),
                  scale: isOn ? 1.08 : 0.94,
                  opacity: hidden ? 0 : isOn ? 1 : Math.abs(offset) >= 3 ? 0.3 : 0.72,
                }}
                transition={
                  wrapped || reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 120, damping: 20, mass: 0.9, opacity: { duration: 0.4 } }
                }
                aria-hidden={hidden || undefined}
              >
                <figure
                  tabIndex={hidden ? -1 : 0}
                  aria-current={i === active || undefined}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl border bg-muted outline-none transition-[border-color,box-shadow,background-color] duration-500",
                    isOn ? "border-primary bg-card ring-4 ring-primary/15" : "border-border",
                  )}
                  style={{
                    boxShadow: isOn
                      ? "0 2px 4px hsl(232 30% 20% / 0.06), 0 28px 50px -22px hsl(var(--primary) / 0.55)"
                      : "var(--shadow-soft)",
                  }}
                >
                  <Portrait member={m} active={isOn} />
                  <figcaption
                    className={cn(
                      "glass-label absolute inset-x-2 bottom-2 px-3 py-2.5",
                      m.photo && "glass-label-dark",
                      isOn && "is-active",
                    )}
                  >
                    <p
                      className={cn(
                        "text-sm font-semibold transition-colors duration-500",
                        m.photo ? "text-white" : isOn ? "text-primary" : "text-foreground",
                      )}
                    >
                      {m.name}
                    </p>
                    <p className={cn("text-xs", m.photo ? "text-white/75" : "text-muted-foreground")}>{m.role}</p>
                  </figcaption>
                </figure>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
};
