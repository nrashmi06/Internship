const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt with email:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    console.log('User found:', user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    console.log('Password matches');

    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('JWT generated:', token);

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.send({ user: userWithoutPassword, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ error: 'Server error, please try again later.' });
  }
};
