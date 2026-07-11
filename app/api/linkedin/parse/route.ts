import { NextResponse } from "next/server";
import { parseLinkedInZip } from "@/lib/linkedin";
import { writeFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const linkedinData = await parseLinkedInZip(buffer);

  const filePath = path.join(process.cwd(), "data", "linkedin-data.json");
  await writeFile(filePath, JSON.stringify(linkedinData, null, 2));

  return NextResponse.json({
    success: true,
    experience: linkedinData.experience.length,
    education: linkedinData.education.length,
    skills: linkedinData.skills.length,
  });
}
