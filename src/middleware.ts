import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function isNot(anything: unknown) {
	return !!!anything
}

function isPublic(path: string) {
	const ENABLED_PATHS = ['/login', '/register']
	return ENABLED_PATHS.some(p => path.startsWith(p))
}

export function middleware(req: NextRequest) {
	const token = req.cookies.get('token')?.value

	const path = req.nextUrl.pathname
	const isPublicPath = isPublic(path)

	// if (!isPublicPath && isNot(token)) {
	// 	return NextResponse.redirect(new URL('/login', req.url))
	// }
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
		'/((?!api|_next/static|_next/image|favicon.ico|public/image).*)',
	],
}
