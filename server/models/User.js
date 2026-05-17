import mongoose from 'mongoose';

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true, // Ensures no duplicate emails in the database
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    role: {
      type: String,
      default: 'user', // Default role is standard user
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Create and export the User model
const User = mongoose.model('User', userSchema);
export default User;
