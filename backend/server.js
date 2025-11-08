// backend/server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, "users.json");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ensure users.json exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// POST /signup → save user
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  // Load existing users
  const users = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

  // Prevent duplicate
  if (users.some((u) => u.email === email))
    return res.status(400).json({ message: "User already exists" });

  // Add and save
  users.push({ email, password });
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));

  res.json({ message: "User saved successfully", user: { email } });
});

// GET /users → list users
app.get("/users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  res.json(users);
});

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
