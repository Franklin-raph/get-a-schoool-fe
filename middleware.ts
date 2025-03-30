// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected routes that require authentication
const protectedRoutes = [
  '/my-profile',
  '/dashboard',
  '/account-settings',
  '/post-job'
]

export function middleware(request: NextRequest) {
  // Get the path from the request
  const path = request.nextUrl.pathname
  
  // Check if the path is in the protected routes
  const isProtectedRoute = protectedRoutes.some(route => 
    path === route || path.startsWith(`${route}/`)
  )
  
  // If it's not a protected route, let the request proceed normally
  if (!isProtectedRoute) {
    return NextResponse.next()
  }
  
  // Check for authentication token in cookies
  const authToken = request.cookies.get('token')?.value
  
  // If there's no auth token, redirect to login page
  if (!authToken) {
    // Create url for the login page with a redirect parameter
    const loginUrl = new URL('/sign-in', request.url)
    // Store the original URL as a redirect parameter
    loginUrl.searchParams.set('redirect', path)
    
    return NextResponse.redirect(loginUrl)
  }
  
  // User has auth token, allow access to protected route
  return NextResponse.next()
}

// Configure paths for which the middleware should run
export const config = {
  matcher: [
    '/my-profile/:path*',
    '/dashboard/:path*',
    '/account-settings/:path*',
    '/post-job/:path*',
    // Add more protected routes as needed
  ],
}