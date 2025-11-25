import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import syndesysLogo from "../assets/Syndesys.svg";
import type { NavItem, Service } from "../data/siteContent";

interface NavbarProps {
  activeId: string; // no longer really needed, but kept for now
  navItems: NavItem[];
  services: Service[];
}

export function Navbar({ navItems, services }: NavbarProps) {
  const [servicesOpen, setServicesOpen] = useState(false); // desktop dropdown
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false); // mobile Services sub-menu
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const location = useLocation();
  const { pathname, hash } = location;

  const openDesktopServices = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setServicesOpen(true);
  };

  const closeDesktopServices = () => {
    closeTimeout.current = setTimeout(() => {
      setServicesOpen(false);
    }, 500);
  };

  // Helper: compute active state from URL
  const isItemActive = (id: string) => {
    if (id === "home") {
      // Active on root with no hash or #home
      return pathname === "/" && (hash === "" || hash === "#home");
    }
    if (id === "services") {
      // Any /services route
      return pathname.startsWith("/services");
    }
    // Other sections (about, contact, etc.) based on hash
    return hash === `#${id}`;
  };

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        border-b border-slate-800
        bg-slate-950/80 backdrop-blur
        shadow-lg shadow-[0_0_25px_rgba(246,146,32,0.25)]
      "
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* Clean logo, no glow box */}
          <div className="relative bg-slate-950/90 p-1.5 rounded-xl">
            <img
              src={syndesysLogo}
              alt="Syndesys Logo"
              className="h-10 w-auto sm:h-12 md:h-16 transition-transform duration-300 hover:scale-105 hover:-translate-y-0.5"
            />
          </div>
          <span className="hidden sm:inline text-xl sm:text-2xl font-semibold tracking-[0.18em] uppercase text-slate-100">
            {/* Optional text next to logo */}
          </span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-sm md:text-base font-medium text-slate-200">
          {navItems.map((item) => {
            const isActive = isItemActive(item.id);

            if (item.id === "services") {
              return (
                <li
                  key={item.id}
                  className="relative"
                  onMouseEnter={openDesktopServices}
                  onMouseLeave={closeDesktopServices}
                >
                  <Link
                    to="/services"
                    className={`
                      relative flex items-center gap-1 px-1 py-1
                      transition-all duration-300
                      ${
                        isActive
                          ? "text-[#F69220]"
                          : "text-slate-200/80 hover:text-cyan-400"
                      }
                      after:absolute after:left-0 after:bottom-0 after:h-[2px]
                      after:bg-[#F69220] after:transition-all after:duration-300
                      ${
                        isActive
                          ? "after:w-full"
                          : "after:w-0 hover:after:w-full"
                      }
                      hover:-translate-y-0.5
                    `}
                  >
                    Services
                    <span className="text-xs">▾</span>
                  </Link>

                  {/* Desktop dropdown */}
                  <div
                    className={`
                      absolute right-0 mt-2 min-w-[260px]
                      rounded-xl border border-slate-800 bg-slate-950/95
                      shadow-xl shadow-[0_0_18px_rgba(246,146,32,0.25)]
                      ${
                        servicesOpen
                          ? "opacity-100 pointer-events-auto"
                          : "opacity-0 pointer-events-none"
                      }
                      transition-opacity duration-200
                    `}
                    onMouseEnter={openDesktopServices}
                    onMouseLeave={closeDesktopServices}
                  >
                    <div className="py-2">
                      <Link
                        to="/services"
                        className="
                          block px-4 py-2 text-xs uppercase tracking-[0.2em]
                          text-slate-500 hover:text-[#F69220]
                        "
                      >
                        All Services
                      </Link>

                      <div className="my-1 border-t border-slate-800" />

                      {services.map((svc) => (
                        <Link
                          key={svc.id}
                          to={`/services/${svc.slug}`}
                          className="
                            block px-4 py-2 text-sm
                            text-slate-200
                            hover:bg-slate-900 hover:text-[#F69220]
                            transition-colors
                          "
                        >
                          {svc.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              );
            }

            const to = item.id === "home" ? "/" : `/#${item.id}`;

            return (
              <li key={item.id}>
                <Link
                  to={to}
                  className={`
                    relative flex items-center px-1 py-1
                    transition-all duration-300
                    ${
                      isActive
                        ? "text-[#F69220]"
                        : "text-slate-200/80 hover:text-cyan-400"
                    }
                    after:absolute after:left-0 after:bottom-0 after:h-[2px]
                    after:bg-[#F69220] after:transition-all after:duration-300
                    ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
                    hover:-translate-y-0.5
                  `}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger button */}
        <button
          type="button"
          className="
            md:hidden inline-flex items-center justify-center
            rounded-md border border-slate-700 px-2.5 py-2
            text-slate-200 bg-slate-950/80
            hover:bg-slate-800 transition group
          "
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Open main menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-slate-200 group-hover:bg-[#F69220]" />
            <span className="block h-0.5 w-5 bg-slate-200 group-hover:bg-[#F69220]" />
            <span className="block h-0.5 w-5 bg-slate-200 group-hover:bg-[#F69220]" />
          </div>
        </button>
      </nav>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 space-y-2 text-sm font-medium text-slate-200">
            {navItems.map((item) => {
              if (item.id === "services") {
                return (
                  <div key={item.id} className="border-b border-slate-800 pb-2">
                    <button
                      type="button"
                      className="
                        w-full flex items-center justify-between py-2 text-left
                        hover:text-[#F69220]
                      "
                      onClick={() =>
                        setMobileServicesOpen((prev) => !prev)
                      }
                    >
                      <span>Services</span>
                      <span className="text-xs">
                        {mobileServicesOpen ? "▴" : "▾"}
                      </span>
                    </button>

                    {mobileServicesOpen && (
                      <div className="mt-1 pl-3 space-y-1">
                        <Link
                          to="/services"
                          className="
                            block py-1 text-slate-300
                            hover:text-[#F69220]
                          "
                          onClick={() => setMobileOpen(false)}
                        >
                          All Services
                        </Link>
                        {services.map((svc) => (
                          <Link
                            key={svc.id}
                            to={`/services/${svc.slug}`}
                            className="
                              block py-1 text-slate-300
                              hover:text-[#F69220]
                            "
                            onClick={() => setMobileOpen(false)}
                          >
                            {svc.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const to = item.id === "home" ? "/" : `/#${item.id}`;
              const isActive = isItemActive(item.id);

              return (
                <div
                  key={item.id}
                  className="border-b border-slate-800 last:border-b-0"
                >
                  <Link
                    to={to}
                    className={`
                      block py-2
                      ${isActive ? "text-[#F69220]" : "text-slate-200"}
                      hover:text-[#F69220]
                    `}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
