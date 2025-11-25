import { useParams, Link, useNavigate } from "react-router-dom";
import type { Service } from "../data/siteContent";
import { useMemo } from "react";

interface ServiceDetailPageProps {
  services: Service[];
}

export function ServiceDetailPage({ services }: ServiceDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const service = useMemo(
    () => services.find((s) => s.slug === slug),
    [services, slug]
  );

  if (!service) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          Service Not Found
        </h1>
        <p className="text-slate-300 mb-6">
          We couldn&apos;t find the service you were looking for.
        </p>
        <button
          onClick={() => navigate("/services")}
          className="inline-flex items-center rounded-full border border-cyan-400 px-6 py-2 
                     text-sm font-medium text-cyan-300 
                     hover:bg-cyan-400/10 hover:text-cyan-200
                     transition-all duration-300 hover:-translate-y-0.5"
        >
          Back to All Services
        </button>
      </section>
    );
  }

  return (
    <section className="w-full">

      {/* 🔥 Banner Hero Section */}
      <div
        className="relative w-full h-[280px] md:h-[360px] mb-12 rounded-xl overflow-hidden"
      >
        {/* Banner Background */}
        <img
          src={service.bannerImage}
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b 
                        from-black/40 via-black/60 to-black/80" />

        {/* Banner Text */}
        <div className="relative h-full flex flex-col justify-center px-6 md:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300 mb-2">
            Service
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            {service.title}
          </h1>
        </div>
      </div>

      {/* 🔹 Body Content */}
      <div className="mx-auto max-w-4xl px-4">
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          {service.longDescription}
        </p>

        <p className="text-slate-400 text-sm max-w-3xl mb-10">
          If this sounds like the kind of initiative you&apos;re working on,
          we&apos;d love to learn more about your environment and goals.
        </p>

        {/* CTA Button */}
        <div className="mb-10">
          <Link
            to={`/services/${service.slug}/inquiry`}
            className="inline-flex items-center rounded-full border border-cyan-400 px-6 py-2 
                     text-sm font-medium text-cyan-300 
                     hover:bg-cyan-400/10 hover:text-cyan-200
                     transition-all duration-300 hover:-translate-y-0.5"
          >
            Start a Conversation About {service.title}
          </Link>
        </div>

        <Link
          to="/services"
          className="inline-flex items-center text-sm text-slate-400 hover:text-cyan-300 transition-colors"
        >
          ← Back to All Services
        </Link>
      </div>
    </section>
  );
}
