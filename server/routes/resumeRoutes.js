const express = require('express');
const router = express.Router();
const { analyzeUploadedResume, getResumeHistory, getResumeAnalysis } = require('../controllers/resumeController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Route to handle resume upload and analysis
router.post('/analyze', protect, upload.single('resume'), analyzeUploadedResume);

// Route to get history of all resume analysis for logged-in user
router.get('/history', protect, getResumeHistory);

// Route to get a specific analysis by ID
router.get('/:id', protect, getResumeAnalysis);

module.exports = router;
