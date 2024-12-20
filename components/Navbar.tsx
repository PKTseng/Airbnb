import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className='mx-auto flex max-w-3xl gap-x-4 px-4'>
      <Link href='/'>Home</Link>
      <Link href='/counter'>counter</Link>
      <Link href='/tours'>Tours</Link>
      <Link href='/action'>Action</Link>
    </div>
  )
}

export default Navbar
