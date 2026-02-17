import { useParams, Link, useNavigate } from "react-router-dom";
import type { Service } from "../data/siteContent";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useFadeInOnScroll } from "./../hooks/fadeInOnScroll";

interface ServiceDetailPageProps {
  services: Service[];
}

export function ServiceDetailPage({ services }: ServiceDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { ref, visible } = useFadeInOnScroll();

  const service = useMemo(
    () => services.find((s) => s.slug === slug),
    [services, slug],
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
      <div className="relative w-full h-[280px] md:h-[360px] mb-12 rounded-xl overflow-hidden">
        <img
          src={service.bannerImage}
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

        <div className="relative h-full flex flex-col justify-center px-6 md:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300 mb-2">
            Service
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            {service.title}
          </h1>
          <p className="mt-3 max-w-3xl text-slate-200 text-sm md:text-base">
            {service.description}
          </p>
        </div>
      </div>

      {/* 🔹 Body Content (fade-in like About Us) */}
      <div
        ref={ref}
        className={`
          mx-auto max-w-4xl px-4 pb-24 relative
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        {/* Header block styled like About section */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300 mb-2">
            Overview
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            What we deliver for{" "}
            <span className="text-orange-400">{service.title}</span>
          </h2>
          <p className="text-slate-300 max-w-3xl">{service.about}</p>
        </div>

        {/* Markdown body (blog-style typography) */}
        <article className="prose prose-invert max-w-none prose-headings:scroll-mt-24">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h2 className="text-2xl font-semibold mt-8 mb-4" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h4 className="text-lg font-semibold mt-4 mb-2" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="mb-4 leading-relaxed text-slate-300" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc pl-6 space-y-1 mb-4 text-slate-300"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal pl-6 space-y-1 mb-4 text-slate-300"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              strong: ({ node, ...props }) => (
                <strong className="text-white font-semibold" {...props} />
              ),
            }}
          >
            {service.longDescription}
          </ReactMarkdown>
        </article>

        {/* Footer note (like About / consistent spacing) */}
        <p className="text-slate-400 text-sm max-w-3xl mt-10 mb-10"></p>

        {/* CTA Button
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
        </div> */}

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
