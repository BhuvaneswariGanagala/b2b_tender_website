import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Dashboard = () => {
  // Mock data - will be replaced with real API calls
  const stats = [
    { name: 'Active Tenders', value: '24', change: '+12%', changeType: 'positive' },
    { name: 'My Applications', value: '8', change: '+3', changeType: 'positive' },
    { name: 'Pending Reviews', value: '5', change: '-2', changeType: 'negative' },
    { name: 'Total Revenue', value: '$45,230', change: '+8.2%', changeType: 'positive' },
  ];

  const recentTenders = [
    {
      id: 1,
      title: 'Website Development for E-commerce Platform',
      company: 'TechCorp Solutions',
      budget: '$15,000 - $25,000',
      deadline: '2024-07-15',
      status: 'Open'
    },
    {
      id: 2,
      title: 'Mobile App Development for Healthcare',
      company: 'HealthTech Inc',
      budget: '$20,000 - $35,000',
      deadline: '2024-07-20',
      status: 'Open'
    },
    {
      id: 3,
      title: 'Cloud Infrastructure Setup',
      company: 'CloudWorks Ltd',
      budget: '$8,000 - $12,000',
      deadline: '2024-07-10',
      status: 'Closing Soon'
    }
  ];

  const quickActions = [
    { name: 'Create New Tender', href: '/tenders', icon: '📝', color: 'bg-blue-500' },
    { name: 'Search Companies', href: '/search', icon: '🔍', color: 'bg-green-500' },
    { name: 'View Applications', href: '/applications', icon: '📄', color: 'bg-purple-500' },
    { name: 'Update Profile', href: '/profile', icon: '👤', color: 'bg-orange-500' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, User!</h1>
          <p className="text-blue-100">Here's what's happening with your tenders today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                to={action.href}
                className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white text-xl mb-3`}>
                  {action.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">{action.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Tenders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Tenders</h3>
            <Link to="/tenders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {recentTenders.map((tender) => (
              <div key={tender.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{tender.title}</h4>
                  <p className="text-sm text-gray-600">{tender.company}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">Budget: {tender.budget}</span>
                    <span className="text-sm text-gray-500">Deadline: {tender.deadline}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    tender.status === 'Open' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {tender.status}
                  </span>
                  <Link
                    to={`/tenders/${tender.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 