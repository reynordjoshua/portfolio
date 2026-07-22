const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_PATH = path.join(__dirname, "data", "content.json");
const PUBLIC_PATH = path.join(__dirname, "public");

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.static(PUBLIC_PATH));

function readContent() {
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  return JSON.parse(raw);
}

function writeContent(content) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(content, null, 2), "utf8");
}

function getResumeFile() {
  const files = fs.readdirSync(PUBLIC_PATH);

  const pdf = files.find(file =>
    file.toLowerCase().endsWith(".pdf")
  );

  return pdf || null;
}

// Health check
app.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "portfolio-backend",
  });
});

// NEW: Automatically return whichever PDF exists
app.get("/api/resume", (req, res) => {
  try {
    const pdf = getResumeFile();

    if (!pdf) {
      return res.status(404).json({
        error: "No PDF found in public folder",
      });
    }

    res.json({
      filename: pdf,
      url: `/${encodeURIComponent(pdf)}`,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to locate resume",
      detail: String(err),
    });
  }
});

// Existing content API
app.get("/api/content", (req, res) => {
  try {
    const content = readContent();

    const pdf = getResumeFile();

    if (pdf) {
      content.resume = `/${encodeURIComponent(pdf)}`;
    }

    res.json(content);
  } catch (err) {
    res.status(500).json({
      error: "Failed to read content",
      detail: String(err),
    });
  }
});

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
        return res.status(400).json({
          error: `Missing "${key}" in payload`,
        });
      }
    }

    writeContent(body);

    res.json({
      ok: true,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to save content",
      detail: String(err),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio backend running on http://localhost:${PORT}`);
});