"use client";

import type { ChatMessage } from "@/lib/types";

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
      {!isUser && (
        <div className="w-7 h-7 mt-1 mr-2 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
          <span className="text-xs text-accent-light font-mono">AI</span>
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-accent/20 text-text-primary border border-accent/30"
            : "glass text-text-primary"
        }`}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
      {isUser && (
        <div className="w-7 h-7 mt-1 ml-2 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0">
          <span className="text-xs text-white font-mono">U</span>
        </div>
      )}
    </div>
  );
}
