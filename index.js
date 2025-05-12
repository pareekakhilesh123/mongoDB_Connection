const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/studentDB')
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));

 
// Mongoose Schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Student = mongoose.model('Student', studentSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Hello MongoDB!');
});

app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// Server start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
