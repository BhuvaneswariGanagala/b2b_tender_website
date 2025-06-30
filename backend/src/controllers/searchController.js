const Company = require('../models/Company');
const Tender = require('../models/Tender');

// Search companies
const searchCompanies = async (req, res) => {
  try {
    const { 
      query = '', 
      industry, 
      page = 1, 
      limit = 10 
    } = req.query;
    
    const filters = {};
    if (industry) filters.industry = industry;
    
    const companies = await Company.search(query, filters, { 
      page: parseInt(page), 
      limit: parseInt(limit) 
    });
    
    res.json({
      success: true,
      data: companies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: companies.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching companies',
      error: error.message
    });
  }
};

// Search tenders
const searchTenders = async (req, res) => {
  try {
    const { 
      query = '', 
      status, 
      minBudget, 
      maxBudget, 
      page = 1, 
      limit = 10 
    } = req.query;
    
    const filters = {};
    if (status) filters.status = status;
    if (minBudget) filters.minBudget = parseFloat(minBudget);
    if (maxBudget) filters.maxBudget = parseFloat(maxBudget);
    
    const tenders = await Tender.search(query, filters, { 
      page: parseInt(page), 
      limit: parseInt(limit) 
    });
    
    res.json({
      success: true,
      data: tenders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: tenders.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching tenders',
      error: error.message
    });
  }
};

// Get search suggestions
const getSearchSuggestions = async (req, res) => {
  try {
    const { query = '', type = 'all' } = req.query;
    
    if (!query || query.length < 2) {
      return res.json({
        success: true,
        data: {
          companies: [],
          tenders: []
        }
      });
    }
    
    let suggestions = {
      companies: [],
      tenders: []
    };
    
    if (type === 'all' || type === 'companies') {
      const companies = await Company.search(query, {}, { page: 1, limit: 5 });
      suggestions.companies = companies.map(company => ({
        id: company.id,
        name: company.name,
        industry: company.industry,
        type: 'company'
      }));
    }
    
    if (type === 'all' || type === 'tenders') {
      const tenders = await Tender.search(query, {}, { page: 1, limit: 5 });
      suggestions.tenders = tenders.map(tender => ({
        id: tender.id,
        title: tender.title,
        budget: tender.budget,
        status: tender.status,
        type: 'tender'
      }));
    }
    
    res.json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting search suggestions',
      error: error.message
    });
  }
};

// Get popular searches
const getPopularSearches = async (req, res) => {
  try {
    // In a real application, you would track search queries
    // For now, return some sample popular searches
    const popularSearches = {
      companies: [
        { query: 'technology', count: 150 },
        { query: 'construction', count: 120 },
        { query: 'healthcare', count: 95 },
        { query: 'finance', count: 80 },
        { query: 'education', count: 65 }
      ],
      tenders: [
        { query: 'software development', count: 200 },
        { query: 'building construction', count: 180 },
        { query: 'consulting services', count: 140 },
        { query: 'equipment supply', count: 110 },
        { query: 'maintenance services', count: 90 }
      ]
    };
    
    res.json({
      success: true,
      data: popularSearches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting popular searches',
      error: error.message
    });
  }
};

// Get search filters
const getSearchFilters = async (req, res) => {
  try {
    // In a real application, you would get these from the database
    const filters = {
      industries: [
        'Technology',
        'Construction',
        'Healthcare',
        'Finance',
        'Education',
        'Manufacturing',
        'Retail',
        'Transportation',
        'Energy',
        'Consulting'
      ],
      tenderStatuses: [
        'open',
        'closed',
        'awarded',
        'cancelled'
      ],
      budgetRanges: [
        { label: 'Under $10,000', min: 0, max: 10000 },
        { label: '$10,000 - $50,000', min: 10000, max: 50000 },
        { label: '$50,000 - $100,000', min: 50000, max: 100000 },
        { label: '$100,000 - $500,000', min: 100000, max: 500000 },
        { label: 'Over $500,000', min: 500000, max: null }
      ]
    };
    
    res.json({
      success: true,
      data: filters
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting search filters',
      error: error.message
    });
  }
};

module.exports = {
  searchCompanies,
  searchTenders,
  getSearchSuggestions,
  getPopularSearches,
  getSearchFilters
}; 