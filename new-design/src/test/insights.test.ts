import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { posts } from "@/content/insights";
import seo from "@/content/seo.json";

type RouteMeta = { title: string; description: string; image?: string; jsonLd?: { headline?: string } };
const routes = seo.routes as Record<string, RouteMeta>;

describe("insights", () => {
  it.each(posts.map((p) => [p.slug, p] as const))("%s has matching SEO, cover and images", (_, post) => {
    const meta = routes[post.path];
    expect(meta, `add ${post.path} to seo.json`).toBeDefined();
    expect(meta.title).toBe(`${post.title} | Cloud9Space`);
    expect(meta.description).toBe(post.description);
    expect(meta.image).toBe(post.coverImage);
    expect(meta.jsonLd?.headline).toBe(post.title);
    expect(existsSync(join(process.cwd(), "public", post.coverImage))).toBe(true);
    for (const [, src] of post.body.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) expect(post.asset(src), src).toBeDefined();
  });
});
