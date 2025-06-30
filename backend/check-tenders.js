require('dotenv').config();
const { Tender } = require('./src/models/Tender');
const { Company } = require('./src/models/Company');
const { User } = require('./src/models/User');

async function checkTenders() {
  console.log('🔍 Checking existing tenders...\n');
  
  try {
    // Check users
    const users = await User.findByEmail('test@example.com');
    console.log('Users found:', users ? 'YES' : 'NO');
    
    if (users) {
      console.log('User ID:', users.id);
      console.log('User Email:', users.email);
    }
    
    // Check companies
    const companies = await Company.findByUserId(users ? users.id : 0);
    console.log('Companies found:', companies ? 'YES' : 'NO');
    
    if (companies) {
      console.log('Company ID:', companies.id);
      console.log('Company Name:', companies.name);
      
      // Check tenders for this company
      const tenders = await Tender.findByCompanyId(companies.id);
      console.log('\nTenders found:', tenders.length);
      
      tenders.forEach((tender, index) => {
        console.log(`${index + 1}. ID: ${tender.id}, Title: ${tender.title}`);
      });
    }
    
    console.log('\n🎉 Check completed!');
    
  } catch (error) {
    console.error('❌ Error during check:', error);
  }
}

checkTenders(); 