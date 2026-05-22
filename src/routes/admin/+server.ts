import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const ADMIN_USERNAME = 'FurTherapy';
const ADMIN_PASSWORD = 'Benjamin2807';
const SESSION_COOKIE = 'ft_admin_session';
const SESSION_VALUE = 'authenticated';

// GET: if already logged in, redirect to dashboard
export const GET: RequestHandler = async ({ cookies }) => {
	if (cookies.get(SESSION_COOKIE) === SESSION_VALUE) {
		throw redirect(302, '/admin/dashboard');
	}
	return new Response(null, { status: 200 });
};

// POST: validate credentials
export const POST: RequestHandler = async ({ request, cookies }) => {
	const { username, password } = await request.json();

	if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
		cookies.set(SESSION_COOKIE, SESSION_VALUE, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
			maxAge: 60 * 60 * 8 // 8 hours
		});
		return json({ success: true });
	}

	return json({ message: 'Incorrect username or password.' }, { status: 401 });
};