import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Plus } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-8">
          <Link href="/dashboard" className="text-xl font-semibold text-blue-800">
            Apprazer
          </Link>
          <div className="flex space-x-6">
            <Link href="/dashboard" className="text-gray-900 font-medium">Dashboard</Link>
            <Link href="/settings" className="text-gray-500 hover:text-gray-900">Settings</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center text-white">
              JD
            </div>
            <span className="text-gray-700">John Doe</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-hidden bg-gray-50">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Loan Approval Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage and track home loan applications</p>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search applications..."

                className="w-72 h-11 pl-11 pr-4 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="h-11 px-4 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors font-medium flex items-center">
              <Plus className="w-5 h-5 mr-1" />
              New Request
            </button>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-3 gap-8 h-[calc(100vh-232px)]">
          <div className="col-span-2 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-white">
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
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:bg-gray-100 hover:[&::-webkit-scrollbar-thumb]:bg-gray-200">
              <div className="pb-6">
                {Array.from({ length: 20 }, (_, i) => i + 1).map((item, index) => (
                  <div key={item} className="flex flex-col border-b last:border-b-0 border-gray-200">
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-800 rounded-full flex items-center justify-center font-medium">
                          AP
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Alice Parker</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-sm text-gray-500">Home Loan - $350,000</span>
                            {index % 2 === 0 ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Approved
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Denied
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="px-4 py-2 text-sm font-medium text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                          Review
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-white rounded-xl border border-gray-200 shadow-sm p-6 overflow-hidden">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Analytics Overview</h2>
            <p className="text-gray-500 text-sm mb-6">Performance metrics for the last 30 days</p>
            
            {/* Money Metric */}
            <div className="mb-8 p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <p className="text-sm font-medium text-blue-800 mb-1">Total Loan Value</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">$12.8M</span>
                <div className="ml-3 inline-flex items-center px-2 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800 border border-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  8.2%
                </div>
              </div>
            </div>

            {/* Circular Progress */}
            <div className="flex justify-center mb-8">
              <div className="relative w-44 h-44">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <path
                    d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
                    fill="none"
                    stroke="#EFF6FF"
                    strokeWidth="10"
                  />
                  <path
                    d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
                    fill="none"
                    stroke="#1E40AF"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${85.5 * 2.83} ${100 * 2.83}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">85.5%</span>
                  <span className="text-sm font-medium text-blue-800">Approval Rate</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-2 overflow-hidden">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-sm font-medium text-gray-600 mb-1">Approved</p>
                <p className="text-2xl font-semibold text-green-600">276</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-sm font-medium text-gray-600 mb-1">Denied</p>
                <p className="text-2xl font-semibold text-red-600">48</p>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;