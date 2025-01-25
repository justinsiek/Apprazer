import React from 'react'
import Link from 'next/link'

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <Link href="/login">Login</Link>
    </div>
  )
}

export default Home