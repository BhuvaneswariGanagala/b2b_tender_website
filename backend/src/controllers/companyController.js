const { Company } = require('../models/Company');

// @desc    Get company profile
// @route   GET /api/companies/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const company = await Company.findByUserId(req.user.id);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company profile not found'
      });
    }

    res.json({
      success: true,
      data: company
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update company profile
// @route   PUT /api/companies/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const company = await Company.findByUserId(req.user.id);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company profile not found'
      });
    }

    const updatedCompany = await Company.updateById(company.id, req.body);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedCompany
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Upload company logo
// @route   POST /api/companies/upload-logo
// @access  Private
const uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const company = await Company.findByUserId(req.user.id);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company profile not found'
      });
    }

    // In a real application, you would upload to Supabase here
    // For now, we'll just save the file path
    const logoUrl = `/uploads/${req.file.filename}`;

    const updatedCompany = await Company.updateById(company.id, { logoUrl });

    res.json({
      success: true,
      message: 'Logo uploaded successfully',
      data: {
        logoUrl: updatedCompany.logoUrl
      }
    });
  } catch (error) {
    console.error('Upload logo error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get company by ID
// @route   GET /api/companies/:id
// @access  Public
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      success: true,
      data: company
    });
  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.getAll();

    res.json({
      success: true,
      count: companies.length,
      data: companies
    });
  } catch (error) {
    console.error('Get all companies error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadLogo,
  getCompanyById,
  getAllCompanies
}; 