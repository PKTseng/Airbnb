'use client'

function Error({ error }: { error: Error }) {
  console.log(error)
  return <span className='text-3xl capitalize'>there was error...</span>
}

export default Error
