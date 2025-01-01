import { NextRequest, NextResponse } from 'next/server'
import { fetchUsers, saveUser } from '@/utils/actions'

// export const GET = async () => {
//   const users = await fetchUsers()
//   return Response.json(users)
// }

export const GET = async (request: NextRequest) => {
  // console.log(request.nextUrl.searchParams)
  const id = request.nextUrl.searchParams.get('id')
  console.log('Requested ID:', id)

  const users = await fetchUsers()
  console.log(users)
  return Response.json(users)
  // return NextResponse.redirect(new URL('/', request.url))
}

export const POST = async (request: Request) => {
  const user = await request.json()
  const newUser = { ...user, id: Date.now().toString() }
  console.log(newUser)
  saveUser(newUser)

  return NextResponse.json(newUser)
}
