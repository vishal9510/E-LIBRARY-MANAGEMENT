const User = require('../model/user.model');
const jwt = require('jsonwebtoken');



const generateToken = (id) => {
  return jwt.sign({ id }, "#######", {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ username, email, password });


  res.status(201).json({
    _id: user._id,
    username: user.name,
    email: user.email,
    token: generateToken(user._id),
  });

};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};


module.exports = {
  registerUser,
  loginUser
};
