const express = require('express');
const router = express.Router();
const { 
  getAllTenders, 
  getTenderById, 
  createTender, 
  updateTender, 
  deleteTender, 
  getMyTenders 
} = require('../controllers/tenderController');
const { authenticate } = require('../middleware/auth');
const { validateRequest, tenderSchemas } = require('../middleware/validate');

// Public routes
router.get('/', getAllTenders);
router.get('/:id', getTenderById);

// Protected routes
router.use(authenticate); // Apply auth middleware to all routes below

router.post('/', validateRequest(tenderSchemas.create), createTender);
router.put('/:id', validateRequest(tenderSchemas.update), updateTender);
router.delete('/:id', deleteTender);
router.get('/my-tenders', getMyTenders);

module.exports = router; 