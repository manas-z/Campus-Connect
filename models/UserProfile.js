const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  name: { type: String, required: true },
  age: { type: Number },
  currentYear: { type: String },
  courseName: { type: String },
  graduationYear: { type: String },
  bio: { type: String },
  interestedFields: { type: String },
  specialtyFields: { type: String },
  profileImage: { type: String } // URL or file path to the user's profile image
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
