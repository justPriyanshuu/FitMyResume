export default function Body({ file, setFile, job, setJob, output, loading, handleRewrite }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-neutral-100 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight">Optimize your resume</h2>
          <p className="text-sm text-neutral-400 mt-1 max-w-xl">
            Upload your resume, paste the job description, and receive ATS-ready bullet points and a tailored summary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-neutral-900/60 rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">1. Input</h3>
                <p className="text-xs text-neutral-500">Your data stays local on your machine.</p>
              </div>
              <span className="text-[11px] px-2 py-1 rounded-full bg-blue-900/40 text-blue-300 border border-blue-800">
                Step 1
              </span>
            </div>

            <div className="space-y-6">
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-neutral-700 rounded-xl px-4 py-6 text-center bg-neutral-900/40 hover:bg-neutral-900 transition">
                  <p className="text-sm text-neutral-400 mb-3">Drag & drop your resume or click below</p>
                  <span className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-lg transition hover:bg-blue-700">
                    Choose File
                  </span>
                  <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                  <p className="mt-3 text-[11px] text-neutral-500">PDF · Max 5 MB</p>
                </div>
              </label>

              <div>
                <label className="block text-sm font-medium mb-2">Job Description</label>
                <textarea
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  placeholder="Paste job description..."
                  className="w-full h-40 p-3 text-sm rounded-xl border border-neutral-800 bg-neutral-900/40 outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <button
                onClick={handleRewrite}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition disabled:opacity-50"
              >
                {loading ? "Rewriting..." : "Rewrite My Resume"}
              </button>
            </div>
          </section>

          <section className="bg-neutral-900/60 rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">2. Output</h3>
                <p className="text-xs text-neutral-500">Copy and refine as needed.</p>
              </div>
              <span className="text-[11px] px-2 py-1 rounded-full bg-violet-900/40 text-violet-300 border border-violet-800">
                Preview
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold mb-2">ATS Bullet Points</h4>
                {!output?.bullets?.length ? (
                  <p className="text-sm text-neutral-500">Your optimized bullets will appear here.</p>
                ) : (
                  <ul className="space-y-2 text-sm text-neutral-300">
                    {output.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-3 border-t border-neutral-800">
                <h4 className="text-sm font-semibold mb-2">Professional Summary</h4>
                <p className="text-sm text-neutral-300">
                  {output?.summary || "Your tailored summary will appear here."}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
