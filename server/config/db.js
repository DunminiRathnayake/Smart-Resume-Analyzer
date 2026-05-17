import mongoose from 'mongoose';

/**
 * Connects to MongoDB database using Mongoose.
 * Ensure MONGO_URI is defined in your .env file.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to the database
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Exit the process with failure if connection fails
    process.exit(1);
  }
};

export default connectDB;
