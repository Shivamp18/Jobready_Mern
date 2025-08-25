const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Register route
router.post(
  '/register',
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  authController.register
);

// Verify email route
router.get('/verify-email/:token', authController.verifyEmail);

// Login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').exists().withMessage('Password is required')
  ],
  authController.login
);

// Forgot password route
router.post(
  '/forgot-password',
  [
    body('email').isEmail().withMessage('Please provide a valid email')
  ],
  authController.forgotPassword
);

// Reset password route
router.post(
  '/reset-password/:token',
  [
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  authController.resetPassword
);

module.exports = router;
