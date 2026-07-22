"use client";

import { motion } from "framer-motion";
import type { SkillGroup } from "@/lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

export default function Skills({ skills }: { skills: SkillGroup[] }) {
  return (
    <section id="skills" className="section-border-top">
      <div className="wrap">
        <motion.span
          className="eyebrow"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.span>
        <motion.h2
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          Tools I model and build with
        </motion.h2>

        <div className="skill-groups">
          {skills.map((group, gi) => (
            <motion.div
              className="skill-card"
              key={gi}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: gi * 0.08 }}
            >
              <div className="g-title">{group.group}</div>
              {group.items.map((item, ii) => (
                <div className="skill-row" key={ii}>
                  <span className="skill-name">{item.name}</span>
                  <div className="bar-track">
                    <motion.div
                      className="bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 1.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
