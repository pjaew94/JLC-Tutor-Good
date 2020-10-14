const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  instructorFirst: {
    type: String,
    required: true,
  },
  instructorLast: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  studentSubjects: {
    type: String,
  },
  instructorSubjects: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = Subjects = mongoose.model("subjects", SubjectSchema);
