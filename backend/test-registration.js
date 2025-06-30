require('dotenv').config();
const http = require('http');

// Test registration data
const registerData = JSON.stringify({
  email: "newuser@example.com",
  password: "newpassword123",
  companyName: "New Test Company",
  industry: "Finance"
});

// Test login data
const loginData = JSON.stringify({
  email: "newuser@example.com",
  password: "newpassword123"
});

console.log('🧪 Testing Registration and Login Flow\n');

// Step 1: Register a new user
console.log('Step 1: Registering new user...');
const registerOptions = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': registerData.length
  }
};

const registerReq = http.request(registerOptions, res => {
  let body = '';
  res.on('data', chunk => { body += chunk; });
  res.on('end', () => {
    console.log('Registration Status:', res.statusCode);
    console.log('Registration Response:', body);
    
    if (res.statusCode === 201) {
      console.log('✅ Registration successful!');
      
      // Step 2: Try to login with the new user
      console.log('\nStep 2: Testing login with new user...');
      const loginOptions = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': loginData.length
        }
      };

      const loginReq = http.request(loginOptions, res => {
        let loginBody = '';
        res.on('data', chunk => { loginBody += chunk; });
        res.on('end', () => {
          console.log('Login Status:', res.statusCode);
          console.log('Login Response:', loginBody);
          
          if (res.statusCode === 200) {
            console.log('✅ Login successful!');
            console.log('🎉 Registration and Login flow works perfectly!');
          } else {
            console.log('❌ Login failed!');
          }
        });
      });

      loginReq.on('error', error => {
        console.error('Login request error:', error);
      });

      loginReq.write(loginData);
      loginReq.end();
      
    } else {
      console.log('❌ Registration failed!');
    }
  });
});

registerReq.on('error', error => {
  console.error('Registration request error:', error);
});

registerReq.write(registerData);
registerReq.end(); 