import fs from "fs";
import path from "path";

export type Category =
  | "graphic"
  | "motion"
  | "video"
  | "illustration"
  | "ai"
  | "craft"
  | "collaborations"
  | "animation";

export interface Project {
  slug: string;
  year: number;
  categories: Category[];
  title: { en: string; tr: string };
  shortDescription: { en: string; tr: string };
  longDescription: { en: string; tr: string };
  tools: string[];
  coverImage: string;
  gallery: string[];
  videos: { type: string; id: string }[];
  client: string | null;
  featured: boolean;
}

const projectsDir = path.join(process.cwd(), "content/projects");

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".json"));
  const projects = files.map((file) => {
    const content = fs.readFileSync(path.join(projectsDir, file), "utf-8");
    return JSON.parse(content) as Project;
  });
  // Sort by year descending (newest first)
  return projects.sort((a, b) => b.year - a.year);
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(projectsDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as Project;
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getAltGaleriFiles(projectSlug: string): string[] {
  const altGaleriDir = path.join(
    process.cwd(),
    `public/images/works/${projectSlug}/alt_galeri`
  );

  try {
    if (!fs.existsSync(altGaleriDir)) return [];

    const files = fs.readdirSync(altGaleriDir)
      .filter((f) => {
        const ext = path.extname(f).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".webp", ".mp4", ".webm"].includes(ext);
      })
      .sort()
      .map((f) => `/images/works/${projectSlug}/alt_galeri/${f}`);

    return files;
  } catch {
    return [];
  }
}
