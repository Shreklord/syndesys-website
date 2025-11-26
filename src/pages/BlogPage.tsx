// src/pages/BlogPage.tsx
import { useEffect, useState } from "react";
import { supabase } from "../libs/supabaseClient";

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  image_url: string | null;
  image_alt: string | null;
  created_at: string;
};

export function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (!isMounted) return;

      if (error) {
        console.error(error);
        setError(error.message);
      } else {
        setPosts((data || []) as Post[]);
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
          Blog
        </h1>
        <p className="text-slate-300">
          Insights, updates, and perspectives from the Syndesys team.
        </p>
      </header>

      {loading && (
        <p className="text-slate-400 text-sm">Loading posts…</p>
      )}
      {error && (
        <p className="text-red-400 text-sm mb-4">
          Error loading posts: {error}
        </p>
      )}

      {posts.length === 0 && !loading ? (
        <p className="text-slate-400 text-sm">
          No blog posts are published yet. Check back soon.
        </p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-xl border border-slate-700 bg-slate-900/60 p-5 flex flex-col md:flex-row gap-4"
            >
              {post.image_url && (
                <div className="md:w-48 flex-shrink-0">
                  <img
                    src={post.image_url}
                    alt={post.image_alt || post.title}
                    className="w-full h-32 md:h-32 object-cover rounded-lg border border-slate-700"
                  />
                </div>
              )}

              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-1">
                  {post.title}
                </h2>
                <p className="text-xs text-slate-400 mb-2">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-slate-200 line-clamp-3">
                  {post.content}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
