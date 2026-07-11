"use client";

import { useState, useEffect } from "react";

const phrases = [
  "const dev = new Developer()",
  "dev.buildCoolStuff()",
  "> npm run deploy",
  "$ git push origin main",
  "while(alive) { code(); }",
  "select * from innovations;",
];

export default function TerminalInput() {
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < phrase.length) {
      timeout = setTimeout(() => setCharIndex((p) => p + 1), 60);
    } else if (!isDeleting && charIndex === phrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((p) => p - 1), 30);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setIndex((p) => (p + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]);

  return (
    <div className="flex items-center gap-2 text-sm font-mono text-text-secondary">
      <span className="text-accent">{">"}</span>
      <span>{phrases[index].slice(0, charIndex)}</span>
      <span className="w-[2px] h-4 bg-accent animate-pulse" />
    </div>
  );
}
