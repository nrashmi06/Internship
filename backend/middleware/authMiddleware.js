const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log('token recieved :', token);
    if (!token) {
      throw new Error('Authorization token not found');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).send({ error: 'Authentication failed' });
  }
};

module.exports = auth;
