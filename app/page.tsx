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

export default function Home() {
  const content = getContent();

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
