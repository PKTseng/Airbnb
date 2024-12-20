import { createUser } from '@/utils/actions'

function FormPage() {
  return (
    <form className={formStyle} action={createUser}>
      <h1 className='mb-4 text-3xl capitalize'>Create User</h1>

      <input type='text' name='firstName' defaultValue='ken' required className={inputStyle} />
      <input type='text' name='lastName' defaultValue='tseng' required className={inputStyle} />

      <button type='submit' className={btnStyle}>
        Submit
      </button>
    </form>
  )
}

const formStyle = 'max-w-lg flex flex-col gap-y-4  shadow rounded p-8'
const inputStyle = 'border shadow rounded py-2 px-3 text-gray-700'
const btnStyle = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize'

export default FormPage
