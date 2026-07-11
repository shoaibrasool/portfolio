"use client";

import { suggestedQuestions } from "@/lib/agents";

export default function SuggestedQuestions({ onSelect }: { onSelect: (q: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestedQuestions.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="px-3 py-1.5 text-xs rounded-full border border-border bg-bg-card 
                     hover:bg-accent/10 hover:border-accent/50 text-text-secondary 
                     hover:text-text-primary transition-all duration-200"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
