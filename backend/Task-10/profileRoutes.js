const express = require('express');
const { getUserProfile, updateProfileImage, addFavorite, removeFavorite } = require('../controllers/profileController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware'); 

const router = express.Router();

router.get('/profile', auth, getUserProfile);
router.put('/profile/image', auth, upload.single('profileImage'), updateProfileImage);
router.post('/profile/favorites', auth, addFavorite);
router.delete('/profile/favorites', auth, removeFavorite);

module.exports = router;
