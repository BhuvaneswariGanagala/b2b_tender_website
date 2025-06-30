require('dotenv').config();
const { User } = require('./src/models/User');
const bcrypt = require('bcryptjs');

async function debugLogin() {
  console.log('🔍 Debugging login issue...\n');

  try {
    // 1. Check if user exists
    const user = await User.findByEmail('test@example.com');
    console.log('1. User found:', user ? 'YES' : 'NO');
    
    if (!user) {
      console.log('❌ User not found! Run create-test-data.js first.');
      return;
    }

    console.log('   User ID:', user.id);
    console.log('   User Email:', user.email);
    console.log('   Password (hashed):', user.password.substring(0, 20) + '...');
    console.log('');

    // 2. Test password comparison
    const testPassword = 'password123';
    console.log('2. Testing password comparison...');
    console.log('   Input password:', testPassword);
    
    const isPasswordValid = await user.comparePassword(testPassword);
    console.log('   Password valid:', isPasswordValid);
    console.log('');

    // 3. Test manual bcrypt comparison
    console.log('3. Manual bcrypt test...');
    const manualCheck = await bcrypt.compare(testPassword, user.password);
    console.log('   Manual bcrypt result:', manualCheck);
    console.log('');

    // 4. Test with wrong password
    console.log('4. Testing with wrong password...');
    const wrongPasswordCheck = await user.comparePassword('wrongpassword');
    console.log('   Wrong password result:', wrongPasswordCheck);
    console.log('');

    if (isPasswordValid) {
      console.log('✅ Password comparison is working correctly!');
      console.log('   The issue might be elsewhere in the login flow.');
    } else {
      console.log('❌ Password comparison is failing!');
      console.log('   This suggests the password was not hashed correctly during user creation.');
    }

  } catch (error) {
    console.error('❌ Error during debug:', error);
  }
}

debugLogin(); 