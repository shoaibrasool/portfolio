"use client";

import { useState, useCallback, useEffect } from "react";
import type { PanelId, AgentTool } from "@/lib/types";
import Hero from "@/components/Hero";
import ChatPanel from "@/components/chat/ChatPanel";
import PanelContainer from "@/components/panels/PanelContainer";
import ParticleNetwork from "@/components/effects/ParticleNetwork";
import Spotlight from "@/components/effects/Spotlight";
import ThemeToggle from "@/components/ThemeToggle";
import NavBar from "@/components/NavBar";
import SideRail from "@/components/SideRail";
import ProjectCarousel from "@/components/ProjectCarousel";
import InteractiveSkills from "@/components/InteractiveSkills";
import HowIWork from "@/components/HowIWork";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CopyToast from "@/components/CopyToast";
import { useCopyToast } from "@/components/CopyToast";
import LoadingScreen from "@/components/LoadingScreen";
import profile from "@/data/profile.json";

export default function Home() {
  const [activePanel, setActivePanel] = useState<PanelId>(null);
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);
  const [chatVisible, setChatVisible] = useState(false);
  const { toast, copy } = useCopyToast();

  useEffect(() => {
    const el = document.getElementById("skills-section");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setChatVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "-40% 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleToolCall = useCallback((tool: AgentTool) => {
    switch (tool.type) {
      case "showProject":
        setActivePanel("projects");
        break;
      case "showSkills":
        setActivePanel("skills");
        setHighlightedSkill(null);
        document.getElementById("skills-section")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "showTimeline":
        setActivePanel("timeline");
        break;
      case "showContact":
        setActivePanel("contact");
        document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "showGallery":
        setActivePanel("gallery");
        break;
      case "hidePanel":
        setActivePanel(null);
        setHighlightedSkill(null);
        break;
      case "highlightSkill":
        setActivePanel("skills");
        setHighlightedSkill(tool.skill);
        setTimeout(() => {
          document
            .getElementById(`skill-${tool.skill.toLowerCase().replace(/\s+/g, "-")}`)
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
        break;
      case "setTheme":
        document.documentElement.setAttribute("data-theme", tool.theme);
        localStorage.setItem("theme", tool.theme);
        break;
      case "playGame":
        break;
    }
  }, []);

  const social = (profile as { social: { github: string; linkedin: string } }).social;
  const email = (profile as { basic: { email: string } }).basic.email;

  return (
    <main className="min-h-screen relative transition-colors duration-500">
      <LoadingScreen />
      <SideRail />
      <ScrollProgress />
      <BackToTop />
      <CopyToast message={toast} />

      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <NavBar onToolCall={handleToolCall} />
        <ThemeToggle />
      </div>

      <ParticleNetwork />
      <Spotlight />

      <div className="relative z-20">
        <Hero onStartChat={() => { setChatVisible(true); document.getElementById("skills-section")?.scrollIntoView({ behavior: "smooth" }); }} />

        <section id="work" className="max-w-6xl mx-auto px-4 lg:pl-24 py-16">
          <span className="section-label mb-8">
            <span className="text-[10px] font-mono tracking-[0.2em] text-accent">(02)</span>
            <span>FEATURED WORK</span>
          </span>
          <ProjectCarousel />
          <div className="mt-6 text-center">
            <a
              href="/work"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-accent transition-colors"
            >
              View all projects →
            </a>
          </div>
        </section>

        <section id="skills-section" className="max-w-6xl mx-auto px-4 lg:pl-24 py-16">
          <span className="section-label mb-8">
            <span className="text-[10px] font-mono tracking-[0.2em] text-accent">(03)</span>
            <span>SKILLS & SERVICES</span>
          </span>

          <InteractiveSkills />

          <div className="mt-12 flex items-center gap-3 justify-center mb-8">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] text-text-muted font-mono tracking-widest uppercase">
              Or ask me anything ↓
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              {chatVisible && (
                <div className="glass rounded-2xl overflow-hidden min-h-[200px] max-h-[600px]">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <span className="text-xs text-text-muted font-mono">Chat with Shoaib</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleToolCall({ type: "showSkills" })}
                        className="px-2 py-1 text-[10px] rounded-md bg-bg-card border border-border
                                   text-text-muted hover:text-text-primary hover:border-accent/30 transition-colors"
                      >
                        Skills
                      </button>
                      <button
                        onClick={() => handleToolCall({ type: "showTimeline" })}
                        className="px-2 py-1 text-[10px] rounded-md bg-bg-card border border-border
                                   text-text-muted hover:text-text-primary hover:border-accent/30 transition-colors"
                      >
                        Timeline
                      </button>
                      <button
                        onClick={() => handleToolCall({ type: "showContact" })}
                        className="px-2 py-1 text-[10px] rounded-md bg-bg-card border border-border
                                   text-text-muted hover:text-text-primary hover:border-accent/30 transition-colors"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                  <ChatPanel onToolCall={handleToolCall} />
                </div>
              )}
            </div>

            {activePanel && (
              <div className="space-y-4">
                <h2 className="text-xs text-text-muted font-mono uppercase tracking-widest">
                  ▸ {activePanel}
                </h2>
                <PanelContainer
                  activePanel={activePanel}
                  onClose={() => { setActivePanel(null); setHighlightedSkill(null); }}
                  onHighlightSkill={setHighlightedSkill}
                  highlightedSkill={highlightedSkill}
                />
              </div>
            )}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 lg:pl-24 py-16">
          <span className="section-label mb-8">
            <span className="text-[10px] font-mono tracking-[0.2em] text-muted">( )</span>
            <span>HOW I WORK</span>
          </span>
          <HowIWork />
        </section>

        <section id="contact-section" className="max-w-6xl mx-auto px-4 lg:pl-24 py-24">
          <span className="section-label mb-8">
            <span className="text-[10px] font-mono tracking-[0.2em] text-accent">(04)</span>
            <span>CONTACT</span>
          </span>

          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Let&apos;s build something together.
            </h2>
            <p className="text-text-secondary mb-8 max-w-md">
              Have a project, idea, or role that fits? I&apos;m always open to interesting conversations.
            </p>

            <div className="space-y-3 mb-8">
              <button
                onClick={() => copy(email, "Email copied!")}
                className="w-full flex items-center justify-between p-3 rounded-xl glass border border-border hover:border-accent/30 transition-all group"
              >
                <span className="text-xs text-text-muted">Email</span>
                <span className="text-sm text-text-primary group-hover:text-accent-light transition-colors">
                  {email}
                </span>
              </button>
              <a
                href={`https://github.com/${social.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-xl glass border border-border hover:border-accent/30 transition-all group"
              >
                <span className="text-xs text-text-muted">GitHub</span>
                <span className="text-sm text-text-primary group-hover:text-accent-light transition-colors">
                  @{social.github}
                </span>
              </a>
              <a
                href={`https://linkedin.com/in/${social.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-xl glass border border-border hover:border-accent/30 transition-all group"
              >
                <span className="text-xs text-text-muted">LinkedIn</span>
                <span className="text-sm text-text-primary group-hover:text-accent-light transition-colors">
                  @{social.linkedin}
                </span>
              </a>
            </div>

            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cta text-white hover:bg-cta-hover transition-all shadow-lg shadow-cta/20 font-medium text-sm"
            >
              Send email
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </section>

        <footer className="relative z-10 text-center py-8">
          <div className="flex items-center justify-center gap-4 text-[10px] text-text-muted font-mono">
            <span>© {new Date().getFullYear()} Shoaib Rasool</span>
            <span>|</span>
            <a
              href="/linkedin"
              className="hover:text-accent-light transition-colors"
            >
              Sync LinkedIn
            </a>
            <span>|</span>
            <span>Powered by AI</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
