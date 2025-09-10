import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Force HTTPS redirect
  if (
    request.nextUrl.protocol === 'http:' &&
    process.env.NODE_ENV === 'production' &&
    !request.headers.get('x-forwarded-proto')?.includes('https')
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}${request.nextUrl.search}`,
      301
    )
  }

  // Handle problematic search URLs
  if (request.nextUrl.pathname === '/search') {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    
    // Block problematic search parameters
    if (query === '{search_term_string}' || query === '' || !query) {
      return NextResponse.redirect(new URL('/search', request.url))
    }
  }

  // Handle tracking parameters and redirect URLs
  const url = request.nextUrl.clone()
  const hasTrackingParams = [
    'pr_prod_strat',
    'pr_rec_id', 
    'pr_rec_pid',
    'pr_ref_pid',
    'pr_seq'
  ].some(param => url.searchParams.has(param))

  if (hasTrackingParams) {
    // Remove tracking parameters and redirect
    url.searchParams.delete('pr_prod_strat')
    url.searchParams.delete('pr_rec_id')
    url.searchParams.delete('pr_rec_pid')
    url.searchParams.delete('pr_ref_pid')
    url.searchParams.delete('pr_seq')
    
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}