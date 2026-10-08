// Post-build: write a copy of index.html per route with route-specific <title>, description,
// canonical and social tags, so crawlers and link previews see correct metadata without
// executing JavaScript. Also emits sitemap.xml.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const seo = JSON.parse(readFileSync(join(root, "src/content/seo.json"), "utf8"));
const template = readFileSync(join(dist, "index.html"), "utf8");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const replaceAttr = (html, pattern, value) => {
  if (!pattern.test(html)) throw new Error(`prerender: pattern not found ${pattern}`);
  return html.replace(pattern, (_, pre, post) => `${pre}${esc(value)}${post}`);
};

for (const [path, meta] of Object.entries(seo.routes)) {
  const url = seo.siteUrl + (path === "/" ? "/" : path);
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = replaceAttr(html, /(<meta name="description" content=")[^"]*(")/, meta.description);
  html = replaceAttr(html, /(<link rel="canonical" href=")[^"]*(")/, url);
  html = replaceAttr(html, /(<meta property="og:url" content=")[^"]*(")/, url);
  html = replaceAttr(html, /(<meta property="og:title" content=")[^"]*(")/, meta.title);
  html = replaceAttr(html, /(<meta property="og:description" content=")[^"]*(")/, meta.description);
  html = replaceAttr(html, /(<meta name="twitter:title" content=")[^"]*(")/, meta.title);
  html = replaceAttr(html, /(<meta name="twitter:description" content=")[^"]*(")/, meta.description);

  const out = path === "/" ? join(dist, "index.html") : join(dist, path.slice(1), "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

const today = new Date().toISOString().slice(0, 10);
const urls = Object.keys(seo.routes)
  .map((p) => {
    const priority = p === "/" ? "1.0" : ["/privacy", "/terms"].includes(p) ? "0.3" : "0.8";
    return `  <url><loc>${seo.siteUrl}${p === "/" ? "/" : p}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`;
  })
  .join("\n");
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

console.log(`prerender: wrote ${Object.keys(seo.routes).length} route documents and sitemap.xml`);
