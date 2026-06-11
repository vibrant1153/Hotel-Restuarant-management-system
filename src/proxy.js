import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Admin route protection
    if (pathname.startsWith('/admin')) {
      if (!token) {
        return NextResponse.redirect(new URL('/login?callbackUrl=/admin', req.url));
      }
      if (token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/?error=unauthorized', req.url));
      }
    }

    // Protected customer routes
    if (pathname.startsWith('/profile') || pathname.startsWith('/food')) {
      if (!token) {
        return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const pathname = req.nextUrl.pathname;
        if (pathname.startsWith('/admin')) return !!token;
        if (pathname.startsWith('/profile')) return !!token;
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*', '/food/:path*'],
};
