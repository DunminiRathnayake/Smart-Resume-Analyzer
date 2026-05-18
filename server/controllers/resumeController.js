import fs from 'fs';
import ResumeAnalysis from '../models/ResumeAnalysis.js';
import extractTextFromPDF from '../utils/pdfParser.js';

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

    // 3. Save the resume analysis record to MongoDB
    const resumeAnalysis = await ResumeAnalysis.create({
      user: req.user._id,             // From protect middleware
      originalFileName: originalname,
      storedFileName: filename,
      filePath: filePath,
      extractedText: extractedText,
      analysisStatus: 'pending',      // AI analysis not yet done
    });

    // 4. Return response with file info, text preview, and saved record ID
    res.status(201).json({
      message: 'Resume uploaded and text extracted successfully. AI analysis coming soon.',
      analysisId: resumeAnalysis._id,
      originalFileName: originalname,
      extractedTextPreview: extractedText.substring(0, 300) + '...', // Show first 300 chars
      analysisStatus: resumeAnalysis.analysisStatus,
    });
  } catch (error) {
    console.error('Error during upload:', error);
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkErr) {
        console.error('Failed to delete file:', unlinkErr);
      }
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
