// src/pages/ThankYouPage.tsx
import { Link } from "react-router-dom";

export function ThankYouPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 flex flex-col items-center text-center">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-8 py-10 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300 mb-3">
          Thank You
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-slate-100">
          We&apos;ve received your message.
        </h1>
        <p className="text-slate-300 mb-6 max-w-xl">
          Someone from the Syndesys team will review your inquiry and get back
          to you shortly. We appreciate you taking the time to reach out.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-cyan-400 px-6 py-2 
                       text-sm font-medium text-cyan-300 
                       hover:bg-cyan-400/10 hover:text-cyan-200
                       transition-all duration-300 hover:-translate-y-0.5"
          >
            Back to Home
          </Link>

          <Link
            to="/services"
            className="inline-flex items-center rounded-full border border-slate-600 px-6 py-2 
                       text-sm font-medium text-slate-200 
                       hover:border-cyan-400 hover:text-cyan-200 hover:bg-cyan-400/10
                       transition-all duration-300 hover:-translate-y-0.5"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}
