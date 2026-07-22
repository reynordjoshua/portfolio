"use client";

import { motion } from "framer-motion";
import type { Resume as ResumeType, Profile } from "@/lib/content";
<<<<<<< HEAD
import { resolveAssetUrl } from "@/lib/content";

export default function Resume({ resume, profile }: { resume: ResumeType; profile: Profile }) {
  const pdfHref = resolveAssetUrl(resume.pdfUrl);
=======

export default function Resume({ resume, profile }: { resume: ResumeType; profile: Profile }) {
>>>>>>> 14f9ea2e54fb7d96f0850f6a560e90d3bcfe0b90
  return (
    <section id="resume" className="section-border-top">
      <div className="wrap">
        <span className="eyebrow">Resume</span>
        <h2 className="section-title">The one-page version</h2>
        <motion.div
          className="resume-card"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="resume-left">
            <h3>{profile.name} — Resume</h3>
            <p>{resume.blurb}</p>
          </div>
          <div className="resume-right">
<<<<<<< HEAD
            <a href={pdfHref} download className="btn btn-primary">
              Download PDF ↓
            </a>
            <a href={pdfHref} target="_blank" className="btn btn-outline" rel="noreferrer">
=======
            <a href={resume.pdfUrl} download className="btn btn-primary">
              Download PDF ↓
            </a>
            <a href={resume.pdfUrl} target="_blank" className="btn btn-outline" rel="noreferrer">
>>>>>>> 14f9ea2e54fb7d96f0850f6a560e90d3bcfe0b90
              Preview
            </a>
            <a href="#contact" className="btn btn-ghost">
              Contact me ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
