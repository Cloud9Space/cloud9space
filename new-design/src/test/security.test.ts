import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const html = readFileSync(join(root, "index.html"), "utf8");
const netlify = readFileSync(join(root, "..", "netlify.toml"), "utf8");
const csp = /Content-Security-Policy = "([^"]+)"/.exec(netlify)?.[1] ?? "";

describe("security headers", () => {
  it("index.html has no inline scripts, which the CSP would block", () => {
    const inline = [...html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)];
    expect(inline.map((m) => m[1].trim().slice(0, 60))).toEqual([]);
  });

  it("does not allow inline scripts, plugins or framing", () => {
    expect(csp).toMatch(/script-src [^;]+/);
    expect(csp).not.toMatch(/script-src[^;]*'unsafe-(inline|eval)'/);
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
  });
});
