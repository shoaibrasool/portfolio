"use client";

import { useState, useCallback } from "react";
import type { PanelId, AgentTool } from "@/lib/types";
import Hero from "@/components/Hero";
import ChatPanel from "@/components/chat/ChatPanel";
import PanelContainer from "@/components/panels/PanelContainer";
import ParticleNetwork from "@/components/effects/ParticleNetwork";
import Spotlight from "@/components/effects/Spotlight";
import ThemeToggle from "@/components/ThemeToggle";
import NavBar from "@/components/NavBar";
import ProjectCarousel from "@/components/ProjectCarousel";

export default function Home() {
  const [activePanel, setActivePanel] = useState<PanelId>(null);
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);
  const [chatVisible, setChatVisible] = useState(true);

  const handleToolCall = useCallback((tool: AgentTool) => {
    switch (tool.type) {
      case "showProject":
        setActivePanel("projects");
        break;
      case "showSkills":
        setActivePanel("skills");
        setHighlightedSkill(null);
        break;
      case "showTimeline":
        setActivePanel("timeline");
        break;
      case "showContact":
        setActivePanel("contact");
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

  return (
    <main className="min-h-screen relative transition-colors duration-500">
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <NavBar onToolCall={handleToolCall} />
        <ThemeToggle />
      </div>
      <ParticleNetwork />
      <Spotlight />

      <div className="relative z-20">
        <Hero />

        <div className="mt-6 mb-8">
          <ProjectCarousel />
        </div>

        <div className="flex items-center gap-3 justify-center mb-8">
          <div className="h-px w-8 bg-border" />
          <span className="text-[10px] text-text-muted font-mono tracking-widest uppercase">
            Ask me anything ↓
          </span>
          <div className="h-px w-8 bg-border" />
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-24">
          <div className={`grid grid-cols-1 gap-6 ${activePanel ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
            <div className={`${activePanel ? 'order-2 lg:order-1' : ''}`}>
              {chatVisible && (
                <div className="glass rounded-2xl overflow-hidden min-h-[200px] max-h-[600px]">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <span className="text-xs text-text-muted font-mono">AI Assistant</span>
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
              <div className="order-1 lg:order-2 space-y-4">
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
        </div>

        <footer className="relative z-10 text-center py-8">
          <div className="flex items-center justify-center gap-4 text-[10px] text-text-muted font-mono">
            <a
              href="/linkedin"
              className="hover:text-accent-light transition-colors"
            >
              Sync LinkedIn
            </a>
            <span>|</span>
            <span>Powered by AI</span>
            <span>|</span>
            <span>Auto-updated from GitHub</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
