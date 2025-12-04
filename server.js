const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

// Enable CORS to allow cross-origin requests (useful for frontend API calls)
app.use(cors());
const members = JSON.parse(fs.readFileSync("gdg backend/members.json"));

app.get("/members", (req, res) => {
  res.json(members);  
});

// Route to retrieve a single member by ID
app.get("/members/:id", (req, res) => {
  const id = parseInt(req.params.id);  

  const member = members.find(m => m.id === id);

  if (!member) {
    return res.status(404).json({ error: "Member not found" });
  }
  res.json(member);
});

app.listen(5000, () => console.log("Server running on port 5000"));
