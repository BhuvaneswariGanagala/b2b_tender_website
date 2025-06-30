import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Layout from '../components/Layout';

// Mock tenders data (should be replaced with API call)
const mockTenders = Array.from({ length: 23 }, (_, i) => ({
  id: (i + 1).toString(),
  title: `Tender Project #${i + 1}`,
  company: `Company ${((i % 5) + 1)}`,
  budget: `$${(10000 + i * 500).toLocaleString()}`,
  deadline: `2024-07-${(10 + (i % 20)).toString().padStart(2, '0')}`,
  status: i % 3 === 0 ? 'Open' : i % 3 === 1 ? 'Closing Soon' : 'Closed',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
  requirements: [
    'Registered business entity',
    'Minimum 3 years experience',
    'Portfolio of similar projects',
    'Ability to deliver within deadline'
  ]
}));

const TenderDetail = () => {
  const { id } = useParams();
  const tender = mockTenders.find(t => t.id === id);
  const [proposal, setProposal] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!tender) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tender Not Found</h1>
          <p className="text-gray-600 mb-6">The tender you are looking for does not exist.</p>
          <Link to="/tenders" className="text-blue-600 hover:text-blue-700 font-medium">Back to Tenders</Link>
        </div>
      </Layout>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit proposal to backend
    setSubmitted(true);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Tender Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{tender.title}</h1>
          <p className="text-gray-600 mb-2">by <span className="font-medium text-blue-700">{tender.company}</span></p>
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">Budget: {tender.budget}</span>
            <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">Deadline: {tender.deadline}</span>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              tender.status === 'Open' ? 'bg-green-100 text-green-800' :
              tender.status === 'Closing Soon' ? 'bg-orange-100 text-orange-800' :
              'bg-gray-200 text-gray-600'
            }`}>
              {tender.status}
            </span>
          </div>
          <p className="text-gray-800 mb-4">{tender.description}</p>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {tender.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Apply for this Tender</h2>
          {submitted ? (
            <div className="text-green-600 font-medium text-center">
              ✅ Your proposal has been submitted!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Proposal</label>
                <textarea
                  value={proposal}
                  onChange={e => setProposal(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your approach, experience, and why your company is the best fit..."
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TenderDetail; 