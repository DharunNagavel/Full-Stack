const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/studentDB");
const studentSchema = new mongoose.Schema({
  name: String,
  department: String,
  year: Number,
});
const Student = mongoose.model("Student", studentSchema);
app.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});
app.put("/students/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(student);
});
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student Deleted" });
});
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
