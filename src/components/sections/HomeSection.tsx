// src/components/sections/HomeSection.tsx
import syndesysLogo from "../../assets/Syndesys.png";

export function HomeSection() {
  return (
    <section
      id="home"
      className="min-h-[calc(100vh-7rem)] flex items-center px-4 py-16 scroll-mt-28"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 md:flex-row md:items-center">
        {/* Left Column: Text */}
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
              seamless customer experiences. Our extensive knowledge of
              telecommunications and network infrastructure allows us to stay
              ahead of the curve and be the industry leaders in our space. As a
              preferred partner we help our customers navigate the
              transformation journey and rapid adoption of digital technologies,
              network modernization, system integration and paths to automation.
            </p>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Our core competencies cover network and cloud environments along
              with virtualization and management applications that support your
              network throughout the entire lifecycle. We leverage highly
              qualified employees, advanced automation, analytics and AI to
              ensure reliable and intelligent network design and operation.
            </p>
          </div>

          {/* Buttons row */}
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

          {/* Services We Provide + CTA */}
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
                  Tell us where you are in your network and automation journey,
                  and we&apos;ll help you map the next steps.
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

        {/* Right Column: Logo / visual */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-cyan-500/10 blur-3xl" />
            <img
              src={syndesysLogo}
              alt="Syndesys Logo"
              className="relative w-72 md:w-96 lg:w-[28rem] h-auto drop-shadow-2xl
                         transition-transform duration-700 hover:scale-105 hover:-translate-y-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
