"use client";

import { useEffect, useState } from "react";
import profile from "@/data/profile.json";

const sections = [
  { id: "hero", number: "01", label: "About" },
  { id: "work", number: "02", label: "Work" },
  { id: "skills-section", number: "03", label: "Skills" },
  { id: "contact-section", number: "04", label: "Contact" },
];

export default function SideRail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const initials = (profile as { basic: { name: string } }).basic.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <nav className="fixed left-0 top-0 h-full z-40 hidden lg:flex flex-col items-center py-8 w-[80px]">
      <button
        onClick={() => scrollTo("hero")}
        className="mb-10 w-9 h-9 rounded-xl glass border border-border flex items-center justify-center text-xs font-mono font-bold text-accent hover:text-accent-light transition-colors"
      >
        {initials}
      </button>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`rail-link ${active === s.id ? "active" : ""}`}
          >
            <span className="number-tag">{s.number}</span>
            <span className="text-[10px]">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto flex flex-col items-center gap-3">
        <div className="w-px h-8 bg-border" />
        <a
          href={`mailto:${(profile as { basic: { email: string } }).basic.email}`}
          className="w-9 h-9 rounded-xl glass border border-border hover:border-accent/30 flex items-center justify-center text-text-muted hover:text-accent transition-colors group"
          title="Send email"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
            <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
          </svg>
        </a>
        <span className="text-[8px] font-mono text-text-muted tracking-widest">MAIL</span>
      </div>
    </nav>
  );
}
