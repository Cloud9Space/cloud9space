import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Home from "./pages/Home";

const CapabilityPage = lazy(() => import("./pages/CapabilityPage"));
const IndustriesPage = lazy(() => import("./pages/IndustriesPage"));
const WorkPage = lazy(() => import("./pages/WorkPage"));
const InsightsPage = lazy(() => import("./pages/InsightsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Old static-site URLs that may still be linked or indexed. */
const legacyRedirects: [string, string][] = [
  ["/index.html", "/"],
  ["/about.html", "/about"],
  ["/services.html", "/#capabilities"],
  ["/contact.html", "/contact"],
  ["/project.html", "/work"],
  ["/our-products.html", "/work"],
  ["/geo-spatial-microplanning-project-details.html", "/work#microplanning"],
  ["/real_estate.html", "/work#terrain-analytics"],
  ["/privacy-notice.html", "/privacy"],
  ["/terms-of-use.html", "/terms"],
];

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<CapabilityPage slug="ai" />} />
        <Route path="/data-engineering" element={<CapabilityPage slug="data" />} />
        <Route path="/geospatial" element={<CapabilityPage slug="geospatial" />} />
        <Route path="/software-engineering" element={<CapabilityPage slug="software" />} />
        <Route path="/cloud" element={<CapabilityPage slug="cloud" />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<LegalPage path="/privacy" />} />
        <Route path="/terms" element={<LegalPage path="/terms" />} />
        {legacyRedirects.map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
