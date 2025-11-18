// src/components/sections/ServiceDetailsSection.tsx
import type { Service } from "../../data/siteContent";

interface ServiceDetailsSectionProps {
  services: Service[];
}

export function ServiceDetailsSection({
  services,
}: ServiceDetailsSectionProps) {
  return (
    <>
      {services.map((svc) => (
        <section
          key={svc.id}
          id={svc.id}
          className="mx-auto max-w-5xl px-4 py-20 scroll-mt-28 border-t border-slate-800/60"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300 mb-2">
            {svc.title}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            {svc.title}
          </h2>
          <p className="text-slate-300 max-w-3xl mb-4">{svc.description}</p>
          <p className="text-slate-400 text-sm max-w-3xl">
            Additional details about {svc.title} can go here – case studies,
            technology stacks, engagement models, and how Syndesys supports your
            team from strategy through implementation.
          </p>
        </section>
      ))}
    </>
  );
}
