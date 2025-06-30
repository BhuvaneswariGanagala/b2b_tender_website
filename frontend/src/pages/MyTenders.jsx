import { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

// Mock data for user's tenders
const mockMyTenders = [
  {
    id: 1,
    title: 'Website Redesign for Retailer',
    status: 'Open',
    applications: 5,
    deadline: '2024-07-20',
    budget: '$12,000',
  },
  {
    id: 2,
    title: 'Mobile App for Logistics',
    status: 'Closing Soon',
    applications: 2,
    deadline: '2024-07-10',
    budget: '$18,000',
  },
  {
    id: 3,
    title: 'Cloud Migration Project',
    status: 'Closed',
    applications: 7,
    deadline: '2024-06-30',
    budget: '$25,000',
  },
];

const MyTenders = () => {
  const [tenders, setTenders] = useState(mockMyTenders);

  const handleDelete = (id) => {
    // TODO: Implement delete logic (API call)
    setTenders(tenders.filter(t => t.id !== id));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Tenders</h1>
            <p className="text-gray-600">Manage your posted tenders and view applications</p>
          </div>
          <Link
            to="/tenders"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            + Create New Tender
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {tenders.length === 0 ? (
            <div className="text-center text-gray-500 py-12">You have not posted any tenders yet.</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 px-3 text-gray-700 font-semibold">Title</th>
                  <th className="py-2 px-3 text-gray-700 font-semibold">Status</th>
                  <th className="py-2 px-3 text-gray-700 font-semibold">Applications</th>
                  <th className="py-2 px-3 text-gray-700 font-semibold">Deadline</th>
                  <th className="py-2 px-3 text-gray-700 font-semibold">Budget</th>
                  <th className="py-2 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {tenders.map(tender => (
                  <tr key={tender.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium text-blue-700">
                      <Link to={`/tenders/${tender.id}`}>{tender.title}</Link>
                    </td>
                    <td className="py-2 px-3">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        tender.status === 'Open' ? 'bg-green-100 text-green-800' :
                        tender.status === 'Closing Soon' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {tender.status}
                      </span>
                    </td>
                    <td className="py-2 px-3">{tender.applications}</td>
                    <td className="py-2 px-3">{tender.deadline}</td>
                    <td className="py-2 px-3">{tender.budget}</td>
                    <td className="py-2 px-3 flex gap-2">
                      <Link
                        to={`/tenders/${tender.id}`}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100"
                      >
                        View
                      </Link>
                      <Link
                        to={`/tenders/${tender.id}/edit`}
                        className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-lg text-xs font-medium hover:bg-yellow-100"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(tender.id)}
                        className="px-3 py-1 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyTenders; 