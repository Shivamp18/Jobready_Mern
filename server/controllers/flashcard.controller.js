const Flashcard = require('../models/flashcard.model');

// Create a new flashcard
exports.createFlashcard = async (req, res) => {
  try {
    const { question, answer, category, difficulty, tags, isPublic } = req.body;
    
    const newFlashcard = new Flashcard({
      question,
      answer,
      category,
      difficulty,
      isPublic,
      creator: req.user.id
    });
    
    await newFlashcard.save();
    
    res.status(201).json(newFlashcard);
  } catch (error) {
    console.error('Create flashcard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all public flashcards and user's private flashcards
exports.getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({
      $or: [
        { isPublic: true },
        { creator: req.user.id }
      ]
    }).populate('creator', 'name');
    
    res.status(200).json(flashcards);
  } catch (error) {
    console.error('Get flashcards error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get flashcards by category
exports.getFlashcardsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const flashcards = await Flashcard.find({
      category,
      $or: [
        { isPublic: true },
        { creator: req.user.id }
      ]
    }).populate('creator', 'name');
    
    res.status(200).json(flashcards);
  } catch (error) {
    console.error('Get flashcards by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single flashcard
exports.getFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id)
      .populate('creator', 'name');
    
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    
    // Check if user can access this flashcard
    if (!flashcard.isPublic && flashcard.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this flashcard' });
    }
    
    res.status(200).json(flashcard);
  } catch (error) {
    console.error('Get flashcard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a flashcard
exports.updateFlashcard = async (req, res) => {
  try {
    const { question, answer, category, difficulty, tags, isActive, isPublic } = req.body;
    
    // Build update object
    const updateFields = {};
    if (question) updateFields.question = question;
    if (answer) updateFields.answer = answer;
    if (category) updateFields.category = category;
    if (difficulty) updateFields.difficulty = difficulty;
    if (tags) updateFields.tags = tags;
    if (isPublic !== undefined) updateFields.isPublic = isPublic;
    if (isActive !== undefined) updateFields.isActive = isActive;

    
    let flashcard = await Flashcard.findById(req.params.id);
    
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    
    // Check if user is the creator
    if (flashcard.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this flashcard' });
    }
    
    flashcard = await Flashcard.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    
    res.status(200).json(flashcard);
  } catch (error) {
    console.error('Update flashcard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a flashcard
exports.deleteFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    
    // Check if user is the creator or admin
    if (flashcard.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this flashcard' });
    }
    
    await Flashcard.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    console.error('Delete flashcard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getActiveCards = async (req, res) => {
  try {
    const activeCards = await Flashcard.find({ isActive: true }); // Adjust field name
    res.status(200).json(activeCards);
  } catch (error) {
    console.error("Error fetching active cards:", error);
    res.status(500).json({ message: "Failed to fetch active cards" });
  }
};

exports.getInactiveCards = async (req, res) => {
  try {
    const inactiveCards = await Flashcard.find({ isActive: false }); // Adjust field name
    res.status(200).json(inactiveCards);
  } catch (error) {
    console.error("Error fetching inactive cards:", error);
    res.status(500).json({ message: "Failed to fetch inactive cards" });
  }
};

exports.getSpecificCard = async (req, res) => {
  // Fetch the specific card by ID
  const card = await Flashcard.findById(req.params.id);
  // If the card's user ID does not match the user ID requested
  if (!card.user.equals(req.userId)) {
    // Return forbidden
    return res.sendStatus(403);
  }
  res.status(200).json(card);
};


// exports.updateCard = async (req, res) => {
//   // Fetch the specific card by ID
//   const card = await Card.findById(req.params.id);
//   // If the card's user ID does not match the user ID requested
//   if (!card.user.equals(req.userId)) {
//     // Return forbidden
//     return res.sendStatus(403);
//   }
//   const newValues = {
//     frontText: req.body.frontText,
//     backText: req.body.backText,
//     active: req.body.active,
//   };
//   // Update the card with the new values
//   card.set(newValues);
//   await card.save();

//   res.status(200).json(card);
// };

exports.deleteCard = async (req, res) => {
  // Fetch the specific card by ID
  const card = await Flashcard.findById(req.params.id);
  // If the card's user ID does not match the user ID requested
  if (!card.user.equals(req.userId)) {
    // Return forbidden
    return res.sendStatus(403);
  }
  // Else, remove the card
  await card.remove();
  res.sendStatus(200);
};