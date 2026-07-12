"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (progress === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-[2px] bg-border/30">
      <div
        className="h-full transition-transform duration-150 ease-out"
        style={{
          transform: `scaleX(${progress})`,
          transformOrigin: "left",
          background: "linear-gradient(90deg, var(--accent), var(--cta), var(--success))",
        }}
      />
    </div>
  );
}
