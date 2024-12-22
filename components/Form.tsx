'use client'

import { useFormStatus } from 'react-dom'
import { createUser } from '@/utils/actions'

const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <button type='submit' className={btnStyle} disabled={pending}>
      {pending ? 'Submitting' : 'Submit'}
    </button>
  )
}

function FormPage() {
  return (
    <form className={formStyle} action={createUser}>
      <input type='text' name='firstName' defaultValue='ken' required className={inputStyle} />
      <input type='text' name='lastName' defaultValue='tseng' required className={inputStyle} />

      <SubmitButton />
    </form>
  )
}

const formStyle = 'max-w-lg flex flex-col gap-y-4  shadow rounded p-8'
const inputStyle = 'border shadow rounded py-2 px-3 text-gray-700'
const btnStyle = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize'

export default FormPage
