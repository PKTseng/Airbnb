import { removeUser } from '@/utils/actions'

function DeleteButton({ id }: { id: string }) {
  return (
    <form action={removeUser.bind(null, id)}>
      <button type='submit' className='rounded bg-red-500 p-2 text-xs text-white'>
        delete
      </button>
    </form>
  )
}

export default DeleteButton
