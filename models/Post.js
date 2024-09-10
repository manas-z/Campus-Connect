const mongoose = require('mongoose');

// Define the comment schema
const commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // References to other comments
  createdAt: { type: Date, default: Date.now },
});

// Define the post schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: Object, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema], // Embed the simplified comment schema directly
  
});


// Create models
const Comment = mongoose.model('Comment', commentSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = { Post, Comment };

