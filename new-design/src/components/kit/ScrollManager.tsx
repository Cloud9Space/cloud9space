import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "@/lib/smoothScroll";

/** Scrolls to the hash target after navigation, or to the top on a new page. */
export const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (!el) return;
        const lenis = getLenis();
        if (lenis) {
          // Coming from another page, Lenis still holds that page's height and would stop short.
          lenis.resize();
          lenis.scrollTo(el, { offset: -88 });
        } else el.scrollIntoView();
      };
      // Once the new page has mounted, then again after late content (images, lazy sections) settles.
      const first = window.setTimeout(scrollToTarget, 60);
      const settle = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el && Math.abs(el.getBoundingClientRect().top - 88) > 24) scrollToTarget();
      }, 700);
      return () => {
        window.clearTimeout(first);
        window.clearTimeout(settle);
      };
    }
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, behavior: "auto" });
    // `key` changes on every navigation, so clicking the same in-page link again still scrolls.
  }, [pathname, hash, key]);

  return null;
};
