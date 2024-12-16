import Link from 'next/link'
import React from 'react'

function ContactPage() {
  return (
    <div>
      <h1 className="text-7x text-Cyan-500l">Contact Page</h1>
      <Link href="/" className="text-xl text-Cyan-500 inline-block mt-8">
        Home Page
      </Link>
    </div>
  )
}

export default ContactPage
