import { getContent } from "@/lib/content";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import AboutSection from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Always read the latest content from disk so admin edits show up on refresh
export const dynamic = "force-dynamic";

<<<<<<< HEAD
export default async function Home() {
  let content;
  try {
    content = await getContent();
  } catch {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 12,
          padding: 40,
          textAlign: "center",
          fontFamily: "monospace",
        }}
      >
        <h1>Can&apos;t reach the content backend</h1>
        <p>
          Make sure the backend server is running and that{" "}
          <code>NEXT_PUBLIC_API_BASE_URL</code> is set correctly.
        </p>
      </main>
    );
  }
=======
export default function Home() {
  const content = getContent();
>>>>>>> 14f9ea2e54fb7d96f0850f6a560e90d3bcfe0b90

  return (
    <>
      <Navbar />
      <Ticker />
      <main id="top">
        <Hero profile={content.profile} />
        <AboutSection
          about={content.about}
          education={content.education}
          certifications={content.certifications}
        />
        <Skills skills={content.skills} />
        <Experience experience={content.experience} />
        <Projects projects={content.projects} />
        <Resume resume={content.resume} profile={content.profile} />
        <Contact profile={content.profile} />
      </main>
      <Footer profile={content.profile} />
    </>
  );
}
