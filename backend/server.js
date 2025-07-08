const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = 5000;

const DB_PATH = path.join(__dirname, "db", "sql-injection.db");
const SQL_TEMPLATE = path.join(__dirname, "temp", "injection.sql");

// Utility to reset DB to predefined state
function resetDatabase() {
  const db = new sqlite3.Database(DB_PATH);
  const initSQL = fs.readFileSync(SQL_TEMPLATE, "utf-8");
  db.exec(initSQL, (err) => {
    if (err) console.error("Error resetting DB:", err.message);
    else console.log("SQL Injection DB reset to initial state");
  });
  db.close();
}

resetDatabase(); // Reset on server start

// Vulnerable route
app.post("/api/sql-injection/login", (req, res) => {
  const { username, password } = req.body;

  const db = new sqlite3.Database(DB_PATH);
  const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;

  console.log("Executing:", query); // For demo/debug

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Internal Error" });
    }
    if (rows.length > 0) {
      res.json({ success: true, message: "Login successful", user: rows[0] });
    } else {
      res.status(401).json({ success: false, message: "Login failed" });
    }
  });

  db.close();
});

app.post("/api/sql-injection/reset", (req, res) => {
  resetDatabase();
  res.json({ success: true, message: "DB reset successfully" });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
