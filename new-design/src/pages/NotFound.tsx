import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { capabilities } from "@/content/site";

const NotFound = () => {
  useEffect(() => {
    document.title = "Page not found | Cloud9Space";
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex";
    return () => robots?.remove();
  }, []);

  return (
    <section className="tone-deep relative flex min-h-[80vh] items-center bg-background pt-[72px]">
      <div aria-hidden className="absolute inset-0 bg-grid bg-grid-fade opacity-70" />
      <div className="container relative py-20">
        <p className="eyebrow mb-4">404 · No tile at these coordinates</p>
        <h1 className="t-h1">This page could not be found.</h1>
        <p className="t-lead mt-5 max-w-xl">The link may be outdated. These are good places to continue:</p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {capabilities.map((c) => (
            <li key={c.slug}>
              <Link to={c.path} className="chip text-foreground hover:border-primary">
                {c.navLabel}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/" className="btn-primary mt-10">
          Back to home <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
