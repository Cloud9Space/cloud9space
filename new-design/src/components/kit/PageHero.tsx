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
  <section className="tone-deep relative overflow-hidden bg-background pt-[72px]" aria-labelledby="page-title">
    <div aria-hidden className="absolute inset-0 bg-grid bg-grid-fade opacity-70" />
    <div className={cn("container relative grid gap-12 py-14 sm:py-20 lg:py-24", aside && "lg:grid-cols-12 lg:items-center")}>
      <div className={cn(aside && "lg:col-span-6")}>
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
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h1 id="page-title" className="t-h1 max-w-4xl">
          {title}
        </h1>
        {lead && <p className="t-lead mt-6 max-w-2xl">{lead}</p>}
        {children}
      </div>
      {aside && <div className="lg:col-span-6">{aside}</div>}
    </div>
  </section>
);
