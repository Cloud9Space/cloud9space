import { privacy, terms } from "@/content/legal";
import { Seo } from "@/components/kit/Seo";
import { PageHero } from "@/components/kit/PageHero";
import { Section } from "@/components/kit/Section";

const docs = {
  "/privacy": { title: "Privacy Policy", doc: privacy },
  "/terms": { title: "Terms of Use", doc: terms },
} as const;

const LegalPage = ({ path }: { path: keyof typeof docs }) => {
  const { title, doc } = docs[path];
  return (
    <>
      <Seo path={path} />
      <PageHero crumb={title} eyebrow="Legal" title={title} />
      <Section tone="light" labelledBy="page-title">
        <article className="max-w-3xl space-y-10">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="t-h3">{s.heading}</h2>
              {s.body.map((b, i) =>
                Array.isArray(b) ? (
                  <ul key={i} className="t-body mt-3 list-disc space-y-1.5 pl-5">
                    {b.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i} className="t-body mt-3">
                    {b}
                  </p>
                ),
              )}
            </section>
          ))}
        </article>
      </Section>
    </>
  );
};

export default LegalPage;
