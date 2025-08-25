const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, userController.getProfile);

// Update user profile
router.put(
  '/profile',
  authenticateToken,
  [
    body('name').optional().not().isEmpty().withMessage('Name cannot be empty'),
    body('bio').optional(),
    body('skills').optional().isArray().withMessage('Skills must be an array'),
    body('avatar').optional().isURL().withMessage('Avatar must be a valid URL')
  ],
  userController.updateProfile
);

// Change password
router.put(
  '/change-password',
  authenticateToken,
  [
    body('currentPassword').not().isEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
  ],
  userController.changePassword
);

module.exports = router;
