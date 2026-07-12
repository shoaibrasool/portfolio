import type { GitHubRepo } from "./types";

function headers(token?: string): Record<string, string> {
  const h: Record<string, string> = { Accept: "application/vnd.github.v3+json" };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

const excludeRepos = new Set(["Portfolio"]);

export async function fetchRepos(username: string, token?: string): Promise<GitHubRepo[]> {
  const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=50&type=public`;
  const res = await fetch(url, { headers: headers(token), next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`GitHub API: ${res.status} ${res.statusText}`);
  const repos: GitHubRepo[] = await res.json();
  return repos.filter((r) => !excludeRepos.has(r.name));
}

export async function fetchLanguages(repoFullName: string, token?: string): Promise<Record<string, number>> {
  const url = `https://api.github.com/repos/${repoFullName}/languages`;
  const res = await fetch(url, { headers: headers(token), next: { revalidate: 86400 } });
  if (!res.ok) return {};
  return res.json();
}

export async function fetchReadme(repoFullName: string, token?: string): Promise<string | null> {
  const url = `https://api.github.com/repos/${repoFullName}/readme`;
  const res = await fetch(url, {
    headers: { ...headers(token), Accept: "application/vnd.github.raw" },
    next: { revalidate: 86400 },
  });
  if (!res.ok) return null;
  return res.text();
}

export async function fetchContributions(username: string): Promise<{ date: string; count: number }[]> {
  try {
    const query = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { login: username } }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const weeks = json.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
    return weeks.flatMap((w: { contributionDays: { date: string; contributionCount: number }[] }) =>
      w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
    );
  } catch {
    return [];
  }
}
