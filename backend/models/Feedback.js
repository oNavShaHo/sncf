const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  text: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
