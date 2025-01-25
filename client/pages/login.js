import React from 'react'
import Link from 'next/link'

const Login = () => {
  return (
    <div className='flex min-h-screen'>
      {/* Left Section */}
      <div className='w-1/2 bg-blue-800 text-white p-12 flex flex-col justify-between'>
        <div>
          <span className='text-xl font-semibold'>Apprazer</span>
        </div>
        
        <div className='max-w-md'>
          <blockquote className='text-2xl font-medium mb-4'>
            "This application saved my life, and I'm so grateful for it."
          </blockquote>
          <p className='text-white'>Jillyan Canaveral</p>
        </div>
      </div>

      {/* Right Section with Login Form */}
      <div className='w-1/2 flex flex-col justify-center items-center bg-gray-50'>
        <div className='w-[400px] p-8 bg-white rounded-2xl border border-gray-200 shadow-lg flex flex-col justify-center items-center space-y-6'>
          <h1 className='text-3xl font-bold text-gray-800'>Welcome Back</h1>
          <p className='text-gray-500 text-sm'>Please enter your credentials to sign in</p>
          
          <input 
            type="text" 
            placeholder='Username' 
            className='w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
          />
          
          <input 
            type="password" 
            placeholder='Password' 
            className='w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
          />
          
          <Link 
            href="/dashboard" 
            className='flex h-12 w-full bg-blue-800 hover:bg-blue-800 text-white font-semibold rounded-lg transition-all duration-200 justify-center items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
          >
            Sign In
          </Link>

          <div className='flex gap-1 text-sm'>
            <span className='text-gray-500'>Don't have an account?</span>
            <Link href="/signup" className='text-blue-800 hover:text-blue-800 font-medium'>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login