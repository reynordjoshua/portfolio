import type { Metadata } from "next";
import "./globals.css";
import { getContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = getContent();
  return {
    title: `${profile.name} — Financial Analyst & Dashboard Developer`,
    description: `Portfolio of ${profile.name} — MBA Finance Candidate, Financial Analyst, and Dashboard Developer.`,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-grid">{children}</body>
    </html>
  );
}
