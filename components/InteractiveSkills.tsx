"use client";

import { useState } from "react";
import profile from "@/data/profile.json";

const serviceDescriptions: Record<string, string> = {
  Languages: "TypeScript, Python, Rust, Go — polyglot across systems, web, and AI.",
  Frontend: "React, Next.js, Tailwind CSS, Three.js — building interfaces that feel as good as they look.",
  Backend: "Node.js, FastAPI, PostgreSQL, Redis — designing APIs that scale and databases that stay fast.",
  DevOps: "Docker, Kubernetes, AWS, GitHub Actions — infrastructure as code, from dev to production.",
  "AI/ML": "LLMs, RAG, Vector Databases, LangChain — shipping AI that works outside of demos.",
};

export default function InteractiveSkills() {
  const skills = (profile as { skills: { category: string; items: string[] }[] }).skills;
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {skills.map((cat) => {
        const isOpen = expanded === cat.category;
        return (
          <button
            key={cat.category}
            onClick={() => setExpanded(isOpen ? null : cat.category)}
            className={`text-left p-4 rounded-xl transition-all duration-200 ${
              isOpen
                ? "glass border border-accent/30"
                : "glass border border-border hover:border-accent/20 hover:bg-bg-hover"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-text-muted">
                {String(skills.indexOf(cat) + 1).padStart(2, "0")}
              </span>
              <span className={`text-xs transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>
                +
              </span>
            </div>
            <h3 className="text-sm font-medium text-text-primary mb-1">
              {cat.category}
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              {serviceDescriptions[cat.category] || cat.items.join(" · ")}
            </p>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? "max-h-40 mt-3 pt-3" : "max-h-0"
              } border-t border-border`}
            >
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-[10px] rounded-full bg-accent/10 text-accent-light font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
