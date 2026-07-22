import type { Profile } from "@/lib/content";

export default function Footer({ profile }: { profile: Profile }) {
  return (
    <footer>
      <div className="wrap foot-inner">
        <div className="foot-left">Built by {profile.name} · © 2026</div>
        <div className="foot-links">
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
          )}
          {profile.github ? (
            <a href={profile.github} target="_blank" rel="noopener">
              GitHub
            </a>
          ) : (
            <a href="#contact">GitHub</a>
          )}
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
