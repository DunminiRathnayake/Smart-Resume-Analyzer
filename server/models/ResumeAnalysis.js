const mongoose = require('mongoose');

const resumeAnalysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String // Optional, if storing locally or in S3
  },
  jobDescription: {
    type: String,
    default: ''
  },
  atsScore: {
    type: Number,
    default: 0
  },
  skillsFound: {
    type: [String],
    default: []
  },
  skillsMissing: {
    type: [String],
    default: []
  },
  suggestions: {
    type: [String],
    default: []
  },
  feedback: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);
