const express = require('express');
const { getUserProfile, updateProfileImage } = require('../controllers/profileController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware'); 

const router = express.Router();

router.get('/profile', auth, getUserProfile);
router.put('/profile/image', auth, upload.single('profileImage'), updateProfileImage);

module.exports = router;
