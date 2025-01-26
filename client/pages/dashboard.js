import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, Plus, Bell } from 'lucide-react';
import Image from 'next/image';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [userApplications, setUserApplications] = useState([]);

  // Add polling interval state
  const [pollingInterval, setPollingInterval] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || '';
    setUsername(storedUsername);
    setIsAdmin(storedUsername.toLowerCase() === 'admin');

    // Start polling when component mounts
    if (storedUsername) {
      fetchApplicationDetails(); // Initial fetch
      
      // Set up polling every 5 seconds
      const interval = setInterval(() => {
        fetchApplicationDetails();
      }, 5000);

      // Store interval ID
      setPollingInterval(interval);
    }

    // Cleanup function to clear interval when component unmounts
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [username]); // Only re-run when username changes

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    // Add API call logic here
    const newApplication = {
      id: userApplications.length + 1,
      amount: parseFloat(e.target.amount.value),
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0],
      type: 'Home Loan'
    };
    setUserApplications([newApplication, ...userApplications]);
    setShowRequestForm(false);
  };

  const getStatusText = (statusCode) => {
    switch (statusCode) {
      case 0:
        return 'denied';
      case 1:
        return 'approved';
      default:
        return 'unknown';
    }
  };

  const fetchApplicationDetails = async () => {
    try {
      const response = await fetch(`http://172.20.10.5:5000/api/retrieve_loans?username=${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch loans');
      }
      const data = await response.json();
      setUserApplications(data.loans);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="h-screen bg-white overflow-hidden relative">
        {/* Background Blur Elements */}
        <div className='absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob'></div>
        <div className='absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-purple-400/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000'></div>
        <div className='absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-4000'></div>

        {/* Navigation Bar - Reusing admin nav style */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800">
          <div className="flex items-center space-x-8">
            <Image src="/cutwhitelogo.gif" alt="Apprazer Logo" width={120} height={40} className="object-contain translate-y-0.5" />
            <div className="flex space-x-6">
              <Link href="/dashboard" className="text-white/90 font-medium">Dashboard</Link>
              <Link href="/settings" className="text-white/60 hover:text-white/90">Settings</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-white/60 hover:text-white/90">
              <Bell className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20">
                {username ? username.charAt(0).toUpperCase() : '?'}
              </div>
              <span className="text-white/90">{username}</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10 flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">My Loan Applications</h1>
                <p className="text-gray-500 mt-1">Track and manage your loan requests</p>
              </div>
              <Link
                href="/apply"
                className="h-11 px-6 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-all duration-200 font-medium flex items-center shadow-lg shadow-blue-800/20"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Application
              </Link>
            </div>

            {/* Applications List */}
            <div className="bg-white/70 backdrop-blur-md rounded-xl border-2 border-blue-800/20 shadow-xl overflow-hidden">
              <div className="divide-y divide-gray-200/50">
                {userApplications.map((application) => (
                  <div key={application.lid} className="p-6 hover:bg-white/50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-gray-900">
                            Home Loan
                          </h3>
                          <span className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${getStatusText(application.status) === 'approved' ? 'bg-green-100/70 text-green-800 border-2 border-green-300' : 
                              getStatusText(application.status) === 'denied' ? 'bg-red-100/70 text-red-800 border-2 border-red-300' :
                              'bg-yellow-100/70 text-yellow-800 border-2 border-yellow-300'}
                          `}>
                            {getStatusText(application.status).charAt(0).toUpperCase() + getStatusText(application.status).slice(1)}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          Submitted on {application.created_at ? application.created_at.split('T')[0] : new Date().toISOString().split('T')[0]}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-lg font-semibold text-gray-900">
                          ${Number(application.loan_amount).toLocaleString()}
                        </div>
                        <Link 
                          href={`/applications/${application.lid}`} 
                          className="px-4 py-2 text-sm font-medium text-blue-800 hover:bg-blue-50/80 rounded-lg transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white overflow-hidden relative">
      {/* Background Blur Elements */}
      <div className='absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob'></div>
      <div className='absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-purple-400/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000'></div>
      <div className='absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-4000'></div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800">
        <div className="flex items-center space-x-8">
          <Image src="/cutwhitelogo.gif" alt="Apprazer Logo" width={120} height={40} className="object-contain translate-y-0.5" />
          <div className="flex space-x-6">
            <Link href="/dashboard" className="text-white/90 font-medium">Dashboard</Link>
            <Link href="/settings" className="text-white/60 hover:text-white/90">Settings</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-white/60 hover:text-white/90">
            <Bell className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20">
              {username ? username.charAt(0).toUpperCase() : '?'}
            </div>
            <span className="text-white/90">{username}</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 p-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center space-x-8 mb-8">
          <div className="shrink-0">
            <h1 className="text-2xl font-semibold text-gray-900">Loan Approval Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage and track home loan applications</p>
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search applications..."
              className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-blue-800/20 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg shadow-blue-900/5 text-gray-900 placeholder-gray-500"
            />
            <svg 
              className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-3 gap-8 h-[calc(100vh-232px)]">
          <div className="col-span-2 rounded-xl border-2 border-blue-800/20 bg-white/70 backdrop-blur-md shadow-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200/50 bg-white/80">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Pending Applications</h2>
                  <p className="text-gray-500 text-sm mt-1">Review and process loan requests</p>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-500">Sort by:</span>
                  <select className="border-0 bg-transparent text-gray-700 font-medium focus:outline-none focus:ring-0">
                    <option>Most Recent</option>
                    <option>Loan Amount</option>
                    <option>Status</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Scrollable Loan List */}
            <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
              <div className="pb-6">
                {userApplications.map((application) => (
                  <div key={application.lid} className="flex flex-col border-b last:border-b-0 border-gray-200/50">
                    <div className="flex items-center justify-between p-4 hover:bg-white/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 rounded-full flex items-center justify-center font-medium shadow-sm">
                          {application.username ? application.username.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{application.username}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-sm text-gray-500">
                              Home Loan - ${Number(application.loan_amount).toLocaleString()}
                            </span>
                            <span className={`
                              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${getStatusText(application.status) === 'approved' ? 'bg-green-100/70 backdrop-blur-sm text-green-800 border-2 border-green-300' : 
                                getStatusText(application.status) === 'denied' ? 'bg-red-100/70 backdrop-blur-sm text-red-800 border-2 border-red-300' :
                                'bg-yellow-100/70 backdrop-blur-sm text-yellow-800 border-2 border-yellow-300'}
                            `}>
                              {getStatusText(application.status).charAt(0).toUpperCase() + getStatusText(application.status).slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Link 
                          href={`/applications/${application.lid}`} 
                          className="px-4 py-2 text-sm font-medium text-blue-800 hover:bg-blue-50/80 rounded-lg transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-white/70 backdrop-blur-md rounded-xl border-2 border-blue-800/20 shadow-xl p-6 overflow-hidden">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Analytics Overview</h2>
            <p className="text-gray-500 text-sm mb-6">Performance metrics for the last 30 days</p>
            
            {/* Money Metric */}
            <div className="mb-8 p-5 bg-gradient-to-br from-blue-50/80 to-blue-100/50 backdrop-blur-sm rounded-xl border-2 border-blue-800/20 shadow-sm">
              <p className="text-sm font-medium text-blue-800 mb-1">Total Loan Value</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">
                  ${userApplications.reduce((sum, app) => sum + Number(app.loan_amount), 0).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Circular Progress */}
            <div className="flex justify-center mb-8">
              <div className="relative w-44 h-44">
                {(() => {
                  const approved = userApplications.filter(app => app.status === 1).length;
                  const denied = userApplications.filter(app => app.status === 0).length;
                  const total = approved + denied;
                  const approvalRate = total > 0 ? (approved / total) * 100 : 0;
                  const circumference = 2 * Math.PI * 45; // 45 is the radius
                  const dashArray = `${(approvalRate / 100) * circumference} ${circumference}`;
                  
                  return (
                    <>
                      <svg className="w-full h-full rotate-[180]" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#EFF6FF"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="url(#blue-gradient)"
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray={dashArray}
                          transform="rotate(-90 50 50)"
                        />
                        <defs>
                          <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2563EB" />
                            <stop offset="100%" stopColor="#1E40AF" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900">
                          {approvalRate.toFixed(1)}%
                        </span>
                        <span className="text-sm font-medium text-blue-800">Approval Rate</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border-2 border-blue-800/20 shadow-sm">
                <p className="text-sm font-medium text-gray-800 mb-1">Approved</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userApplications.filter(app => app.status === 1).length}
                </p>
              </div>
              <div className="p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border-2 border-blue-800/20 shadow-sm">
                <p className="text-sm font-medium text-gray-800 mb-1">Denied</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userApplications.filter(app => app.status === 0).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;