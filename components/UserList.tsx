import { fetchUsers } from '@/utils/actions'
import DeleteButton from './DeleteButton'

async function UserListPage() {
  const users = await fetchUsers()

  return (
    <div>
      {users.length ? (
        <div>
          {users.map((user) => {
            return (
              <h4 key={user.id} className='mb-2 flex items-center justify-between text-lg capitalize'>
                {user.firstName} {user.lastName}
                <DeleteButton id={user.id} />
              </h4>
            )
          })}
        </div>
      ) : (
        <p>No user ...</p>
      )}
    </div>
  )
}

export default UserListPage
