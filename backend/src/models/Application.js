// In-memory storage (replace with database in production)
let applications = [];
let nextApplicationId = 1;

class Application {
  constructor(data) {
    this.id = nextApplicationId++;
    this.tenderId = data.tenderId;
    this.companyId = data.companyId;
    this.proposalText = data.proposalText;
    this.status = data.status || 'pending';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Static methods
  static async create(applicationData) {
    const application = new Application(applicationData);
    applications.push(application);
    return application;
  }

  static async findById(id) {
    return applications.find(application => application.id === parseInt(id));
  }

  static async findByTenderId(tenderId) {
    return applications.filter(application => application.tenderId === parseInt(tenderId));
  }

  static async findByCompanyId(companyId) {
    return applications.filter(application => application.companyId === parseInt(companyId));
  }

  static async findByTenderOwner(tenderId, companyId) {
    return applications.filter(application => 
      application.tenderId === parseInt(tenderId) && 
      application.companyId !== parseInt(companyId)
    );
  }

  static async updateById(id, updateData) {
    const applicationIndex = applications.findIndex(application => application.id === parseInt(id));
    if (applicationIndex === -1) return null;

    applications[applicationIndex] = { 
      ...applications[applicationIndex], 
      ...updateData, 
      updatedAt: new Date() 
    };
    return applications[applicationIndex];
  }

  static async deleteById(id) {
    const applicationIndex = applications.findIndex(application => application.id === parseInt(id));
    if (applicationIndex === -1) return false;

    applications.splice(applicationIndex, 1);
    return true;
  }

  static async updateStatus(id, status) {
    const applicationIndex = applications.findIndex(application => application.id === parseInt(id));
    if (applicationIndex === -1) return null;

    applications[applicationIndex].status = status;
    applications[applicationIndex].updatedAt = new Date();
    return applications[applicationIndex];
  }

  static async getReceivedApplications(companyId) {
    // Get applications for tenders owned by the company
    const { Tender } = require('./Tender');
    const userTenders = await Tender.findByCompanyId(companyId);
    const userTenderIds = userTenders.map(tender => tender.id);

    return applications.filter(application => 
      userTenderIds.includes(application.tenderId)
    );
  }

  static async getMyApplications(companyId) {
    return applications.filter(application => 
      application.companyId === parseInt(companyId)
    );
  }

  static async checkIfAlreadyApplied(tenderId, companyId) {
    return applications.find(application => 
      application.tenderId === parseInt(tenderId) && 
      application.companyId === parseInt(companyId)
    );
  }

  static async getAll() {
    return applications;
  }
}

module.exports = { Application }; 