const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt with email:', email);

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    console.log('User found:', user);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    console.log('Password matches');

    // Generate JWT tokens
    const accessToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '60s' });
    const refreshToken = jwt.sign({ _id: user._id.toString() }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    // Save refresh token to the user
    user.refreshToken = refreshToken;
    await user.save();

    console.log('JWT generated:', accessToken, '\n refresh token :', refreshToken);

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.send({ user: userWithoutPassword, accessToken, refreshToken });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ error: 'Server error, please try again later.' });
  }
};
