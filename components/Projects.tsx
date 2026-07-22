"use client";

import { motion } from "framer-motion";
import type { ProjectItem } from "@/lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

function ProjectVisual({ visual }: { visual: string }) {
  if (visual === "line") {
    return (
      <svg width="150" height="110" viewBox="0 0 150 110" fill="none">
        <polyline
          points="0,90 25,70 50,78 75,45 100,55 125,20 150,30"
          stroke="#22d3ee"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="125" cy="20" r="4" fill="#34d399" />
        <circle cx="75" cy="45" r="4" fill="#3b82f6" />
      </svg>
    );
  }
  return (
    <svg width="150" height="110" viewBox="0 0 150 110" fill="none">
      <rect x="10" y="60" width="18" height="40" rx="2" fill="#3b82f6" opacity="0.85" />
      <rect x="38" y="40" width="18" height="60" rx="2" fill="#22d3ee" opacity="0.85" />
      <rect x="66" y="20" width="18" height="80" rx="2" fill="#3b82f6" opacity="0.6" />
      <rect x="94" y="50" width="18" height="50" rx="2" fill="#22d3ee" opacity="0.6" />
      <rect x="122" y="30" width="18" height="70" rx="2" fill="#34d399" opacity="0.85" />
    </svg>
  );
}

export default function Projects({ projects }: { projects: ProjectItem[] }) {
  return (
    <section id="projects" className="section-border-top">
      <div className="wrap">
        <motion.span
          className="eyebrow"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Independent Projects
        </motion.span>
        <motion.h2
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          Built and shipped end to end
        </motion.h2>

        <div className="proj-list">
          {projects.map((p, i) => (
            <motion.div
              className="proj-card"
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="proj-visual">
                <span className="mono-tag">/{p.name.toUpperCase().replace(/\s+/g, "-")}</span>
                <ProjectVisual visual={p.visual} />
              </div>
              <div className="proj-body">
                <div className="proj-num">{p.tag}</div>
                <h3 className="proj-name">{p.name}</h3>
                <p className="proj-desc">{p.description}</p>
                <div className="proj-feats">
                  {p.features.map((f, fi) => (
                    <span key={fi}>{f}</span>
                  ))}
                </div>
                <div className="proj-actions">
                  <a href={p.liveUrl} target="_blank" rel="noopener" className="primary">
                    Live Demo ↗
                  </a>
                  <a href="#contact">Ask about the code</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
