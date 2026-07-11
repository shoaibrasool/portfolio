"use client";

import { useEffect, useRef } from "react";

export default function Spotlight() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!divRef.current) return;
      divRef.current.style.setProperty("--x", `${e.clientX}px`);
      divRef.current.style.setProperty("--y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div
      ref={divRef}
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-500"
      style={{
        background: "radial-gradient(600px at var(--x, 0) var(--y, 0), rgba(108, 92, 231, 0.06), transparent 80%)",
      }}
    />
  );
}
