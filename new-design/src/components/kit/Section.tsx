import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  labelledBy?: string;
};

export const Section = ({ id, className, containerClassName, children, labelledBy }: SectionProps) => (
  <section
    id={id}
    aria-labelledby={labelledBy}
    className={cn("relative text-foreground py-10 lg:py-12", className)}
  >
    <div className={cn("container relative", containerClassName)}>{children}</div>
  </section>
);

type HeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  align?: "left" | "center" | "right";
  className?: string;
  as?: "h1" | "h2";
};

export const SectionHeader = ({ eyebrow, title, lead, id, align = "left", className, as = "h2" }: HeaderProps) => {
  const Heading = as;
  return (
    <Reveal
      className={cn(align === "center" && "mx-auto text-center", align === "right" && "ml-auto text-right", "max-w-3xl", className)}
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Heading id={id} className={as === "h1" ? "t-h1" : "t-h2"}>
        {title}
      </Heading>
      {lead && <p className="t-lead mt-5">{lead}</p>}
    </Reveal>
  );
};
