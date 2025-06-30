require('dotenv').config();

console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN);
console.log('PORT:', process.env.PORT); 