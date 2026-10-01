import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '$env/static/private';
import { credentialsMatch, createSession, isAdmin } from '$lib/sessions';
import { allow, clientIp } from '$lib/rateLimit';

export const GET: RequestHandler = async ({ cookies }) => {
	if (isAdmin(cookies)) {
		throw redirect(302, '/admin/dashboard');
	}
	return new Response(null, { status: 200 });
};

export const POST: RequestHandler = async (event) => {
	const { request, cookies } = event;

	// 10 attempts per 15 minutes per IP
	if (!allow(`login:${clientIp(event)}`, 10, 15 * 60 * 1000)) {
		return json({ message: 'Too many attempts. Please try again in 15 minutes.' }, { status: 429 });
	}

	const body = await request.json().catch(() => null);
	const username = typeof body?.username === 'string' ? body.username : '';
	const password = typeof body?.password === 'string' ? body.password : '';

	if (credentialsMatch(username, password, ADMIN_USERNAME, ADMIN_PASSWORD)) {
		createSession(cookies);
		return json({ success: true });
	}

	return json({ message: 'Incorrect username or password.' }, { status: 401 });
};
