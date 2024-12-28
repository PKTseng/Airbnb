'use server'

import { readFile, writeFile } from 'fs/promises'
import { revalidatePath } from 'next/cache'
export interface User {
  id: string
  firstName: string
  lastName: string
}

interface FormState {
  success?: boolean
  message?: string
}

export const createUser = async (prevState: FormState | null, formData: FormData): Promise<FormState> => {
  console.log('prevState', prevState)

  try {
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string

    const newUser = { firstName, lastName, id: Date.now().toString() }
    await saveUser(newUser)

    revalidatePath('/actions')

    return {
      success: true,
      message: '使用者建立成功！',
    }
  } catch (error) {
    return {
      success: false,
      message: '建立失敗：' + (error as Error).message,
    }
  }
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

// ===以下簡單範例 查看 prevState 狀態===========
interface DemoFormState {
  count: number
  lastSubmission: string
}

export const demoCreateUser = async (prevState: DemoFormState | null, formData: FormData): Promise<DemoFormState> => {
  // 印出前一次的狀態
  console.log('Previous state:', prevState)

  const firstName = formData.get('firstName') as string

  return {
    // 如果有前一次狀態，count +1；否則從 1 開始
    count: (prevState?.count ?? 0) + 1,
    lastSubmission: firstName,
  }
}
// ===以上簡單範例 查看 prevState 狀態===========
