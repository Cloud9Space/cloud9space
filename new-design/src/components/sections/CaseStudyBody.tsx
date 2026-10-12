import type { CaseStudy } from "@/content/site";
import { ArchitectureDiagram } from "@/components/visuals/ArchitectureDiagram";
import { TechChips } from "@/components/kit/TechChips";

/** Challenge / solution / engineering / architecture layout shared by home and /work. */
export const CaseStudyBody = ({ cs, headingLevel = "h3" }: { cs: CaseStudy; headingLevel?: "h2" | "h3" }) => {
  const Heading = headingLevel;
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-6">
        <p className="t-meta">{cs.client}</p>
        <Heading className="t-h2 mt-2 !text-[clamp(1.5rem,1.2rem+1vw,2.1rem)]">{cs.title}</Heading>
        <dl className="mt-8 space-y-6">
          <div>
            <dt className="eyebrow">Challenge</dt>
            <dd className="t-body mt-2">{cs.challenge}</dd>
          </div>
          <div>
            <dt className="eyebrow">Solution</dt>
            <dd className="t-body mt-2">{cs.solution}</dd>
          </div>
        </dl>
      </div>
      <div className="flex flex-col gap-6 lg:col-span-6">
        <ArchitectureDiagram columns={cs.architecture} />
        <div>
          <p className="eyebrow">Engineering highlights</p>
          <ul className="mt-3 space-y-2">
            {cs.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm text-foreground">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        </div>
        <TechChips items={cs.tech} />
      </div>
    </div>
  );
};
