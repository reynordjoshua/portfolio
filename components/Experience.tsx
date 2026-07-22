"use client";

import { motion } from "framer-motion";
import type { ExperienceItem } from "@/lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

export default function Experience({ experience }: { experience: ExperienceItem[] }) {
  return (
    <section id="experience" className="section-border-top">
      <div className="wrap">
        <motion.span
          className="eyebrow"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.span>
        <motion.h2
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          Where the numbers took me
        </motion.h2>

        <div className="exp-timeline">
          {experience.map((exp, i) => (
            <motion.div
              className={`exp-node ${exp.current ? "current" : ""}`}
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <div className="exp-card">
                <div className="exp-top">
                  <div>
                    <div className="exp-role">{exp.role}</div>
                    <div className="exp-org">{exp.org}</div>
                  </div>
                  <span className="exp-date">{exp.date}</span>
                </div>
                {exp.bullets.length > 0 && (
                  <ul className="exp-list">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                )}
                {exp.tags.length > 0 && (
                  <div className="tag-row">
                    {exp.tags.map((t, ti) => (
                      <span className="tag" key={ti}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
