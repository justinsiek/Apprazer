import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Clock, Brain, Shield, BarChart2, Users, Zap, Lock, LineChart, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 pt-8'>
      {/* Background Blur Elements */}
      <div className='absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob'></div>
      <div className='absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-purple-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000'></div>
      <div className='absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-4000'></div>
      
      {/* Logo - Absolute positioning 
      <div className='absolute top-0 left-0 z-20 p-12'>
        <Image 
          src="/cutbluelogo.gif" 
          alt="Apprazer Logo" 
          width={150} 
          height={40} 
          className="object-contain text-blue-800"
        />
      </div>
      */}

      {/* Main Content */}
      <div className='flex-1 relative'>
        {/* Hero Section - Enhanced */}
        <div className='max-w-7xl mx-auto px-8 py-32 relative'>
          <div className='grid grid-cols-2 gap-16 items-center'>
            {/* Left Column */}
            <div className='space-y-8'>
              <h1 className='text-7xl font-bold text-gray-900 leading-tight'>
                Streamline Your
                <span className='bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent block'>
                  Loan Approvals
                </span>
              </h1>
              <p className='text-xl text-gray-600 leading-relaxed'>
                Experience the future of loan processing with automated workflows and intelligent decision-making.
              </p>
              <div className='flex items-center space-x-6 pt-4'>
                <Link 
                  href="/login" 
                  className='px-8 py-4 bg-blue-800 hover:bg-gradient-to-r hover:from-blue-950 hover:via-blue-900 hover:to-blue-800 text-white rounded-xl transition-[background] duration-700 ease-in-out font-medium flex items-center group shadow-lg shadow-blue-950/20'
                >
                  Get Started
                  <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
                </Link>
              </div>
            </div>

            {/* Right Column - Enhanced Stats Card */}
            <div className='bg-white/70 backdrop-blur-md p-8 rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
              <div className='space-y-6'>
                {/* Main Stat */}
                <div className='p-6 bg-gradient-to-br from-blue-50/80 to-blue-100/50 backdrop-blur-sm rounded-xl border border-blue-100/50'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-blue-800 mb-1'>Processing Speed</p>
                      <div className='flex items-baseline'>
                        <span className='text-4xl font-bold text-gray-900'>97%</span>
                        <span className='ml-2 text-sm text-blue-800'>Faster</span>
                      </div>
                    </div>
                    <div className='h-14 w-14 bg-blue-100/50 backdrop-blur-sm rounded-xl flex items-center justify-center'>
                      <BarChart2 className='w-7 h-7 text-blue-800' />
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className='grid grid-cols-2 gap-4'>
                  <div className='p-4 bg-green-50/80 backdrop-blur-sm rounded-xl border border-green-100/50'>
                    <p className='text-sm font-medium text-green-800 mb-1'>Success Rate</p>
                    <div className='flex items-baseline'>
                      <p className='text-2xl font-bold text-gray-900'>98.5%</p>
                    </div>
                  </div>
                  <div className='p-4 bg-purple-50/80 backdrop-blur-sm rounded-xl border border-purple-100/50'>
                    <p className='text-sm font-medium text-purple-800 mb-1'>Average Time</p>
                    <div className='flex items-baseline'>
                      <p className='text-2xl font-bold text-gray-900'>4</p>
                      <span className='ml-1 text-sm text-purple-800'>min</span>
                    </div>
                  </div>
                </div>

                {/* Live Activity */}
                <div className='p-4 bg-blue-50/50 backdrop-blur-sm rounded-xl border border-blue-100/50'>
                  <p className='text-sm font-medium text-blue-800 mb-3'>Live Activity</p>
                  <div className='space-y-2'>
                    {[
                      { user: 'Juan M.', action: 'Loan approved', time: '2m ago' },
                      { user: 'Juliane D.', action: 'Application submitted', time: '5m ago' },
                    ].map((activity, index) => (
                      <div key={index} className='flex items-center justify-between text-sm'>
                        <div className='flex items-center space-x-2'>
                          <div className='h-2 w-2 rounded-full bg-green-500'></div>
                          <span className='text-gray-600'>{activity.user}</span>
                          <span className='text-gray-400'>{activity.action}</span>
                        </div>
                        <span className='text-gray-400 text-xs'>{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features List */}
                <div className='space-y-3 pt-2'>
                  {[
                    'AI-powered risk assessment',
                    'Real-time application tracking',
                    'Automated document verification',
                    'Instant notifications'
                  ].map((feature, index) => (
                    <div key={index} className='flex items-center space-x-3 text-gray-600'>
                      <div className='h-6 w-6 rounded-full bg-blue-50/80 backdrop-blur-sm flex items-center justify-center'>
                        <svg className='h-4 w-4 text-blue-800' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                        </svg>
                      </div>
                      <span className='text-sm'>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Carousel */}
        <div className='bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-32'>
          <div className='max-w-7xl mx-auto px-8'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl font-bold text-white mb-4'>Powerful Features</h2>
              <p className='text-xl text-blue-100/80'>Everything you need in one platform</p>
            </div>
            
            <div className='relative'>
              {/* Carousel Container */}
              <div className='overflow-hidden'>
                <div className='flex transition-transform duration-500 ease-in-out'
                     style={{ transform: `translateX(-${currentSlide * 25}%)` }}>
                  {[
                    {
                      icon: <Brain className='w-6 h-6 text-blue-800' />,
                      title: 'Smart Analysis',
                      description: 'AI-powered insights for faster decisions'
                    },
                    {
                      icon: <Clock className='w-6 h-6 text-blue-800' />,
                      title: 'Quick Processing',
                      description: '45-minute average processing time'
                    },
                    {
                      icon: <Shield className='w-6 h-6 text-blue-800' />,
                      title: 'Bank-Grade Security',
                      description: 'Enterprise-level data protection'
                    },
                    {
                      icon: <Zap className='w-6 h-6 text-blue-800' />,
                      title: 'Instant Updates',
                      description: 'Real-time status notifications'
                    },
                    {
                      icon: <Lock className='w-6 h-6 text-blue-800' />,
                      title: 'Compliance Ready',
                      description: 'Built-in regulatory compliance'
                    },
                    {
                      icon: <Users className='w-6 h-6 text-blue-800' />,
                      title: 'Team Collaboration',
                      description: 'Seamless team workflows'
                    },
                    {
                      icon: <LineChart className='w-6 h-6 text-blue-800' />,
                      title: 'Analytics',
                      description: 'Detailed performance metrics'
                    },
                    {
                      icon: <ArrowRight className='w-6 h-6 text-blue-800' />,
                      title: 'API Access',
                      description: 'Full integration capabilities'
                    }
                  ].map((feature, index) => (
                    <div key={index} className='min-w-[25%] px-3'>
                      <div className='p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 h-full'>
                        <div className='h-12 w-12 bg-blue-100/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4'>
                          {feature.icon}
                        </div>
                        <h3 className='text-lg font-semibold text-white mb-2'>{feature.title}</h3>
                        <p className='text-sm text-blue-100/80'>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button 
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full bg-white/10 border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-200'
                disabled={currentSlide === 0}
              >
                <ChevronLeft className='w-6 h-6 text-white' />
              </button>
              <button 
                onClick={() => setCurrentSlide(Math.min(4, currentSlide + 1))}
                className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full bg-white/10 border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-200'
                disabled={currentSlide === 4}
              >
                <ChevronRight className='w-6 h-6 text-white' />
              </button>

              {/* Dots Navigation */}
              <div className='flex justify-center space-x-2 mt-8'>
                {[0, 1, 2, 3, 4].map((dot) => (
                  <button
                    key={dot}
                    onClick={() => setCurrentSlide(dot)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      currentSlide === dot ? 'bg-white w-4' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className='py-24'>
          <div className='max-w-7xl mx-auto px-8'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>Trusted by Industry Leaders</h2>
              <p className='text-xl text-gray-500'>See what our customers have to say</p>
            </div>

            <div className='grid grid-cols-3 gap-8'>
              {[
                {
                  quote: "Apprazer has completely transformed our loan processing. We've cut our approval time in half.",
                  author: "Andrew Hwang",
                  role: "CEO of Sonder"
                },
                {
                  quote: "The AI-powered insights have significantly improved our decision-making process.",
                  author: "Brooke Ebright",
                  role: "Mayor of Apple Valley"
                },
                {
                  quote: "Outstanding support team and intuitive interface. Exactly what we needed.",
                  author: "Kyle Tran",
                  role: "Guy from Seattle"
                }
              ].map((testimonial, index) => (
                <div key={index} className='p-6 bg-white rounded-xl border border-gray-200 shadow-sm'>
                  <div className='mb-4'>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className='text-yellow-400'>★</span>
                    ))}
                  </div>
                  <p className='text-gray-600 mb-4'>{testimonial.quote}</p>
                  <div>
                    <p className='font-semibold text-gray-900'>{testimonial.author}</p>
                    <p className='text-sm text-gray-500'>{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-24'>
          <div className='max-w-7xl mx-auto px-8'>
            <div className='text-center'>
              <h2 className='text-3xl font-bold text-white mb-4'>Ready to Get Started?</h2>
              <p className='text-xl text-blue-100/80 mb-8'>Join thousands of businesses transforming their loan processes</p>
              <Link 
                href="/login" 
                className='inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-xl hover:bg-blue-50 transition-all duration-300 font-medium group shadow-lg shadow-blue-950/20'
              >
                Get Started
                <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home