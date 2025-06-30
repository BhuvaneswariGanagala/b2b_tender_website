const { User } = require('./src/models/User');
const { Company } = require('./src/models/Company');
const { Tender } = require('./src/models/Tender');

async function createTestData() {
  console.log('Creating test data...');

  try {
    // Create a test user
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ Created user:', user.email);

    // Create a test company
    const company = await Company.create({
      name: 'Test Company Inc',
      industry: 'Technology',
      description: 'A test company for development',
      userId: user.id
    });
    console.log('✅ Created company:', company.name);

    // Create test tenders
    const tenders = [
      {
        title: 'Website Development Project',
        description: 'We need a modern, responsive website for our business. The website should include user authentication, dashboard, and payment integration.',
        budget: 15000,
        deadline: '2024-12-31',
        status: 'open',
        companyId: company.id
      },
      {
        title: 'Mobile App Development',
        description: 'Looking for a skilled developer to create a cross-platform mobile app for iOS and Android. The app should include push notifications and offline functionality.',
        budget: 25000,
        deadline: '2024-11-30',
        status: 'open',
        companyId: company.id
      },
      {
        title: 'E-commerce Platform',
        description: 'Need a complete e-commerce solution with inventory management, payment processing, and admin dashboard.',
        budget: 35000,
        deadline: '2024-10-31',
        status: 'open',
        companyId: company.id
      }
    ];

    for (const tenderData of tenders) {
      const tender = await Tender.create(tenderData);
      console.log(`✅ Created tender: ${tender.title} (ID: ${tender.id})`);
    }

    console.log('\n🎉 Test data created successfully!');
    console.log('\nYou can now:');
    console.log('1. Login with email: test@example.com, password: password123');
    console.log('2. Go to "My Tenders" to see the created tenders');
    console.log('3. Click "Edit" on any tender to test the edit functionality');
    console.log('\nTender IDs created:', tenders.map((_, index) => index + 1).join(', '));

  } catch (error) {
    console.error('❌ Error creating test data:', error);
  }
}

// Run the script
createTestData(); 