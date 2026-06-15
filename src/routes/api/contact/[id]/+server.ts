import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/db';

// PATCH /api/contact/[id] — mark as read
export const PATCH: RequestHandler = async ({ params, cookies }) => {
	if (cookies.get('ft_admin_session') !== 'authenticated') {
		return json({ error: 'Unauthorised' }, { status: 401 });
	}
	const db = getDb();
	db.prepare('UPDATE contact_submissions SET read = 1 WHERE id = ?').run(params.id);
	return json({ success: true });
};

// DELETE /api/contact/[id]
export const DELETE: RequestHandler = async ({ params, cookies }) => {
	if (cookies.get('ft_admin_session') !== 'authenticated') {
		return json({ error: 'Unauthorised' }, { status: 401 });
	}
	const db = getDb();
	db.prepare('DELETE FROM contact_submissions WHERE id = ?').run(params.id);
	return json({ success: true });
};