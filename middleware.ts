// import { NextResponse } from 'next/server'

export function middleware(request: Request) {
  return Response.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/about/:path*', '/tours/:path*'],
}
