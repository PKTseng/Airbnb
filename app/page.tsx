import Link from 'next/link'
import React from 'react'

function HomePage() {
  return (
    <div>
      <h1 className='text-Cyan-500 text-7xl'>Home Page</h1>
      <Link href='/about' className='mt-8 inline-block text-xl text-blue-500'>
        About
      </Link>
    </div>
  )
}

export default HomePage
