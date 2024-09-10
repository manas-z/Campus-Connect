const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('./models/User');
const UserProfile = require('./models/UserProfile');
const { Post, Comment } = require('./models/Post');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with a strong secret key
const MONGODB_URI = 'mongodb+srv://jolvin:jolvin123@cluster0.kzhz3.mongodb.net/chatForum?retryWrites=true&w=majority'; // Replace with your MongoDB connection string

// Middleware
app.use(cors());
app.use(express.json());

// File upload setup
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// User Registration
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Please fill all fields' });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Please fill all fields' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Complete User Registration (Profile Information)
app.post('/complete-registration', upload.single('profileImage'), async (req, res) => {
  const { email, name, age, currentYear, courseName, graduationYear, bio, interestedFields, specialtyFields } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    let userProfile = await UserProfile.findById(user._id);
    if (!userProfile) {
      userProfile = new UserProfile({
        _id: user._id,
        name,
        age,
        currentYear,
        courseName,
        graduationYear,
        bio,
        interestedFields,
        specialtyFields,
        profileImage: req.file ? req.file.filename : null,
      });
    } else {
      userProfile.set({
        name,
        age,
        currentYear,
        courseName,
        graduationYear,
        bio,
        interestedFields,
        specialtyFields,
        profileImage: req.file ? req.file.filename : userProfile.profileImage,
      });
    }

    await userProfile.save();
    res.status(200).json({ message: 'User information updated successfully' });
  } catch (err) {
    console.error('Error during profile update:', err);
    res.status(500).json({ error: 'Server error during profile update' });
  }
});


// Fetch User Profile by ID
app.get('/user-info', async (req, res) => {
  const { id, email } = req.query;
  if (id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid user ID format' });

    try {
      const userProfile = await UserProfile.findById(id);
      if (!userProfile) return res.status(404).json({ error: 'User profile not found' });
      res.status(200).json(userProfile);
    } catch (err) {
      res.status(500).json({ error: 'Server error fetching user info' });
    }
  } else if (email) {
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: 'User not found' });

      const userProfile = await UserProfile.findOne({ _id: user._id });
      if (!userProfile) return res.status(404).json({ error: 'User profile not found' });

      res.status(200).json({
        name: userProfile.name,
        profileImage: userProfile.profileImage,
      });
    } catch (err) {
      console.error('Error fetching user info:', err);
      res.status(500).json({ error: 'Server error fetching user info' });
    }
  } else {
    res.status(400).json({ error: 'No query parameters provided' });
  }
});

// Fetch all posts, sorted by creation date (newest first)
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Server error fetching posts' });
  }
});

// Create a new post
app.post('/posts', async (req, res) => {
  const { title, user, content } = req.body;
  
  if (!title || !user || !content) {
    return res.status(400).json({ error: 'Title, user, and content are required' });
  }

  try {
    // Create a new post with the current date and time
    const newPost = new Post({
      title,
      user,
      content,
      createdAt: new Date(), // Explicitly setting the creation date
    });
  const savedPost = await newPost.save();
  res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Server error creating post' });
  }
});

// Get all posts
app.get('/posts', async (req, res) => {
  try {
    // Fetch posts sorted by creation date in descending order
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Server error fetching posts' });
  }
});


app.get('/api/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required.' });
  }
});

// Like a post
app.post('/posts/:id/like', async (req, res) => {
  const { id } = req.params;
  const { liked } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.liked = liked;
    post.likes = liked ? post.likes + 1 : post.likes - 1;
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    console.error('Error liking post:', err);
    res.status(500).json({ error: 'Server error liking post' });
  }
});

// Create a new comment on a post
app.post('/posts/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  const { user, text, parentCommentId } = req.body;

  if (!user || !text) {
    return res.status(400).json({ error: 'User and text are required to add a comment.' });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = {
      user,
      text,
      replies: [],
      createdAt: new Date(),
    };

    if (parentCommentId) {
      const parentComment = findCommentById(post.comments, parentCommentId);
      if (parentComment) {
        parentComment.replies.push(newComment);
      } else {
        return res.status(404).json({ error: 'Parent comment not found' });
      }
    } else {
      post.comments.push(newComment);
    }

    await post.save();
    res.status(201).json(post.comments);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: 'Server error adding comment', details: err.message });
  }
});

// Helper function to find comment by ID
function findCommentById(comments, id) {
  for (let comment of comments) {
    if (comment._id.toString() === id) return comment;
    const found = findCommentById(comment.replies, id);
    if (found) return found;
  }
  return null;
}

// Get comments for a specific post
app.get('/posts/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post.comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Server error fetching comments', details: err.message });
  }
});

// Edit a comment
app.put('/comments/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const post = await Post.findOne({ 'comments._id': id });
    if (!post) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const comment = findCommentById(post.comments, id);
    if (comment) {
      comment.text = text;
      await post.save();
      res.status(200).json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (err) {
    console.error('Error editing comment:', err);
    res.status(500).json({ error: 'Server error editing comment', details: err.message });
  }
});

// Delete a comment
app.delete('/comments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOne({ 'comments._id': id });
    if (!post) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === id);
    if (commentIndex !== -1) {
      post.comments.splice(commentIndex, 1);
      await post.save();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ error: 'Server error deleting comment', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
