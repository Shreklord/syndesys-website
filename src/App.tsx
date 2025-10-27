import { useState } from "react";
import syndesysLogo from "./assets/Syndesys.png";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Centered Syndesys Logo */}
      <img
        src={syndesysLogo}
        alt="Syndesys Logo"
        className="w-80 md:w-[28rem] h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
      />

      {/* Footer pinned at bottom */}
      <footer className="absolute bottom-4 text-slate-500 text-sm">
        © {new Date().getFullYear()} Syndesys · All Rights Reserved
      </footer>
    </main>
  );
}

export default App;
