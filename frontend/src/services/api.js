import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

// Company API calls
export const companyAPI = {
  getProfile: () => api.get('/companies/profile'),
  updateProfile: (data) => api.put('/companies/profile', data),
  uploadLogo: (file) => {
    const formData = new FormData();
    formData.append('logo', file);
    return api.post('/companies/upload-logo', formData);
  },
};

// Tenders API calls
export const tendersAPI = {
  getAll: (params) => api.get('/tenders', { params }),
  getById: (id) => api.get(`/tenders/${id}`),
  create: (data) => api.post('/tenders', data),
  update: (id, data) => api.put(`/tenders/${id}`, data),
  delete: (id) => api.delete(`/tenders/${id}`),
  getMyTenders: () => api.get('/tenders/my-tenders'),
};

// Applications API calls
export const applicationsAPI = {
  submit: (tenderId, data) => api.post(`/applications`, { tenderId, ...data }),
  getReceived: () => api.get('/applications/received'),
  updateStatus: (id, status) => api.put(`/applications/${id}/status`, { status }),
};

// Search API calls
export const searchAPI = {
  searchCompanies: (params) => api.get('/search/companies', { params }),
  searchTenders: (params) => api.get('/search/tenders', { params }),
};

export default api; 