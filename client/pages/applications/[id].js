import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, ArrowLeft } from 'lucide-react';

const ApplicationDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [application, setApplication] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || '';
    setUsername(storedUsername);

    if (id) {
      fetchApplicationDetails();
    }
  }, [id]);

  const fetchApplicationDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/retrieve_loans?username=${localStorage.getItem('username')}`);
      if (!response.ok) {
        throw new Error('Failed to fetch application details');
      }
      const data = await response.json();
      const applicationDetail = data.loans.find(loan => loan.lid === parseInt(id));
      setApplication(applicationDetail);
    } catch (error) {
      console.error('Error fetching application details:', error);
    }
  };

  const getStatusText = (statusCode) => {
    switch (statusCode) {
      case 0:
        return 'pending';
      case 1:
        return 'approved';
      case 2:
        return 'denied';
      default:
        return 'unknown';
    }
  };

  if (!application) {
    return <div/>;
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
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
      <main className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/dashboard"
            className="inline-flex items-center text-blue-800 hover:text-blue-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>

          {/* Application Header */}
          <div className="bg-white/70 backdrop-blur-md rounded-xl border-2 border-blue-800/20 shadow-xl p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  Loan Application
                </h1>
                <span className="text-gray-500">Submitted on {application.created_at.split('T')[0]}</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  ${Number(application.loan_amount).toLocaleString()}
                </div>
                <span className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${getStatusText(application.status) === 'approved' ? 'bg-green-100/70 text-green-800 border-2 border-green-300' : 
                    getStatusText(application.status) === 'denied' ? 'bg-red-100/70 text-red-800 border-2 border-red-300' :
                    'bg-yellow-100/70 text-yellow-800 border-2 border-yellow-300'}
                `}>
                  {getStatusText(application.status).charAt(0).toUpperCase() + getStatusText(application.status).slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className="grid grid-cols-2 gap-6">
            {/* Applicant Information */}
            <div className="bg-white/70 backdrop-blur-md rounded-xl border-2 border-blue-800/20 shadow-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Applicant Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Applicant Name</label>
                  <p className="text-gray-900">{application.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Annual Income</label>
                  <p className="text-gray-900">${Number(application.income).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Debt-to-Income Ratio</label>
                  <p className="text-gray-900">{application.debt_to_income_ratio}%</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Demographics</label>
                  <p className="text-gray-900">
                    White, Male
                  </p>
                </div>
              </div>
            </div>

            {/* Loan Information */}
            <div className="bg-white/70 backdrop-blur-md rounded-xl border-2 border-blue-800/20 shadow-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Loan Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Loan Amount</label>
                  <p className="text-gray-900">${Number(application.loan_amount).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Property Value</label>
                  <p className="text-gray-900">${Number(application.property_value).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Occupancy Type</label>
                  <p className="text-gray-900">
                    {application.occupancy_type === "1" ? "Residential" : "Investment"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Loan Purpose</label>
                  <p className="text-gray-900">
                    {application.loan_purpose === "1" ? "Purchase" : "Refinance"}
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationDetail;