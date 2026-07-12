"use client";

import type { AgentTool } from "@/lib/types";
import profile from "@/data/profile.json";

interface NavBarProps {
  onToolCall: (tool: AgentTool) => void;
}

export default function NavBar({ onToolCall }: NavBarProps) {
  return (
    <nav className="flex items-center gap-2">
      <a
        href="/work"
        className="px-3 py-1.5 text-[11px] font-mono rounded-xl glass border border-border text-text-muted hover:text-accent hover:border-accent/30 transition-all"
      >
        Work
      </a>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 text-[11px] font-mono rounded-xl glass border border-border text-text-muted hover:text-accent hover:border-accent/30 transition-all"
      >
        Résumé
      </a>
      <a
        href={`https://github.com/${(profile as { social: { github: string } }).social.github}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 text-[11px] font-mono rounded-xl glass border border-border text-text-muted hover:text-accent hover:border-accent/30 transition-all"
      >
        GitHub
      </a>
      <button
        onClick={() => onToolCall({ type: "showContact" })}
        className="px-3 py-1.5 text-[11px] font-mono rounded-xl glass border border-border text-text-muted hover:text-accent hover:border-accent/30 transition-all"
      >
        Contact
      </button>
    </nav>
  );
}
