const { Tender } = require('../models/Tender');
const { Company } = require('../models/Company');

// @desc    Get all tenders
// @route   GET /api/tenders
// @access  Public
const getAllTenders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    const filters = {};
    if (status) filters.status = status;

    const result = await Tender.search(search, filters, { page: parseInt(page), limit: parseInt(limit) });

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Get all tenders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get tender by ID
// @route   GET /api/tenders/:id
// @access  Public
const getTenderById = async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    
    if (!tender) {
      return res.status(404).json({
        success: false,
        message: 'Tender not found'
      });
    }

    // Get company information
    const company = await Company.findById(tender.companyId);

    res.json({
      success: true,
      data: {
        ...tender,
        company: company ? {
          id: company.id,
          name: company.name,
          industry: company.industry
        } : null
      }
    });
  } catch (error) {
    console.error('Get tender error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create tender
// @route   POST /api/tenders
// @access  Private
const createTender = async (req, res) => {
  try {
    const company = await Company.findByUserId(req.user.id);
    
    if (!company) {
      return res.status(400).json({
        success: false,
        message: 'Company profile required to create tenders'
      });
    }

    const tenderData = {
      ...req.body,
      companyId: company.id
    };

    const tender = await Tender.create(tenderData);

    res.status(201).json({
      success: true,
      message: 'Tender created successfully',
      data: tender
    });
  } catch (error) {
    console.error('Create tender error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update tender
// @route   PUT /api/tenders/:id
// @access  Private
const updateTender = async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    
    if (!tender) {
      return res.status(404).json({
        success: false,
        message: 'Tender not found'
      });
    }

    // Check if user owns this tender
    const company = await Company.findByUserId(req.user.id);
    if (!company || tender.companyId !== company.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this tender'
      });
    }

    const updatedTender = await Tender.updateById(tender.id, req.body);

    res.json({
      success: true,
      message: 'Tender updated successfully',
      data: updatedTender
    });
  } catch (error) {
    console.error('Update tender error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete tender
// @route   DELETE /api/tenders/:id
// @access  Private
const deleteTender = async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    
    if (!tender) {
      return res.status(404).json({
        success: false,
        message: 'Tender not found'
      });
    }

    // Check if user owns this tender
    const company = await Company.findByUserId(req.user.id);
    if (!company || tender.companyId !== company.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this tender'
      });
    }

    await Tender.deleteById(tender.id);

    res.json({
      success: true,
      message: 'Tender deleted successfully'
    });
  } catch (error) {
    console.error('Delete tender error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get my tenders
// @route   GET /api/tenders/my-tenders
// @access  Private
const getMyTenders = async (req, res) => {
  try {
    const company = await Company.findByUserId(req.user.id);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company profile not found'
      });
    }

    const tenders = await Tender.findByCompanyId(company.id);

    res.json({
      success: true,
      count: tenders.length,
      data: tenders
    });
  } catch (error) {
    console.error('Get my tenders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getAllTenders,
  getTenderById,
  createTender,
  updateTender,
  deleteTender,
  getMyTenders
}; 