const asyncHandler = require('express-async-handler');
const User = require('../models/userModels');

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    mobile_number: user.mobile_number,
    profileImage: user.profileImage,
    favorites: user.favorites, // Include favorites in the response
  });
});

// Update profile image
const updateProfileImage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  try {
    if (req.file) {
      user.profileImage = `uploads/${req.file.filename}`;
    } else {
      throw new Error('Please upload an image file.');
    }

    await user.save();

    res.status(200).json({
      message: 'Profile image updated successfully',
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ error: 'Server error, please try again later.' });
  }
});

// Add favorite meal
const addFavorite = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const { mealId } = req.body;

  if (!user.favorites.includes(mealId)) {
    user.favorites.push(mealId);
    await user.save();
    res.status(200).json({ message: 'Favorite added', favorites: user.favorites });
  } else {
    res.status(400).json({ error: 'Meal already in favorites' });
  }
});

// Remove favorite meal
const removeFavorite = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { mealId } = req.body;

  if (!mealId) {
    return res.status(400).json({ error: 'Meal ID is required' });
  }

  if (user.favorites.includes(mealId)) {
    user.favorites = user.favorites.filter(id => id !== mealId);
    await user.save();
    return res.status(200).json({ message: 'Favorite removed', favorites: user.favorites });
  } else {
    return res.status(400).json({ error: 'Meal not in favorites' });
  }
});


module.exports = { getUserProfile, updateProfileImage, addFavorite, removeFavorite };
