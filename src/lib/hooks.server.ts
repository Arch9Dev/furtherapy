import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Keep the admin area and API out of search results.
	const { pathname } = event.url;
	if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
		response.headers.set('X-Robots-Tag', 'noindex, nofollow');
	}

	// Basic hardening headers.
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('X-Frame-Options', 'SAMEORIGIN');

	return response;
};
