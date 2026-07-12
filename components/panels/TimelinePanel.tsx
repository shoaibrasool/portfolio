"use client";

import profile from "@/data/profile.json";
import linkedin from "@/data/linkedin-data.json";

export default function TimelinePanel() {
  const experience = (linkedin as { experience: { company: string; title: string; start: string; end: string; description: string }[] }).experience;
  const education = (profile as { education: { institution: string; degree: string; field: string; start: string; end: string }[] }).education;

  const timeline = [
    ...experience.map((e) => ({
      date: `${e.start} - ${e.end || "Present"}`,
      title: e.title,
      subtitle: e.company,
      description: e.description,
      type: "work" as const,
    })),
    ...education.map((e) => ({
      date: `${e.start} - ${e.end}`,
      title: e.field ? `${e.degree} in ${e.field}` : e.degree,
      subtitle: e.institution,
      description: "",
      type: "education" as const,
    })),
  ].sort((a, b) => {
    const aEnd = a.date.includes("Present") ? "9999" : a.date.split(" - ")[1] || a.date.split(" - ")[0];
    const bEnd = b.date.includes("Present") ? "9999" : b.date.split(" - ")[1] || b.date.split(" - ")[0];
    return bEnd.localeCompare(aEnd);
  });

  if (timeline.length === 0) {
    return (
      <div className="text-center py-12 text-text-muted text-sm">
        <p>No timeline data yet.</p>
        <p className="mt-1">Upload your LinkedIn data export to see your experience here.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
      <div className="space-y-6">
        {timeline.map((item, i) => (
          <div key={i} className="relative pl-8">
            <div
              className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${
                item.type === "work"
                  ? "border-accent bg-accent/20"
                  : "border-success bg-success/20"
              }`}
            />
            <div className="text-xs text-text-muted font-mono mb-1">{item.date}</div>
            <h3 className="text-sm font-medium text-text-primary">{item.title}</h3>
            <p className="text-xs text-text-secondary mt-0.5">{item.subtitle}</p>
            {item.description && (
              <p className="text-xs text-text-muted mt-1.5 leading-relaxed">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
