// middleware.js

import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';

export function middleware(request) {
  // Vercel يضيف هذا الهيدر تلقائياً
  const country = request.headers.get('x-vercel-ip-country') || 'Unknown';

  // الدول اللي تريد تحظرها
  const blockedCountries = ['IR', 'RU', 'SY']; 

  if (blockedCountries.includes(country)) {
    // ممكن تعرض رسالة 403
    return new NextResponse('Access Denied', { status: 403 });

    // أو تحولهم إلى صفحة مخصصة
    // return NextResponse.redirect(new URL('/blocked', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // matcher يحدد المسارات اللي يشتغل عليها الـ middleware
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};