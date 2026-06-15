import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '$env/static/private';

const SESSION_COOKIE = 'ft_admin_session';
const SESSION_VALUE = 'authenticated';

export const GET: RequestHandler = async ({ cookies }) => {
	if (cookies.get(SESSION_COOKIE) === SESSION_VALUE) {
		throw redirect(302, '/admin/dashboard');
	}
	return new Response(null, { status: 200 });
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { username, password } = await request.json();

	if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
		cookies.set(SESSION_COOKIE, SESSION_VALUE, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
			maxAge: 60 * 60 * 8
		});
		return json({ success: true });
	}

	return json({ message: 'Incorrect username or password.' }, { status: 401 });
};