const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  replies: [this], // This allows for nested comments
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: Object, required: true },
  content: { type: String, required: true },
  comments: [commentSchema], // Use the comment schema
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;