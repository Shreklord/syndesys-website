import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../libs/supabaseClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Job = {
  id: string;
  title: string;
  location: string | null;
  description: string;
  is_active: boolean;
  image_url: string | null;
  image_alt: string | null;
  created_at: string;
  job_details: string | null;
  payrate: string | null;
};

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!id) return;

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .single();

      if (!isMounted) return;

      if (error || !data) {
        console.error(error);
        navigate("/careers");
        return;
      }

      setJob(data as Job);
      setLoading(false);
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24">
        <p className="text-slate-400 text-sm">Loading job…</p>
      </section>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <section className="w-full">
      {/* Hero */}
      <div className="relative w-full h-[260px] md:h-[340px] mb-12 overflow-hidden">
        {job.image_url ? (
          <img
            src={job.image_url}
            alt={job.image_alt || job.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950" />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/90" />

        <div className="relative h-full flex flex-col justify-center px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300 mb-2">
            Careers
          </p>
          <h1 className="text-3xl md:text-4xl font-bold">
            {job.title}
          </h1>
          <p className="text-slate-300 mt-2">
            {job.location || "Location flexible"}
          </p>
          {job.payrate && (
            <p className="text-sm text-slate-300 mt-1">
              Pay Rate: {job.payrate}
            </p>
          )}
          <p className="text-xs text-slate-400 mt-2">
            Posted {new Date(job.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 pb-24">
        <p className="text-lg text-slate-200 mb-6">
          {job.description}
        </p>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8" />

        {job.job_details && (
          <div className="text-slate-100 leading-relaxed mb-10">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h2 className="text-2xl font-semibold mb-4" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h4 className="text-lg font-semibold mt-4 mb-2" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-6 space-y-1 mb-4" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal pl-6 space-y-1 mb-4" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="mb-1" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="mb-3" {...props} />
                ),
              }}
            >
              {job.job_details}
            </ReactMarkdown>
          </div>
        )}

        <div className="flex gap-4">
          <Link
            to="/careers"
            className="text-sm text-slate-400 hover:text-cyan-300 transition-colors"
          >
            ← Back to Careers
          </Link>

          <Link
            to="/#contact"
            className="ml-auto inline-flex items-center rounded-full border border-cyan-400 px-6 py-2
                       text-sm font-medium text-cyan-300
                       hover:bg-cyan-400/10 hover:text-cyan-200
                       transition-all duration-300 hover:-translate-y-0.5"
          >
            Apply / Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
