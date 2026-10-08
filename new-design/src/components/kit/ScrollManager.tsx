import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "@/lib/smoothScroll";

/** Scrolls to the hash target after navigation, or to the top on a new page. */
export const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Wait a frame so lazily rendered pages have mounted.
      const t = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(el, { offset: -88 });
        else el.scrollIntoView();
      }, 60);
      return () => window.clearTimeout(t);
    }
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};
