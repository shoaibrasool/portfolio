"use client";

import { useState, useEffect } from "react";
import type { GitHubRepo } from "@/lib/types";

export default function ProjectsPanel() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data.slice(0, 20));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="text-center py-12 text-text-muted text-sm">
        <p>No repositories found.</p>
        <p className="mt-1">Set GITHUB_USERNAME in your environment to sync repos.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-4 rounded-xl bg-bg-card border border-border 
                     hover:border-accent/30 hover:bg-bg-hover transition-all duration-200"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-sm text-text-primary group-hover:text-accent-light transition-colors truncate">
              {repo.name}
            </h3>
            {repo.stargazers_count > 0 && (
              <span className="text-xs text-text-muted whitespace-nowrap flex-shrink-0">
                ★ {repo.stargazers_count}
              </span>
            )}
          </div>
          {repo.description && (
            <p className="text-xs text-text-secondary mt-1.5 line-clamp-2">{repo.description}</p>
          )}
          <div className="flex items-center gap-2 mt-3">
            {repo.language && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent-light font-mono">
                {repo.language}
              </span>
            )}
            {repo.topics?.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="text-[10px] px-2 py-0.5 rounded-full bg-bg-secondary text-text-muted"
              >
                {topic}
              </span>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}
