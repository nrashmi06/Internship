const express = require('express');
const router = express.Router();
const { createComment, getCommentsByMealId, removeComment, updateComment ,updateProfileImage } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware'); 

// Create a new comment
router.post('/comments', authMiddleware, createComment);

// Get comments by mealId
router.get('/comments/:mealId', getCommentsByMealId);

router.put('/update-profile-image', authMiddleware, updateProfileImage);

router.delete('/comments/:commentId', authMiddleware, removeComment);

router.put('/comments/:commentId', authMiddleware, updateComment);



module.exports = router;
