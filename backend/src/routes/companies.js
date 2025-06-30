const express = require('express');
const router = express.Router();
const { 
  getProfile, 
  updateProfile, 
  uploadLogo, 
  getCompanyById, 
  getAllCompanies 
} = require('../controllers/companyController');
const { validateRequest } = require('../middleware/validate');
const { companySchemas } = require('../middleware/validate');
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

// Public routes
router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);

// Protected routes
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, validateRequest(companySchemas.updateProfile), updateProfile);
router.post('/upload-logo', authenticate, upload.single('logo'), uploadLogo);

module.exports = router; 