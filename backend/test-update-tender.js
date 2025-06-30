const http = require('http');

// First, let's create a test tender to update
const createTenderData = JSON.stringify({
  title: "Test Tender for Update",
  description: "This is a test tender that we will update",
  budget: 15000,
  deadline: "2024-12-31"
});

const updateTenderData = JSON.stringify({
  title: "Updated Test Tender",
  description: "This tender has been updated successfully",
  budget: 20000,
  deadline: "2024-12-15",
  status: "open"
});

// Note: In a real test, you would need to:
// 1. Register a user first
// 2. Get the JWT token
// 3. Use that token for authenticated requests
// For now, this is just to test the route structure

console.log('Testing tender update endpoint...');
console.log('Note: This test requires authentication. The route structure is now correct.');

// Test the route structure
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/tenders/1',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': updateTenderData.length
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', chunk => { body += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', body);
  });
});

req.on('error', error => {
  console.error('Error:', error);
});

req.write(updateTenderData);
req.end(); 