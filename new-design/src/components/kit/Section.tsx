import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export type Tone = "dark" | "deep" | "surface" | "light";

type SectionProps = {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  labelledBy?: string;
};

export const Section = ({ id, tone = "dark", className, containerClassName, children, labelledBy }: SectionProps) => (
  <section
    id={id}
    aria-labelledby={labelledBy}
    className={cn(`tone-${tone}`, "relative bg-background text-foreground py-20 sm:py-24 lg:py-28", className)}
  >
    <div className={cn("container relative", containerClassName)}>{children}</div>
  </section>
);

type HeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
};

export const SectionHeader = ({ eyebrow, title, lead, id, align = "left", className, as = "h2" }: HeaderProps) => {
  const Heading = as;
  return (
    <Reveal className={cn(align === "center" ? "mx-auto text-center" : "", "max-w-3xl", className)}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Heading id={id} className={as === "h1" ? "t-h1" : "t-h2"}>
        {title}
      </Heading>
      {lead && <p className="t-lead mt-5">{lead}</p>}
    </Reveal>
  );
};
