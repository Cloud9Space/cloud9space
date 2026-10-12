import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatPostDate, posts, type Post } from "@/content/insights";
import { Seo } from "@/components/kit/Seo";
import { PageHero } from "@/components/kit/PageHero";
import { Section } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";

const Meta = ({ post }: { post: Post }) => (
  <p className="t-meta">
    {post.author.name} · <time dateTime={post.date}>{formatPostDate(post.date)}</time>
    {post.readingTime > 0 && <> · {post.readingTime} min read</>}
  </p>
);

const Tags = ({ post }: { post: Post }) => (
  <ul className="flex flex-wrap gap-2" aria-label="Topics">
    {post.tags.map((t) => (
      <li key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground/80">
        {t}
      </li>
    ))}
  </ul>
);

/** Wide card for the lead post when the count is odd, so the grid below stays even. */
const FeaturedCard = ({ post }: { post: Post }) => (
  <Link to={post.path} className="panel group grid overflow-hidden p-2 transition duration-300 hover:-translate-y-1 lg:grid-cols-2">
    <div className="aspect-[2/1] overflow-hidden rounded-2xl border border-border bg-white lg:self-center">
      <img
        src={post.coverDisplay}
        alt={post.coverAlt}
        {...{ fetchpriority: "high" }}
        className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </div>
    <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
      <Tags post={post} />
      <h2 className="t-h3 mt-5 !text-[clamp(1.35rem,1.1rem+0.8vw,1.75rem)] !leading-snug transition-colors group-hover:text-primary">
        {post.title}
      </h2>
      <p className="t-body mt-4">{post.description}</p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <Meta post={post} />
        <span className="link-arrow">
          Read the article <ArrowRight size={14} aria-hidden />
        </span>
      </div>
    </div>
  </Link>
);

const PostCard = ({ post }: { post: Post }) => (
  <Link to={post.path} className="panel group flex h-full flex-col overflow-hidden p-2 transition duration-300 hover:-translate-y-1">
    <div className="aspect-[2/1] overflow-hidden rounded-2xl border border-border bg-white">
      <img
        src={post.coverDisplay}
        alt={post.coverAlt}
        loading="lazy"
        className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </div>
    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <Tags post={post} />
      <h2 className="t-h3 mt-4 !text-[clamp(1.2rem,1.05rem+0.5vw,1.45rem)] !leading-snug transition-colors group-hover:text-primary">
        {post.title}
      </h2>
      <p className="t-body mt-3 line-clamp-3">{post.description}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
        <Meta post={post} />
        <span className="link-arrow">
          Read <ArrowRight size={14} aria-hidden />
        </span>
      </div>
    </div>
  </Link>
);

const InsightsPage = () => {
  // An odd count leads with a wide card so the two-column grid below never has a lone card.
  const featured = posts.length % 2 === 1 ? posts[0] : undefined;
  const rest = featured ? posts.slice(1) : posts;
  return (
    <>
      <Seo path="/insights" />
      <PageHero
        crumb="Insights"
        eyebrow="Insights"
        title="Notes from our engineers."
        lead="Practical writing on the systems we build, from the people who build them."
      />
      <Section labelledBy="page-title">
        {featured && (
          <Reveal>
            <FeaturedCard post={featured} />
          </Reveal>
        )}
        {rest.length > 0 && (
          <ul className={`grid gap-6 md:grid-cols-2 ${featured ? "mt-6" : ""}`}>
            {rest.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={(i % 2) * 70}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
};

export default InsightsPage;
