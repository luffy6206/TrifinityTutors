const mongoose = require("mongoose")

const StudentRequestSchema = new mongoose.Schema({
  name: String,
  class: String,
  subject: String,
  locality: String
})

module.exports = mongoose.model("StudentRequest", StudentRequestSchema)