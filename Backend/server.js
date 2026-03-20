const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/tracker");

const LogSchema = new mongoose.Schema({
  url: String,
  duration: Number,
  date: Date
});
const Log = mongoose.model("Log", LogSchema);

app.post("/track", async (req, res) => {
  const log = new Log(req.body);
  await log.save();
  res.send("Saved");
});

app.get("/analytics", async (req, res) => {
  const logs = await Log.find();
  res.json(logs);
});

app.listen(5000, () => console.log("Server running on 5000"));
