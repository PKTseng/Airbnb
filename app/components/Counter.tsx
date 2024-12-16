'use client'
import { useState } from 'react'

function CountPage() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex w-[100px] flex-col items-center'>
      <p className='text-5xl font-bold'>{count}</p>
      <button
        className='m-4 mt-4 rounded-xl bg-blue-500 px-4 py-2 text-white transition-all duration-300 ease-in-out hover:bg-blue-600'
        onClick={() => setCount(count + 1)}
      >
        increment
      </button>
    </div>
  )
}

export default CountPage
