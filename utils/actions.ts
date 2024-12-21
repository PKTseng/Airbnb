'use server'

import { readFile, writeFile } from 'fs/promises'

interface User {
  id: string
  firstName: string
  lastName: string
}

// 在 server 端執行後端操作邏輯，但這僅止於觀念示範
export const createUser = async (formData: FormData) => {
  'use server'

  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  const rowData = Object.fromEntries(formData)
  const newUser: User = { firstName, lastName, id: Date.now().toString() }

  console.log({ firstName, lastName, rowData })

  saveUser(newUser)
}

export const fetchUser = async () => {
  const response = await readFile('user.json', { encoding: 'utf-8' })
  const users = response ? JSON.parse(response) : []
  return users
}

const saveUser = async (user: User) => {
  const users = await fetchUser()
  users.push(user)
  await writeFile('user.json', JSON.stringify(users))
}
