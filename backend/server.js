const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

// Enable CORS
app.use(cors());

// Read members.json safely using __dirname
const membersPath = path.join(__dirname, "members.json");
let members = [];

try {
const data = fs.readFileSync(membersPath, "utf-8");
members = JSON.parse(data);
} catch (err) {
console.error("Error reading members.json:", err);
}

// Route to get all members
app.get("/members", (req, res) => {
res.json(members);
});

// Route to get a single member by ID
app.get("/members/:id", (req, res) => {
const id = parseInt(req.params.id);
const member = members.find((m) => m.id === id);

if (!member) {
return res.status(404).json({ error: "Member not found" });
}

res.json(member);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
