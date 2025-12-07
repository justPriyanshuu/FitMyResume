import { useState } from 'react';
export default function App() {
  const [file, setFile] = useState(null);
  const [job, setJob] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRewrite = async () => {
    if (!file || !job) {
      alert('Please upload a resume and enter the job description.');
      return;
    }

    setLoading(true);

    try {
      // 1) UPLOAD PDF → extract text
      const formData = new FormData();
      formData.append('resume', file);

      const uploadRes = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();
      const resumeText = uploadData.text;

      // 2) SEND TEXT + JOB → rewrite
      const rewriteRes = await fetch('http://localhost:8000/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: resumeText,
          job,
        }),
      });

      const rewriteData = await rewriteRes.json();
      setOutput(rewriteData);
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navbar */}
      <nav className="w-full border-b border-slate-200 bg-white/70 backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              F
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">FitMyResume</h1>
              <p className="text-xs text-slate-500">Tailor your resume to any job in seconds</p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live · Connected to local AI
          </span>
        </div>
      </nav>

      {/* Main Layout */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-6 flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-slate-900">
            Optimize your resume for each job
          </h2>
          <p className="text-sm text-slate-500 max-w-xl">
            Upload your resume, paste the job description, and get clean ATS-friendly bullets plus a
            tailored professional summary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Input card */}
          <section className="bg-white/90 rounded-2xl shadow-lg shadow-slate-200 p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  1. Provide your resume & job
                </h3>
                <p className="text-xs text-slate-500">
                  We never store your documents. Everything stays on your machine.
                </p>
              </div>
              <span className="text-[11px] px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Step 1
              </span>
            </div>

            <div className="space-y-5 mt-4">
              {/* Upload box */}
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-slate-300 rounded-xl px-4 py-6 text-center bg-slate-50/60 hover:bg-slate-100 transition">
                  <p className="text-sm text-slate-600 mb-3">
                    Drag & drop your resume here, or click below:
                  </p>

                  <span className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                    Choose File
                  </span>

                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                  />

                  <p className="mt-3 text-[11px] text-slate-400">Supported: PDF · Max ~5 MB</p>
                </div>
              </label>

              {/* Job description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job Description
                </label>
                <textarea
                  placeholder="Paste the full job description here..."
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  className="w-full h-32 md:h-40 p-3 text-sm border border-slate-200 rounded-xl resize-none outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-slate-50/60"
                />
              </div>

              <button
                onClick={handleRewrite}
                disabled={loading}
                className="w-full mt-2 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition disabled:opacity-50"
              >
                {loading ? 'Rewriting...' : 'Rewrite My Resume'}
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                Your local LLM will generate optimized bullets and a summary based on the job
                description.
              </p>
            </div>
          </section>

          {/* Right: Output card */}
          <section className="bg-white/90 rounded-2xl shadow-lg shadow-slate-200 p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">2. Review tailored output</h3>
                <p className="text-xs text-slate-500">
                  Copy these bullets into your resume and tweak as needed.
                </p>
              </div>
              <span className="text-[11px] px-2 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-100">
                Preview
              </span>
            </div>

            <div className="space-y-5 mt-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-800 mb-2">ATS Bullet Points</h4>

                {!output?.bullets?.length ? (
                  <p className="text-sm text-slate-400">
                    Bullets will appear here after you rewrite your resume.
                  </p>
                ) : (
                  <ul className="space-y-2 text-sm text-slate-700">
                    {output.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">Professional Summary</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {output?.summary
                    ? output.summary
                    : 'A short professional summary will be shown here after rewriting.'}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
