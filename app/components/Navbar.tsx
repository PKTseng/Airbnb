import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className="max-w-3xl mx-auto px-4 flex gap-x-4">
      <Link href="/">Home</Link>
      <Link href="/info">info</Link>
      <Link href="/info/contact">contact</Link>
      <Link href="/about">about</Link>
    </div>
  )
}

export default Navbar
