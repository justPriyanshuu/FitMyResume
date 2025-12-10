export default function Navbar() {
  return (
    <nav className="w-full bg-neutral-950 border-b border-neutral-800/80">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex flex-col leading-tight">
          <h1 className="text-xl font-semibold text-white tracking-tight">
            FitMyResume
          </h1>
          <p className="text-xs text-neutral-400">
            Tailor your resume to any job in seconds
          </p>
        </div>

        <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-800 bg-emerald-900/40 px-3 py-1 text-xs font-medium text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Live · Local AI
        </span>
      </div>
    </nav>
  );
}
