import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const OFFSET = ["start end", "end start"] as const;

type ParallaxProps = {
  children: ReactNode;
  /** Pixels travelled either side of rest. Positive drifts up as the page scrolls down. */
  distance?: number;
  className?: string;
};

/** Drifts its content against the scroll so widgets float at a different depth from the page. */
export const Parallax = ({ children, distance = 40, className }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: [...OFFSET] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
};
