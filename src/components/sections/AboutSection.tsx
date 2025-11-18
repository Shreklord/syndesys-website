// src/components/sections/AboutSection.tsx
export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-24 scroll-mt-28">
      {/* Section Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300 mb-2">
          About Us
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">
          Expand your mind, make a change
        </h2>
        <p className="text-slate-300 max-w-3xl">
          We help organizations anticipate and solve tomorrow’s business
          problems through practical, technology-driven transformation.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid gap-10 md:grid-cols-2 mb-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 mb-1">
            Our Vision
          </p>
          <h3 className="text-lg md:text-xl font-semibold mb-3">
            Forward Thinking
          </h3>
          <p className="text-slate-300">
            To anticipate future business challenges and design solutions that
            solve them today.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 mb-1">
            Our Mission
          </p>
          <h3 className="text-lg md:text-xl font-semibold mb-3">
            Transform Through Innovation
          </h3>
          <p className="text-slate-300">
            To amaze our customers by foreseeing operational issues and creating
            technology solutions that make their businesses easier to run.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 mb-1">
          Our Values
        </p>
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          What Drives Us
        </h3>

        <div className="grid gap-6 md:grid-cols-3 text-sm text-slate-300">
          <div className="space-y-1">
            <p className="font-semibold text-slate-100">Customer Trust</p>
            <p>
              We innovate with purpose and take pride in solving real customer
              challenges.
            </p>
          </div>

          <div className="space-y-1">
            <p className="font-semibold text-slate-100">
              Continuous Improvement
            </p>
            <p>
              We focus on collaboration, learning, and long-term relationships.
            </p>
          </div>

          <div className="space-y-1">
            <p className="font-semibold text-slate-100">Integrity First</p>
            <p>
              We deliver on commitments with honesty, fairness, and
              transparency.
            </p>
          </div>
        </div>
      </div>

      {/* Approach */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 mb-1">
          Our Approach
        </p>
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          How We Help Clients Succeed
        </h3>

        <div className="space-y-6 text-sm text-slate-300">
          <div>
            <p className="font-semibold text-slate-100 mb-1">People Focus</p>
            <p>
              Our team includes experienced industry professionals with deep
              knowledge of service provider networks and infrastructure.
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-100 mb-1">
              Consortium Approach
            </p>
            <p>
              Instead of pushing in-house products, we partner with
              best-of-breed technology providers to deliver the right solution
              for each client.
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-100 mb-1">Industry Focus</p>
            <p>
              Digital transformation means something different to every
              organization—our work prioritizes efficiency, new business models,
              and measurable impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
