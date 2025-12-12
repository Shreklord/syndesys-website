import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../libs/supabaseClient";

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

export function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (!isMounted) return;

      if (error) {
        console.error(error);
        setError(error.message);
      } else {
        setJobs((data || []) as Job[]);
      }
      setLoading(false);
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-4 py-24">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold mb-3">
          Careers
        </h1>
        <p className="text-slate-300">
          Join Syndesys and help build modern network and OSS/BSS solutions.
        </p>
      </header>

      {loading && (
        <p className="text-slate-400 text-sm">Loading openings…</p>
      )}
      {error && (
        <p className="text-red-400 text-sm mb-4">
          Error loading jobs: {error}
        </p>
      )}

      {jobs.length === 0 && !loading ? (
        <p className="text-slate-400 text-sm">
          We don&apos;t have any open roles right now. Check back soon.
        </p>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <Link
              key={job.id}
              to={`/careers/${job.id}`}
              className="block rounded-xl border border-slate-700 bg-slate-900/60 p-5
                         hover:border-cyan-400/70 hover:bg-slate-900 transition-colors"
            >
              <article className="flex flex-col md:flex-row gap-4">
                {job.image_url && (
                  <div className="md:w-40 flex-shrink-0">
                    <img
                      src={job.image_url}
                      alt={job.image_alt || job.title}
                      className="w-full h-24 md:h-24 object-cover rounded-lg border border-slate-700"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">
                    {job.title}
                  </h2>
                  <p className="text-sm text-slate-300 mb-1">
                    {job.location || "Location flexible"}
                  </p>
                  {job.payrate && (
                    <p className="text-xs text-slate-300 mb-1">
                      Pay: {job.payrate}
                    </p>
                  )}
                  <p className="text-xs text-slate-400 mb-2">
                    Posted {new Date(job.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-slate-200 line-clamp-3">
                    {job.description}
                  </p>
                  <p className="mt-2 text-xs text-cyan-300">
                    View role →
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
