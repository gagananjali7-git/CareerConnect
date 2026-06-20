const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  stipend: String,
  duration: String,
  description: String,
});

module.exports = mongoose.model(
  "Internship",
  internshipSchema
);