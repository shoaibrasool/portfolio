"use client";

import profile from "@/data/profile.json";

interface SkillsPanelProps {
  highlightedSkill?: string | null;
}

export default function SkillsPanel({ highlightedSkill }: SkillsPanelProps) {
  const skills = (profile as { skills: { category: string; items: string[] }[] }).skills;

  return (
    <div className="space-y-5">
      {skills.map((category) => (
        <div key={category.category}>
          <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
            {category.category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.items.map((skill) => {
              const isHighlighted = highlightedSkill?.toLowerCase() === skill.toLowerCase();
              return (
                <span
                  key={skill}
                  id={`skill-${skill.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 ${
                    isHighlighted
                      ? "bg-accent text-white scale-110 shadow-lg shadow-accent/30"
                      : "bg-bg-card text-text-secondary border border-border hover:border-accent/30"
                  }`}
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
