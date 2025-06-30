import { useState } from 'react';
import Layout from '../components/Layout';

// Mock data for tenders
const mockTenders = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  title: `Tender Project #${i + 1}`,
  company: `Company ${((i % 5) + 1)}`,
  budget: `$${(10000 + i * 500).toLocaleString()}`,
  deadline: `2024-07-${(10 + (i % 20)).toString().padStart(2, '0')}`,
  status: i % 3 === 0 ? 'Open' : i % 3 === 1 ? 'Closing Soon' : 'Closed',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.'
}));

const PAGE_SIZE = 6;

const Tenders = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Filtered tenders
  const filteredTenders = mockTenders.filter(tender =>
    tender.title.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter ? tender.status === statusFilter : true)
  );

  // Pagination
  const totalPages = Math.ceil(filteredTenders.length / PAGE_SIZE);
  const paginatedTenders = filteredTenders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tender Listings</h1>
            <p className="text-gray-600">Browse and apply to available tenders</p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search tenders..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Closing Soon">Closing Soon</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Tenders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedTenders.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              No tenders found.
            </div>
          ) : (
            paginatedTenders.map(tender => (
              <div key={tender.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">{tender.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">{tender.company}</p>
                  <p className="text-gray-700 mb-3 line-clamp-2">{tender.description}</p>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-sm text-gray-500">Budget: {tender.budget}</span>
                    <span className="text-sm text-gray-500">Deadline: {tender.deadline}</span>
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mb-2 ${
                    tender.status === 'Open' ? 'bg-green-100 text-green-800' :
                    tender.status === 'Closing Soon' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {tender.status}
                  </span>
                </div>
                <div className="mt-4 flex justify-end">
                  <a
                    href={`/tenders/${tender.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded-lg border border-gray-300 ${
                  page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tenders; 