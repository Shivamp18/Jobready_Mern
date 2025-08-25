const express = require('express');
const { body } = require('express-validator');
const flashcardController = require('../controllers/flashcard.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();

// Create a new flashcard
router.post(
  '/',
  authenticateToken,
  [
    body('question').not().isEmpty().withMessage('Question is required'),
    body('answer').not().isEmpty().withMessage('Answer is required'),
    body('category').not().isEmpty().withMessage('Category is required'),
    body('difficulty').isIn(['easy', 'medium', 'hard']).withMessage('Difficulty must be easy, medium, or hard'),
    body('tags').optional().isArray().withMessage('Tags must be an array'),
    body('isPublic').optional().isBoolean().withMessage('isPublic must be a boolean')
  ],
  flashcardController.createFlashcard
);

// Get all flashcards
router.get('/', authenticateToken, flashcardController.getFlashcards);

// Get flashcards by category
router.get('/category/:category', authenticateToken, flashcardController.getFlashcardsByCategory);

// Get active cards & inactive cards
router.get('/activeCards', authenticateToken, flashcardController.getActiveCards);
router.get('/inactiveCards',authenticateToken, flashcardController.getInactiveCards);

// Get a single flashcard
router.get('/:id', authenticateToken, flashcardController.getFlashcard);

// Update a flashcard
router.put(
  '/:id',
  authenticateToken,
  [
    body('question').optional().not().isEmpty().withMessage('Question cannot be empty'),
    body('answer').optional().not().isEmpty().withMessage('Answer cannot be empty'),
    body('category').optional().not().isEmpty().withMessage('Category cannot be empty'),
    body('difficulty').optional().isIn(['easy', 'medium', 'hard']).withMessage('Difficulty must be easy, medium, or hard'),
    body('tags').optional().isArray().withMessage('Tags must be an array'),
    body('isPublic').optional().isBoolean().withMessage('isPublic must be a boolean')
  ],
  flashcardController.updateFlashcard
);

// Delete a flashcard
router.delete('/:id', authenticateToken, flashcardController.deleteFlashcard);

module.exports = router;
