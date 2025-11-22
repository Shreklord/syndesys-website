import syndesysLogo from "../../assets/Syndesys.png";
import { useMemo, useEffect, useRef, useState } from "react";

// Small hook to handle fade-in when scrolled into view
function useFadeInOnScroll() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // only animate once
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export function HomeSection() {
  const columns = useMemo(() => Array.from({ length: 80 }), []);
  const rows = useMemo(() => Array.from({ length: 26 }), []);

  const { ref, visible } = useFadeInOnScroll();

  return (
    <section
      id="home"
      className="relative overflow-hidden flex items-start px-4 pt-20 pb-24 scroll-mt-28"
    >
      {/* Blue animated background code */}
      <div className="home-code-bg">
        <div className="flex h-full w-full justify-center gap-3">
          {columns.map((_, colIdx) => (
            <div key={colIdx} className="home-code-column">
              {rows.map((_, rowIdx) => {
                const charCode = 0x2588;

                // MUCH SLOWER animations
                const duration =
                  4 + (colIdx % 6) * 0.8 + (rowIdx % 4) * 0.4;

                const delay =
                  (rowIdx * 0.25 + colIdx * 0.1) % 6;

                return (
                  <span
                    key={rowIdx}
                    className="home-code-char"
                    style={{
                      animationDuration: `${duration}s`,
                      animationDelay: `${delay}s`,
                    }}
                  >
                    {String.fromCharCode(charCode)}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Actual Home Section Content */}
      <div
        ref={ref}
        className={`relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12 md:flex-row md:items-start
          transition-all duration-700 ease-out
          ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
      >
        {/* Left Column */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Who We Are.
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Fully managed solutions for{" "}
              <span className="text-cyan-300">
                seamless customer experiences.
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              With 30 years of industry experience and being at the forefront of
              technology innovation we provide fully managed solutions for
              seamless customer experiences...
            </p>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Our core competencies cover network and cloud environments...
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#about"
              className="inline-flex items-center rounded-full border border-slate-600 px-6 py-2 
                text-sm font-medium text-slate-200 
                hover:border-cyan-400 hover:text-cyan-200 hover:bg-cyan-400/10
                transition-all duration-300 hover:-translate-y-0.5"
            >
              Read More
            </a>

            <a
              href="#services"
              className="inline-flex items-center rounded-full border border-cyan-400 px-6 py-2 
                text-sm font-medium text-cyan-300 
                hover:bg-cyan-400/10 hover:text-cyan-200
                transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
            >
              Our Services
            </a>
          </div>

          {/* CTA Box */}
          <div className="space-y-6 pt-6">
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-semibold">
                Services We Provide
              </h2>
              <p className="text-sm md:text-base text-slate-300 max-w-xl">
                We have designed, integrated and maintained networks for the
                largest communications service providers in North America.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  Let&apos;s talk about your project
                </h3>
                <p className="text-sm text-slate-300">
                  Tell us where you are in your network and automation journey...
                </p>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center justify-center
                  rounded-full border border-cyan-400
                  px-8 py-2.5 min-w-[150px]
                  text-sm font-medium text-cyan-300 mt-2 md:mt-0
                  hover:bg-cyan-400/10 hover:text-cyan-200
                  transition-all duration-300 hover:-translate-y-0.5"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Right Column — Bigger Logo */}
        <div className="flex-1 flex justify-center md:justify-end mt-5 md:mt-50">
          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-cyan-500/10 blur-3xl" />
            <img
              src={syndesysLogo}
              alt="Syndesys Logo"
              className="relative w-[110px] md:w-[420px] lg:w-[31rem] h-auto drop-shadow-2xl
                transition-transform duration-700 hover:scale-105 hover:-translate-y-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
