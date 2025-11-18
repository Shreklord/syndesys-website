// src/App.tsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";

import { useEffect, useState } from "react";
import "./index.css";

import { navItems, services } from "./data/siteContent";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";

function AppShell() {
  const [activeId, setActiveId] = useState<string>("home");
  const location = useLocation();

  // Set active nav based on route
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveId("home");
    } else if (location.pathname.startsWith("/services")) {
      setActiveId("services");
    } else {
      setActiveId("home");
    }
  }, [location.pathname]);

  // 🔥 Scroll to sections on the home page when hash changes (/#about, /#contact)
  useEffect(() => {
    if (location.pathname !== "/") return;

    const hash = location.hash;

    if (!hash) {
      // No hash → optional: scroll to top when just going to "/"
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = hash.replace("#", "");
    const el = document.getElementById(id);

    if (el) {
      // Offset for fixed navbar (~100px)
      const y = el.getBoundingClientRect().top + window.scrollY - 100;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <Navbar activeId={activeId} navItems={navItems} services={services} />

      <main className="flex-grow pt-28">
        <Routes>
          <Route path="/" element={<HomePage services={services} />} />
          <Route
            path="/services"
            element={<ServicesPage services={services} />}
          />
          <Route
            path="/services/:slug"
            element={<ServiceDetailPage services={services} />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppShell />
    </BrowserRouter>
  );
}
