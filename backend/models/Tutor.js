const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }, // 🔥 make unique
  password: String,

  subject: String,
  subjects: { type: [String], default: [] },
  locality: String,
  experience: Number,
  phone: String,

  // Profile fields
  bio: { type: String, default: "" },
  qualifications: { type: String, default: "" },
  education: { type: String, default: "" },
  teachingMethodology: { type: String, default: "" },
  hourlyRate: { type: Number, default: 0 },
  trialRate: { type: Number, default: 0 },
  profilePhoto: { type: String, default: "" },
  tags: { type: [String], default: [] },
  availability: { type: [String], default: [] },
  
  documents: [
    {
      fileName: String,
      originalName: String,
      url: String,
      mimetype: String,
      uploadedAt: Date,
    }
  ],
  
  // CV and Documents
  cvFile: { type: String, default: "" }, // File path/URL
  cvFileName: { type: String, default: "" },
  cvUploadedAt: Date,
  
  // Verification status
  status: {
    type: String,
    default: "pending", // pending | approved | rejected
  },
  
  verificationStatus: {
    type: String,
    enum: ["unverified", "pending", "verified", "rejected"],
    default: "unverified"
  },
  
  verifiedAt: Date,
  verificationNotes: { type: String, default: "" },
  verifiedBy: { type: String, default: "" }, // Admin ID who verified

  // 🔥 ADD THESE (for Google + flow)
  googleId: String,
  photo: String,
  profileComplete: {
    type: Boolean,
    default: false,
  },
  rating: { type: Number, default: 4.95 },
  reviews: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model("Tutor", tutorSchema);