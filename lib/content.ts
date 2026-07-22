import fs from "fs";
import path from "path";

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

const DATA_PATH = path.join(process.cwd(), "data", "content.json");

export function getContent(): SiteContent {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export function saveContent(content: SiteContent): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(content, null, 2), "utf-8");
}
