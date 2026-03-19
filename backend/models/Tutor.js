const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  subject: String,
  locality: String,
  experience: String,
  phone: String
});

module.exports = mongoose.model("Tutor", tutorSchema);