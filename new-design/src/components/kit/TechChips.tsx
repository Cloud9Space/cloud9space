import { cn } from "@/lib/utils";

export const TechChips = ({ items, className }: { items: string[]; className?: string }) => (
  <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
    {items.map((t) => (
      <li key={t} className="chip">
        {t}
      </li>
    ))}
  </ul>
);
