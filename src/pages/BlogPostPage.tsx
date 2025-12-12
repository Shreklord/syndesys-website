import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../libs/supabaseClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  image_url: string | null;
  image_alt: string | null;
  created_at: string;
  description: string | null;
};

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!slug) return;

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (!isMounted) return;

      if (error || !data) {
        console.error(error);
        navigate("/blog");
        return;
      }

      setPost(data as Post);
      setLoading(false);
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [slug, navigate]);

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24">
        <p className="text-slate-400 text-sm">Loading post…</p>
      </section>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <section className="w-full">
      {/* Hero */}
      <div className="relative w-full h-[260px] md:h-[340px] mb-12 overflow-hidden">
        {post.image_url ? (
          <img
            src={post.image_url}
            alt={post.image_alt || post.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950" />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/90" />

        <div className="relative h-full flex flex-col justify-center px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300 mb-2">
            Blog
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {post.title}
          </h1>
          <p className="text-slate-300 text-sm">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
          {post.description && (
            <p className="mt-3 max-w-2xl text-slate-200 text-sm md:text-base">
              {post.description}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 pb-24">
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
                <p className="mb-4 leading-relaxed" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-6 space-y-1 mb-4" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-6 space-y-1 mb-4" {...props} />
              ),
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        <div className="mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm text-slate-400 hover:text-cyan-300 transition-colors"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>
    </section>
  );
}
