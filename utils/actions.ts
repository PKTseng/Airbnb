'use server'

import { readFile, writeFile } from 'fs/promises'
import { revalidatePath } from 'next/cache'
export interface User {
  id: string
  firstName: string
  lastName: string
}

export const createUser = async (formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  // const rowData = Object.fromEntries(formData)
  const newUser: User = { firstName, lastName, id: Date.now().toString() }

  saveUser(newUser)
  revalidatePath('/actions')
}

export const fetchUser = async (): Promise<User[]> => {
  const result = await readFile('user.json', { encoding: 'utf-8' })
  const user = result ? JSON.parse(result) : []

  return user
}

export const saveUser = async (user: User) => {
  const users = await fetchUser()
  users.push(user)
  await writeFile('user.json', JSON.stringify(users))
}
