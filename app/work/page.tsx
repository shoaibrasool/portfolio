"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { GitHubRepo } from "@/lib/types";

export default function WorkPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-accent transition-colors mb-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clipRule="evenodd" />
          </svg>
          Back to home
        </Link>

        <span className="section-label mb-6">
          <span className="text-[10px] font-mono tracking-[0.2em] text-accent">(02)</span>
          <span>WORK</span>
        </span>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Projects
        </h1>
        <p className="text-text-secondary mb-16 max-w-lg">
          Real projects shipped in production. Pulled directly from GitHub.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.homepage || repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl glass border border-border hover:border-accent/30 hover:bg-bg-hover transition-all duration-300"
            >
              <div className="h-24 sm:h-32 bg-gradient-to-br from-accent/10 via-cta/5 to-success/10 flex items-center justify-center">
                <span className="text-4xl font-mono font-bold opacity-10 select-none">
                  {repo.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-text-primary group-hover:text-accent-light transition-colors mb-1.5 truncate">
                  {repo.name}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 min-h-[2rem]">
                  {repo.description || "No description"}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {repo.language && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-accent/10 text-accent-light font-mono">
                      {repo.language}
                    </span>
                  )}
                  {repo.topics?.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="text-[9px] px-2 py-0.5 rounded-full bg-bg-secondary text-text-muted font-mono"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border text-[10px] text-text-muted font-mono">
                  <span>★ {repo.stargazers_count}</span>
                  <span>⑂ {repo.forks_count}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {repos.length === 0 && (
          <div className="text-center py-24">
            <div className="text-sm text-text-muted font-mono">
              Loading projects from GitHub...
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
