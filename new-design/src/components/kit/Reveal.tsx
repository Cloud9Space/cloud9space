import { createElement, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  className?: string;
};

type State = "below" | "in" | "above";

/**
 * Eases content in as it enters the viewport and back out as it leaves, in the direction of travel:
 * it rises into place when scrolling down and settles down into place when scrolling back up.
 * CSS-only animation; no layout shift.
 */
export const Reveal = ({ children, as = "div", delay = 0, className }: RevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<State>("below");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setState("in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setState(entry.isIntersecting ? "in" : entry.boundingClientRect.top > 0 ? "below" : "above"),
      { rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties | undefined = delay && state === "in" ? { transitionDelay: `${delay}ms` } : undefined;
  return createElement(as, { ref, style, "data-reveal": state, className: cn("reveal", className) }, children);
};
