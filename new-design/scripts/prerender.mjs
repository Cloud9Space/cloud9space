// Post-build: write a static HTML file per route with the page's full rendered content plus its
// <title>, description, canonical, social tags and JSON-LD, so search engines, AI crawlers and link
// previews see the real page without executing JavaScript. The browser then hydrates that HTML.
// Also emits 404.html (served with a real 404 status by Netlify) and sitemap.xml.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");
const seo = JSON.parse(readFileSync(join(root, "src/content/seo.json"), "utf8"));
const template = readFileSync(join(dist, "index.html"), "utf8");
const { render } = await import(pathToFileURL(join(ssrDir, "entry-server.js")).href);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const replaceAttr = (html, pattern, value) => {
  if (!pattern.test(html)) throw new Error(`prerender: pattern not found ${pattern}`);
  return html.replace(pattern, (_, pre, post) => `${pre}${esc(value)}${post}`);
};
// Escape "<" so JSON can never close the script element early.
const ldScript = (data, path) =>
  `  <script type="application/ld+json" data-route="${path}">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>\n  </head>`;
const shortTitle = (title) => title.replace(/\s*\|\s*Cloud9Space$/, "");
const withBody = (html, body) => {
  if (!html.includes('<div id="root"></div>')) throw new Error("prerender: empty #root not found in template");
  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
};

/** Home › [Insights ›] Page, for every route except the home page. */
const breadcrumbs = (path, meta) => {
  if (path === "/") return null;
  const items = [{ name: "Home", url: `${seo.siteUrl}/` }];
  if (path.startsWith("/insights/")) items.push({ name: "Insights", url: `${seo.siteUrl}/insights` });
  items.push({ name: shortTitle(meta.title), url: seo.siteUrl + path });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
  };
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
  if (meta.type) html = replaceAttr(html, /(<meta property="og:type" content=")[^"]*(")/, meta.type);
  if (meta.image) {
    const image = seo.siteUrl + meta.image;
    html = replaceAttr(html, /(<meta property="og:image" content=")[^"]*(")/, image);
    html = replaceAttr(html, /(<meta name="twitter:image" content=")[^"]*(")/, image);
    html = replaceAttr(html, /(<meta property="og:image:width" content=")[^"]*(")/, String(meta.imageWidth));
    html = replaceAttr(html, /(<meta property="og:image:height" content=")[^"]*(")/, String(meta.imageHeight));
    html = replaceAttr(html, /(<meta property="og:image:alt" content=")[^"]*(")/, meta.imageAlt);
  }
  if (meta.jsonLd) html = html.replace("</head>", ldScript(meta.jsonLd, path));
  const crumbs = breadcrumbs(path, meta);
  if (crumbs) html = html.replace("</head>", ldScript(crumbs, `${path}#breadcrumbs`));

  html = withBody(html, await render(path));

  const out = path === "/" ? join(dist, "index.html") : join(dist, path.slice(1), "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

// 404 page: real content, not indexed, no canonical pointing at the home page.
{
  let html = template.replace(/<title>[^<]*<\/title>/, "<title>Page not found | Cloud9Space</title>");
  html = html.replace(/\s*<link rel="canonical" href="[^"]*" \/>/, "");
  html = html.replace("</head>", '  <meta name="robots" content="noindex" />\n  </head>');
  writeFileSync(join(dist, "404.html"), withBody(html, await render("/404")));
}

// Sitemap: articles use their own modified date; other pages use the build date.
const today = new Date().toISOString().slice(0, 10);
const urls = Object.entries(seo.routes)
  .map(([p, meta]) => {
    const priority = p === "/" ? "1.0" : ["/privacy", "/terms"].includes(p) ? "0.3" : "0.8";
    const lastmod = meta.jsonLd?.dateModified ?? today;
    return `  <url><loc>${seo.siteUrl}${p === "/" ? "/" : p}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority></url>`;
  })
  .join("\n");
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerender: wrote ${Object.keys(seo.routes).length} pages with full HTML, 404.html and sitemap.xml`);
