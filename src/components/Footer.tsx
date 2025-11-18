// src/components/Footer.tsx
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="mt-24 w-full bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Our Company</h3>
          <p className="text-sm leading-relaxed text-slate-400">
            With 30 years of industry experience and being at the forefront of
            technology innovation, we provide fully managed solutions for
            seamless customer experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#home" className="hover:text-cyan-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-cyan-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-cyan-400 transition">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-cyan-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Social</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 rounded-full bg-slate-800 hover:bg-cyan-600 transition flex items-center justify-center"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-slate-800 hover:bg-cyan-600 transition flex items-center justify-center"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-slate-800 hover:bg-cyan-600 transition flex items-center justify-center"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              href="mailto:info@syndesys.com"
              className="p-2 rounded-full bg-slate-800 hover:bg-cyan-600 transition flex items-center justify-center"
            >
              <IoMail size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 text-center py-4 text-xs text-slate-500">
        Copyright © Syndesys.com – All Rights are Reserved
      </div>
    </footer>
  );
}
