function Header() {
  return (
    <header className="sticky top-0 inset-x-0 z-50">
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-300/70 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="bg-white/85 backdrop-blur-md border-b border-indigo-300/60 rounded-b-2xl shadow-[0_8px_24px_rgba(99,102,241,0.08)]">
            <div className="grid grid-cols-3 items-center px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-indigo-600/10 ring-1 ring-indigo-300/80 flex items-center justify-center">
                  <span className="text-gray-900 font-mono text-sm">SP</span>
                </div>
                <div>
                  <h1 className="text-gray-900 tracking-tight text-lg font-semibold">
                    StuthiPath
                  </h1>
                  <p className="hidden sm:block text-gray-500 text-xs -mt-0.5">
                    Hari Om Śrī Gurubhyo Namaḥ
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-indigo-300/80 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50 active:bg-indigo-100 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
                    About
                  </span>
                  <span className="text-indigo-700">→</span>
                </a>
              </div>

              <div className="hidden md:flex items-center justify-end gap-6 text-sm text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
