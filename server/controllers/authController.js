import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields (name, email, password)' });
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // 3. Hash the password before saving to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create and save the new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5. Return success message and user data (excluding password)
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error in registerUser:', error.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3. Compare provided password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 4. Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d', // Token expires in 30 days
    });

    // 5. Return token and user data (excluding password)
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error in loginUser:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};
