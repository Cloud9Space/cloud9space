import { Link } from "react-router-dom";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Post } from "@/content/insights";
import { headingId, textOf } from "@/lib/headings";

const isExternal = (href = "") => /^https?:\/\//.test(href);

/**
 * Renders a post's Markdown with the site's type scale. Wording is untouched; only presentation
 * is mapped: diagrams as full-width figures, tables in a horizontal scroller, external links in a
 * new tab, and the closing /contact link through the router.
 */
export const ArticleBody = ({ post }: { post: Post }) => {
  const components: Components = {
    h2: ({ children }) => (
      <h2 id={headingId(textOf(children))} className="t-h3 mt-14 scroll-mt-28 !text-[1.6rem] sm:!text-[1.75rem] !leading-tight tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => <h3 className="t-h3 mt-10">{children}</h3>,
    p: ({ node, children }) => {
      // A paragraph holding only an image becomes a figure (a <figure> cannot sit inside a <p>).
      const only = node?.children.length === 1 ? node.children[0] : undefined;
      if (only && only.type === "element" && only.tagName === "img") return <>{children}</>;
      return <p className="mt-5 text-[1.0625rem] leading-[1.75] text-foreground/80">{children}</p>;
    },
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    a: ({ href = "", children }) =>
      isExternal(href) ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline decoration-primary/30 underline-offset-[3px] transition-colors hover:decoration-primary"
        >
          {children}
        </a>
      ) : (
        <Link
          to={href}
          className="font-medium text-primary underline decoration-primary/30 underline-offset-[3px] transition-colors hover:decoration-primary"
        >
          {children}
        </Link>
      ),
    code: ({ children }) => (
      <code className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground [overflow-wrap:anywhere]">
        {children}
      </code>
    ),
    ul: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2.5 pl-6 text-[1.0625rem] leading-[1.7] text-foreground/80 marker:text-primary/60">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2.5 pl-6 text-[1.0625rem] leading-[1.7] text-foreground/80 marker:text-muted-foreground">
        {children}
      </ol>
    ),
    hr: () => <hr className="my-12 border-border" />,
    img: ({ src = "", alt = "" }) => {
      const size = post.assetSize(src);
      const url = post.asset(src) ?? src;
      return (
        <figure className="my-10">
          {/* Tap to open full size: the diagrams carry small text that is hard to read on phones. */}
          <a href={url} target="_blank" rel="noopener noreferrer" className="block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <img
            src={url}
            alt={alt}
            width={size?.width}
            height={size?.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-2xl border border-border bg-white"
          />
          </a>
        </figure>
      );
    },
    table: ({ children }) => (
      <div className="my-8 overflow-x-auto rounded-2xl border border-border bg-card" tabIndex={0} role="region" aria-label="Comparison table">
        <table className="w-full min-w-[540px] border-collapse text-left text-[0.9375rem] leading-relaxed [&_td:first-child]:font-medium [&_td:first-child]:text-foreground">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-muted/70">{children}</thead>,
    th: ({ children }) => <th className="px-5 py-3.5 font-heading font-semibold text-foreground">{children}</th>,
    td: ({ children }) => <td className="border-t border-border px-5 py-3.5 align-top text-foreground/80">{children}</td>,
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {post.body}
    </ReactMarkdown>
  );
};
