// src/pages/AdminDashboardPage.tsx
import { useEffect, useState } from "react";
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
  description: string | null;
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
  job_details: string | null;
  payrate: string | null;
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
  const [showCheat, setShowCheat] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (!mounted) return;
      if (error) setError(error.message);
      else setPosts((data || []) as Post[]);
      setLoading(false);
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setContent("");
    setPublished(false);
    setImageUrl("");
    setImageAlt("");
    setError(null);
  };

  const handleEdit = (p: Post) => {
    setEditingId(p.id);
    setTitle(p.title);
    setSlug(p.slug);
    setDescription(p.description || "");
    setContent(p.content);
    setPublished(p.published);
    setImageUrl(p.image_url || "");
    setImageAlt(p.image_alt || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (!title.trim() || !slug.trim())
        throw new Error("Title and slug are required.");

      const payload = {
        title,
        slug,
        description: description || null,
        content,
        published,
        image_url: imageUrl || null,
        image_alt: imageAlt || null,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        const { data, error } = await supabase
          .from("posts")
          .update(payload)
          .eq("id", editingId)
          .select("*")
          .single();
        if (error) throw error;
        setPosts((p) => p.map((x) => (x.id === editingId ? (data as Post) : x)));
      } else {
        const { data, error } = await supabase
          .from("posts")
          .insert(payload)
          .select("*")
          .single();
        if (error) throw error;
        setPosts((p) => [data as Post, ...p]);
      }
      resetForm();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {editingId ? "Edit Post" : "Add New Post"}
          </h2>
          <button
            type="button"
            onClick={() => setShowCheat((s) => !s)}
            className="text-xs text-cyan-300 underline hover:text-cyan-200"
          >
            {showCheat ? "Hide Markdown Guide" : "Show Markdown Guide"}
          </button>
        </div>

        {showCheat && (
          <div className="mb-4 p-4 rounded-lg bg-slate-800 border border-slate-600 text-sm text-slate-200 space-y-2">
            <p className="font-semibold text-cyan-300">Markdown Cheat Sheet</p>
            <pre className="text-xs whitespace-pre-wrap">
{`# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
> Quote or callout

- Bullet list item
  - Nested bullet
1. Numbered item

[Link text](https://example.com)

Inline \`code\` and
\`\`\`
Code blocks
\`\`\`
`}
            </pre>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-sm"
            />
            <input
              placeholder="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-sm"
            />
          </div>

          <textarea
            placeholder="Short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[70px] rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-sm"
          />

          <textarea
            placeholder="Full content (Markdown supported)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[180px] rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-sm"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <ImageDropzone
              label="Post Image"
              value={imageUrl}
              onChange={setImageUrl}
              bucket="public-assets"
              folder="post-images"
            />
            <input
              placeholder="Image Alt Text"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              className="w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
              Published (visible)
            </label>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm rounded-md bg-cyan-500 text-slate-950 font-medium hover:bg-cyan-400"
            >
              {editingId ? "Save Changes" : "Add Post"}
            </button>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </form>
      </div>

      {/* List */}
      <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6">
        <h2 className="text-lg font-semibold mb-4">Existing Posts</h2>
        {loading ? (
          <p className="text-slate-400 text-sm">Loading…</p>
        ) : (
          <ul className="space-y-2">
            {posts.map((p) => (
              <li
                key={p.id}
                className="flex justify-between items-center border border-slate-700 rounded-lg px-3 py-2"
              >
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-xs text-slate-400">{p.slug}</p>
                </div>
                <button
                  onClick={() => handleEdit(p)}
                  className="text-sm text-cyan-300 hover:underline"
                >
                  Edit
                </button>
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
  const [showCheat, setShowCheat] = useState(false);

  // form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [jobDetails, setJobDetails] = useState("");
  const [payrate, setPayrate] = useState("");
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
    setJobDetails("");
    setPayrate("");
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
    setJobDetails(job.job_details || "");
    setPayrate(job.payrate || "");
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

      const payload = {
        title,
        location: location || null,
        description,
        job_details: jobDetails || null,
        payrate: payrate || null,
        is_active: isActive,
        image_url: imageUrl || null,
        image_alt: imageAlt || null,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        const { data, error } = await supabase
          .from("jobs")
          .update(payload)
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
            ...payload,
            updated_at: undefined, // let DB set created/updated if you have triggers
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {editingId ? "Edit Job" : "Add New Job"}
          </h2>
          <button
            type="button"
            onClick={() => setShowCheat((prev) => !prev)}
            className="text-xs text-cyan-300 hover:text-cyan-200 underline"
          >
            {showCheat ? "Hide Markdown Guide" : "Show Markdown Guide"}
          </button>
        </div>

        {showCheat && (
          <div className="mb-4 p-4 rounded-lg bg-slate-800 border border-slate-600 text-sm text-slate-200 space-y-2">
            <p className="font-semibold text-cyan-300">
              Markdown Cheat Sheet (Job Details)
            </p>
            <pre className="text-xs whitespace-pre-wrap">
{`# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

> Callout / note / quote

- Bullet item
- Another item
  - Nested item

1. Step one
2. Step two

[Link text](https://example.com)

Use blank lines between paragraphs for spacing.`}
            </pre>
          </div>
        )}

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
            <label className="block text-sm mb-1">Short Description</label>
            <textarea
              className="w-full min-h-[80px] rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short overview shown on the careers list."
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Job Details{" "}
              <span className="text-xs text-slate-400">
                (supports Markdown: headings, lists, etc.)
              </span>
            </label>
            <textarea
              className="w-full min-h-[150px] rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-sm"
              value={jobDetails}
              onChange={(e) => setJobDetails(e.target.value)}
              placeholder={`Example:

## Responsibilities
- Design, build, and maintain network automation tools
- Collaborate with OSS/BSS stakeholders

## Requirements
- 5+ years in network engineering
- Experience with Python and automation frameworks`}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Pay Rate / Salary (optional)
            </label>
            <input
              className="w-full rounded-md bg-slate-800 border border-slate-600 px-3 py-2 text-sm"
              value={payrate}
              onChange={(e) => setPayrate(e.target.value)}
              placeholder="e.g., $120k–$140k base + bonus"
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
                  {job.payrate && (
                    <p className="text-xs text-slate-400 mt-1">
                      Pay: {job.payrate}
                    </p>
                  )}
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
