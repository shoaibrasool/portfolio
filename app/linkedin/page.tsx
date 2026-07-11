"use client";

import { useState, useCallback } from "react";

export default function LinkedInPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    experience?: number;
    education?: number;
    skills?: number;
    error?: string;
  } | null>(null);

  const handleUpload = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/linkedin/parse", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ success: false, error: "Upload failed. Please try again." });
    } finally {
      setLoading(false);
    }
  }, [file]);

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6">
      <div className="max-w-md w-full glass rounded-2xl p-8">
        <h1 className="text-xl font-bold text-text-primary mb-2">Import LinkedIn Data</h1>
        <p className="text-sm text-text-muted mb-6">
          Download your LinkedIn data archive and upload the ZIP file here.
          Your experience, education, and skills will be synced automatically.
        </p>

        <ol className="text-xs text-text-secondary space-y-2 mb-6 font-mono">
          <li>1. Go to LinkedIn → Settings & Privacy → Data Privacy</li>
          <li>2. Request a data archive (Download larger data archive)</li>
          <li>3. Wait for the email (usually &lt;10 min)</li>
          <li>4. Download the ZIP and upload it below</li>
        </ol>

        <div className="space-y-4">
          <label className="block">
            <div className="flex items-center justify-center p-6 rounded-xl border-2 border-dashed border-border bg-bg-card cursor-pointer hover:border-accent/50 transition-colors">
              {file ? (
                <span className="text-sm text-accent-light">{file.name}</span>
              ) : (
                <span className="text-sm text-text-muted">Click to select ZIP file</span>
              )}
              <input
                type="file"
                accept=".zip"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
          </label>

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full py-2.5 bg-accent hover:bg-accent/80 disabled:opacity-40 
                       rounded-xl text-sm font-medium text-white transition-all"
          >
            {loading ? "Parsing..." : "Upload & Sync"}
          </button>
        </div>

        {result && (
          <div className={`mt-4 p-3 rounded-xl text-sm ${
            result.success ? "bg-success/10 text-success" : "bg-error/10 text-error"
          }`}>
            {result.success ? (
              <p>
                Synced {result.experience} experiences, {result.education} education entries, and {result.skills} skills.
              </p>
            ) : (
              <p>{result.error || "Something went wrong."}</p>
            )}
          </div>
        )}

        <a
          href="/"
          className="block text-center mt-6 text-xs text-text-muted hover:text-accent-light transition-colors"
        >
          ← Back to portfolio
        </a>
      </div>
    </div>
  );
}
