# 🏢 Tender Management System - Project Specification

## 📋 Project Overview
A full-stack web application for managing tenders, company profiles, and applications. Companies can create tenders, apply to others' tenders, and manage their business profiles.

---

## 🌐 Frontend – React (Vite) + TailwindCSS

### ✅ Tech Stack
- **React 18** with Vite for fast development
- **TypeScript** (Optional but recommended)
- **TailwindCSS** for styling
- **Axios** for API requests
- **React Router** for navigation
- **React Hook Form** for form handling
- **React Query** for state management (optional)

### 🎯 Pages and Components

| Page | Route | Description |
|------|-------|-------------|
| **Sign In / Sign Up** | `/auth` | User login & registration with form validation |
| **Dashboard** | `/dashboard` | Company dashboard with overview and quick actions |
| **Profile Management** | `/profile` | CRUD operations for company profile |
| **Tender Listings** | `/tenders` | List all tenders with pagination and filters |
| **Tender Detail** | `/tenders/:id` | View tender details and apply functionality |
| **My Tenders** | `/my-tenders` | Company-specific tenders they've created |
| **Applications Received** | `/applications` | View and manage proposals received |
| **Company Search** | `/search` | Search companies by name, industry, services |

### 🎨 TailwindCSS Setup (Vite)

#### Step 1: Clear Default Styles
- Empty `app.css` and `index.css` files completely
- Remove all default Vite styling

#### Step 2: Install TailwindCSS
```bash
cd frontend
npm install tailwindcss @tailwindcss/vite
```

#### Step 3: Update Vite Config
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

#### Step 4: Update index.css
```css
/* src/index.css */
@import "tailwindcss";
```

#### Alternative Setup (Traditional Method)
If the above method doesn't work, use the traditional setup:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}
```

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
@layer components {
  .btn-primary {
    @apply bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md border border-gray-200 p-6;
  }
}
```

---

## 🔧 Backend – Express.js + PostgreSQL + Supabase

### ✅ Tech Stack
- **Express.js** with TypeScript
- **PostgreSQL** database
- **Sequelize ORM** for database operations
- **JWT** for authentication
- **bcrypt** for password hashing
- **Joi** for request validation
- **Multer** for file uploads
- **Supabase Storage** for image handling
- **CORS** for cross-origin requests

### 📦 API Modules

| Module | Routes | Description |
|--------|--------|-------------|
| **Auth** | `POST /api/auth/register`<br>`POST /api/auth/login`<br>`POST /api/auth/logout` | User registration, login, and logout |
| **Company** | `GET /api/companies`<br>`GET /api/companies/:id`<br>`PUT /api/companies/:id`<br>`DELETE /api/companies/:id` | CRUD operations for company profiles |
| **Tenders** | `GET /api/tenders`<br>`POST /api/tenders`<br>`GET /api/tenders/:id`<br>`PUT /api/tenders/:id`<br>`DELETE /api/tenders/:id` | Create, list, update, delete tenders |
| **Applications** | `GET /api/applications`<br>`POST /api/applications`<br>`PUT /api/applications/:id`<br>`DELETE /api/applications/:id` | Submit and manage applications |
| **Search** | `GET /api/search/companies`<br>`GET /api/search/tenders` | Server-side search functionality |

### 🧾 Database Schema

#### Tables Structure

**users**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**companies**
```sql
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  description TEXT,
  logo_url VARCHAR(500),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**tenders**
```sql
CREATE TABLE tenders (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  budget DECIMAL(12,2),
  deadline DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'open',
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**applications**
```sql
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  tender_id INTEGER REFERENCES tenders(id) ON DELETE CASCADE,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  proposal_text TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**goods_services**
```sql
CREATE TABLE goods_services (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🖼️ Supabase Storage Setup

1. **Create Storage Bucket**
   - Bucket name: `company-logos`
   - Public access: Enabled
   - File size limit: 5MB
   - Allowed file types: `image/*`

2. **Upload Process**
   - Frontend uploads to Supabase Storage
   - Backend receives image URL
   - Store URL in `companies.logo_url` field

---

## 📦 Project Deliverables

### ✅ Required Deliverables
- [ ] **GitHub Repository** with `frontend/` and `backend/` folders
- [ ] **README.md** with complete setup and run instructions
- [ ] **Database migrations** or ER diagram
- [ ] **ARCHITECTURE.md** explaining system design
- [ ] **Deployed URLs** (Vercel for frontend, Railway/Heroku for backend)
- [ ] **Loom video walkthrough** (2-3 minutes)

### 📁 Repository Structure
```
tender-management-system/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service functions
│   │   ├── utils/          # Utility functions
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Express.js API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── config/         # Configuration files
│   ├── migrations/         # Database migrations
│   └── package.json
├── docs/                   # Documentation
├── README.md
└── ARCHITECTURE.md
```

---

## 🔐 Authentication Flow

### JWT Implementation
1. **Registration/Login**: User submits credentials
2. **Backend Validation**: Verify credentials and generate JWT
3. **Token Storage**: Frontend stores JWT in localStorage
4. **API Requests**: Include token in `Authorization: Bearer <token>` header
5. **Middleware Protection**: Backend validates token on protected routes

### Security Features
- Password hashing with bcrypt
- JWT token expiration (24 hours)
- Protected API routes
- CORS configuration
- Input validation and sanitization

---

## 🗃️ Development Workflow

### Phase 1: Project Setup
1. Initialize frontend with Vite + React
2. Setup TailwindCSS configuration
3. Create backend Express.js structure
4. Configure PostgreSQL database
5. Setup Sequelize ORM

### Phase 2: Authentication
1. Implement user registration/login
2. Create JWT middleware
3. Build auth forms in frontend
4. Connect frontend to backend auth

### Phase 3: Core Features
1. Company profile management
2. Tender creation and listing
3. Application submission system
4. File upload with Supabase

### Phase 4: Advanced Features
1. Search functionality
2. Pagination implementation
3. Dashboard analytics
4. Email notifications (optional)

### Phase 5: Polish & Deploy
1. UI/UX improvements
2. Error handling
3. Testing
4. Deployment to production

---

## 📌 Technical Notes

### API Best Practices
- Use proper HTTP status codes (200, 201, 400, 401, 404, 500)
- Implement consistent error response format
- Add request validation with Joi
- Use environment variables for sensitive data
- Implement rate limiting for production

### Frontend Best Practices
- Use Axios interceptors for auth headers
- Implement proper loading states
- Add error boundaries
- Use React Query for caching (optional)
- Implement responsive design

### Database Best Practices
- Use migrations for schema changes
- Implement proper indexing
- Add foreign key constraints
- Use transactions for complex operations
- Regular database backups

### Environment Configuration
```bash
# Backend .env
DATABASE_URL=postgresql://user:password@localhost:5432/tender_db
JWT_SECRET=your-super-secret-jwt-key
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
PORT=5000

# Frontend .env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- Supabase account
- Git

### Quick Start
```bash
# Clone repository
git clone <repository-url>
cd tender-management-system

# Backend setup
cd backend
npm install
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

### Database Setup
```bash
# Run migrations
cd backend
npx sequelize-cli db:migrate

# Seed data (optional)
npx sequelize-cli db:seed:all
```

---

*This specification provides a comprehensive guide for building a modern, scalable tender management system with best practices and industry standards.*
