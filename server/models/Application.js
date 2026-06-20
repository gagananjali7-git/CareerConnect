const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  internshipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Internship",
  },
  resume: String,
  status: {
    type: String,
    default: "Pending",
  },
});

module.exports = mongoose.model(
  "Application",
  applicationSchema
);