"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { PanelId } from "@/lib/types";
import ProjectsPanel from "./ProjectsPanel";
import SkillsPanel from "./SkillsPanel";
import TimelinePanel from "./TimelinePanel";
import ContactPanel from "./ContactPanel";

interface PanelContainerProps {
  activePanel: PanelId;
  onClose: () => void;
  onHighlightSkill?: (skill: string) => void;
  highlightedSkill?: string | null;
}

export default function PanelContainer({ activePanel, onClose, onHighlightSkill, highlightedSkill }: PanelContainerProps) {
  return (
    <AnimatePresence>
      {activePanel && (
        <motion.div
          key={activePanel}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <span className="text-sm font-medium text-text-primary capitalize">{activePanel}</span>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-lg 
                         hover:bg-bg-hover text-text-muted hover:text-text-primary transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="p-5 max-h-[65vh] overflow-y-auto">
            {activePanel === "projects" && <ProjectsPanel />}
            {activePanel === "skills" && (
              <SkillsPanel highlightedSkill={highlightedSkill} />
            )}
            {activePanel === "timeline" && <TimelinePanel />}
            {activePanel === "contact" && <ContactPanel />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
