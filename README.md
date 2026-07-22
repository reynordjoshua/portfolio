<<<<<<< HEAD
# Reynord Joshua K — Portfolio (frontend + separate backend, one repo)

This repo now contains two independent apps you deploy separately:

```
/                → Next.js frontend (this is what's already deployed to Vercel — unchanged Root Directory)
backend/         → Express API that owns data/content.json + resume.pdf (deploy this to Render/Railway/etc.)
```

The frontend fetches all its content (profile, about, skills, experience, projects, resume) from
the backend over HTTP, via the `NEXT_PUBLIC_API_BASE_URL` environment variable. The `/admin` panel
in the frontend also talks directly to that same backend to save edits.

## Why split it up

Vercel's production filesystem is read-only, so a backend that writes to a local JSON file can't
live inside a Vercel-deployed Next.js app — edits from `/admin` would silently fail to persist.
Running the backend as its own small server, on a host with a real persistent disk, fixes that:
saves actually stick.

## 1. Run both locally

**Terminal 1 — backend:**
```bash
cd backend
npm install
npm start
```
Runs on `http://localhost:4000`. Health check: open that URL, you should see `{"ok":true,...}`.

**Terminal 2 — frontend (repo root):**
```bash
npm install
cp .env.local.example .env.local   # already points at http://localhost:4000
npm run dev
```
Runs on `http://localhost:3000`. Admin panel: `http://localhost:3000/admin`.

## 2. Push this to GitHub

Your existing repo (`reynordjoshua/portfolio`) already has the frontend at its root — nothing
changes there. Just add the new `backend/` folder alongside it:

```bash
git add -A
git commit -m "Split backend into its own service"
git push
```

Vercel will auto-redeploy the frontend (same Root Directory as before — you don't need to change
anything there). The `backend/` folder is simply ignored by that Vercel project.

## 3. Deploy the backend (needs a persistent disk — Render or Railway, not Vercel)

**Render** (has a free tier):
1. render.com → New → Web Service → connect your `reynordjoshua/portfolio` repo
2. **Root Directory**: `backend`
3. Build command: `npm install` · Start command: `npm start`
4. Deploy — you'll get a URL like `https://portfolio-backend.onrender.com`

**Railway** works the same way (railway.app → New Project → Deploy from GitHub → set Root
Directory to `backend`).

> Note: free tiers on these platforms may reset disk storage on redeploy/restart. Fine for
> personal use; for guaranteed persistence long-term, mount a persistent volume or swap the two
> functions in `backend/server.js` (`readContent`/`writeContent`) for a real database later.

## 4. Point the frontend at the deployed backend

In Vercel → your project → **Settings → Environment Variables**, add:
- `NEXT_PUBLIC_API_BASE_URL` = your deployed backend URL (e.g. `https://portfolio-backend.onrender.com`)

Redeploy the frontend (Vercel → Deployments → ⋯ → Redeploy) so it picks up the new env var.

## 5. After both are live

- Your Vercel URL loads with real content fetched from the backend
- `/admin` on that same domain now saves to the backend's persistent `data/content.json` — no
  redeploy needed, since the frontend fetches fresh content on every request

## 6. Security note

`/admin` has no login, and the backend's `POST /api/content` accepts writes from anyone who finds
the URL. Fine while you're the only one who knows the links; add basic auth (a shared secret
header checked in `backend/server.js`, or Vercel middleware in front of `/admin`) before sharing
either URL publicly.

## 7. Still to fill in

- **GitHub URL** — add it in `/admin` → Profile → GitHub URL.
=======
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
>>>>>>> 14f9ea2e54fb7d96f0850f6a560e90d3bcfe0b90
