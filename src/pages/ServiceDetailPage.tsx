// src/pages/ServiceDetailPage.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import type { Service } from "../data/siteContent";
import { useMemo, useState } from "react";

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

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const to = "info@syndesys.com";
    const subject = `Inquiry about ${service.title}`;
    const body = [
      `Service: ${service.title}`,
      "",
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");

    window.location.href = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300 mb-2">
        Service
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold mb-4">
        {service.title}
      </h1>
      <p className="text-slate-300 max-w-3xl mb-4">{service.longDescription}</p>
      <p className="text-slate-400 text-sm max-w-3xl mb-10">
        If this sounds like the kind of initiative you&apos;re working on,
        we&apos;d love to learn more about your environment and goals.
      </p>

      {/* Contact form */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          Start a conversation about {service.title}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 md:grid-cols-2 md:gap-6"
        >
          <div className="md:col-span-1">
            <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">
              Company
            </label>
            <input
              type="text"
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">
              Message
            </label>
            <textarea
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-100 h-32 resize-none focus:outline-none focus:ring-1 focus:ring-cyan-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
              Email Syndesys
            </button>
            <span className="text-xs text-slate-500">
              This will open your email client with a pre-filled message to{" "}
              <span className="font-mono text-slate-300">
                info@syndesys.com
              </span>
              .
            </span>
          </div>
        </form>
      </div>

      <Link
        to="/services"
        className="inline-flex items-center text-sm text-slate-400 hover:text-cyan-300 transition-colors"
      >
        ← Back to All Services
      </Link>
    </section>
  );
}
