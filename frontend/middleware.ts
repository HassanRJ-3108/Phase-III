// Middleware for route protection and domain validation
// NOTE: Auth is handled client-side via AuthGuard since we use localStorage tokens

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Domain validation disabled for hackathon
  // All routes allowed, auth handled client-side by AuthGuard
  return NextResponse.next();
}

export const config = {
  matcher: ['/tasks/:path*', '/chat/:path*', '/signin', '/signup'],
};

