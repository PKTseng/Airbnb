import React from 'react'

function TourLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className='mb-4 w-1/2 rounded bg-slate-500 p-2'>
        <h1 className='text-center text-3xl text-white'>Nested Layout</h1>
      </header>
      {children}
    </div>
  )
}

export default TourLayout
