export interface Profile {
  basic: {
    name: string;
    title: string;
    email: string;
    location: string;
    avatar: string;
    bio: string;
    available: boolean;
    pronouns: string;
  };
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
  skills: SkillCategory[];
  education: Education[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  start: string;
  end: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  pushed_at: string;
}

export interface LinkedInData {
  experience: LinkedInExperience[];
  education: LinkedInEducation[];
  skills: string[];
}

export interface LinkedInExperience {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  description: string;
}

export interface LinkedInEducation {
  institution: string;
  degree: string;
  field: string;
  start: string;
  end: string;
}

export type AgentTool =
  | { type: "showProject"; slug: string }
  | { type: "showSkills" }
  | { type: "showTimeline" }
  | { type: "showContact" }
  | { type: "showGallery" }
  | { type: "hidePanel" }
  | { type: "scrollTimelineTo"; year: string }
  | { type: "highlightSkill"; skill: string }
  | { type: "setTheme"; theme: "dark" | "light" | "neon" }
  | { type: "playGame" };

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolCalls?: AgentTool[];
}

export type PanelId = "projects" | "skills" | "timeline" | "contact" | "gallery" | null;
