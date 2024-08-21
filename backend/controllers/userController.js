const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModels'); // Corrected model import

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, mobile_number, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10); 

  const user = await User.create({
    name,
    email,
    mobile_number,
    password: hashedPassword 
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile_number: user.mobile_number
    });

    console.log('User registered:');
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

module.exports = { registerUser };


