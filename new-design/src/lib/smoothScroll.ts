import type Lenis from "lenis";

let instance: Lenis | null = null;

/** The active smooth-scroll controller, or null when it is not running (reduced motion, tests). */
export const getLenis = () => instance;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};
