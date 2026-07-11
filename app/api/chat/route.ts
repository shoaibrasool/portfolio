import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import { buildSystemPrompt } from "@/lib/agents";
import profile from "@/data/profile.json";
import linkedin from "@/data/linkedin-data.json";
import { fetchRepos } from "@/lib/github";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const username = process.env.GITHUB_USERNAME || profile.social.github;
  const token = process.env.GITHUB_TOKEN;

  let repos: import("@/lib/types").GitHubRepo[] = [];
  try {
    repos = await fetchRepos(username, token);
  } catch {
    repos = [];
  }

  const systemPrompt = buildSystemPrompt(
    profile as import("@/lib/types").Profile,
    linkedin as import("@/lib/types").LinkedInData,
    repos
  );

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: systemPrompt,
    messages: messages.map((m: { role: string; content: string }) => ({
      role: m.role,
      content: m.content,
    })),
  });

  return result.toTextStreamResponse();
}
