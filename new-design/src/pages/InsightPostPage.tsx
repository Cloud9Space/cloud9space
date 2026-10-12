import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { formatPostDate, postBySlug } from "@/content/insights";
import type seo from "@/content/seo.json";
import { postHeadings } from "@/lib/headings";
import { Seo } from "@/components/kit/Seo";
import { ArticleBody } from "@/components/insights/ArticleBody";
import NotFound from "./NotFound";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const InsightPostPage = () => {
  const { slug = "" } = useParams();
  const post = postBySlug[slug];
  if (!post) return <NotFound />;

  const headings = postHeadings(post.body);

  return (
    <>
      <Seo path={post.path as keyof typeof seo.routes} />

      <header className="tone-ink relative overflow-hidden bg-background pt-[72px]" aria-labelledby="page-title">
        <div aria-hidden className="absolute inset-0 bg-grid" />
        <div className="container relative grid py-12 sm:py-14 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-10">
            <nav aria-label="Breadcrumb" className="t-meta mb-8">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link to="/" className="hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link to="/insights" className="hover:text-foreground">
                    Insights
                  </Link>
                </li>
              </ol>
            </nav>
            <ul className="mb-6 flex flex-wrap gap-2" aria-label="Topics">
              {post.tags.map((t) => (
                <li key={t} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground/90">
                  {t}
                </li>
              ))}
            </ul>
            <h1 id="page-title" className="t-h1 !text-[clamp(1.9rem,1.3rem+2vw,3rem)]">
              {post.title}
            </h1>
            <p className="t-lead mt-6 max-w-3xl">{post.description}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-border pt-6">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                >
                  {initials(post.author.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">{post.author.name}</span>
                  {post.author.role && <span className="block text-xs text-muted-foreground">{post.author.role}</span>}
                </span>
              </div>
              <dl className="t-meta flex flex-wrap gap-x-6 gap-y-1">
                <div>
                  <dt className="sr-only">Published</dt>
                  <dd>
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  </dd>
                </div>
                {post.readingTime > 0 && (
                  <div>
                    <dt className="sr-only">Reading time</dt>
                    <dd>{post.readingTime} min read</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <article className="min-w-0 lg:col-span-9" aria-labelledby="page-title">
            <div className="max-w-[80ch]">
              <ArticleBody post={post} />
            </div>

            <footer className="mt-14 max-w-[80ch] border-t border-border pt-8">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground"
                >
                  {initials(post.author.name)}
                </span>
                <div>
                  <p className="t-meta uppercase tracking-[0.12em]">Written by</p>
                  <p className="mt-1 font-heading font-semibold text-foreground">{post.author.name}</p>
                  {post.author.role && <p className="text-sm text-muted-foreground">{post.author.role}</p>}
                </div>
              </div>
              <Link to="/insights" className="link-arrow mt-10">
                <ArrowLeft size={14} aria-hidden /> All insights
              </Link>
            </footer>
          </article>

          {headings.length > 2 && (
            <aside className="hidden lg:col-span-3 lg:col-start-10 lg:block" aria-label="On this page">
              <div className="sticky top-28">
                <p className="t-meta uppercase tracking-[0.12em]">On this page</p>
                <ol className="mt-4 space-y-2.5 border-l border-border">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="-ml-px block border-l border-transparent pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
};

export default InsightPostPage;
