
const mongoose = require('mongoose');


const feedbackSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  ratings: {
    Communication: { type: Number, required: true },
    'Problem Solving': { type: Number, required: true },
    'Coding Efficiency': { type: Number, required: true },
    Confidence: { type: Number, required: true },
  },
  comments: { type: String },
  createdAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model('InterviewFeedback', feedbackSchema);


