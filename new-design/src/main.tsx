import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import App from "./App.tsx";
import { loadAnalytics } from "./lib/analytics";
import "./index.css";

const root = document.getElementById("root")!;
// Built pages arrive with their HTML already rendered (scripts/prerender.mjs); in dev the root is empty.
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);

if (import.meta.env.PROD) loadAnalytics();
