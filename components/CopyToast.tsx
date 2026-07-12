"use client";

import { useState, useCallback } from "react";

export function useCopyToast() {
  const [toast, setToast] = useState<string | null>(null);

  const copy = useCallback(async (text: string, label?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast(label || "Copied!");
      setTimeout(() => setToast(null), 2000);
    } catch {
      setToast("Failed to copy");
      setTimeout(() => setToast(null), 2000);
    }
  }, []);

  return { toast, copy };
}

export default function CopyToast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl glass border border-border animate-toast-in">
      <span className="text-xs font-mono text-text-secondary">{message}</span>
    </div>
  );
}
