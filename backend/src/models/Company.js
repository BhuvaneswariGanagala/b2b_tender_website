// In-memory storage (replace with database in production)
let companies = [];
let nextCompanyId = 1;

class Company {
  constructor(data) {
    this.id = nextCompanyId++;
    this.name = data.name;
    this.industry = data.industry;
    this.description = data.description || '';
    this.logoUrl = data.logoUrl || '';
    this.userId = data.userId;
    this.phone = data.phone || '';
    this.website = data.website || '';
    this.address = data.address || '';
    this.services = data.services || [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Static methods
  static async create(companyData) {
    const company = new Company(companyData);
    companies.push(company);
    return company;
  }

  static async findById(id) {
    return companies.find(company => company.id === parseInt(id));
  }

  static async findByUserId(userId) {
    return companies.find(company => company.userId === parseInt(userId));
  }

  static async updateById(id, updateData) {
    const companyIndex = companies.findIndex(company => company.id === parseInt(id));
    if (companyIndex === -1) return null;

    companies[companyIndex] = { 
      ...companies[companyIndex], 
      ...updateData, 
      updatedAt: new Date() 
    };
    return companies[companyIndex];
  }

  static async deleteById(id) {
    const companyIndex = companies.findIndex(company => company.id === parseInt(id));
    if (companyIndex === -1) return false;

    companies.splice(companyIndex, 1);
    return true;
  }

  static async search(query, filters = {}) {
    let results = companies;

    // Search by name or description
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(company => 
        company.name.toLowerCase().includes(searchTerm) ||
        company.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by industry
    if (filters.industry) {
      results = results.filter(company => 
        company.industry.toLowerCase() === filters.industry.toLowerCase()
      );
    }

    // Filter by service
    if (filters.service) {
      results = results.filter(company => 
        company.services.some(service => 
          service.toLowerCase().includes(filters.service.toLowerCase())
        )
      );
    }

    return results;
  }

  static async getAll() {
    return companies;
  }

  static reset() {
    companies = [];
    nextCompanyId = 1;
  }
}

module.exports = { Company }; 