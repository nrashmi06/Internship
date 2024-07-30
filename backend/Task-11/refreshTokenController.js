const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

exports.refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).send({ error: 'Refresh token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);

    if (!user || user.refreshToken !== token) {
      return res.status(403).send({ error: 'Invalid refresh token' });
    }

    // Generate new access token
    const newAccessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '60s' });

    res.send({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(403).send({ error: 'Invalid refresh token' });
  }
};
