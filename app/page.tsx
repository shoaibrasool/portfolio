"use client";

import { useState, useCallback } from "react";
import type { PanelId, AgentTool } from "@/lib/types";
import Hero from "@/components/Hero";
import ChatPanel from "@/components/chat/ChatPanel";
import PanelContainer from "@/components/panels/PanelContainer";
import ParticleNetwork from "@/components/effects/ParticleNetwork";
import Spotlight from "@/components/effects/Spotlight";

export default function Home() {
  const [activePanel, setActivePanel] = useState<PanelId>(null);
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light" | "neon">("dark");
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
        setTheme(tool.theme);
        break;
      case "playGame":
        break;
    }
  }, []);

  const themeStyles: Record<string, React.CSSProperties> = {
    dark: { "--bg-primary": "#0a0a0f", "--bg-secondary": "#12121a" } as React.CSSProperties,
    light: {
      "--bg-primary": "#f5f5f0",
      "--bg-secondary": "#e8e8e0",
    } as React.CSSProperties,
    neon: {
      "--bg-primary": "#050510",
      "--bg-secondary": "#0a0a20",
    } as React.CSSProperties,
  };

  return (
    <main
      style={themeStyles[theme]}
      className="min-h-screen relative transition-colors duration-500"
    >
      <ParticleNetwork />
      <Spotlight />

      <div className="relative z-20">
        <Hero />

        <div className="max-w-6xl mx-auto px-4 pb-24">
          <div className={`grid grid-cols-1 gap-6 mt-8 ${activePanel ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
            <div className={`${activePanel ? 'order-2 lg:order-1' : ''}`}>
              {chatVisible && (
                <div className="glass rounded-2xl overflow-hidden" style={{ height: "500px" }}>
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
