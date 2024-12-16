import Link from 'next/link'
import React from 'react'

function HomePage() {
  return (
    <div>
      <h1 className="text-7xl text-Cyan-500">Home Page</h1>
      <Link href="/about" className="text-xl text-blue-500 inline-block mt-8">
        About
      </Link>
    </div>
  )
}

export default HomePage
