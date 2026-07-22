"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Profile } from "@/lib/content";

export default function Contact({ profile }: { profile: Profile }) {
  const [note, setNote] = useState(
    "This form is a front-end demo — wire it up to Formspree, Resend, or an API route to actually receive messages."
  );

  return (
    <section id="contact" className="section-border-top">
      <div className="wrap contact-grid">
        <div>
          <span className="eyebrow">Contact</span>
          <h2 className="section-title" style={{ marginBottom: 26 }}>
            Let&apos;s talk numbers
          </h2>
          <motion.div
            className="contact-cards"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="ccard">
              <div className="icn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 6l-10 7L2 6" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
              </div>
              <div>
                <div className="lbl">Email</div>
                <div className="val">
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </div>
              </div>
            </div>
            <div className="ccard">
              <div className="icn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <div className="lbl">Phone</div>
                <div className="val">{profile.phone}</div>
              </div>
            </div>
            <div className="ccard">
              <div className="icn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="lbl">Location</div>
                <div className="val">{profile.location}</div>
              </div>
            </div>
            <div className="ccard">
              <div className="icn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <div>
                <div className="lbl">LinkedIn</div>
                <div className="val">
                  {profile.linkedin ? (
                    <a href={profile.linkedin} target="_blank" rel="noopener">
                      linkedin.com/in/{profile.linkedin.split("/in/")[1]?.replace(/\/$/, "")}
                    </a>
                  ) : (
                    "Add your LinkedIn URL here"
                  )}
                </div>
              </div>
            </div>
            <div className="ccard">
              <div className="icn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
              </div>
              <div>
                <div className="lbl">GitHub</div>
                <div className="val">
                  {profile.github ? (
                    <a href={profile.github} target="_blank" rel="noopener">
                      {profile.github.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    "Add your GitHub URL here"
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              setNote(
                "This is a static demo form — connect it to a form backend (e.g. Formspree) to receive messages."
              );
            }}
          >
            <div className="form-row">
              <div className="field">
                <label>Name</label>
                <input type="text" placeholder="Your name" required />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" placeholder="you@company.com" required />
              </div>
            </div>
            <div className="field">
              <label>Subject</label>
              <input type="text" placeholder="Let's talk about..." />
            </div>
            <div className="field">
              <label>Message</label>
              <textarea placeholder="Tell me about the role or opportunity" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
              Send message →
            </button>
            <p className="form-note">{note}</p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
