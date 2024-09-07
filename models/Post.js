const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: Object, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema], // Use the simplified comment schema
});


const Post = mongoose.model('Post', postSchema);
module.exports = Post;
