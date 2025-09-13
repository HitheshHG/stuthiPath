import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="relative z-10">
      <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded bg-white/10 ring-1 ring-white/15 flex items-center justify-center shadow-glow">
            <span className="text-base-white font-mono text-sm">SP</span>
          </div>
          <div>
            <h1 className="text-base-white tracking-tight text-lg font-semibold">StuthiPath</h1>
            <p className="text-base-dim text-xs -mt-0.5">Hari Om Śrī Gurubhyo Namaḥ</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-base-dim">
          <Link to="/about" className="hover:text-base-white transition-colors">
            About Us
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
