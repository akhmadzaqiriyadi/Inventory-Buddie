import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'secret_key');

export async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get('token');
  const token = tokenCookie?.value;

  if (!token) {
    console.log('No token found, redirecting to /signin');
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    console.log('Token Payload:', payload);

    const role = payload.role as string;
    const url = req.nextUrl.pathname;

    console.log('Role:', role);
    console.log('Requested URL:', url);

    // Logika pembatasan akses berdasarkan role dan URL
    if (url.startsWith('/admin')) {
      if (role !== 'admin') {
        console.log('User role is not admin, redirecting to /not-authorized');
        return NextResponse.redirect(new URL('/not-authorized', req.url));
      }
    } else if (url.startsWith('/user')) {
      if (role !== 'user') {
        console.log('User role is not user, redirecting to /not-authorized');
        return NextResponse.redirect(new URL('/not-authorized', req.url));
      }
    } else {
      console.log('Access to this URL is not permitted, redirecting to /not-authorized');
      return NextResponse.redirect(new URL('/not-authorized', req.url));
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*'], // Menentukan rute yang akan dijalankan oleh middleware
};
