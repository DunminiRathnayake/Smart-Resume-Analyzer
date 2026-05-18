import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

// 1. Initialize dotenv configuration to read variables from .env file
dotenv.config();

// 2. Initialize the Express application instance
const app = express();

// 3. Setup Global Middleware
// Enables Cross-Origin Resource Sharing for the frontend to communicate with this backend
app.use(cors());
// Parses incoming JSON payloads and makes them available on req.body
app.use(express.json());

// 4. Base Application Routes
// A simple health-check route to ensure the API is running
app.get('/', (req, res) => {
  res.status(200).send('Smart Resume Analyzer API Running...');
});

// (Future routes will be mounted below here, e.g., app.use('/api/auth', authRoutes))
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);

// 5. Connect to Database and Start the Server
const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting the Express server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n=========================================`);
      console.log(`🚀 Server successfully started!`);
      console.log(`📡 Listening on http://localhost:${PORT}`);
      console.log(`=========================================\n`);
    });
  })
  .catch((error) => {
    console.error('Failed to start the server due to database connection error:', error);
  });
