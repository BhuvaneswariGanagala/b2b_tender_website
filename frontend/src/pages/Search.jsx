import { useState } from 'react';
import Layout from '../components/Layout';

// Mock data for companies
const mockCompanies = [
  {
    id: 1,
    name: 'TechCorp Solutions',
    industry: 'Technology',
    services: ['Web Development', 'Mobile Development', 'Cloud Solutions'],
    description: 'Leading technology solutions provider specializing in web and mobile development.',
    logoUrl: '',
  },
  {
    id: 2,
    name: 'WebDev Pro',
    industry: 'Technology',
    services: ['Web Development', 'UI/UX Design', 'E-commerce'],
    description: 'Professional web development company with expertise in modern web technologies.',
    logoUrl: '',
  },
  {
    id: 3,
    name: 'MobileFirst Inc',
    industry: 'Technology',
    services: ['Mobile Development', 'App Maintenance', 'Cross-platform Development'],
    description: 'Mobile app development specialists with focus on iOS and Android platforms.',
    logoUrl: '',
  },
  {
    id: 4,
    name: 'CloudWorks Ltd',
    industry: 'Technology',
    services: ['Cloud Solutions', 'DevOps', 'Infrastructure'],
    description: 'Cloud infrastructure and DevOps services for scalable applications.',
    logoUrl: '',
  },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter ? company.industry === industryFilter : true;
    const matchesService = serviceFilter ? company.services.includes(serviceFilter) : true;
    
    return matchesSearch && matchesIndustry && matchesService;
  });

  const industries = [...new Set(mockCompanies.map(company => company.industry))];
  const services = [...new Set(mockCompanies.flatMap(company => company.services))];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Search Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Companies</h1>
          <p className="text-gray-600">Find the perfect partner for your project</p>
        </div>

        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by company name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Services</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredCompanies.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              No companies found matching your criteria.
            </div>
          ) : (
            filteredCompanies.map(company => (
              <div key={company.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    {company.logoUrl ? (
                      <img src={company.logoUrl} alt={company.name} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <span className="text-2xl">🏢</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{company.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{company.industry}</p>
                    <p className="text-gray-700 mb-3">{company.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {company.services.map(service => (
                        <span
                          key={service}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                      View Profile
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Results Count */}
        {filteredCompanies.length > 0 && (
          <div className="text-center text-gray-600">
            Found {filteredCompanies.length} company{filteredCompanies.length !== 1 ? 'ies' : 'y'}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search; 