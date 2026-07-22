const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_PATH = path.join(__dirname, "data", "content.json");

app.use(cors()); // Allow requests from your frontend domain (any origin, for simplicity)
app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(__dirname, "public"))); // serves /resume.pdf etc.

function readContent() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeContent(content) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(content, null, 2), "utf-8");
}

// Health check - useful for confirming the backend is alive after deploying
app.get("/", (req, res) => {
  res.json({ ok: true, service: "portfolio-backend" });
});

// GET the current site content
app.get("/api/content", (req, res) => {
  try {
    res.json(readContent());
  } catch (err) {
    res.status(500).json({ error: "Failed to read content", detail: String(err) });
  }
});

// POST to overwrite site content (used by the admin panel)
app.post("/api/content", (req, res) => {
  try {
    const body = req.body;
    const requiredKeys = [
      "profile",
      "about",
      "education",
      "certifications",
      "skills",
      "experience",
      "projects",
      "resume",
    ];
    for (const key of requiredKeys) {
      if (!(key in body)) {
        return res.status(400).json({ error: `Missing "${key}" in payload` });
      }
    }
    writeContent(body);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save content", detail: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio backend running on http://localhost:${PORT}`);
});
