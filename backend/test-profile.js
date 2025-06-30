require('dotenv').config();
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testProfileUpdate() {
  try {
    console.log('🧪 Testing Profile Update Functionality...\n');

    // 1. Login to get token
    console.log('1. Logging in...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });

    const token = loginResponse.data.data.token;
    console.log('✅ Login successful, token received\n');

    // 2. Get current profile
    console.log('2. Getting current profile...');
    const profileResponse = await axios.get(`${API_BASE}/companies/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('✅ Current profile:', JSON.stringify(profileResponse.data.data, null, 2));
    console.log('');

    // 3. Update profile
    console.log('3. Updating profile...');
    const updateData = {
      name: 'Updated Test Company Inc',
      industry: 'Technology',
      phone: '+1 (555) 123-4567',
      website: 'https://testcompany.com',
      address: '123 Test Street, Test City, TC 12345',
      description: 'This is an updated test company description',
      services: ['Web Development', 'Mobile Development', 'Cloud Solutions']
    };

    const updateResponse = await axios.put(`${API_BASE}/companies/profile`, updateData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('✅ Profile updated successfully!');
    console.log('Updated profile:', JSON.stringify(updateResponse.data.data, null, 2));
    console.log('');

    // 4. Verify update
    console.log('4. Verifying update...');
    const verifyResponse = await axios.get(`${API_BASE}/companies/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('✅ Verification successful!');
    console.log('Final profile:', JSON.stringify(verifyResponse.data.data, null, 2));

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testProfileUpdate(); 