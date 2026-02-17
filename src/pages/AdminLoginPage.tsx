import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../libs/supabaseClient";

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // ✅ store marker so RequireAdmin lets them in
    localStorage.setItem("admin_authed", "true");
    navigate("/admin", { replace: true });
  }

  return (
    <section className="mx-auto max-w-md px-4 py-24">
      <h1 className="text-2xl font-semibold mb-6">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 rounded-md bg-slate-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 rounded-md bg-slate-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-cyan-500 text-slate-950 rounded-md py-2 font-medium hover:bg-cyan-400"
        >
          Log In
        </button>
      </form>
    </section>
  );
}
