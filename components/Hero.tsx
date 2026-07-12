"use client";

import { motion } from "framer-motion";
import TerminalInput from "./TerminalInput";
import profile from "@/data/profile.json";

export default function Hero() {
  const basic = (profile as { basic: { name: string; title: string; bio: string; pronouns: string } }).basic;

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3">
          <span className="gradient-text">{basic.name}</span>
        </h1>

        <p className="text-lg sm:text-xl text-text-secondary font-medium mb-4">
          {basic.title}
        </p>

        <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed mb-6">
          {basic.bio}
        </p>

        <div className="glass rounded-xl px-4 py-3 inline-flex items-center gap-2 mb-0">
          <TerminalInput />
        </div>
      </motion.div>
    </div>
  );
}
