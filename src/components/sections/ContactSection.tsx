import { useState } from "react";

export function ContactSection() {
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [service, setService] = useState("Network Consulting");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mailto = `mailto:info@syndesys.com?subject=${encodeURIComponent(
      `New Inquiry from ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}
Email: ${senderEmail}
Service Interested In: ${service}

Message:
${message}`
    )}`;

    window.location.href = mailto;
  };

  return (
    <section id="contact" className="mx-auto max-w-3xl px-4 py-24 scroll-mt-28">
      <h2 className="text-2xl md:text-3xl font-semibold mb-3">Contact</h2>
      <h3 className="text-xl md:text-2xl font-semibold mb-4 text-cyan-300">
        Get In Touch
      </h3>

      <p className="text-slate-300 mb-6 leading-relaxed">
        We love to talk to new people and companies that are doing amazing
        things. Let’s get the ball rolling.
      </p>

      <div className="mb-10 space-y-1">
        <p className="text-slate-200 font-mono text-sm">info@syndesys.com</p>
        <p className="text-slate-200 font-mono text-sm">803-343-9131</p>
      </div>

      <div
        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg
                   transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-500/60"
      >
        <h4 className="text-lg font-semibold mb-4 text-cyan-300">Say Hello!</h4>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">
              Your name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-2.5
                         text-sm text-slate-200 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400
                         outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">
              Your email
            </label>
            <input
              type="email"
              required
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-2.5
                         text-sm text-slate-200 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400
                         outline-none transition"
            />
          </div>

          {/* Services dropdown */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">
              Choose Services
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-2.5
                         text-sm text-slate-200 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400
                         outline-none transition"
            >
              <option>Network Consulting</option>
              <option>Network Application Consulting</option>
              <option>Network Modernization & Transformation</option>
              <option>Operations Modernization</option>
              <option>OSS/BSS Consulting</option>
              <option>Resource Management</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">
              Your message (optional)
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us more if you'd like..."
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-2.5
                         text-sm text-slate-200 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400
                         outline-none transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full md:w-auto inline-flex items-center justify-center
                       rounded-full border border-cyan-400 px-8 py-2.5 mt-2
                       text-sm font-medium text-cyan-300
                       hover:bg-cyan-400/10 hover:text-cyan-200
                       transition-all duration-300 hover:-translate-y-0.5"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
