import { createElement, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  className?: string;
};

/** Fades content in once it enters the viewport. CSS-only animation; no layout shift. */
export const Reveal = ({ children, as = "div", delay = 0, className }: RevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined;
  return createElement(as, { ref, style, className: cn("reveal", visible && "is-visible", className) }, children);
};
