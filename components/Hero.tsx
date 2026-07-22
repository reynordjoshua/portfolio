"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Profile } from "@/lib/content";

const SPARK_POINTS = "0,90 40,70 80,78 120,50 160,58 200,30 240,38 280,15 320,20";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let cur = 0;
    const step = Math.max(1, Math.round(target / 30));
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) {
        cur = target;
        clearInterval(t);
      }
      setVal(cur);
    }, 40);
    return () => clearInterval(t);
  }, [target]);
  return <>{val}{suffix}</>;
}

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="hero" id="top-hero">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">Available for opportunities</span>
          <h1>
            {profile.name}
            <br />
            <span className="accent">{profile.heroHeadline}</span>
          </h1>
          <div className="hero-sub">
            {profile.roleLine.split("|").map((part, i, arr) => (
              <span key={i}>
                {part.trim().toUpperCase()}
                {i < arr.length - 1 && <span className="dot">•</span>}
              </span>
            ))}
          </div>
          <p className="hero-desc">{profile.heroDescription}</p>
          <div className="btn-row">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#resume" className="btn btn-outline">
              Download Resume
            </a>
            <a href="#contact" className="btn btn-ghost">
              Contact me →
            </a>
          </div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="chart-card">
            <div className="chart-card-head">
              <span className="label">Portfolio growth model</span>
              <span className="value">▲ 24.6%</span>
            </div>
            <div className="sparkline-wrap">
              <svg viewBox="0 0 320 120" width="100%" height="120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polyline
                  points={SPARK_POINTS + " 320,120 0,120"}
                  fill="url(#sparkFill)"
                  stroke="none"
                />
                <motion.polyline
                  points={SPARK_POINTS}
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.2, ease: "easeOut", delay: 0.3 }}
                />
              </svg>
              <div className="float-badge fb1">
                <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
                  <path d="M3 17l6-6 4 4 8-8" />
                </svg>
                Excel
              </div>
              <div className="float-badge fb2">
                <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                  <rect x="3" y="10" width="4" height="10" />
                  <rect x="10" y="4" width="4" height="16" />
                  <rect x="17" y="7" width="4" height="13" />
                </svg>
                Power BI
              </div>
              <div className="float-badge fb3">
                <svg viewBox="0 0 24 24" fill="none" stroke="#f5b942" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
                Python
              </div>
            </div>
            <div className="stat-row">
              <div className="stat-cell">
                <div className="num"><Counter target={1} /></div>
                <div className="cap">Internship</div>
              </div>
              <div className="stat-cell">
                <div className="num"><Counter target={2} /></div>
                <div className="cap">Live Projects</div>
              </div>
              <div className="stat-cell">
                <div className="num"><Counter target={5} suffix="+" /></div>
                <div className="cap">Technologies</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
