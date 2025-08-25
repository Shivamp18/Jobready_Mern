const express = require('express');
const { body } = require('express-validator');
const forumController = require('../controllers/forum.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();

// Create a new topic
router.post(
  '/',
  authenticateToken,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('category').not().isEmpty().withMessage('Tags must be an array')
  ],
  forumController.createTopic
);

// Get all topics
router.get('/', authenticateToken, forumController.getAllTopics);

// Get a single topic
router.get('/:id', authenticateToken, forumController.getTopic);

// Add a message to a topic
router.post(
  '/:id/messages',
  authenticateToken,
  [
    body('content').not().isEmpty().withMessage('Message content is required')
  ],
  forumController.addMessage
);

// Add a reply to a topic
router.post(
  '/:id/replies',
  authenticateToken,
  [
    body('content').not().isEmpty().withMessage('Reply content is required')
  ],
  forumController.addReply
);

// Delete a topic
router.delete('/:id', authenticateToken, forumController.deleteTopic);

module.exports = router;
