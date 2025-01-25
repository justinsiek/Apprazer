import { useState } from 'react';
import Link from 'next/link';

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
      <main className="flex-1 p-6 pb-8 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, John</h1>
            <p className="text-gray-500">Here's your loan approval dashboard</p>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search loans..."
                className="w-64 h-10 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors">
              New Request
            </button>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          <div className="col-span-2 rounded-xl border border-gray-200 p-6 bg-white overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold">Recent Loan Requests</h2>
                <p className="text-gray-500 text-sm">You have 6 requests to review today</p>
              </div>
            </div>
            
            {/* Loan Request List */}
            <div className="flex flex-col flex-1 border-y border-gray-200 py-2 bg-white">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <div key={item} className="flex-1 flex flex-col border-b last:border-b-0 border-gray-200">
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        AP
                      </div>
                      <div>
                        <p className="font-medium">Alice Parker</p>
                        <p className="text-sm text-gray-500">Home Loan - $350,000</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1.5 text-sm text-blue-800 hover:bg-blue-50 rounded-lg">Review</button>
                      <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-4">
              <div className="flex items-center text-sm text-gray-500">
                Showing <span className="font-medium mx-1">1</span> to <span className="font-medium mx-1">4</span> of <span className="font-medium mx-1">50</span> results
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">Home Loan Analytics</h2>
            <p className="text-gray-500 text-sm mb-6">Last 30 days performance</p>
            
            {/* Money Metric */}
            <div className="mb-8 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800 mb-1">Total Loan Value</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-blue-800">$12.8M</span>
                <span className="ml-2 text-sm text-blue-600">+8.2% from last month</span>
              </div>
            </div>

            {/* Circular Progress */}
            <div className="flex justify-center mb-16">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Light blue background arc */}
                  <path
                    d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
                    fill="none"
                    stroke="#E6F3FF"
                    strokeWidth="10"
                  />
                  {/* Main progress arc */}
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
                  <span className="text-3xl font-bold text-blue-800">85.5%</span>
                  <span className="text-sm text-blue-600">Normal Level</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="w-full bg-blue-100 rounded-full h-3">
                  <div className="bg-blue-800 h-3 rounded-full transition-all duration-500" style={{width: '92%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Average Loan Amount</span>
                  <span className="text-sm font-medium text-blue-800">$285,000</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-3">
                  <div className="bg-blue-800 h-3 rounded-full transition-all duration-500" style={{width: '65%'}}></div>
                </div>
              </div>

              {/* Segmented Bar */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Customer Distribution</p>
                <div className="flex h-4 rounded-lg overflow-hidden">
                  <div className="bg-blue-800 w-[45%]" title="First-Time Buyers: 45%"></div>
                  <div className="bg-blue-600 w-[28%]" title="Return Customers: 28%"></div>
                  <div className="bg-blue-400 w-[27%]" title="Others: 27%"></div>
                </div>
                <div className="flex text-xs mt-1 text-gray-600 justify-between">
                  <span>First-Time (45%)</span>
                  <span>Return (28%)</span>
                  <span>Other (27%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;