import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'password') { 
      localStorage.setItem('username', username)
      router.push('/dashboard')
    } else {
      alert('Invalid Password.')
    }

  }

  return (
    <div className='flex min-h-screen'>
      {/* Left Section - Enhanced with more prominent gradients */}
      <div className='relative w-1/2 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white p-12 flex flex-col justify-between overflow-hidden'>
        {/* Background gradient blobs - increased size and opacity */}
        <div className='absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-500/40 rounded-full mix-blend-multiply filter blur-[120px] animate-blob'></div>
        <div className='absolute top-[20%] right-[-20%] w-[600px] h-[600px] bg-indigo-500/40 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000'></div>
        <div className='absolute bottom-[-20%] left-[10%] w-[700px] h-[700px] bg-violet-500/40 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-4000'></div>
        
        {/* Overlay gradient for better text contrast */}
        <div className='absolute inset-0 bg-gradient-to-b from-blue-900/10 to-blue-950/50'></div>
        
        {/* Content */}
        <div className='relative z-10'>
          <Image 
            src="/cutwhitelogo.gif" 
            alt="Apprazer Logo" 
            width={150} 
            height={40} 
            className="object-contain"
          />
        </div>
        
        <div className='relative z-10 max-w-md'>
          <blockquote className='text-2xl font-medium mb-4'>
            "This application saved my life, and I'm so grateful for it."
          </blockquote>
          <p className='text-white/90'>- Leo Wucohen</p>
        </div>
      </div>

      {/* Right Section with Login Form */}
      <div className='w-1/2 flex flex-col justify-center items-center bg-gray-50'>
        <form onSubmit={handleLogin} className='w-[400px] p-8 bg-white rounded-2xl border border-gray-200 shadow-lg flex flex-col justify-center items-center space-y-6'>
          <h1 className='text-3xl font-bold text-gray-800'>Welcome Back</h1>
          <p className='text-gray-500 text-sm'>Please enter your credentials to sign in</p>
          
          <input 
            type="text" 
            placeholder='Username' 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
          />
          
          <input 
            type="password" 
            placeholder='Password' 
            className='w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button 
            type="submit"
            className='flex h-12 w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition-all duration-200 justify-center items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
          >
            Sign In
          </button>

          <div className='flex gap-1 text-sm'>
            <span className='text-gray-500'>Don't have an account?</span>
            <Link href="/signup" className='text-blue-800 hover:text-blue-900 font-medium'>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login