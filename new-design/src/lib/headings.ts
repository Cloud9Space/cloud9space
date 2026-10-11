import type { ReactNode } from "react";

/** Stable anchor id for a heading, e.g. "How to choose" → "how-to-choose". */
export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const textOf = (node: ReactNode): string =>
  typeof node === "string" || typeof node === "number"
    ? String(node)
    : Array.isArray(node)
      ? node.map(textOf).join("")
      : node && typeof node === "object" && "props" in node
        ? textOf((node as { props: { children?: ReactNode } }).props.children)
        : "";

/** The post's h2 headings, for the "On this page" list. */
export const postHeadings = (body: string) =>
  [...body.matchAll(/^## (.+)$/gm)].map((m) => ({ text: m[1].trim(), id: headingId(m[1].trim()) }));

