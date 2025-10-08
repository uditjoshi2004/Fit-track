// in middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Check if token exists or is just 'null' or 'undefined'
      if (!token || token === 'null' || token === 'undefined') {
        res.status(401);
        return next(new Error('Not authorized, token is invalid'));
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      console.error(error);
      res.status(401);
      return next(new Error('Not authorized, token failed'));
    }
  }

  if (!token) {
    res.status(401);
    return next(new Error('Not authorized, no token'));
  }
};

module.exports = { protect };