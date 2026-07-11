import { z } from "zod";

const envSchema = z.object({
  GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required"),
  GITHUB_USERNAME: z.string().optional().default(""),
  GITHUB_TOKEN: z.string().optional().default(""),
});

export const env = envSchema.parse({
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  GITHUB_USERNAME: process.env.GITHUB_USERNAME || "",
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || "",
});
