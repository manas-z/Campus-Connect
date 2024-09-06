const mongoose = require('mongoose');
const UserProfile = require('./UserProfile');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // other fields...
});

// Post-save hook to create a UserProfile when a new User is created
userSchema.post('save', async function (doc, next) {
  if (doc.isNew) {
    try {
      // Create UserProfile with the same _id as User
      const userProfile = new UserProfile({
        _id: doc._id, // Use the same _id from the User document
        name: '', // Initialize with default or empty values
        age: null,
        currentYear: null,
        courseName: '',
        graduationYear: null,
        bio: '',
        interestedFields: [],
        specialtyFields: [],
        profileImage: null,
      });

      await userProfile.save();
      console.log(`UserProfile created for user: ${doc.email}`);
    } catch (err) {
      console.error('Error creating UserProfile:', err);
    }
  }
  next(); // Ensure the next middleware is called
});

const User = mongoose.model('User', userSchema);
module.exports = User;
