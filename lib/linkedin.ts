import type { LinkedInData } from "./types";

/**
 * Parse a LinkedIn data export ZIP file.
 * Extracts experience, education, and skills from CSV files inside the archive.
 */
export async function parseLinkedInZip(buffer: ArrayBuffer): Promise<LinkedInData> {
  const JSZip = (await import("jszip")).default;
  const zip = await JSZip.loadAsync(buffer);

  const result: LinkedInData = { experience: [], education: [], skills: [] };

  const parseCSV = async (fileName: string): Promise<string[][]> => {
    const file = zip.file(fileName);
    if (!file) return [];
    const text = await file.async("string");
    const lines = text.split("\n").filter(Boolean);
    if (lines.length < 2) return [];
    return lines.slice(1).map((line) => {
      const row: string[] = [];
      let current = "";
      let inQuotes = false;
      for (const char of line) {
        if (char === '"') { inQuotes = !inQuotes; continue; }
        if (char === "," && !inQuotes) { row.push(current.trim()); current = ""; continue; }
        current += char;
      }
      row.push(current.trim());
      return row;
    });
  };

  const expRows = await parseCSV("Work Experience.csv");
  for (const row of expRows) {
    if (row.length < 5) continue;
    result.experience.push({
      company: row[0] || "",
      title: row[1] || "",
      location: row[3] || "",
      start: row[4] || "",
      end: row[5] || "",
      description: row[6] || "",
    });
  }

  const eduRows = await parseCSV("Education.csv");
  for (const row of eduRows) {
    if (row.length < 3) continue;
    result.education.push({
      institution: row[0] || "",
      degree: row[1] || "",
      field: row[2] || "",
      start: row[3] || "",
      end: row[4] || "",
    });
  }

  const skillRows = await parseCSV("Skills.csv");
  for (const row of skillRows) {
    if (row[0]) result.skills.push(row[0].trim());
  }

  return result;
}
