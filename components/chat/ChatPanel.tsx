"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { ChatMessage, AgentTool } from "@/lib/types";
import MessageBubble from "./MessageBubble";
import SuggestedQuestions from "./SuggestedQuestions";

interface ChatPanelProps {
  onToolCall: (tool: AgentTool) => void;
}

export default function ChatPanel({ onToolCall }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "0",
      role: "assistant",
      content: "Hey! I'm an AI assistant that knows everything about my creator. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isLoading]);

  const parseToolCalls = useCallback(
    (text: string): { cleanText: string; tools: AgentTool[] } => {
      const tools: AgentTool[] = [];
      const regex = /\[TOOL:(\w+)(?::([^\]]+))?\]/g;
      let match;
      while ((match = regex.exec(text)) !== null) {
        const [_, type, param] = match;
        switch (type) {
          case "showProject":
            if (param) tools.push({ type: "showProject", slug: param });
            break;
          case "showSkills":
            tools.push({ type: "showSkills" });
            break;
          case "showTimeline":
            tools.push({ type: "showTimeline" });
            break;
          case "showContact":
            tools.push({ type: "showContact" });
            break;
          case "showGallery":
            tools.push({ type: "showGallery" });
            break;
          case "hidePanel":
            tools.push({ type: "hidePanel" });
            break;
          case "scrollTimelineTo":
            if (param) tools.push({ type: "scrollTimelineTo", year: param });
            break;
          case "highlightSkill":
            if (param) tools.push({ type: "highlightSkill", skill: param });
            break;
          case "setTheme":
            if (param === "dark" || param === "light")
              tools.push({ type: "setTheme", theme: param });
            break;
          case "playGame":
            tools.push({ type: "playGame" });
            break;
        }
      }
      const cleanText = text.replace(/\[TOOL:\w+(?::[^\]]+)?\]\n*/g, "").trim();
      return { cleanText, tools };
    },
    []
  );

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: ChatMessage = { id: Date.now().toString(), role: "user", content };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      const assistantId = (Date.now() + 1).toString();
      const assistantMessage: ChatMessage = { id: assistantId, role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMessage]);

      try {
        const chatHistory = messages
          .filter((m) => m.id !== "0" || m.content)
          .concat(userMessage)
          .map((m) => ({ role: m.role, content: m.content }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: chatHistory }),
        });

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((l) => l.startsWith("0:"));
          for (const line of lines) {
            try {
              const jsonStr = line.slice(2).trim();
              const parsed = JSON.parse(jsonStr);
              fullText += parsed;
              const { cleanText, tools } = parseToolCalls(fullText);
              setMessages((prev) =>
                prev.map((m) => (m.id === assistantId ? { ...m, content: cleanText, toolCalls: tools } : m))
              );
            } catch { /* continue */ }
          }
        }

        const { cleanText, tools } = parseToolCalls(fullText);
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: cleanText, toolCalls: tools } : m))
        );
        for (const tool of tools) onToolCall(tool);
      } catch (err) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: "Sorry, I hit an error. Please try again." }
              : m
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, onToolCall, parseToolCalls]
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-text-muted text-xs font-mono ml-9">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.2s" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-border p-3 space-y-2">
        {messages.length === 1 && (
          <SuggestedQuestions onSelect={(q) => sendMessage(q)} />
        )}
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="flex-1 bg-bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm
                       text-text-primary placeholder-text-muted outline-none
                       focus:border-accent/50 focus:ring-1 focus:ring-accent/30
                       disabled:opacity-50 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2.5 bg-accent hover:bg-accent/80 disabled:opacity-40 
                       rounded-xl text-sm font-medium text-white transition-all"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
