const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Use _id for referencing the User model
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

// Create a text index on the 'name' field
userProfileSchema.index({ name: 'text' });

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = UserProfile;
