"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/content";
import type {
  SiteContent,
  EduItem,
  CertItem,
  SkillGroup,
  SkillItem,
  ExperienceItem,
  ProjectItem,
} from "@/lib/content";

type Status = { type: "idle" | "saving" | "saved" | "error"; message?: string };

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/content`)
      .then((r) => r.json())
      .then((data) => setContent(data))
      .catch(() =>
        setStatus({
          type: "error",
          message: `Could not reach backend at ${API_BASE_URL}. Is it running?`,
        })
      );
  }, []);

  async function handleSave() {
    if (!content) return;
    setStatus({ type: "saving" });
    try {
      const res = await fetch(`${API_BASE_URL}/api/content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus({ type: "saved", message: "Saved. Refresh the site to see it live." });
    } catch (err) {
      setStatus({ type: "error", message: String(err) });
    }
  }

  if (!content) {
    return (
      <div className="admin-shell">
        <div className="admin-wrap">Loading content…</div>
      </div>
    );
  }

  const set = (updater: (draft: SiteContent) => SiteContent) => {
    setContent((prev) => (prev ? updater(structuredClone(prev)) : prev));
  };

  return (
    <div className="admin-shell">
      <div className="admin-nav">
        <div className="logo">
          RJ<span>.</span>admin
        </div>
        <a href="/" className="nav-cta" target="_blank">
          View site ↗
        </a>
      </div>

      <div className="admin-wrap">
        {/* PROFILE */}
        <div className="admin-card">
          <h2>Profile</h2>
          <label className="admin-label">Full name</label>
          <input
            className="admin-input"
            value={content.profile.name}
            onChange={(e) =>
              set((d) => ((d.profile.name = e.target.value), d))
            }
          />
          <label className="admin-label">Role line (separate with |)</label>
          <input
            className="admin-input"
            value={content.profile.roleLine}
            onChange={(e) => set((d) => ((d.profile.roleLine = e.target.value), d))}
          />
          <label className="admin-label">Hero headline (after your name)</label>
          <input
            className="admin-input"
            value={content.profile.heroHeadline}
            onChange={(e) => set((d) => ((d.profile.heroHeadline = e.target.value), d))}
          />
          <label className="admin-label">Hero description</label>
          <textarea
            className="admin-textarea"
            value={content.profile.heroDescription}
            onChange={(e) => set((d) => ((d.profile.heroDescription = e.target.value), d))}
          />
          <label className="admin-label">Email</label>
          <input
            className="admin-input"
            value={content.profile.email}
            onChange={(e) => set((d) => ((d.profile.email = e.target.value), d))}
          />
          <label className="admin-label">Phone</label>
          <input
            className="admin-input"
            value={content.profile.phone}
            onChange={(e) => set((d) => ((d.profile.phone = e.target.value), d))}
          />
          <label className="admin-label">Location</label>
          <input
            className="admin-input"
            value={content.profile.location}
            onChange={(e) => set((d) => ((d.profile.location = e.target.value), d))}
          />
          <label className="admin-label">LinkedIn URL</label>
          <input
            className="admin-input"
            value={content.profile.linkedin}
            onChange={(e) => set((d) => ((d.profile.linkedin = e.target.value), d))}
          />
          <label className="admin-label">GitHub URL</label>
          <input
            className="admin-input"
            value={content.profile.github}
            onChange={(e) => set((d) => ((d.profile.github = e.target.value), d))}
          />
        </div>

        {/* ABOUT */}
        <div className="admin-card">
          <h2>About</h2>
          <label className="admin-label">Bio paragraphs (one per line)</label>
          <textarea
            className="admin-textarea"
            style={{ minHeight: 160 }}
            value={content.about.paragraphs.join("\n\n")}
            onChange={(e) =>
              set((d) => (
                (d.about.paragraphs = e.target.value.split(/\n\s*\n/).filter(Boolean)), d
              ))
            }
          />
          <label className="admin-label">Stat cards</label>
          {content.about.stats.map((s, i) => (
            <div className="admin-row-item" key={i}>
              <button
                className="admin-remove"
                onClick={() =>
                  set((d) => ((d.about.stats = d.about.stats.filter((_, idx) => idx !== i)), d))
                }
              >
                Remove
              </button>
              <label className="admin-label">Number / value</label>
              <input
                className="admin-input"
                value={s.num}
                onChange={(e) =>
                  set((d) => ((d.about.stats[i].num = e.target.value), d))
                }
              />
              <label className="admin-label">Label</label>
              <input
                className="admin-input"
                value={s.label}
                onChange={(e) =>
                  set((d) => ((d.about.stats[i].label = e.target.value), d))
                }
              />
            </div>
          ))}
          <button
            className="admin-add"
            onClick={() =>
              set((d) => ((d.about.stats.push({ num: "", label: "" })), d))
            }
          >
            + Add stat card
          </button>
        </div>

        {/* EDUCATION */}
        <div className="admin-card">
          <h2>Education</h2>
          {content.education.map((e, i) => (
            <EduRow
              key={i}
              item={e}
              onChange={(next) => set((d) => ((d.education[i] = next), d))}
              onRemove={() =>
                set((d) => ((d.education = d.education.filter((_, idx) => idx !== i)), d))
              }
            />
          ))}
          <button
            className="admin-add"
            onClick={() =>
              set((d) => ((d.education.push({ school: "", detail: "" })), d))
            }
          >
            + Add education entry
          </button>
        </div>

        {/* CERTIFICATIONS */}
        <div className="admin-card">
          <h2>Certifications</h2>
          {content.certifications.map((c, i) => (
            <CertRow
              key={i}
              item={c}
              onChange={(next) => set((d) => ((d.certifications[i] = next), d))}
              onRemove={() =>
                set((d) => (
                  (d.certifications = d.certifications.filter((_, idx) => idx !== i)), d
                ))
              }
            />
          ))}
          <button
            className="admin-add"
            onClick={() =>
              set((d) => ((d.certifications.push({ name: "", detail: "" })), d))
            }
          >
            + Add certification
          </button>
        </div>

        {/* SKILLS */}
        <div className="admin-card">
          <h2>Skills</h2>
          {content.skills.map((group, gi) => (
            <div className="admin-row-item" key={gi}>
              <button
                className="admin-remove"
                onClick={() =>
                  set((d) => ((d.skills = d.skills.filter((_, idx) => idx !== gi)), d))
                }
              >
                Remove group
              </button>
              <label className="admin-label">Group title</label>
              <input
                className="admin-input"
                value={group.group}
                onChange={(e) =>
                  set((d) => ((d.skills[gi].group = e.target.value), d))
                }
              />
              <label className="admin-label">Skills in this group</label>
              {group.items.map((item, ii) => (
                <div
                  key={ii}
                  style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}
                >
                  <input
                    className="admin-input"
                    style={{ flex: 2 }}
                    placeholder="Skill name"
                    value={item.name}
                    onChange={(e) =>
                      set((d) => ((d.skills[gi].items[ii].name = e.target.value), d))
                    }
                  />
                  <input
                    className="admin-input"
                    style={{ flex: 1 }}
                    type="number"
                    min={0}
                    max={100}
                    placeholder="Level %"
                    value={item.level}
                    onChange={(e) =>
                      set((d) => (
                        (d.skills[gi].items[ii].level = Number(e.target.value)), d
                      ))
                    }
                  />
                  <button
                    className="admin-remove"
                    style={{ position: "static" }}
                    onClick={() =>
                      set((d) => (
                        (d.skills[gi].items = d.skills[gi].items.filter((_, x) => x !== ii)), d
                      ))
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                className="admin-add"
                onClick={() =>
                  set((d) => (
                    (d.skills[gi].items.push({ name: "", level: 80 } as SkillItem)), d
                  ))
                }
              >
                + Add skill
              </button>
            </div>
          ))}
          <button
            className="admin-add"
            onClick={() =>
              set((d) => (
                (d.skills.push({ group: "New Group", items: [] } as SkillGroup)), d
              ))
            }
          >
            + Add skill group
          </button>
        </div>

        {/* EXPERIENCE */}
        <div className="admin-card">
          <h2>Experience</h2>
          {content.experience.map((exp, i) => (
            <div className="admin-row-item" key={i}>
              <button
                className="admin-remove"
                onClick={() =>
                  set((d) => (
                    (d.experience = d.experience.filter((_, idx) => idx !== i)), d
                  ))
                }
              >
                Remove
              </button>
              <label className="admin-label">Role / title</label>
              <input
                className="admin-input"
                value={exp.role}
                onChange={(e) =>
                  set((d) => ((d.experience[i].role = e.target.value), d))
                }
              />
              <label className="admin-label">Organization</label>
              <input
                className="admin-input"
                value={exp.org}
                onChange={(e) =>
                  set((d) => ((d.experience[i].org = e.target.value), d))
                }
              />
              <label className="admin-label">Date label</label>
              <input
                className="admin-input"
                value={exp.date}
                onChange={(e) =>
                  set((d) => ((d.experience[i].date = e.target.value), d))
                }
              />
              <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) =>
                    set((d) => ((d.experience[i].current = e.target.checked), d))
                  }
                />
                <span className="admin-label" style={{ margin: 0 }}>
                  Mark as current
                </span>
              </label>
              <label className="admin-label">Bullets (one per line)</label>
              <textarea
                className="admin-textarea"
                value={exp.bullets.join("\n")}
                onChange={(e) =>
                  set((d) => (
                    (d.experience[i].bullets = e.target.value.split("\n").filter(Boolean)), d
                  ))
                }
              />
              <label className="admin-label">Tags (comma separated)</label>
              <input
                className="admin-input"
                value={exp.tags.join(", ")}
                onChange={(e) =>
                  set((d) => (
                    (d.experience[i].tags = e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)),
                    d
                  ))
                }
              />
            </div>
          ))}
          <button
            className="admin-add"
            onClick={() =>
              set((d) => (
                (d.experience.push({
                  role: "New Role",
                  org: "",
                  date: "",
                  current: false,
                  bullets: [],
                  tags: [],
                } as ExperienceItem)),
                d
              ))
            }
          >
            + Add experience entry
          </button>
        </div>

        {/* PROJECTS */}
        <div className="admin-card">
          <h2>Projects</h2>
          {content.projects.map((p, i) => (
            <div className="admin-row-item" key={i}>
              <button
                className="admin-remove"
                onClick={() =>
                  set((d) => ((d.projects = d.projects.filter((_, idx) => idx !== i)), d))
                }
              >
                Remove
              </button>
              <label className="admin-label">Tag (e.g. Independent Project · 01)</label>
              <input
                className="admin-input"
                value={p.tag}
                onChange={(e) =>
                  set((d) => ((d.projects[i].tag = e.target.value), d))
                }
              />
              <label className="admin-label">Project name</label>
              <input
                className="admin-input"
                value={p.name}
                onChange={(e) =>
                  set((d) => ((d.projects[i].name = e.target.value), d))
                }
              />
              <label className="admin-label">Description</label>
              <textarea
                className="admin-textarea"
                value={p.description}
                onChange={(e) =>
                  set((d) => ((d.projects[i].description = e.target.value), d))
                }
              />
              <label className="admin-label">Features (comma separated)</label>
              <input
                className="admin-input"
                value={p.features.join(", ")}
                onChange={(e) =>
                  set((d) => (
                    (d.projects[i].features = e.target.value
                      .split(",")
                      .map((f) => f.trim())
                      .filter(Boolean)),
                    d
                  ))
                }
              />
              <label className="admin-label">Live URL</label>
              <input
                className="admin-input"
                value={p.liveUrl}
                onChange={(e) =>
                  set((d) => ((d.projects[i].liveUrl = e.target.value), d))
                }
              />
              <label className="admin-label">Visual style</label>
              <select
                className="admin-input"
                value={p.visual}
                onChange={(e) =>
                  set((d) => ((d.projects[i].visual = e.target.value), d))
                }
              >
                <option value="bars">Bar chart</option>
                <option value="line">Line chart</option>
              </select>
            </div>
          ))}
          <button
            className="admin-add"
            onClick={() =>
              set((d) => (
                (d.projects.push({
                  tag: `Independent Project · ${String(d.projects.length + 1).padStart(2, "0")}`,
                  name: "New Project",
                  description: "",
                  features: [],
                  liveUrl: "",
                  visual: "bars",
                } as ProjectItem)),
                d
              ))
            }
          >
            + Add project
          </button>
        </div>

        {/* RESUME */}
        <div className="admin-card">
          <h2>Resume</h2>
          <label className="admin-label">PDF path or URL (e.g. /resume.pdf)</label>
          <input
            className="admin-input"
            value={content.resume.pdfUrl}
            onChange={(e) => set((d) => ((d.resume.pdfUrl = e.target.value), d))}
          />
          <label className="admin-label">Blurb</label>
          <textarea
            className="admin-textarea"
            value={content.resume.blurb}
            onChange={(e) => set((d) => ((d.resume.blurb = e.target.value), d))}
          />
          <p className="form-note" style={{ marginTop: 10 }}>
            To replace the actual PDF file, drop a new file at <code>public/resume.pdf</code> in
            the project (or update the path above to point elsewhere).
          </p>
        </div>
      </div>

      <div className="admin-save-bar">
        {status.type === "saved" && (
          <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--green)" }}>
            {status.message}
          </span>
        )}
        {status.type === "error" && (
          <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "#f87171" }}>
            {status.message}
          </span>
        )}
        <button className="btn btn-primary" onClick={handleSave} disabled={status.type === "saving"}>
          {status.type === "saving" ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

function EduRow({
  item,
  onChange,
  onRemove,
}: {
  item: EduItem;
  onChange: (next: EduItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="admin-row-item">
      <button className="admin-remove" onClick={onRemove}>
        Remove
      </button>
      <label className="admin-label">School</label>
      <input
        className="admin-input"
        value={item.school}
        onChange={(e) => onChange({ ...item, school: e.target.value })}
      />
      <label className="admin-label">Detail line</label>
      <input
        className="admin-input"
        value={item.detail}
        onChange={(e) => onChange({ ...item, detail: e.target.value })}
      />
    </div>
  );
}

function CertRow({
  item,
  onChange,
  onRemove,
}: {
  item: CertItem;
  onChange: (next: CertItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="admin-row-item">
      <button className="admin-remove" onClick={onRemove}>
        Remove
      </button>
      <label className="admin-label">Certification name</label>
      <input
        className="admin-input"
        value={item.name}
        onChange={(e) => onChange({ ...item, name: e.target.value })}
      />
      <label className="admin-label">Detail line</label>
      <input
        className="admin-input"
        value={item.detail}
        onChange={(e) => onChange({ ...item, detail: e.target.value })}
      />
    </div>
  );
}
