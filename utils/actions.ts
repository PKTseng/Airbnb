'use server'

import { readFile, writeFile } from 'fs/promises'

interface User {
  id: string
  firstName: string
  lastName: string
}

export const createUser = async (formData: FormData) => {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  const rowData = Object.fromEntries(formData)
  const newUser: User = { firstName, lastName, id: Date.now().toString() }

  saveUser(newUser)
  console.log({ firstName, lastName, rowData })
}

const fetchUser = async () => {
  const result = await readFile('user.json', { encoding: 'utf-8' })
  const user = result ? JSON.parse(result) : []

  return user
}

export const saveUser = async (user: User) => {
  const users = await fetchUser()
  users.push(user)
  await writeFile('user.json', JSON.stringify(users))
}
