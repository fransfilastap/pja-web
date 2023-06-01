import csrf from 'edge-csrf';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { botdEdge } from './lib/botd';

const csrfProtect = csrf({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function middleware(request: NextRequest) {

  // Do light bot detection for all paths
  const res = await botdEdge(request, {
    // The request id is excluded for demo purposes because
    // Botd remembers your request id and will always show
    // you the /bot-detected page if you're a bot, and
    // never if you have been identified as a human
    useRequestId: true,
  })
    
    console.log('=====')

  if (res && res.status !== 200) {
    // Bot detected!
    request.nextUrl.pathname = '/bot-detected'
    const rewrite = NextResponse.rewrite(request.nextUrl)
    // Move Botd headers to the rewrite response
    res.headers.forEach((v, k) => rewrite.headers.set(k, v))

    return rewrite
  }

  const response = NextResponse.next();

  // csrf protection
  const csrfError = await csrfProtect(request, response);

  // check result
  if (csrfError) {
    return new NextResponse('invalid csrf token', { status: 403 });
  }

  return response;
}

export const config = {
  matcher: ['/api/vote','/kandidat'],
};