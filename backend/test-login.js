require('dotenv').config();
const http = require('http');

const loginData = JSON.stringify({
  email: "test@example.com",
  password: "password123"
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': loginData.length
  }
};

console.log('Testing login with:');
console.log('Email: test@example.com');
console.log('Password: password123');
console.log('---');

const req = http.request(options, res => {
  let body = '';
  res.on('data', chunk => { body += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', body);
    
    if (res.statusCode === 200) {
      const response = JSON.parse(body);
      console.log('✅ Login successful!');
      console.log('Token:', response.data.token ? 'Present' : 'Missing');
      console.log('User ID:', response.data.user.id);
      console.log('User Email:', response.data.user.email);
    } else {
      console.log('❌ Login failed!');
    }
  });
});

req.on('error', error => {
  console.error('❌ Request error:', error);
});

req.write(loginData);
req.end(); 