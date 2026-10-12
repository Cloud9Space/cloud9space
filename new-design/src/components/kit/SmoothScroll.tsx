import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/smoothScroll";

/** Inertial wheel scrolling for the whole page. Touch keeps native scrolling. */
export const SmoothScroll = () => {
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.085, anchors: { offset: -88 } });
    setLenis(lenis);
    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
};
