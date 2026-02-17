import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../libs/supabaseClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  image_url: string | null; // hero image
  image_alt: string | null;
  created_at: string;
  description: string | null;
};

type PostImage = {
  id: string;
  post_id: string;
  image_url: string;
  image_alt: string | null;
  sort_order: number | null;
  created_at: string;
};

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [gallery, setGallery] = useState<PostImage[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // animation state for switching gallery images
  const [imgTransitioning, setImgTransitioning] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!slug) return;

      setLoading(true);

      // 1) Load post
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

      const loadedPost = data as Post;
      setPost(loadedPost);

      // 2) Load gallery images
      const { data: imgData, error: imgErr } = await supabase
        .from("post_images")
        .select("*")
        .eq("post_id", loadedPost.id)
        .order("sort_order", { ascending: true, nullsFirst: true })
        .order("created_at", { ascending: true });

      if (!isMounted) return;

      if (imgErr) {
        console.error(imgErr);
        setGallery([]);
        setActiveIndex(0);
      } else {
        const imgs = (imgData || []) as PostImage[];
        setGallery(imgs);
        setActiveIndex(0);
      }

      setLoading(false);
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [slug, navigate]);

  const hasGallery = gallery.length > 0;

  // Hero: prefer post.image_url; else fall back to first gallery image
  const heroImageUrl = useMemo(() => {
    if (post?.image_url) return post.image_url;
    if (gallery[0]?.image_url) return gallery[0].image_url;
    return null;
  }, [post?.image_url, gallery]);

  const heroAlt = post?.image_alt || post?.title || "Blog image";

  const selectedGalleryImage = useMemo(() => {
    if (!hasGallery) return null;
    return gallery[Math.min(activeIndex, gallery.length - 1)];
  }, [gallery, activeIndex, hasGallery]);

  const setIndexWithAnim = (nextIndex: number) => {
    if (!hasGallery) return;

    // start hidden -> swap -> animate in
    setImgTransitioning(true);
    setActiveIndex(nextIndex);

    // next frame: fade in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setImgTransitioning(false));
    });
  };

  const goPrev = () => {
    if (!hasGallery) return;
    setIndexWithAnim((activeIndex - 1 + gallery.length) % gallery.length);
  };

  const goNext = () => {
    if (!hasGallery) return;
    setIndexWithAnim((activeIndex + 1) % gallery.length);
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24">
        <p className="text-slate-400 text-sm">Loading post…</p>
      </section>
    );
  }

  if (!post) return null;

  return (
    <section className="w-full">
      {/* Hero */}
      <div className="relative w-full h-[260px] md:h-[340px] mb-12 overflow-hidden">
        {heroImageUrl ? (
          <img
            src={heroImageUrl}
            alt={heroAlt}
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{post.title}</h1>
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
        {/* Gallery */}
        {hasGallery && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                Gallery
              </p>
              <p className="text-xs text-slate-400">
                Image {activeIndex + 1} of {gallery.length}
              </p>
            </div>

            {/* Selected image frame */}
            {selectedGalleryImage && (
              <div className="group relative rounded-xl border border-slate-700 bg-slate-900/40 overflow-hidden">
                <img
                  key={selectedGalleryImage.id}
                  src={selectedGalleryImage.image_url}
                  alt={selectedGalleryImage.image_alt || post.title}
                  className={[
                    "w-full max-h-[420px] object-cover",
                    "transition-all duration-300 ease-out",
                    imgTransitioning
                      ? "opacity-0 scale-[0.99]"
                      : "opacity-100 scale-100",
                  ].join(" ")}
                />

                {/* subtle bottom overlay so arrows + caption read well */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* arrows INSIDE the image frame (center-bottom), fade in on hover */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="text-blue-600 hover:text-blue-500 transition-all duration-300 transform hover:scale-110 drop-shadow-[0_0_6px_rgba(37,99,235,0.6)]"
                    aria-label="Previous image"
                  >
                    <FaArrowCircleLeft size={38} />
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    className="text-blue-600 hover:text-blue-500 transition-all duration-300 transform hover:scale-110 drop-shadow-[0_0_6px_rgba(37,99,235,0.6)]"
                    aria-label="Next image"
                  >
                    <FaArrowCircleRight size={38} />
                  </button>
                </div>

                {/* caption */}
                {/* <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                  {selectedGalleryImage.image_alt && (
                    <p className="text-xs text-slate-100/90 drop-shadow">
                      {selectedGalleryImage.image_alt}
                    </p>
                  )}
                </div> */}
              </div>
            )}

            {/* Thumbnails (horizontal scroll) */}
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {gallery.map((img, idx) => {
                const active = idx === activeIndex;
                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setIndexWithAnim(idx)}
                    className={`shrink-0 rounded-lg border overflow-hidden ${
                      active
                        ? "border-cyan-400"
                        : "border-slate-700 hover:border-slate-500"
                    }`}
                    aria-label={`Select image ${idx + 1}`}
                  >
                    <img
                      src={img.image_url}
                      alt={img.image_alt || `Gallery image ${idx + 1}`}
                      className="h-20 w-28 object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

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
