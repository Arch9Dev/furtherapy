import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import type { Cookies } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { getDb } from '$lib/db';

export const SESSION_COOKIE = 'ft_admin_session';
const SESSION_MAX_AGE_S = 60 * 60 * 8; // 8 hours

const sha256 = (value: string) => createHash('sha256').update(value).digest();

/**
 * Constant-time credential check. Both values are hashed first so the
 * comparison buffers are always the same length, and both comparisons run
 * regardless of whether the first one failed.
 */
export function credentialsMatch(
	username: string,
	password: string,
	expectedUsername: string,
	expectedPassword: string
): boolean {
	const userOk = timingSafeEqual(sha256(username), sha256(expectedUsername));
	const passOk = timingSafeEqual(sha256(password), sha256(expectedPassword));
	return userOk && passOk;
}

/** Create a random server-side session and set its cookie. */
export function createSession(cookies: Cookies): void {
	const db = getDb();
	db.prepare('DELETE FROM admin_sessions WHERE expires_at < ?').run(Date.now());

	const token = randomBytes(32).toString('hex');
	db.prepare('INSERT INTO admin_sessions (token_hash, expires_at) VALUES (?, ?)').run(
		sha256(token).toString('hex'),
		Date.now() + SESSION_MAX_AGE_S * 1000
	);

	cookies.set(SESSION_COOKIE, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: !dev,
		maxAge: SESSION_MAX_AGE_S
	});
}

/** True only if the cookie holds a token that matches an unexpired session. */
export function isAdmin(cookies: Cookies): boolean {
	const token = cookies.get(SESSION_COOKIE);
	if (!token || typeof token !== 'string') return false;

	const row = getDb()
		.prepare('SELECT 1 FROM admin_sessions WHERE token_hash = ? AND expires_at > ?')
		.get(sha256(token).toString('hex'), Date.now());
	return !!row;
}

/** Remove the session from the database and clear the cookie. */
export function destroySession(cookies: Cookies): void {
	const token = cookies.get(SESSION_COOKIE);
	if (token) {
		getDb()
			.prepare('DELETE FROM admin_sessions WHERE token_hash = ?')
			.run(sha256(token).toString('hex'));
	}
	cookies.delete(SESSION_COOKIE, { path: '/' });
}
