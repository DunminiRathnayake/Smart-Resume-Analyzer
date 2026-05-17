import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Define routes and map them to controller functions
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
