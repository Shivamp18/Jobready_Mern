
const express = require('express');

const router = express.Router();
const InterviewFeedback = require('../models/InterviewFeedback.model');


// POST - Submit Feedback
router.post('/:roomId', async (req, res) => {
  try {
    const { ratings, comments } = req.body;
    const { roomId } = req.params;

    const feedback = new InterviewFeedback({
      roomId,
      ratings,
      comments,
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback saved successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving feedback.', error });
  }
});

// GET - Retrieve Feedback
router.get('/:roomId', async (req, res) => {
  try {
    const feedback = await InterviewFeedback.findOne({ roomId });
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found.' });
    }

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback.', error });
  }
});

module.exports = router;

