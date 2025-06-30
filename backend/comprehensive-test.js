require('dotenv').config();
const { User } = require('./src/models/User');
const { Company } = require('./src/models/Company');
const { Tender } = require('./src/models/Tender');

async function comprehensiveTest() {
  console.log('🔍 Comprehensive Test - Finding the Issue\n');
  
  try {
    // Step 1: Check if any users exist
    console.log('Step 1: Checking existing users...');
    const allUsers = require('./src/models/User').User.getAll ? await require('./src/models/User').User.getAll() : 'No getAll method';
    console.log('All users:', allUsers);
    console.log('');

    // Step 2: Create a test user
    console.log('Step 2: Creating test user...');
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ User created:', user.email, 'ID:', user.id);
    console.log('Password hash:', user.password.substring(0, 30) + '...');
    console.log('');

    // Step 3: Verify user was saved
    console.log('Step 3: Verifying user was saved...');
    const foundUser = await User.findByEmail('test@example.com');
    console.log('User found by email:', foundUser ? 'YES' : 'NO');
    if (foundUser) {
      console.log('Found user ID:', foundUser.id);
      console.log('Found user email:', foundUser.email);
    }
    console.log('');

    // Step 4: Test password comparison
    console.log('Step 4: Testing password comparison...');
    if (foundUser) {
      const isPasswordValid = await foundUser.comparePassword('password123');
      console.log('Password comparison result:', isPasswordValid);
      
      // Test with wrong password
      const isWrongPasswordValid = await foundUser.comparePassword('wrongpassword');
      console.log('Wrong password test:', isWrongPasswordValid);
    }
    console.log('');

    // Step 5: Create company
    console.log('Step 5: Creating company...');
    const company = await Company.create({
      name: 'Test Company Inc',
      industry: 'Technology',
      description: 'A test company for development',
      userId: user.id
    });
    console.log('✅ Company created:', company.name, 'ID:', company.id);
    console.log('');

    // Step 6: Test login flow
    console.log('Step 6: Testing login flow...');
    const loginUser = await User.findByEmail('test@example.com');
    if (loginUser) {
      const passwordValid = await loginUser.comparePassword('password123');
      if (passwordValid) {
        console.log('✅ Login would succeed!');
        const token = loginUser.generateToken();
        console.log('Token generated:', token ? 'YES' : 'NO');
      } else {
        console.log('❌ Login would fail - password invalid');
      }
    } else {
      console.log('❌ Login would fail - user not found');
    }
    console.log('');

    console.log('🎉 Test completed!');

  } catch (error) {
    console.error('❌ Error during test:', error);
    console.error('Stack trace:', error.stack);
  }
}

comprehensiveTest(); 