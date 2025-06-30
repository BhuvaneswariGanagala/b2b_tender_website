# 🏢 Tender Management System - Backend API

## 📋 Overview
Express.js backend API for the Tender Management System with JWT authentication, in-memory data storage, and comprehensive CRUD operations.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Copy environment variables
cp env.example .env

# Start development server
npm run dev
```

### Environment Variables
Create a `.env` file with the following variables:
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:5173
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Health Check
```http
GET /health
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "company@example.com",
  "password": "password123",
  "companyName": "Tech Solutions Inc",
  "industry": "Technology"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "company@example.com",
  "password": "password123"
}
```

### Company Endpoints

#### Get Company Profile
```http
GET /api/companies/profile
Authorization: Bearer <token>
```

#### Update Company Profile
```http
PUT /api/companies/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Company Name",
  "description": "Updated description",
  "industry": "Technology",
  "phone": "+1234567890",
  "website": "https://example.com",
  "address": "123 Business St, City, State"
}
```

#### Get Company by ID
```http
GET /api/companies/:id
Authorization: Bearer <token>
```

### Tender Endpoints

#### Get All Tenders
```http
GET /api/tenders?page=1&limit=10&status=open&search=software
Authorization: Bearer <token>
```

#### Create Tender
```http
POST /api/tenders
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Software Development Project",
  "description": "We need a custom software solution...",
  "budget": 50000,
  "deadline": "2024-12-31"
}
```

#### Get Tender by ID
```http
GET /api/tenders/:id
Authorization: Bearer <token>
```

#### Update Tender
```http
PUT /api/tenders/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Tender Title",
  "budget": 60000,
  "status": "closed"
}
```

#### Delete Tender
```http
DELETE /api/tenders/:id
Authorization: Bearer <token>
```

#### Get My Tenders
```http
GET /api/tenders/my?page=1&limit=10
Authorization: Bearer <token>
```

### Application Endpoints

#### Submit Application
```http
POST /api/applications
Authorization: Bearer <token>
Content-Type: application/json

{
  "tenderId": 1,
  "proposalText": "Our proposal for this tender..."
}
```

#### Get All Applications
```http
GET /api/applications?page=1&limit=10&status=pending
Authorization: Bearer <token>
```

#### Get Received Applications
```http
GET /api/applications/received?page=1&limit=10
Authorization: Bearer <token>
```

#### Get My Applications
```http
GET /api/applications/my?page=1&limit=10
Authorization: Bearer <token>
```

#### Update Application Status
```http
PUT /api/applications/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "accepted"
}
```

### Search Endpoints

#### Search Companies
```http
GET /api/search/companies?query=tech&industry=Technology&page=1&limit=10
```

#### Search Tenders
```http
GET /api/search/tenders?query=software&status=open&minBudget=10000&maxBudget=100000
```

#### Get Search Suggestions
```http
GET /api/search/suggestions?query=tech&type=all
```

#### Get Popular Searches
```http
GET /api/search/popular
```

#### Get Search Filters
```http
GET /api/search/filters
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── controllers/          # Route controllers
│   │   ├── authController.js
│   │   ├── companyController.js
│   │   ├── tenderController.js
│   │   ├── applicationController.js
│   │   └── searchController.js
│   ├── middleware/           # Custom middleware
│   │   ├── auth.js          # JWT authentication
│   │   ├── validate.js      # Request validation
│   │   └── errorHandler.js  # Error handling
│   ├── models/              # Data models (in-memory)
│   │   ├── User.js
│   │   ├── Company.js
│   │   ├── Tender.js
│   │   └── Application.js
│   ├── routes/              # API routes
│   │   ├── auth.js
│   │   ├── companies.js
│   │   ├── tenders.js
│   │   ├── applications.js
│   │   └── search.js
│   ├── utils/               # Utility functions
│   ├── config/              # Configuration files
│   └── server.js            # Main server file
├── uploads/                 # File uploads directory
├── package.json
├── env.example
└── README.md
```

## 🔧 Development

### Available Scripts
```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# Run tests (if configured)
npm test
```

### Data Storage
Currently using in-memory storage for development. Data will be lost on server restart.

### Error Handling
All errors are handled consistently with the following format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (development only)"
}
```

### Validation
All requests are validated using Joi schemas with detailed error messages.

### CORS
Configured to allow requests from the frontend (default: http://localhost:5173).

## 🚀 Deployment

### Environment Variables for Production
```env
PORT=5000
JWT_SECRET=your-super-secure-jwt-secret
CORS_ORIGIN=https://your-frontend-domain.com
NODE_ENV=production
```

### Recommended Platforms
- Railway
- Heroku
- DigitalOcean App Platform
- AWS Elastic Beanstalk

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting (recommended for production)
- Environment variable protection

## 📝 Notes

- This is a development version with in-memory storage
- For production, integrate with PostgreSQL database
- Add Supabase Storage for file uploads
- Implement proper logging and monitoring
- Add comprehensive test coverage
- Consider adding rate limiting and API documentation tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the Tender Management System. 