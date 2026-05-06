import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const DASHBOARD_PREFIX = '/dashboard';
const ADMIN_PREFIX = '/admin';

const PUBLIC_AUTH_PATHS = ['/auth/login', '/auth/registrazione'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const needsAuth =
    pathname.startsWith(DASHBOARD_PREFIX) || pathname.startsWith(ADMIN_PREFIX);

  if (!needsAuth) return NextResponse.next();

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname + req.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  const role = (token as { role?: string }).role;

  if (pathname.startsWith(ADMIN_PREFIX) && role !== 'admin') {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (
    pathname.startsWith(DASHBOARD_PREFIX) &&
    role !== 'professional' &&
    role !== 'admin'
  ) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Already authenticated users hitting auth pages → redirect to area
  if (token && PUBLIC_AUTH_PATHS.includes(pathname)) {
    const target = role === 'admin' ? '/admin' : role === 'professional' ? '/dashboard' : '/';
    return NextResponse.redirect(new URL(target, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
