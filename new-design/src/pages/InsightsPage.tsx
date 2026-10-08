import { insightCategories } from "@/content/site";
import { Seo } from "@/components/kit/Seo";
import { PageHero } from "@/components/kit/PageHero";
import { Section } from "@/components/kit/Section";
import { InsightList } from "@/components/sections/InsightsSection";

const InsightsPage = () => (
  <>
    <Seo path="/insights" />
    <PageHero
      crumb="Insights"
      eyebrow="Insights"
      title="Engineering notes from the field."
      lead="Practical write-ups on AI, data, geospatial systems, software and cloud — drawn from systems our teams have built."
    >
      <ul className="mt-10 flex flex-wrap gap-2" aria-label="Topics">
        {insightCategories.map((c) => (
          <li key={c} className="chip text-foreground">
            {c}
          </li>
        ))}
      </ul>
    </PageHero>
    <Section tone="light" labelledBy="latest-title">
      <h2 id="latest-title" className="t-meta mb-8 uppercase tracking-[0.14em]">
        Latest
      </h2>
      <InsightList />
    </Section>
  </>
);

export default InsightsPage;
