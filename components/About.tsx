"use client";

import { motion } from "framer-motion";
import type { About, EduItem, CertItem } from "@/lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

export default function AboutSection({
  about,
  education,
  certifications,
}: {
  about: About;
  education: EduItem[];
  certifications: CertItem[];
}) {
  return (
    <section id="about" className="section-border-top">
      <div className="wrap">
        <motion.span
          className="eyebrow"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          About
        </motion.span>
        <motion.h2
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          The story so far
        </motion.h2>

        <div className="about-grid">
          <motion.div
            className="about-copy"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>

          <motion.div
            className="stat-cards"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {about.stats.map((s, i) => (
              <div className="scard" key={i}>
                <div className="num">{s.num}</div>
                <div className="cap">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="edu-grid"
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
          }}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="g-title">Education</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {education.map((e, i) => (
                <div className={`edu-item ${i === 0 ? "accent-blue" : ""}`} key={i}>
                  <div className="title">{e.school}</div>
                  <div className="detail">{e.detail}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="g-title">Certifications</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {certifications.map((c, i) => (
                <div className={`edu-item ${i === 0 ? "accent-cyan" : ""}`} key={i}>
                  <div className="title">{c.name}</div>
                  <div className="detail">{c.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
