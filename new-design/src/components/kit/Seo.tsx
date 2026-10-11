import { useEffect } from "react";
import seo from "@/content/seo.json";

type SeoProps = {
  path: keyof typeof seo.routes;
  jsonLd?: Record<string, unknown>;
};

/** Optional per-route social fields; routes without them fall back to the site defaults. */
type RouteMeta = {
  title: string;
  description: string;
  type?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  jsonLd?: Record<string, unknown>;
};

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
};

/**
 * Keeps title, description, canonical and social tags in sync on client-side navigation.
 * The same values are written into per-route HTML at build time by scripts/prerender.mjs.
 */
export const Seo = ({ path, jsonLd }: SeoProps) => {
  useEffect(() => {
    const meta: RouteMeta = seo.routes[path];
    const url = seo.siteUrl + (path === "/" ? "/" : path);
    document.title = meta.title;
    setMeta("property", "og:type", meta.type ?? "website");
    setMeta("property", "og:image", seo.siteUrl + (meta.image ?? seo.ogImage));
    setMeta("property", "og:image:width", String(meta.imageWidth ?? 1200));
    setMeta("property", "og:image:height", String(meta.imageHeight ?? 630));
    setMeta("property", "og:image:alt", meta.imageAlt ?? seo.routes["/"].title);
    setMeta("name", "twitter:image", seo.siteUrl + (meta.image ?? seo.ogImage));
    setMeta("name", "description", meta.description);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const ld = jsonLd ?? meta.jsonLd;
    if (!ld) return;
    // The prerendered page already carries this route's JSON-LD; don't add it twice.
    const prerendered = document.head.querySelector(`script[type="application/ld+json"][data-route="${path}"]`);
    if (prerendered) return () => prerendered.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.route = path;
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);
    return () => script.remove();
  }, [path, jsonLd]);

  return null;
};
