const Joi = require('joi');

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }
    
    next();
  };
};

const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }
    
    next();
  };
};

// Validation schemas
const authSchemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(6).required(),
    companyName: Joi.string().min(2).max(100).required(),
    industry: Joi.string().required()
  }),
  
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
};

const companySchemas = {
  updateProfile: Joi.object({
    name: Joi.string().min(2).max(100),
    industry: Joi.string(),
    description: Joi.string().max(1000),
    phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/),
    website: Joi.string().uri().allow(''),
    address: Joi.string().max(200),
    services: Joi.array().items(Joi.string()),
    logoUrl: Joi.string().uri().allow('')
  })
};

const tenderSchemas = {
  create: Joi.object({
    title: Joi.string().min(5).max(200).required(),
    description: Joi.string().min(10).max(2000).required(),
    budget: Joi.number().positive().required(),
    deadline: Joi.date().greater('now').required()
  }),
  
  update: Joi.object({
    title: Joi.string().min(5).max(200),
    description: Joi.string().min(10).max(2000),
    budget: Joi.number().positive(),
    deadline: Joi.date().greater('now'),
    status: Joi.string().valid('open', 'closed', 'awarded')
  })
};

const applicationSchemas = {
  submitApplication: Joi.object({
    tenderId: Joi.number().integer().positive().required(),
    proposalText: Joi.string().min(10).max(5000).required()
  }),
  
  updateStatus: Joi.object({
    status: Joi.string().valid('pending', 'accepted', 'rejected').required()
  })
};

const searchSchemas = {
  searchCompanies: Joi.object({
    query: Joi.string().min(1),
    industry: Joi.string(),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(50)
  }),
  
  searchTenders: Joi.object({
    query: Joi.string().min(1),
    status: Joi.string().valid('open', 'closed', 'awarded'),
    minBudget: Joi.number().positive(),
    maxBudget: Joi.number().positive(),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(50)
  })
};

module.exports = {
  validateRequest,
  validateQuery,
  authSchemas,
  companySchemas,
  tenderSchemas,
  applicationSchemas,
  searchSchemas
}; 