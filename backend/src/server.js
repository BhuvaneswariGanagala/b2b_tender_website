require('dotenv').config();

const express = require('express');
const cors = require('cors');

const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const companyRoutes = require('./routes/companies');
const tenderRoutes = require('./routes/tenders');
const applicationRoutes = require('./routes/applications');
const searchRoutes = require('./routes/search');

// Import models for test data
const { User } = require('./models/User');
const { Company } = require('./models/Company');
const { Tender } = require('./models/Tender');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware to ensure proper Content-Type headers
app.use((req, res, next) => {
  // Override res.json to add charset
  const originalJson = res.json;
  res.json = function(data) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return originalJson.call(this, data);
  };
  
  // Override res.send for other content types
  const originalSend = res.send;
  res.send = function(data) {
    if (typeof data === 'string') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
    }
    return originalSend.call(this, data);
  };
  
  next();
});

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Tender Management API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/tenders', tenderRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/search', searchRoutes);

// Minimal test route
app.get('/test', (req, res) => {
  res.send('Minimal server OK');
});

const PORT = process.env.PORT || 5000;

// Create test data on server startup
async function createTestData() {
  try {
    // Remove all users, companies, and tenders (reset in-memory storage)
    const userModel = require('./models/User');
    const companyModel = require('./models/Company');
    const tenderModel = require('./models/Tender');
    if (userModel && userModel.User) userModel.User.reset && userModel.User.reset();
    if (companyModel && companyModel.Company) companyModel.Company.reset && companyModel.Company.reset();
    if (tenderModel && tenderModel.Tender) tenderModel.Tender.reset && tenderModel.Tender.reset();

    // Create test user
    const user = await User.create({
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123'
    });
    console.log('✅ Created test user:', user.email);

    // Create test company
    const company = await Company.create({
      name: 'Test Company Inc',
      industry: 'Technology',
      description: 'A test company for development',
      userId: user.id
    });
    console.log('✅ Created test company:', company.name);

    // Create three test tenders
    const tenders = [
      {
        title: 'Website Development Project',
        description: 'We need a modern, responsive website for our business.',
        budget: 15000,
        deadline: '2024-12-31',
        status: 'open',
        companyId: company.id
      },
      {
        title: 'Mobile App Development',
        description: 'Looking for a skilled developer to create a cross-platform mobile app.',
        budget: 25000,
        deadline: '2024-11-30',
        status: 'open',
        companyId: company.id
      },
      {
        title: 'E-commerce Platform',
        description: 'Need a complete e-commerce solution with inventory management, payment processing, and admin dashboard.',
        budget: 35000,
        deadline: '2024-10-31',
        status: 'open',
        companyId: company.id
      }
    ];

    for (const tenderData of tenders) {
      const tender = await Tender.create(tenderData);
      console.log(`✅ Created tender: ${tender.title} (ID: ${tender.id})`);
    }

    console.log('🎉 Test data created successfully!');
    console.log('Login with: test@example.com / password123');
  } catch (error) {
    console.error('❌ Error creating test data:', error);
  }
}

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  
  // Create test data after server starts
  await createTestData();
});

module.exports = app; 