"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import profile from "@/data/profile.json";

export default function Hero() {
  const p = (profile as { basic: { name: string; title: string; bio: string; location: string; available: boolean; avatar: string }; social: { github: string; linkedin: string }; skills: { category: string; items: string[] }[] }).basic;
  const social = (profile as { social: { github: string; linkedin: string } }).social;
  const allTech = (profile as { skills: { category: string; items: string[] }[] }).skills
    .flatMap((s) => s.items);

  return (
    <section id="hero" className="relative z-10 min-h-[85vh] flex items-center px-6 lg:px-16">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl"
        >
          <span className="section-label mb-6">
            <span className="text-[10px] font-mono tracking-[0.2em] text-accent">(01)</span>
            <span>ABOUT ME</span>
          </span>

          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tight leading-[1.05] mb-4">
            <span className="gradient-text">{p.name}</span>
            <br />
            <span className="text-text-primary">{p.title}</span>
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 max-w-lg">
            {p.bio}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            <span className="spec-badge">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              {p.location.split(",")[0]}
            </span>
            <span className="spec-badge">Remote · Relocation</span>
            <span className="spec-badge">
              {allTech.slice(0, 3).join(" · ")}
            </span>
            {p.available && (
              <span className="spec-badge border-success/30 text-success">
                Available
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://github.com/${social.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-5 py-2.5 rounded-xl bg-cta text-white hover:bg-cta-hover transition-all shadow-lg shadow-cta/20 font-medium text-sm"
            >
              View my work
              <span className="inline-block ml-1.5 transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={`https://linkedin.com/in/${social.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl glass border border-border text-text-secondary hover:text-accent hover:border-accent/30 transition-all text-sm"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative w-72 h-72 xl:w-80 xl:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 via-cta/10 to-success/10 animate-pulse-glow" />
            <div className="absolute inset-3 rounded-full glass border border-border overflow-hidden">
              {p.avatar ? (
                <Image
                  src={p.avatar}
                  alt={p.name}
                  fill
                  sizes="(max-width: 1280px) 288px, 320px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <span className="text-6xl font-bold gradient-text select-none">
                    {p.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
