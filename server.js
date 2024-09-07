const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('./models/User');
const UserProfile = require('./models/UserProfile');
const Post = require('./models/Post');

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

  try {
    const newPost = new Post({
      title,
      user,
      content,
      likes: 0,
      comments: [],
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Server error creating post' });
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

// Add a comment to a post
app.post('/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { user, text } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const newComment = {
      user,
      text,
      createdAt: new Date(), // Ensure the createdAt field is set
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json(newComment);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: 'Server error adding comment' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
