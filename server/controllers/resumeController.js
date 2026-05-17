const ResumeAnalysis = require('../models/ResumeAnalysis');
const { extractTextFromPDF } = require('../utils/pdfExtractor');
const { analyzeResume } = require('../services/aiService');

// @desc    Upload resume and analyze
// @route   POST /api/resume/analyze
// @access  Private
const analyzeUploadedResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a PDF file' });
    }

    const { jobDescription } = req.body;
    const filePath = req.file.path;
    const fileName = req.file.originalname;

    // 1. Extract text from PDF
    const resumeText = await extractTextFromPDF(filePath);

    // 2. Call AI Service for analysis
    const aiResult = await analyzeResume(resumeText, jobDescription || '');

    // 3. Save to database
    const newAnalysis = await ResumeAnalysis.create({
      user: req.user._id,
      fileName: fileName,
      fileUrl: `/uploads/${req.file.filename}`,
      jobDescription: jobDescription || '',
      atsScore: aiResult.atsScore,
      skillsFound: aiResult.skillsFound,
      skillsMissing: aiResult.skillsMissing,
      suggestions: aiResult.suggestions,
      feedback: aiResult.feedback
    });

    res.status(201).json({
      success: true,
      data: newAnalysis
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ success: false, message: 'Failed to analyze resume', error: error.message });
  }
};

// @desc    Get all resume analysis history for a user
// @route   GET /api/resume/history
// @access  Private
const getResumeHistory = async (req, res) => {
  try {
    const history = await ResumeAnalysis.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get specific analysis by ID
// @route   GET /api/resume/:id
// @access  Private
const getResumeAnalysis = async (req, res) => {
  try {
    const analysis = await ResumeAnalysis.findById(req.params.id);

    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Analysis not found' });
    }

    // Ensure user owns this analysis
    if (analysis.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  analyzeUploadedResume,
  getResumeHistory,
  getResumeAnalysis
};
