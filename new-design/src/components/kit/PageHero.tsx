import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumb?: string;
  aside?: ReactNode;
  children?: ReactNode;
};

/** Interior page header with breadcrumb. Offsets the fixed site header. */
export const PageHero = ({ eyebrow, title, lead, crumb, aside, children }: PageHeroProps) => (
  <section className="tone-ink relative overflow-hidden bg-background pt-[72px]" aria-labelledby="page-title">
    <div aria-hidden className="absolute inset-0 bg-grid" />
    <div className={cn("container relative grid gap-12 py-12 sm:py-14 lg:py-16", aside ? "lg:grid-cols-12 lg:items-center" : "text-center")}>
      <div className={cn(aside ? "lg:col-span-6" : "mx-auto max-w-4xl [&_ol]:justify-center [&_ul]:justify-center [&>div]:justify-center")}>
        {crumb && (
          <nav aria-label="Breadcrumb" className="t-meta mb-8">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-foreground">
                {crumb}
              </li>
            </ol>
          </nav>
        )}
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 id="page-title" className="t-h1">
          {title}
        </h1>
        {lead && <p className={cn("t-lead mt-6 max-w-2xl", !aside && "mx-auto")}>{lead}</p>}
        {children}
      </div>
      {aside && <div className="lg:col-span-6">{aside}</div>}
    </div>
  </section>
);
