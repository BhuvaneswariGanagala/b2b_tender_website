const express = require('express');
const router = express.Router();
const { register, login, logout, getMe } = require('../controllers/authController');
const { validateRequest } = require('../middleware/validate');
const { authSchemas } = require('../middleware/validate');
const { authenticate } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Auth routes
router.post('/register', validateRequest(authSchemas.register), register);
router.post('/login', validateRequest(authSchemas.login), login);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);

module.exports = router; 