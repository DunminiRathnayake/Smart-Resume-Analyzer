import express from 'express';
import { uploadResume, getMyResumeHistory, getResumeAnalysisById } from '../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// All routes are protected — user must be logged in

// POST /api/resumes/upload — Upload a PDF resume
// 'resume' is the field name the frontend must use in FormData
router.post('/upload', protect, upload.single('resume'), uploadResume);

// GET /api/resumes/history — Get all resume analyses for logged-in user
router.get('/history', protect, getMyResumeHistory);

// GET /api/resumes/:id — Get a specific resume analysis by ID
router.get('/:id', protect, getResumeAnalysisById);

export default router;
