// src/pages/AdminDashboardPage.tsx
import { useEffect, useState} from "react";
import type { FormEvent } from "react";
import { supabase } from "../libs/supabaseClient";
import { ImageDropzone } from "../components/ImageDropZone";


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

type Job = {
  id: string;
  title: string;
  location: string | null;
  description: string;
  is_active: boolean;
  image_url: string | null;
  image_alt: string | null;
  created_at: string;
};

type Tab = "posts" | "jobs";

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("posts");

  const handleLogout = () => {
    localStorage.removeItem("admin_authed");
    supabase.auth.signOut().finally(() => {
      window.location.href = "/";
    });
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm px-3 py-1 rounded-md border border-slate-500 hover:bg-slate-800"
        >
          Logout
        </button>
      </div>

      <p className="text-slate-300 mb-6">
        Manage blog posts and job listings for the public site.
      </p>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-700 mb-6">
        <button
          onClick={() => setActiveTab("posts")}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === "posts"
              ? "border-cyan-400 text-cyan-300"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === "jobs"
              ? "border-cyan-400 text-cyan-300"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Jobs
        </button>
      </div>

      {activeTab === "posts" ? <PostsManager /> : <JobsManager />}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*                             POSTS MANAGER                          */
/* ------------------------------------------------------------------ */

function PostsManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
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

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setContent("");
    setPublished(false);
    setImageUrl("");
    setImageAlt("");
    setError(null);
  };

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setContent(post.content);
    setPublished(post.published);
    setImageUrl(post.image_url || "");
    setImageAlt(post.image_alt || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      alert("Error deleting: " + error.message);
      return;
    }
    setPosts((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) resetForm();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (!title.trim() || !slug.trim()) {
        setError("Title and slug are required.");
        setSaving(false);
        return;
      }

      if (editingId) {
        // update
        const { data, error } = await supabase
          .from("posts")
          .update({
            title,
            slug,
            content,
            published,
            image_url: imageUrl || null,
            image_alt: imageAlt || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingId)
          .select("*")
          .single();

        if (error) throw error;

        setPosts((prev) =>
          prev.map((p) => (p.id === editingId ? (data as Post) : p))
        );
      } else {
        // insert
        const { data, error } = await supabase
          .from("posts")
          .insert({
            title,
            slug,
            content,
            published,
            image_url: imageUrl || null,
            image_alt: imageAlt || null,
          })
          .select("*")
          .single();

        if (error) throw error;
        setPosts((prev) => [data as Post, ...prev]);
      }

      resetForm();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error saving post.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Post" : "Add New Post"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input
                className="w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Slug</label>
              <input
                className="w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-sm"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Content</label>
            <textarea
              className="w-full min-h-[120px] rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
  <ImageDropzone
    label="Post Image"
    value={imageUrl}
    onChange={setImageUrl}
    bucket="public-assets"
    folder="post-images"
  />
  <div>
    <label className="block text-sm mb-1">Image Alt Text</label>
    <input
      className="w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-sm"
      value={imageAlt}
      onChange={(e) => setImageAlt(e.target.value)}
      placeholder="Short description for accessibility"
    />
  </div>
</div>


          <div className="flex items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
              <span>Published (visible on site)</span>
            </label>

            <div className="flex gap-2">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-3 py-2 text-sm rounded-md border border-slate-500 hover:bg-slate-800"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 text-sm rounded-md bg-cyan-500 text-slate-950 font-medium hover:bg-cyan-400 disabled:opacity-60"
              >
                {saving
                  ? editingId
                    ? "Saving…"
                    : "Adding…"
                  : editingId
                  ? "Save Changes"
                  : "Add Post"}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
        </form>
      </div>

      {/* List */}
      <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Existing Posts</h2>
          {loading && (
            <span className="text-xs text-slate-400">Loading…</span>
          )}
        </div>

        {posts.length === 0 && !loading ? (
          <p className="text-sm text-slate-400">No posts yet.</p>
        ) : (
          <ul className="space-y-3">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border border-slate-700 rounded-lg px-3 py-2"
              >
                <div>
                  <p className="font-medium">
                    {post.title}{" "}
                    {!post.published && (
                      <span className="text-xs text-yellow-300 ml-2">
                        (Draft)
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-slate-400">
                    slug: {post.slug} • {new Date(post.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-3 py-1 text-xs rounded-md border border-slate-500 hover:bg-slate-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-3 py-1 text-xs rounded-md bg-red-500/80 text-white hover:bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                             JOBS MANAGER                           */
/* ------------------------------------------------------------------ */

function JobsManager() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
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

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setLocation("");
    setDescription("");
    setIsActive(true);
    setImageUrl("");
    setImageAlt("");
    setError(null);
  };

  const handleEdit = (job: Job) => {
    setEditingId(job.id);
    setTitle(job.title);
    setLocation(job.location || "");
    setDescription(job.description);
    setIsActive(job.is_active);
    setImageUrl(job.image_url || "");
    setImageAlt(job.image_alt || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job?")) return;
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error) {
      alert("Error deleting: " + error.message);
      return;
    }
    setJobs((prev) => prev.filter((j) => j.id !== id));
    if (editingId === id) resetForm();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (!title.trim()) {
        setError("Title is required.");
        setSaving(false);
        return;
      }

      if (editingId) {
        const { data, error } = await supabase
          .from("jobs")
          .update({
            title,
            location: location || null,
            description,
            is_active: isActive,
            image_url: imageUrl || null,
            image_alt: imageAlt || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingId)
          .select("*")
          .single();

        if (error) throw error;

        setJobs((prev) =>
          prev.map((j) => (j.id === editingId ? (data as Job) : j))
        );
      } else {
        const { data, error } = await supabase
          .from("jobs")
          .insert({
            title,
            location: location || null,
            description,
            is_active: isActive,
            image_url: imageUrl || null,
            image_alt: imageAlt || null,
          })
          .select("*")
          .single();

        if (error) throw error;
        setJobs((prev) => [data as Job, ...prev]);
      }

      resetForm();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error saving job.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Job" : "Add New Job"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input
                className="w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Senior Network Architect"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Location</label>
              <input
                className="w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-sm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Charlotte, NC or Remote"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              className="w-full min-h-[120px] rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description or full job details"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
  <ImageDropzone
    label="Job Image / Logo"
    value={imageUrl}
    onChange={setImageUrl}
    bucket="public-assets"
    folder="job-images"
  />
  <div>
    <label className="block text-sm mb-1">Image Alt Text</label>
    <input
      className="w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-sm"
      value={imageAlt}
      onChange={(e) => setImageAlt(e.target.value)}
      placeholder="Short image description"
    />
  </div>
</div>


          <div className="flex items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <span>Active (visible on Careers page)</span>
            </label>

            <div className="flex gap-2">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-3 py-2 text-sm rounded-md border border-slate-500 hover:bg-slate-800"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 text-sm rounded-md bg-cyan-500 text-slate-950 font-medium hover:bg-cyan-400 disabled:opacity-60"
              >
                {saving
                  ? editingId
                    ? "Saving…"
                    : "Adding…"
                  : editingId
                  ? "Save Changes"
                  : "Add Job"}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
        </form>
      </div>

      {/* List */}
      <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Existing Jobs</h2>
          {loading && (
            <span className="text-xs text-slate-400">Loading…</span>
          )}
        </div>

        {jobs.length === 0 && !loading ? (
          <p className="text-sm text-slate-400">No jobs yet.</p>
        ) : (
          <ul className="space-y-3">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border border-slate-700 rounded-lg px-3 py-2"
              >
                <div>
                  <p className="font-medium">
                    {job.title}{" "}
                    {!job.is_active && (
                      <span className="text-xs text-yellow-300 ml-2">
                        (Inactive)
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-slate-400">
                    {job.location || "No location"} •{" "}
                    {new Date(job.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(job)}
                    className="px-3 py-1 text-xs rounded-md border border-slate-500 hover:bg-slate-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="px-3 py-1 text-xs rounded-md bg-red-500/80 text-white hover:bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
