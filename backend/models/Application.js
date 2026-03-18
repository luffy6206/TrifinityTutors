const mongoose = require("mongoose")

const ApplicationSchema = new mongoose.Schema({
  tutorName: String,
  studentRequestId: String,
  status: {
    type: String,
    default: "pending"
  }
})

module.exports = mongoose.model("Application", ApplicationSchema)