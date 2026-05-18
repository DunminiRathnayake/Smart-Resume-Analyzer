import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Middleware to protect routes.
 * Ensures the user is authenticated by verifying their JWT token.
 */
export const protect = async (req, res, next) => {
  let token;

  // 1. Check if Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract the token from the header (Format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Fetch the user from database and attach it to the request object
      // We use .select('-password') to exclude the password from the returned user object
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user no longer exists' });
      }

      // Move to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Auth Middleware Error:', error.message);
      res.status(401).json({ message: 'Not authorized, token verification failed' });
    }
  } else {
    // If no token is provided
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};
