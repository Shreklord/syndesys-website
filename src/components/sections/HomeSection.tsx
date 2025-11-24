import syndesysLogo from "../../assets/Syndesys.svg";
import { useEffect, useRef, useState } from "react";

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
          observer.disconnect();
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
  const { ref, visible } = useFadeInOnScroll();

  return (
    <section
      id="home"
      className="relative overflow-hidden flex items-start px-4 pt-24 pb-12 scroll-mt-28"
    >
      <div
        ref={ref}
        className={`
          relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center gap-10
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        {/* Logo — Bigger + Blue Glow + Slower Fade */}
        <div
          className={`
            transition-all duration-[2500ms] ease-out
            ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}
          `}
          style={{ transitionDelay: visible ? "200ms" : "0ms" }}
        >
          <div className="relative mx-auto mb-2">
            {/* Blue glow */}
            <div className="absolute -inset-12 rounded-full bg-cyan-500/25 blur-[85px]" />

            <img
              src={syndesysLogo}
              alt="Syndesys Logo"
              className="relative w-72 md:w-[26rem] lg:w-[30rem] h-auto 
                drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]
                transition-transform duration-700 hover:scale-105 hover:-translate-y-1"
            />
          </div>
        </div>

        {/* Section Label */}
        <div
          className={`
            transition-all duration-[900ms] ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          style={{ transitionDelay: visible ? "350ms" : "0ms" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Who We Are.
          </p>
        </div>

        {/* Headline */}
        <div
          className={`
            transition-all duration-[900ms] ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          style={{ transitionDelay: visible ? "500ms" : "0ms" }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-100">
            Fully managed solutions for{" "}
            <span className="text-cyan-300">
              seamless customer experiences.
            </span>
          </h1>
        </div>

        {/* Paragraphs */}
        <div
          className={`
            space-y-4 max-w-2xl
            transition-all duration-[900ms] ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          style={{ transitionDelay: visible ? "650ms" : "0ms" }}
        >
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            With 30 years of industry experience and being at the forefront of
            technology innovation we provide fully managed solutions for seamless
            customer experiences...
          </p>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Our core competencies cover network and cloud environments along with
            virtualization and management applications that support your network
            throughout the entire lifecycle. We leverage highly qualified employees,
            advanced automation, analytics and AI to ensure reliable and intelligent
            network design and operation.
          </p>
        </div>

        {/* Buttons */}
        <div
          className={`
            flex flex-wrap gap-4 justify-center
            transition-all duration-[900ms] ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          style={{ transitionDelay: visible ? "800ms" : "0ms" }}
        >
          <a
            href="#about"
            className="inline-flex items-center rounded-full border border-slate-600 px-6 py-2 
              text-sm font-medium text-slate-200 
              hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10
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
        <div
          className={`
            w-full
            transition-all duration-[900ms] ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          style={{ transitionDelay: visible ? "950ms" : "0ms" }}
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 flex flex-col items-center gap-4 text-center">
            <h3 className="text-lg font-semibold text-cyan-300">
              Let&apos;s talk about your project
            </h3>
            <p className="text-sm text-slate-300 max-w-md">
              Tell us where you are in your network and automation journey...
            </p>

            <a
              href="#contact"
              className="inline-flex items-center justify-center
                rounded-full border border-cyan-400
                px-8 py-2.5 min-w-[150px]
                text-sm font-medium text-cyan-300
                hover:bg-cyan-400/10 hover:text-cyan-200
                transition-all duration-300 hover:-translate-y-0.5"
            >
              Contact Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
