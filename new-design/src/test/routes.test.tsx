import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App";
import seo from "@/content/seo.json";

const visit = (path: string) => {
  window.history.pushState({}, "", path);
  return render(<App />);
};

describe("routes", () => {
  it.each(Object.keys(seo.routes))("%s renders a single h1 and sets its title", async (path) => {
    visit(path);
    const h1 = await screen.findAllByRole("heading", { level: 1 }, { timeout: 4000 });
    expect(h1).toHaveLength(1);
    await new Promise((r) => setTimeout(r, 0));
    expect(document.title).toBe(seo.routes[path as keyof typeof seo.routes].title);
  });

  it("renders the 404 page for unknown paths", async () => {
    visit("/does-not-exist");
    expect(await screen.findByText(/could not be found/i)).toBeInTheDocument();
  });
});

describe("content guardrails", () => {
  it("home page does not contain unverified statistics", () => {
    visit("/");
    const text = document.body.textContent ?? "";
    expect(text).not.toMatch(/\d+\s*%\s*client satisfaction/i);
    expect(text).not.toMatch(/\d+\+\s*(projects|team members|professional members)/i);
  });
});
