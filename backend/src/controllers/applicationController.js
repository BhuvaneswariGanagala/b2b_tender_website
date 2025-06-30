const Application = require('../models/Application');
const Tender = require('../models/Tender');
const Company = require('../models/Company');
const { validateRequest } = require('../middleware/validate');

// Get all applications (for admin or company owner)
const getAllApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, tenderId, companyId } = req.query;
    
    let filters = {};
    if (status) filters.status = status;
    if (tenderId) filters.tenderId = parseInt(tenderId);
    if (companyId) filters.companyId = parseInt(companyId);
    
    const applications = await Application.getAll(filters, { page: parseInt(page), limit: parseInt(limit) });
    
    res.json({
      success: true,
      data: applications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: applications.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching applications',
      error: error.message
    });
  }
};

// Submit a new application
const submitApplication = async (req, res) => {
  try {
    const { tenderId, proposalText } = req.body;
    const companyId = req.user.companyId;
    
    // Check if tender exists and is open
    const tender = await Tender.getById(tenderId);
    if (!tender) {
      return res.status(404).json({
        success: false,
        message: 'Tender not found'
      });
    }
    
    if (tender.status !== 'open') {
      return res.status(400).json({
        success: false,
        message: 'Tender is not open for applications'
      });
    }
    
    // Check if company is not applying to their own tender
    if (tender.companyId === companyId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot apply to your own tender'
      });
    }
    
    // Check if already applied
    const existingApplication = await Application.getByTenderAndCompany(tenderId, companyId);
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied to this tender'
      });
    }
    
    const application = await Application.create({
      tenderId: parseInt(tenderId),
      companyId,
      proposalText
    });
    
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: error.message
    });
  }
};

// Get application by ID
const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.getById(id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    // Check if user has permission to view this application
    const companyId = req.user.companyId;
    const tender = await Tender.getById(application.tenderId);
    
    if (application.companyId !== companyId && tender.companyId !== companyId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching application',
      error: error.message
    });
  }
};

// Update application status (for tender owner)
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const companyId = req.user.companyId;
    
    const application = await Application.getById(id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    // Check if user owns the tender
    const tender = await Tender.getById(application.tenderId);
    if (tender.companyId !== companyId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
    const validStatuses = ['pending', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const updatedApplication = await Application.updateStatus(id, status);
    
    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: updatedApplication
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating application status',
      error: error.message
    });
  }
};

// Get applications received by company (for tender owners)
const getReceivedApplications = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { page = 1, limit = 10, status } = req.query;
    
    let filters = {};
    if (status) filters.status = status;
    
    const applications = await Application.getReceivedApplications(companyId, filters, { 
      page: parseInt(page), 
      limit: parseInt(limit) 
    });
    
    res.json({
      success: true,
      data: applications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: applications.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching received applications',
      error: error.message
    });
  }
};

// Get my applications (for companies)
const getMyApplications = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { page = 1, limit = 10, status } = req.query;
    
    let filters = {};
    if (status) filters.status = status;
    
    const applications = await Application.getMyApplications(companyId, filters, { 
      page: parseInt(page), 
      limit: parseInt(limit) 
    });
    
    res.json({
      success: true,
      data: applications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: applications.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching my applications',
      error: error.message
    });
  }
};

// Delete application (only by the applicant)
const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const companyId = req.user.companyId;
    
    const application = await Application.getById(id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    // Check if user owns the application
    if (application.companyId !== companyId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
    // Check if application can still be deleted (pending status)
    if (application.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete application that is not pending'
      });
    }
    
    await Application.delete(id);
    
    res.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting application',
      error: error.message
    });
  }
};

module.exports = {
  getAllApplications,
  submitApplication,
  getApplicationById,
  updateApplicationStatus,
  getReceivedApplications,
  getMyApplications,
  deleteApplication
}; 