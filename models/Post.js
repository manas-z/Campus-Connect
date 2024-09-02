const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: String,
  text: String,
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] // Array of ObjectIds referring to the replies
});

const PostSchema = new mongoose.Schema({
  title: String,
  user: {
    name: String,
    profileLogo: String
  },
  content: String,
  comments: [CommentSchema] // Array of nested comments
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
