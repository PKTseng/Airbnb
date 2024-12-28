import { deleteUser } from '@/utils/actions'

function DeleteButton({ id }: { id: string }) {
  return (
    <form action={deleteUser}>
      <input type='hidden' name='id' value={id} />
      <button type='submit' className='rounded bg-red-500 p-2 text-xs text-white'>
        Delete
      </button>
    </form>
  )
}

export default DeleteButton
