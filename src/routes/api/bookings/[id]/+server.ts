import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/db';
import { sendBookingConfirmation, sendBookingDeclined } from '$lib/email';

export const PATCH: RequestHandler = async ({ params, request, cookies }) => {
	if (cookies.get('ft_admin_session') !== 'authenticated') {
		return json({ error: 'Unauthorised' }, { status: 401 });
	}
	const db = getDb();
	const { status } = await request.json();
	if (!['approved', 'declined'].includes(status)) {
		return json({ error: 'Invalid status' }, { status: 400 });
	}

	// Fetch booking before updating so we have details for the email
	const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(params.id) as {
		id: number; name: string; email: string | null; dog_name: string;
		service: string; date: string; time: string;
	} | undefined;

	db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, params.id);

	// Email customer if they have an email address
	if (booking?.email) {
		if (status === 'approved') {
			sendBookingConfirmation({
				name: booking.name,
				email: booking.email,
				dog_name: booking.dog_name,
				service: booking.service,
				date: booking.date,
				time: booking.time
			}).catch(console.error);
		} else if (status === 'declined') {
			sendBookingDeclined({
				name: booking.name,
				email: booking.email,
				dog_name: booking.dog_name,
				date: booking.date,
				time: booking.time
			}).catch(console.error);
		}
	}

	return json({ success: true });
};

export const DELETE: RequestHandler = async ({ params, cookies }) => {
	if (cookies.get('ft_admin_session') !== 'authenticated') {
		return json({ error: 'Unauthorised' }, { status: 401 });
	}
	const db = getDb();
	db.prepare('DELETE FROM bookings WHERE id = ?').run(params.id);
	return json({ success: true });
};