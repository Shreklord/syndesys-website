// src/components/Navbar.tsx
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import syndesysLogo from "../assets/Syndesys.png";
import type { NavItem, Service } from "../data/siteContent";

interface NavbarProps {
  activeId: string;
  navItems: NavItem[];
  services: Service[];
}

export function Navbar({ activeId, navItems, services }: NavbarProps) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setServicesOpen(true);
  };

  const closeMenu = () => {
    closeTimeout.current = setTimeout(() => {
      setServicesOpen(false);
    }, 500);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo + Name */}
        <div className="flex items-center gap-4">
          <img
            src={syndesysLogo}
            alt="Syndesys Logo"
            className="h-16 w-auto drop-shadow-xl transition-transform duration-300 hover:scale-105 hover:-translate-y-0.5"
          />
          <span className="text-2xl font-semibold tracking-[0.18em] uppercase text-slate-100"></span>
        </div>

        {/* Nav */}
        <ul className="flex gap-8 text-sm md:text-base font-medium text-slate-200">
          {navItems.map((item) => {
            const isActive = activeId === item.id;

            if (item.id === "services") {
              return (
                <li
                  key={item.id}
                  className="relative"
                  onMouseEnter={openMenu}
                  onMouseLeave={closeMenu}
                >
                  <Link
                    to="/services"
                    className={`relative flex items-center gap-1 px-1 py-1 transition-all duration-300
                      ${
                        isActive
                          ? "text-cyan-400"
                          : "text-slate-200/80 hover:text-cyan-400"
                      }
                      after:absolute after:left-0 after:bottom-0 after:h-[2px]
                      after:bg-cyan-400 after:transition-all after:duration-300
                      ${
                        isActive
                          ? "after:w-full"
                          : "after:w-0 hover:after:w-full"
                      }
                      hover:-translate-y-0.5`}
                  >
                    Services
                    <span className="text-xs">▾</span>
                  </Link>

                  <div
                    className={`absolute right-0 mt-2 min-w-[260px] rounded-xl border border-slate-800 bg-slate-950/95 shadow-xl
                      ${
                        servicesOpen
                          ? "opacity-100 pointer-events-auto"
                          : "opacity-0 pointer-events-none"
                      }
                      transition-opacity duration-200`}
                    onMouseEnter={openMenu}
                    onMouseLeave={closeMenu}
                  >
                    <div className="py-2">
                      <Link
                        to="/services"
                        className="block px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-500 hover:text-cyan-400"
                      >
                        All Services
                      </Link>

                      <div className="my-1 border-t border-slate-800" />

                      {services.map((svc) => (
                        <Link
                          key={svc.id}
                          to={`/services/${svc.slug}`}
                          className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-900 hover:text-cyan-300 transition-colors"
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
                  className={`relative flex items-center px-1 py-1 transition-all duration-300
                    ${
                      isActive
                        ? "text-cyan-400"
                        : "text-slate-200/80 hover:text-cyan-400"
                    }
                    after:absolute after:left-0 after:bottom-0 after:h-[2px]
                    after:bg-cyan-400 after:transition-all after:duration-300
                    ${
                      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                    }
                    hover:-translate-y-0.5`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
