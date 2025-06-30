// In-memory storage (replace with database in production)
let tenders = [];
let nextTenderId = 1;

class Tender {
  constructor(data) {
    this.id = nextTenderId++;
    this.title = data.title;
    this.description = data.description;
    this.budget = data.budget;
    this.deadline = new Date(data.deadline);
    this.status = data.status || 'open';
    this.companyId = data.companyId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Static methods
  static async create(tenderData) {
    const tender = new Tender(tenderData);
    tenders.push(tender);
    return tender;
  }

  static async findById(id) {
    return tenders.find(tender => tender.id === parseInt(id));
  }

  static async findByCompanyId(companyId) {
    return tenders.filter(tender => tender.companyId === parseInt(companyId));
  }

  static async updateById(id, updateData) {
    const tenderIndex = tenders.findIndex(tender => tender.id === parseInt(id));
    if (tenderIndex === -1) return null;

    tenders[tenderIndex] = { 
      ...tenders[tenderIndex], 
      ...updateData, 
      updatedAt: new Date() 
    };
    return tenders[tenderIndex];
  }

  static async deleteById(id) {
    const tenderIndex = tenders.findIndex(tender => tender.id === parseInt(id));
    if (tenderIndex === -1) return false;

    tenders.splice(tenderIndex, 1);
    return true;
  }

  static async search(query, filters = {}, pagination = {}) {
    let results = tenders;

    // Search by title or description
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(tender => 
        tender.title.toLowerCase().includes(searchTerm) ||
        tender.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by status
    if (filters.status) {
      results = results.filter(tender => tender.status === filters.status);
    }

    // Filter by budget range
    if (filters.minBudget) {
      results = results.filter(tender => tender.budget >= filters.minBudget);
    }

    if (filters.maxBudget) {
      results = results.filter(tender => tender.budget <= filters.maxBudget);
    }

    // Filter by deadline
    if (filters.deadline) {
      const deadline = new Date(filters.deadline);
      results = results.filter(tender => tender.deadline <= deadline);
    }

    // Sort by creation date (newest first)
    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const page = pagination.page || 1;
    const limit = pagination.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedResults = results.slice(startIndex, endIndex);

    return {
      tenders: paginatedResults,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(results.length / limit),
        totalItems: results.length,
        itemsPerPage: limit
      }
    };
  }

  static async getAll(pagination = {}) {
    const page = pagination.page || 1;
    const limit = pagination.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const sortedTenders = tenders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const paginatedTenders = sortedTenders.slice(startIndex, endIndex);

    return {
      tenders: paginatedTenders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(tenders.length / limit),
        totalItems: tenders.length,
        itemsPerPage: limit
      }
    };
  }

  static async getOpenTenders() {
    return tenders.filter(tender => tender.status === 'open');
  }

  static reset() {
    tenders = [];
    nextTenderId = 1;
  }
}

module.exports = { Tender }; 