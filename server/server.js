import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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

// 5. Start the Server
// Uses PORT from environment variables, or defaults to 5000 if not provided
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n=========================================`);
  console.log(`🚀 Server successfully started!`);
  console.log(`📡 Listening on http://localhost:${PORT}`);
  console.log(`=========================================\n`);
});
