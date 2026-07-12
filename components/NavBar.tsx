"use client";

import type { AgentTool } from "@/lib/types";

interface NavBarProps {
  onToolCall: (tool: AgentTool) => void;
}

export default function NavBar({ onToolCall }: NavBarProps) {
  return (
    <nav className="flex items-center gap-1 px-2 py-1.5 rounded-xl glass border border-border">
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="px-2.5 py-1 text-[11px] font-mono text-text-muted hover:text-accent transition-colors rounded-lg hover:bg-bg-hover"
      >
        Résumé
      </a>
      <span className="w-px h-3 bg-border" />
      <a
        href="https://github.com/shoaibrasool"
        target="_blank"
        rel="noopener noreferrer"
        className="px-2.5 py-1 text-[11px] font-mono text-text-muted hover:text-accent transition-colors rounded-lg hover:bg-bg-hover"
      >
        GitHub
      </a>
      <span className="w-px h-3 bg-border" />
      <a
        href="https://linkedin.com/in/shoaib-rasool-193150221"
        target="_blank"
        rel="noopener noreferrer"
        className="px-2.5 py-1 text-[11px] font-mono text-text-muted hover:text-accent transition-colors rounded-lg hover:bg-bg-hover"
      >
        LinkedIn
      </a>
      <span className="w-px h-3 bg-border" />
      <button
        onClick={() => onToolCall({ type: "showContact" })}
        className="px-2.5 py-1 text-[11px] font-mono text-text-muted hover:text-accent transition-colors rounded-lg hover:bg-bg-hover"
      >
        Contact
      </button>
    </nav>
  );
}
