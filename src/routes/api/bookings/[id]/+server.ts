import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/db';

// PATCH /api/bookings/[id] — approve or decline
export const PATCH: RequestHandler = async ({ params, request, cookies }) => {
	if (cookies.get('ft_admin_session') !== 'authenticated') {
		return json({ error: 'Unauthorised' }, { status: 401 });
	}
	const db = getDb();
	const { status } = await request.json();
	if (!['approved', 'declined'].includes(status)) {
		return json({ error: 'Invalid status' }, { status: 400 });
	}
	db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, params.id);
	return json({ success: true });
};

// DELETE /api/bookings/[id] — remove a booking
export const DELETE: RequestHandler = async ({ params, cookies }) => {
	if (cookies.get('ft_admin_session') !== 'authenticated') {
		return json({ error: 'Unauthorised' }, { status: 401 });
	}
	const db = getDb();
	db.prepare('DELETE FROM bookings WHERE id = ?').run(params.id);
	return json({ success: true });
};