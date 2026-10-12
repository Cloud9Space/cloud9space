/**
 * Insights (blog) posts. Each post is a folder under ./insights/<slug>/ holding index.md (YAML
 * frontmatter + Markdown) and images/. SVG diagrams are used in the article body; the 2x PNG copies
 * live in /public/insights/<slug>/images/ for cover, Open Graph and Twitter images.
 *
 * To add a post: add its folder here, copy its PNGs to public/insights/<slug>/images/, add its
 * route to seo.json, and register any new author below.
 */

export type Author = {
  name: string;
  role?: string;
  // TODO(content): photo and short bio for each author.
};

export const authors: Record<string, Author> = {
  "Gaurav Niturkar": { name: "Gaurav Niturkar", role: "Senior Software Engineer, Cloud9Space" },
  "Shravani Kulkarni": { name: "Shravani Kulkarni", role: "Software Engineer (Full Stack), Cloud9Space" },
  "Sarang Joshi": { name: "Sarang Joshi", role: "Software Engineer (Full Stack), Cloud9Space" },
};

export type Post = {
  slug: string;
  path: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  author: Author;
  tags: string[];
  readingTime: number;
  /** Absolute site path to the PNG cover, used as the social image. */
  coverImage: string;
  /** Lightweight cover for on-page cards: the matching SVG diagram when there is one, else the PNG. */
  coverDisplay: string;
  coverAlt: string;
  body: string;
  /** Resolves a Markdown image path such as ./images/x.svg to its bundled URL. */
  asset: (src: string) => string | undefined;
  /** Intrinsic size of a body image, to reserve space before it loads. */
  assetSize: (src: string) => { width: number; height: number } | undefined;
};

const sources = import.meta.glob<string>("./insights/*/index.md", { query: "?raw", import: "default", eager: true });
const assetUrls = import.meta.glob<string>("./insights/*/images/*.svg", { query: "?url", import: "default", eager: true });
const assetRaw = import.meta.glob<string>("./insights/*/images/*.svg", { query: "?raw", import: "default", eager: true });

/** Minimal frontmatter parser for the flat keys these posts use (strings, numbers, [lists]). */
const parseFrontmatter = (raw: string) => {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(raw);
  if (!match) throw new Error("Insight post is missing frontmatter");
  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split("\n")) {
    const kv = /^(\w+):\s*(.*)$/.exec(line);
    if (!kv) continue;
    const value = kv[2].trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      data[kv[1]] = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      data[kv[1]] = value.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
    }
  }
  return { data, body: raw.slice(match[0].length) };
};

const str = (v: string | string[] | undefined, key: string) => {
  if (typeof v !== "string" || !v) throw new Error(`Insight post is missing "${key}"`);
  return v;
};

export const posts: Post[] = Object.entries(sources)
  .map(([file, raw]) => {
    const dir = file.slice(0, file.lastIndexOf("/"));
    const { data, body } = parseFrontmatter(raw);
    const slug = str(data.slug, "slug");
    const authorName = str(data.author, "author");
    const local = (src: string) => `${dir}/${src.replace(/^\.\//, "")}`;
    return {
      slug,
      path: `/insights/${slug}`,
      title: str(data.title, "title"),
      description: str(data.description, "description"),
      date: str(data.date, "date"),
      author: authors[authorName] ?? { name: authorName },
      tags: Array.isArray(data.tags) ? data.tags : [],
      readingTime: Number(data.readingTime) || 0,
      coverImage: `/insights/${slug}/${str(data.coverImage, "coverImage").replace(/^\.\//, "")}`,
      coverDisplay:
        assetUrls[local(str(data.coverImage, "coverImage").replace(/\.png$/, ".svg"))] ??
        `/insights/${slug}/${str(data.coverImage, "coverImage").replace(/^\.\//, "")}`,
      coverAlt: str(data.coverAlt, "coverAlt"),
      body,
      asset: (src: string) => assetUrls[local(src)],
      assetSize: (src: string) => {
        const svg = assetRaw[local(src)];
        const m = svg && /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg);
        return m ? { width: Number(m[1]), height: Number(m[2]) } : undefined;
      },
    } satisfies Post;
  })
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

export const postBySlug = Object.fromEntries(posts.map((p) => [p.slug, p])) as Record<string, Post>;

export const formatPostDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
