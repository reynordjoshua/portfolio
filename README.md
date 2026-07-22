# Reynord Joshua K — Portfolio (Next.js + editable backend)

A finance-analyst portfolio site with a real front end/back end split:

- **Frontend** — Next.js 16 + React + Tailwind CSS + Framer Motion (`app/`, `components/`)
- **Backend** — a small API (`app/api/content/route.ts`) that reads/writes `data/content.json`
- **Admin panel** — `/admin`, a form-based editor for every section of the site (profile, about,
  education, certifications, skills, experience, projects, resume). Editing there and clicking
  **Save changes** rewrites `data/content.json`, and the site reflects it on refresh — no code
  editing required.

## 1. Install & run locally

```bash
npm install
npm run dev
```

- Site: http://localhost:3000
- Admin (edit everything here): http://localhost:3000/admin

## 2. How editing works

`data/content.json` is the single source of truth for all site copy: your name, bio, education,
certifications, skills + proficiency bars, experience timeline, both projects (KMF Dashboard,
Olive Capital), and the resume blurb/PDF path.

You can either:
- **Use the admin UI** at `/admin` — safest, no JSON editing needed, or
- **Edit `data/content.json` directly** — it's plain, readable JSON.

To replace the downloadable resume file, drop a new PDF at `public/resume.pdf` (same filename),
or change the path in Admin → Resume → "PDF path or URL".

## 3. Important note about the admin panel in production

The admin API writes directly to a file on disk (`data/content.json`). This works perfectly:
- Locally (`npm run dev` / `npm run start`)
- On any host with a persistent, writable filesystem (a VPS, Docker container, Render, Railway, etc.)

It will **not persist** on serverless/static hosts like Vercel or Netlify, because their filesystem
is read-only (or resets) in production — writes from `/admin` will appear to succeed but won't
survive a redeploy or new server instance. If you deploy there, either:
- Edit `data/content.json` locally and redeploy whenever you want to update content, or
- Swap the storage in `lib/content.ts` for a real database (Postgres, SQLite via Turso, a
  headless CMS, etc.) — the `getContent()` / `saveContent()` functions are the only two places
  that would need to change.

The admin panel also has **no authentication** — anyone who finds `/admin` can edit the site.
Before making this public, protect it (e.g. middleware with a password, or take it fully offline
and only run `npm run dev` locally when you want to make edits).

## 4. Build & deploy

```bash
npm run build
npm run start   # production server, honors the notes above
```

To deploy on Vercel/Netlify: push this folder to a GitHub repo and import it — the frontend will
work great; just keep the note above in mind for `/admin`.

## 5. Project structure

```
app/
  page.tsx            → main site, reads data/content.json server-side
  layout.tsx           → root layout + metadata
  globals.css           → design tokens + all component styles
  admin/page.tsx        → the content editor UI
  api/content/route.ts  → GET/POST backend for content.json
components/              → Navbar, Ticker, Hero, About, Skills, Experience, Projects, Resume, Contact, Footer
lib/content.ts           → typed read/write helpers for content.json
data/content.json        → all site content (the "database")
public/resume.pdf        → downloadable resume
```

## 6. Still to fill in

- **GitHub URL** — add it in Admin → Profile → GitHub URL (currently blank, shown as a
  placeholder on the live site).
