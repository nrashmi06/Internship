const mongoose = require('mongoose');
const Comment = require('../models/Comment'); // Adjust the path as necessary
const User = require('../models/userModels'); // Adjust the path as necessary

// Create a new comment
exports.createComment = async (req, res) => {
    const { mealId, text } = req.body;
    const { _id: userId, name, profileImage } = req.user; // Extract user details from req.user

    try {
        if (!mealId || typeof mealId !== 'string') {
            return res.status(400).json({ message: 'Invalid Meal ID' });
        }

        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        const newComment = new Comment({ mealId, userId, name, profileImage, text });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (err) {
        console.error('Error creating comment:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get comments by mealId
exports.getCommentsByMealId = async (req, res) => {
    const { mealId } = req.params;

    try {
        if (!mealId || typeof mealId !== 'string') {
            return res.status(400).json({ message: 'Invalid Meal ID' });
        }

        const comments = await Comment.find({ mealId });

        if (comments.length === 0) {
            return res.status(200).json({ message: 'No comments found', comments: [] });
        }

        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Remove a comment
exports.removeComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user._id; // Extract userId from authenticated user

    try {
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: 'Invalid Comment ID' });
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }

        await comment.remove();
        res.json({ message: 'Comment removed' });
    } catch (error) {
        console.error('Error removing comment:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a comment
exports.updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user._id; // Extract userId from authenticated user

    try {
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: 'Invalid Comment ID' });
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this comment' });
        }

        comment.text = text;
        await comment.save();
        res.json(comment);
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// In your controllers/commentController.js
exports.updateProfileImage = async (req, res) => {
    try {
        const { newProfileImage } = req.body;
        const userId = req.user._id; // Get the user ID from the auth middleware

        if (!newProfileImage) {
            return res.status(400).json({ message: 'New profile image URL is required' });
        }

        // Update the user's profile image
        const user = await User.findByIdAndUpdate(
            userId,
            { profileImage: newProfileImage },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the profile image in all comments made by this user
        await Comment.updateMany(
            { userId: userId },
            { $set: { profileImage: newProfileImage } }
        );

        res.status(200).json({ message: 'Profile image updated successfully' });
    } catch (error) {
        console.error('Error updating profile image:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
