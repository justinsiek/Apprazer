import React from 'react'
import Link from 'next/link'

const Login = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <Link href="/dashboard">Dashboard</Link>
    </div>
  )
}

export default Login