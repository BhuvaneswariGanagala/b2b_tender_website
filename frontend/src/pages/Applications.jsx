import { useState } from 'react';
import Layout from '../components/Layout';

// Mock data for applications
const mockApplications = [
  {
    id: 1,
    tenderTitle: 'Website Redesign for Retailer',
    companyName: 'TechCorp Solutions',
    proposal: 'We propose a modern, responsive website redesign using React and Node.js...',
    status: 'Pending',
    submittedDate: '2024-06-25',
    budget: '$12,000',
  },
  {
    id: 2,
    tenderTitle: 'Website Redesign for Retailer',
    companyName: 'WebDev Pro',
    proposal: 'Our team specializes in e-commerce solutions and can deliver...',
    status: 'Approved',
    submittedDate: '2024-06-24',
    budget: '$11,500',
  },
  {
    id: 3,
    tenderTitle: 'Mobile App for Logistics',
    companyName: 'MobileFirst Inc',
    proposal: 'We have extensive experience in logistics apps and can provide...',
    status: 'Rejected',
    submittedDate: '2024-06-23',
    budget: '$18,000',
  },
];

const Applications = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [statusFilter, setStatusFilter] = useState('');

  const filteredApplications = applications.filter(app =>
    statusFilter ? app.status === statusFilter : true
  );

  const handleStatusChange = (id, newStatus) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Applications Received</h1>
            <p className="text-gray-600">Review and manage proposals for your tenders</p>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {filteredApplications.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No applications found.</div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map(application => (
                <div key={application.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{application.tenderTitle}</h3>
                      <p className="text-sm text-gray-600">by {application.companyName}</p>
                      <p className="text-sm text-gray-500 mt-1">Submitted: {application.submittedDate}</p>
                      <p className="text-sm text-gray-700 mt-2 line-clamp-2">{application.proposal}</p>
                    </div>
                    <div className="ml-4 flex flex-col items-end space-y-2">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        application.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        application.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {application.status}
                      </span>
                      <span className="text-sm text-gray-600">{application.budget}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusChange(application.id, 'Approved')}
                          className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium hover:bg-green-100"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(application.id, 'Rejected')}
                          className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs font-medium hover:bg-red-100"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Applications; 