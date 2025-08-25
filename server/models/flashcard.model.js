const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: { // New field to track active/inactive status
    type: Boolean,
    default: true // By default, new cards are active
  }
});

module.exports = mongoose.model('Flashcard', flashcardSchema);
