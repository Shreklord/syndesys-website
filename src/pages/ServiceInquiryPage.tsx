// src/pages/ServiceInquiryPage.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import type { Service } from "../data/siteContent";
import { useMemo } from "react";

interface ServiceInquiryPageProps {
  services: Service[];
}

export function ServiceInquiryPage({ services }: ServiceInquiryPageProps) {
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
    <section className="mx-auto max-w-5xl px-4 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300 mb-2">
        Service Inquiry
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold mb-2">
        Start a Conversation About {service.title}
      </h1>
      <p className="text-slate-300 max-w-3xl mb-6">
        Tell us a bit about your needs around{" "}
        <span className="font-semibold">{service.title}</span>, and we&apos;ll
        follow up with you shortly.
      </p>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 mb-8">
        <form
          action="https://formsubmit.co/Anthonygoldhammer03@gmail.com"
          method="POST"
          className="grid gap-4 md:grid-cols-2 md:gap-6"
        >
          {/* FormSubmit hidden configuration */}
          <input
            type="hidden"
            name="_subject"
            value={`New Inquiry about ${service.title}`}
          />
          <input type="hidden" name="_template" value="box" />
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_next"
            value="http://localhost:5173/thank-you"
          />

          {/* Pass service name as a field */}
          <input type="hidden" name="service" value={service.title} />

          <div className="md:col-span-1">
            <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              required
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">
              Company
            </label>
            <input
              type="text"
              name="company"
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">
              Message
            </label>
            <textarea
              name="message"
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-100 h-32 resize-none focus:outline-none focus:ring-1 focus:ring-cyan-400"
              placeholder={`Tell us a bit about what you're trying to do with ${service.title}...`}
              required
            />
          </div>

          <div className="md:col-span-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center rounded-full border border-cyan-400 px-6 py-2 
                         text-sm font-medium text-cyan-300 
                         hover:bg-cyan-400/10 hover:text-cyan-200
                         transition-all duration-300 hover:-translate-y-0.5"
            >
              Submit Inquiry
            </button>
            <span className="text-xs text-slate-500">
              Your message will be sent directly to{" "}
              <span className="font-mono text-slate-300">
                info@syndesys.com
              </span>
              .
            </span>
          </div>
        </form>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center text-sm text-slate-400 hover:text-cyan-300 transition-colors"
        >
          ← Back to {service.title}
        </Link>
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
