import { NextRequest, NextResponse } from 'next/server';

export const proxy = (request: NextRequest) => {
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/campaigns';
    return NextResponse.redirect(url);
  }
};
