import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollManager } from "@/components/kit/ScrollManager";

export const Layout = () => (
  <>
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
    >
      Skip to content
    </a>
    <ScrollManager />
    <Header />
    <main id="main" tabIndex={-1} className="outline-none">
      <Suspense fallback={<div className="min-h-screen bg-background" aria-busy="true" />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </>
);
