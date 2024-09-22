const express = require('express');
const authController = require('../controllers/authController');
const authenticateJWT = require('../middlewares/authenticateJWT');
const csrfProtection = require('../middlewares/csrfProtection');
const { loginLimiter, registerLimiter } = require('../middlewares/rateLimiter');
const router = express.Router();

router.post('/register', registerLimiter, authController.register);
router.post('/login', loginLimiter, authController.login);
router.post('/refresh', authController.refresh);
router.get('/protected', authenticateJWT, csrfProtection, (req, res) => {
  res.json({
    message: 'This is a protected resource',
    user: { id: req.user.id, email: req.user.email },
  });
});

module.exports = router;
