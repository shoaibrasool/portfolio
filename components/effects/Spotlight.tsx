"use client";

import { useEffect, useRef } from "react";

function getAccentRGB(): string {
  const style = getComputedStyle(document.documentElement);
  const color = style.getPropertyValue("--accent").trim();
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export default function Spotlight() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!divRef.current) return;
      const rgb = getAccentRGB();
      divRef.current.style.setProperty("--x", `${e.clientX}px`);
      divRef.current.style.setProperty("--y", `${e.clientY}px`);
      divRef.current.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(${rgb}, 0.06), transparent 80%)`;
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div
      ref={divRef}
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-500"
    />
  );
}
