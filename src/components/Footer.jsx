const Footer = () => (
  <footer className="fixed inset-x-0 bottom-0 z-50">
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/70 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className="bg-white/90 backdrop-blur-md border-t border-indigo-300/60 rounded-t-2xl shadow-[0_-8px_30px_rgba(99,102,241,0.12)]"
          style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0px)" }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-4 text-xs text-gray-600">
            <span>© {new Date().getFullYear()} StuthiPath</span>
            <span className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
              Hari Om Śrī Gurubhyo Namaḥ
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
