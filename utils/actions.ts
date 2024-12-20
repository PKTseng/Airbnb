'use server'

export const createUser = async (fromData: FormData) => {
  const firstName = fromData.get('firstName') as string
  const lastName = fromData.get('lastName') as string

  console.log({ firstName, lastName })
}
