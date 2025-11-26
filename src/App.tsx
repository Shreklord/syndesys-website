// src/App.tsx
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";

import { useEffect, useState } from "react";
import "./index.css";

import { navItems, services } from "./data/siteContent";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { ServiceInquiryPage } from "./pages/ServiceInquiryPage";
import { ThankYouPage } from "./pages/ThankYouPage";

// ✅ New public pages
import { BlogPage } from "./pages/BlogPage";
import { CareersPage } from "./pages/CareersPage";

// 🔐 Admin imports
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { RequireAdmin } from "./components/RequireAdmin";

function AppShell() {
  const [activeId, setActiveId] = useState<string>("home");
  const location = useLocation();

  // 🔥 Set active navbar item based on route
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveId("home");
    } else if (location.pathname.startsWith("/services")) {
      setActiveId("services");
    } else if (location.pathname.startsWith("/blog")) {
      setActiveId("blog");
    } else if (location.pathname.startsWith("/careers")) {
      setActiveId("careers");
    } else if (location.pathname.startsWith("/thank-you")) {
      setActiveId(""); // nothing highlighted
    } else {
      setActiveId("home");
    }
  }, [location.pathname]);

  // 🔥 Scroll to hash sections on home page
  useEffect(() => {
    if (location.pathname !== "/") return;

    const hash = location.hash;

    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = hash.replace("#", "");
    const el = document.getElementById(id);

    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <Navbar activeId={activeId} navItems={navItems} services={services} />

      <main className="flex-grow pt-28">
        <Routes>
          {/* Public site */}
          <Route path="/" element={<HomePage services={services} />} />

          <Route
            path="/services"
            element={<ServicesPage services={services} />}
          />

          <Route
            path="/services/:slug"
            element={<ServiceDetailPage services={services} />}
          />

          <Route
            path="/services/:slug/inquiry"
            element={<ServiceInquiryPage services={services} />}
          />

          {/* ✅ New public pages */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/careers" element={<CareersPage />} />

          <Route path="/thank-you" element={<ThankYouPage />} />

          {/* 🔐 Admin auth routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* 🔐 Protected admin area */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminDashboardPage />
              </RequireAdmin>
            }
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
