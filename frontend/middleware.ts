// Middleware for route protection and domain validation

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Validate domain allowlist
 * DISABLED FOR HACKATHON - Always returns true
 */
function isAllowedDomain(request: NextRequest): boolean {
  // Allow all domains for hackathon deployment
  return true;
}

export function middleware(request: NextRequest) {
  // 1. Domain Allowlist Validation
  if (!isAllowedDomain(request)) {
    return new NextResponse(
      `<html><body style="font-family: sans-serif; padding: 2rem; text-align: center;">
        <h1>Access Denied</h1>
        <p>This application is not available on this domain.</p>
        <p><small>Domain: ${request.nextUrl.hostname}</small></p>
      </body></html>`,
      {
        status: 403,
        headers: { 'Content-Type': 'text/html' },
      }
    );
  }

  // 2. Authentication Check
  const token = request.cookies.get('auth_token')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '');

  // Check if trying to access protected routes (tasks or chat)
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/tasks') ||
    request.nextUrl.pathname.startsWith('/chat');

  // If protected route and no token, redirect to signin
  if (isProtectedRoute && !token) {
    const signInUrl = new URL('/signin', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // If on signin/signup page and has token, redirect to tasks
  const isAuthRoute = request.nextUrl.pathname.startsWith('/signin') ||
    request.nextUrl.pathname.startsWith('/signup');

  if (isAuthRoute && token) {
    const tasksUrl = new URL('/tasks', request.url);
    return NextResponse.redirect(tasksUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/tasks/:path*', '/chat/:path*', '/signin', '/signup'],
};
