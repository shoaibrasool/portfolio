import { NextResponse } from "next/server";
import { fetchRepos } from "@/lib/github";

export const runtime = "nodejs";
export const revalidate = 3600;

export async function GET() {
  const username = process.env.GITHUB_USERNAME;
  if (!username) {
    return NextResponse.json({ error: "GITHUB_USERNAME not configured" }, { status: 400 });
  }
  const token = process.env.GITHUB_TOKEN;
  try {
    const repos = await fetchRepos(username, token);
    return NextResponse.json(repos);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
