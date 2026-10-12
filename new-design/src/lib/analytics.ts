const GA_ID = "G-J54YYJCPD8";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: Gtag;
  }
}

/**
 * Loads Google Analytics after the page has finished loading and the browser is idle, so the
 * ~180 KB tag never competes with the page's own files. Page views are recorded as before.
 */
export const loadAnalytics = () => {
  const start = () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag.js expects the arguments object itself, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  };
  const whenIdle = () => ("requestIdleCallback" in window ? window.requestIdleCallback(start, { timeout: 3000 }) : setTimeout(start, 1500));
  if (document.readyState === "complete") whenIdle();
  else window.addEventListener("load", whenIdle, { once: true });
};
