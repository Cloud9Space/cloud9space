import { Link } from "react-router-dom";
import { ArrowRight, Linkedin } from "lucide-react";
import { company, insights, type Insight } from "@/content/site";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";

const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const InsightCard = ({ post }: { post: Insight }) => (
  <article className="panel group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 sm:p-7">
    <div className="flex items-center justify-between gap-3">
      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{post.category}</span>
      {post.draft && (
        <span className="rounded-full border border-dashed border-input px-2.5 py-1 text-xs text-muted-foreground">Draft</span>
      )}
    </div>
    <h3 className="t-h3 mt-6">
      {post.href ? (
        <a href={post.href} className="after:absolute after:inset-0 hover:text-primary">
          {post.title}
        </a>
      ) : (
        post.title
      )}
    </h3>
    <p className="t-body mt-3 text-sm">{post.summary}</p>
    <p className="t-meta mt-auto flex items-center gap-2 border-t border-border pt-5">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      {post.readMinutes && <span aria-hidden>·</span>}
      {post.readMinutes && <span>{post.readMinutes} min read</span>}
      {post.href && <ArrowRight size={14} aria-hidden className="ml-auto text-primary transition-transform group-hover:translate-x-1" />}
    </p>
  </article>
);

export const InsightList = ({ limit }: { limit?: number }) => {
  const items = [...insights].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);

  if (!items.length) {
    return (
      <Reveal className="panel flex flex-col gap-6 p-7 sm:p-9 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow">In preparation</p>
          <p className="mt-3 font-heading text-xl font-semibold leading-snug text-foreground">
            Our first engineering notes are being written.
          </p>
          <p className="t-body mt-3 text-sm">We will only publish what our teams have actually built and learned.</p>
        </div>
        <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline shrink-0">
          <Linkedin size={16} aria-hidden /> Follow on LinkedIn
        </a>
      </Reveal>
    );
  }

  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((post, i) => (
        <Reveal as="li" key={post.title} delay={(i % 3) * 80} className="relative">
          <InsightCard post={post} />
        </Reveal>
      ))}
    </ul>
  );
};

/** Home-page blog teaser: the latest three notes. */
export const InsightsSection = () => (
  <Section id="insights" labelledBy="insights-title">
    <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <SectionHeader
        id="insights-title"
        eyebrow="Insights"
        title="Engineering notes from the field."
        lead="Write-ups on AI, data, geospatial systems and cloud, drawn from what our teams build."
      />
      <Link to="/insights" className="btn-outline shrink-0">
        All insights <ArrowRight size={16} aria-hidden />
      </Link>
    </div>
    <InsightList limit={3} />
  </Section>
);
