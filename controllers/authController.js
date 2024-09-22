const User = require('../models/user');
const jwtService = require('../services/jwtService');
const csrfService = require('../services/csrfService');
const { loginLimiter, registerLimiter } = require('../middlewares/rateLimiter');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(409).json({ message: 'User already exists' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (user.isLocked) {
    return res.status(403).json({ message: 'Account is locked due to too many failed attempts' });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    user.loginAttempts += 1;
  
    if (user.loginAttempts >= 5) {
      user.isLocked = true;
      user.lockUntil = Date.now() + 15 * 60 * 1000;
    }

    await user.save();
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  user.loginAttempts = 0;
  await user.save();

  const accessToken = jwtService.signToken({ id: user._id, email: user.email });
  const refreshToken = jwtService.signRefreshToken({ id: user._id, email: user.email });

  user.refreshToken = refreshToken;
  await user.save();

  const csrfToken = csrfService.generateToken();

  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
  res.json({ accessToken, csrfToken });

};
  
exports.refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const csrfToken = req.headers['csrf-token'];

  if (!refreshToken) return res.sendStatus(401);

  const user = await User.findOne({ refreshToken });
  if (!user) return res.sendStatus(403);

  if (!csrfService.validateToken(csrfToken)) {
    return res.sendStatus(403);
  }
  
  try {
    const payload = await jwtService.verifyRefreshToken(refreshToken);
    const newAccessToken = jwtService.signToken({ id: payload.id, email: payload.email });
    res.json({ accessToken: newAccessToken, csrfToken });
  } catch (error) {
    res.sendStatus(403);
  }
};