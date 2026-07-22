import type { Metadata } from "next";
import "./globals.css";
import { getContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
<<<<<<< HEAD
  try {
    const { profile } = await getContent();
    return {
      title: `${profile.name} — Financial Analyst & Dashboard Developer`,
      description: `Portfolio of ${profile.name} — MBA Finance Candidate, Financial Analyst, and Dashboard Developer.`,
    };
  } catch {
    return {
      title: "Portfolio — Financial Analyst & Dashboard Developer",
      description: "Finance analyst portfolio.",
    };
  }
=======
  const { profile } = getContent();
  return {
    title: `${profile.name} — Financial Analyst & Dashboard Developer`,
    description: `Portfolio of ${profile.name} — MBA Finance Candidate, Financial Analyst, and Dashboard Developer.`,
  };
>>>>>>> 14f9ea2e54fb7d96f0850f6a560e90d3bcfe0b90
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
