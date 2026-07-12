"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface CarouselRepo {
  id: number;
  name: string;
  description: string;
  homepage: string;
  language: string;
  topics: string[];
}

function truncate(text: string, words: number): string {
  if (!text) return "";
  const parts = text.split(/\s+/);
  return parts.length <= words ? text : parts.slice(0, words).join(" ") + "…";
}

export default function ProjectCarousel() {
  const [repos, setRepos] = useState<CarouselRepo[]>([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchX = useRef(0);

  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data.filter((r: CarouselRepo) => r.homepage).slice(0, 5));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (paused || repos.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % repos.length);
    }, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, repos.length]);

  const goTo = useCallback((i: number) => {
    setIndex(((i % repos.length) + repos.length) % repos.length);
  }, [repos.length]);

  if (repos.length === 0) return null;

  return (
    <div
      className="w-full max-w-4xl mx-auto px-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        <div ref={containerRef} className="overflow-hidden rounded-xl">
          <div
            className="flex gap-3 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 252}px)` }}
            onPointerDown={(e) => { touchX.current = e.clientX; }}
            onPointerUp={(e) => {
              const diff = touchX.current - e.clientX;
              if (Math.abs(diff) > 40) goTo(index + (diff > 0 ? 1 : -1));
            }}
          >
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="block flex-shrink-0 w-[240px] p-4 rounded-xl glass border border-border
                           hover:border-accent/40 hover:bg-bg-hover transition-all duration-200 group"
              >
                <h3 className="text-sm font-medium text-text-primary group-hover:text-accent-light transition-colors truncate">
                  {repo.name}
                </h3>
                <p className="text-xs text-text-secondary mt-1.5 leading-relaxed min-h-[2.5rem]">
                  {truncate(repo.description, 6) || "Live project"}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  {repo.language && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent-light font-mono">
                      {repo.language}
                    </span>
                  )}
                  {repo.topics?.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-bg-secondary text-text-muted font-mono"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>

        {repos.length > 1 && (
          <>
            <button
              onClick={(e) => { e.preventDefault(); goTo(index - 1); }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-7 h-7 rounded-full
                         glass border border-border flex items-center justify-center
                         text-text-muted hover:text-accent hover:border-accent/40 transition-all
                         opacity-0 group-hover:opacity-100"
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M12.78 14.78a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 1.06L8.81 10l3.97 3.97a.75.75 0 010 1.06z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.preventDefault(); goTo(index + 1); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-7 h-7 rounded-full
                         glass border border-border flex items-center justify-center
                         text-text-muted hover:text-accent hover:border-accent/40 transition-all
                         opacity-0 group-hover:opacity-100"
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M7.22 14.78a.75.75 0 001.06 0l4.5-4.5a.75.75 0 000-1.06l-4.5-4.5a.75.75 0 00-1.06 1.06L11.19 10l-3.97 3.97a.75.75 0 000 1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
