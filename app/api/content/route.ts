import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent, SiteContent } from "@/lib/content";

export async function GET() {
  try {
    const content = getContent();
    return NextResponse.json(content);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to read content", detail: String(err) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SiteContent;

    // Minimal shape validation so a malformed save can't corrupt the file
    const requiredKeys: (keyof SiteContent)[] = [
      "profile",
      "about",
      "education",
      "certifications",
      "skills",
      "experience",
      "projects",
      "resume",
    ];
    for (const key of requiredKeys) {
      if (!(key in body)) {
        return NextResponse.json(
          { error: `Missing "${key}" in payload` },
          { status: 400 }
        );
      }
    }

    saveContent(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to save content", detail: String(err) },
      { status: 500 }
    );
  }
}
