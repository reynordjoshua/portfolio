"use client";

import { motion } from "framer-motion";
import type { Resume as ResumeType, Profile } from "@/lib/content";
import { resolveAssetUrl } from "@/lib/content";

export default function Resume({ resume, profile }: { resume: ResumeType; profile: Profile }) {
  const pdfHref = resolveAssetUrl(resume.pdfUrl);
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
            <a href={pdfHref} download className="btn btn-primary">
              Download PDF ↓
            </a>
            <a href={pdfHref} target="_blank" className="btn btn-outline" rel="noreferrer">
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
