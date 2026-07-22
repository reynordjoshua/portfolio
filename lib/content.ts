<<<<<<< HEAD
=======
import fs from "fs";
import path from "path";

>>>>>>> 14f9ea2e54fb7d96f0850f6a560e90d3bcfe0b90
export interface Profile {
  name: string;
  roleLine: string;
  heroHeadline: string;
  heroDescription: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface AboutStat {
  num: string;
  label: string;
}

export interface About {
  paragraphs: string[];
  stats: AboutStat[];
}

export interface EduItem {
  school: string;
  detail: string;
}

export interface CertItem {
  name: string;
  detail: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillGroup {
  group: string;
  items: SkillItem[];
}

export interface ExperienceItem {
  role: string;
  org: string;
  date: string;
  current: boolean;
  bullets: string[];
  tags: string[];
}

export interface ProjectItem {
  tag: string;
  name: string;
  description: string;
  features: string[];
  liveUrl: string;
  visual: string;
}

export interface Resume {
  pdfUrl: string;
  blurb: string;
}

export interface SiteContent {
  profile: Profile;
  about: About;
  education: EduItem[];
  certifications: CertItem[];
  skills: SkillGroup[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  resume: Resume;
}

<<<<<<< HEAD
// The backend's base URL. Set NEXT_PUBLIC_API_BASE_URL in .env.local (dev) or in your
// hosting provider's environment variables (production) to point at the deployed backend.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

// Resolve a resume/asset path against the backend, unless it's already a full URL
export function resolveAssetUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return pathOrUrl;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${API_BASE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

// Server-side fetch (used in Server Components, e.g. app/page.tsx)
export async function getContent(): Promise<SiteContent> {
  const res = await fetch(`${API_BASE_URL}/api/content`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch content from backend: ${res.status}`);
  }
  return res.json();
=======
const DATA_PATH = path.join(process.cwd(), "data", "content.json");

export function getContent(): SiteContent {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export function saveContent(content: SiteContent): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(content, null, 2), "utf-8");
>>>>>>> 14f9ea2e54fb7d96f0850f6a560e90d3bcfe0b90
}
