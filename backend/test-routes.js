const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Basic middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Test server is running',
    timestamp: new Date().toISOString()
  });
});

console.log('Testing route imports...');

try {
  console.log('Testing auth routes...');
  const authRoutes = require('./src/routes/auth');
  console.log('✅ Auth routes loaded successfully');
} catch (error) {
  console.log('❌ Auth routes failed:', error.message);
}

try {
  console.log('Testing company routes...');
  const companyRoutes = require('./src/routes/companies');
  console.log('✅ Company routes loaded successfully');
} catch (error) {
  console.log('❌ Company routes failed:', error.message);
}

try {
  console.log('Testing tender routes...');
  const tenderRoutes = require('./src/routes/tenders');
  console.log('✅ Tender routes loaded successfully');
} catch (error) {
  console.log('❌ Tender routes failed:', error.message);
}

try {
  console.log('Testing application routes...');
  const applicationRoutes = require('./src/routes/applications');
  console.log('✅ Application routes loaded successfully');
} catch (error) {
  console.log('❌ Application routes failed:', error.message);
}

try {
  console.log('Testing search routes...');
  const searchRoutes = require('./src/routes/search');
  console.log('✅ Search routes loaded successfully');
} catch (error) {
  console.log('❌ Search routes failed:', error.message);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

module.exports = app; 