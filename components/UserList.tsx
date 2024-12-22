import { fetchUser } from '@/utils/actions'

async function UserListPage() {
  const users = await fetchUser()

  return (
    <div>
      {users.length ? (
        <div>
          {users.map((user) => {
            return (
              <h4 key={user.id} className='text-lg capitalize'>
                {user.firstName} {user.lastName}
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
