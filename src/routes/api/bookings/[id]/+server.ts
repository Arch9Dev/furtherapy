import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/db';
import { isAdmin } from '$lib/sessions';
import { sendBookingConfirmation, sendBookingDeclined } from '$lib/email';
import { isSlotFree, BUFFER_MINUTES } from '$lib/bookingHelpers';
import { nzNow } from '$lib/nzTime';

export const PATCH: RequestHandler = async ({ params, request, cookies }) => {
	if (!isAdmin(cookies)) {
		return json({ error: 'Unauthorised' }, { status: 401 });
	}
	const db = getDb();
	const body = await request.json().catch(() => null);
	const status = body?.status;
	if (!['approved', 'declined'].includes(status)) {
		return json({ error: 'Invalid status' }, { status: 400 });
	}

	// Fetch booking before updating so we have details for the email
	const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(params.id) as {
		id: number; name: string; email: string | null; dog_name: string;
		service: string; date: string; time: string;
	} | undefined;

	if (!booking) {
		return json({ error: 'Booking not found.' }, { status: 404 });
	}

	if (status === 'approved') {
		const others = db
			.prepare(`SELECT time, service FROM bookings WHERE date = ? AND status = 'approved' AND id != ?`)
			.all(booking.date, booking.id) as { time: string; service: string }[];
		if (!isSlotFree(booking.time, booking.service, others)) {
			return json(
				{
					error: `This booking overlaps, or is less than ${BUFFER_MINUTES} minutes from, another approved appointment that day.`
				},
				{ status: 409 }
			);
		}
	}

	// A booking approved on the day itself gets the confirmation email only, not a reminder as well.
	const reminderSent = status === 'approved' && booking.date === nzNow().date ? 1 : 0;
	db.prepare('UPDATE bookings SET status = ?, reminder_sent = ? WHERE id = ?').run(
		status,
		reminderSent,
		params.id
	);

	// Email customer if they have an email address
	if (booking.email) {
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
	if (!isAdmin(cookies)) {
		return json({ error: 'Unauthorised' }, { status: 401 });
	}
	const db = getDb();
	db.prepare('DELETE FROM bookings WHERE id = ?').run(params.id);
	return json({ success: true });
};