import mongoose from 'mongoose';

const resumeAnalysisSchema = new mongoose.Schema(
  {
    // Reference to the user who uploaded this resume
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // File information
    originalFileName: {
      type: String,
    },
    storedFileName: {
      type: String,
    },
    filePath: {
      type: String,
    },

    // Extracted content from PDF
    extractedText: {
      type: String,
    },
    
    // Optional job description to compare against
    targetJobDescription: {
      type: String,
      default: '',
    },

    // AI analysis results (filled in after AI integration)
    atsScore: {
      type: Number,
      default: 0,
    },
    detectedSkills: {
      type: [String],
      default: [],
    },
    missingSkills: {
      type: [String],
      default: [],
    },
    suggestions: {
      type: [String],
      default: [],
    },
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    jobMatchSummary: {
      type: String,
      default: '',
    },
    matchPercentage: {
      type: Number,
      default: 0,
    },
    matchedKeywords: {
      type: [String],
      default: [],
    },
    missingKeywords: {
      type: [String],
      default: [],
    },
    jobFitSummary: {
      type: String,
      default: '',
    },

    // Track the status of AI analysis
    analysisStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

const ResumeAnalysis = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);
export default ResumeAnalysis;
