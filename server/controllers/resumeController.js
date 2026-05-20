import fs from 'fs';
import ResumeAnalysis from '../models/ResumeAnalysis.js';
import extractTextFromPDF from '../utils/pdfParser.js';
import analyzeResumeMock from '../utils/mockResumeAnalyzer.js';
import analyzeResumeWithGemini from '../utils/geminiResumeAnalyzer.js';
import generateReportPdf from '../utils/generateReportPdf.js';

/**
 * @desc    Upload a resume PDF and save analysis record
 * @route   POST /api/resumes/upload
 * @access  Private (requires token)
 */
export const uploadResume = async (req, res) => {
  try {
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);

    // 1. Check if a file was actually uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded. Please upload a PDF file.' });
    }

    const { originalname, filename, path: filePath } = req.file;

    if (!filePath) {
      return res.status(400).json({ message: 'File upload failed. No file path generated.' });
    }

    // 2. Extract text from the uploaded PDF
    const extractedText = await extractTextFromPDF(filePath);
    console.log('Extracted text length:', extractedText ? extractedText.length : 0);

    if (!extractedText || extractedText.trim().length < 50) {
      if (req.file && req.file.path) fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'Could not extract readable text from this PDF. Please upload a text-based PDF exported from Word or Google Docs.' });
    }

    // 3. Perform AI analysis
    const jobDescription = req.body.jobDescription || '';
    let analysisResult;

    try {
      // Attempt to analyze with Gemini AI
      console.log('Attempting Gemini AI analysis...');
      analysisResult = await analyzeResumeWithGemini(extractedText, jobDescription);
      console.log('Gemini AI analysis successful.');
    } catch (aiError) {
      // Fallback to mock analysis if Gemini fails (e.g. invalid key, quota exceeded)
      console.warn('Gemini analysis failed, falling back to mock analysis:', aiError.message);
      console.log('Using mock analyzer...');
      analysisResult = analyzeResumeMock(extractedText, jobDescription);
    }

    console.log('ATS Score returned:', analysisResult.atsScore);
    console.log('Analysis Status:', analysisResult.analysisStatus);

    // 4. Save the resume analysis record to MongoDB
    const resumeAnalysis = await ResumeAnalysis.create({
      user: req.user._id,             // From protect middleware
      originalFileName: originalname,
      storedFileName: filename,
      filePath: filePath,
      extractedText: extractedText,
      targetJobDescription: jobDescription,
      atsScore: analysisResult.atsScore,
      detectedSkills: analysisResult.detectedSkills,
      missingSkills: analysisResult.missingSkills,
      suggestions: analysisResult.suggestions,
      strengths: analysisResult.strengths || [],
      weaknesses: analysisResult.weaknesses || [],
      jobMatchSummary: analysisResult.jobMatchSummary || '',
      matchPercentage: analysisResult.matchPercentage || 0,
      matchedKeywords: analysisResult.matchedKeywords || [],
      missingKeywords: analysisResult.missingKeywords || [],
      jobFitSummary: analysisResult.jobFitSummary || '',
      shortFeedbackSummary: analysisResult.shortFeedbackSummary || '',
      interviewQuestions: analysisResult.interviewQuestions || [],
      analysisStatus: analysisResult.analysisStatus,
    });

    // 5. Return response with full analysis info
    res.status(201).json({
      message: 'Resume analyzed successfully.',
      analysisId: resumeAnalysis._id,
      originalFileName: originalname,
      extractedTextPreview: extractedText.substring(0, 300) + '...',
      atsScore: resumeAnalysis.atsScore,
      detectedSkills: resumeAnalysis.detectedSkills,
      missingSkills: resumeAnalysis.missingSkills,
      suggestions: resumeAnalysis.suggestions,
      strengths: resumeAnalysis.strengths,
      weaknesses: resumeAnalysis.weaknesses,
      jobMatchSummary: resumeAnalysis.jobMatchSummary,
      matchPercentage: resumeAnalysis.matchPercentage,
      matchedKeywords: resumeAnalysis.matchedKeywords,
      missingKeywords: resumeAnalysis.missingKeywords,
      jobFitSummary: resumeAnalysis.jobFitSummary,
      shortFeedbackSummary: resumeAnalysis.shortFeedbackSummary,
      interviewQuestions: resumeAnalysis.interviewQuestions,
      analysisStatus: resumeAnalysis.analysisStatus,
    });
  } catch (error) {
    console.error('Error during upload:', error);
    
    // Automatically delete failed uploaded files
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkErr) {
        console.error('Failed to delete file:', unlinkErr);
      }
    }

    if (error.message && error.message.includes('Could not extract readable text')) {
      return res.status(400).json({ message: 'Could not extract readable text from this PDF. Please upload a text-based PDF exported from Word or Google Docs.' });
    }
    
    res.status(500).json({ message: error.message || 'Server error during resume upload' });
  }
};

/**
 * @desc    Get all resume analyses for the logged-in user
 * @route   GET /api/resumes/history
 * @access  Private (requires token)
 */
export const getMyResumeHistory = async (req, res) => {
  try {
    // Find all analyses belonging to the logged-in user, newest first
    const analyses = await ResumeAnalysis.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('-extractedText'); // Exclude large text field for list view

    res.status(200).json({
      count: analyses.length,
      analyses,
    });
  } catch (error) {
    console.error('Error in getMyResumeHistory:', error.message);
    res.status(500).json({ message: 'Server error fetching resume history' });
  }
};

/**
 * @desc    Get a single resume analysis by ID
 * @route   GET /api/resumes/:id
 * @access  Private (requires token)
 */
export const getResumeAnalysisById = async (req, res) => {
  try {
    const analysis = await ResumeAnalysis.findById(req.params.id);

    // Check if analysis exists
    if (!analysis) {
      return res.status(404).json({ message: 'Resume analysis not found' });
    }

    // Make sure the logged-in user owns this analysis
    if (analysis.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this analysis' });
    }

    res.status(200).json(analysis);
  } catch (error) {
    console.error('Error in getResumeAnalysisById:', error.message);
    res.status(500).json({ message: 'Server error fetching resume analysis' });
  }
};

/**
 * @desc    Generate and download PDF report for a resume analysis
 * @route   GET /api/resumes/:id/report
 * @access  Private (requires token)
 */
export const downloadResumeReport = async (req, res) => {
  try {
    const analysis = await ResumeAnalysis.findById(req.params.id);

    // Check if analysis exists
    if (!analysis) {
      return res.status(404).json({ message: 'Resume analysis not found' });
    }

    // Make sure the logged-in user owns this analysis
    if (analysis.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to download this report' });
    }

    // Set headers to prompt download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Resume_Analysis_Report_${analysis.originalFileName || 'resume'}.pdf"`
    );

    // Generate PDF and stream it directly to the response
    generateReportPdf(analysis, res);
  } catch (error) {
    console.error('Error generating PDF report:', error.message);
    res.status(500).json({ message: 'Server error generating PDF report' });
  }
};
