
const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  email: { type: String, required: true }, // who replied
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  email: { // who created the post
    type: String,
    required: true
  },
  content: { // main post content
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  replies: [replySchema]  // array of replies
});

module.exports = mongoose.model('Post', postSchema);
