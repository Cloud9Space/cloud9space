import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to the hash target after navigation, or to the top on a new page. */
export const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Wait a frame so lazily rendered pages have mounted.
      const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};
