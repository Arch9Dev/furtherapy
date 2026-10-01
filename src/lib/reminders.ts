import { getDb } from '$lib/db';
import { sendBookingReminder } from '$lib/email';
import { nzNow } from '$lib/nzTime';

/** Reminders go out from this hour (Auckland time) on the day of the appointment. */
const REMINDER_HOUR = 7;
const CHECK_INTERVAL_MS = 10 * 60 * 1000;

let running = false;

type DueBooking = {
	id: number;
	name: string;
	email: string;
	dog_name: string;
	service: string;
	date: string;
	time: string;
};

/**
 * Emails a same-day reminder for every approved booking that has an email
 * address and hasn't been reminded yet. Safe to call repeatedly.
 */
export async function sendDueReminders(): Promise<void> {
	if (running) return;
	running = true;
	try {
		const now = nzNow();
		if (now.minutes < REMINDER_HOUR * 60) return;

		const db = getDb();
		const due = db
			.prepare(
				`SELECT id, name, email, dog_name, service, date, time FROM bookings
				 WHERE status = 'approved' AND reminder_sent = 0
				   AND email IS NOT NULL AND email != '' AND date = ?`
			)
			.all(now.date) as DueBooking[];

		const markSent = db.prepare('UPDATE bookings SET reminder_sent = 1 WHERE id = ?');

		for (const b of due) {
			const [h, m] = b.time.split(':').map(Number);
			// Appointment already started (e.g. server was down): no point reminding.
			if (h * 60 + m <= now.minutes) {
				markSent.run(b.id);
				continue;
			}
			try {
				await sendBookingReminder(b);
				markSent.run(b.id);
			} catch (err) {
				// Leave unsent; it will be retried on the next check until the appointment time.
				console.error(`Reminder failed for booking ${b.id}:`, err);
			}
		}
	} finally {
		running = false;
	}
}

export function startReminderScheduler(): void {
	const g = globalThis as { __ftReminders?: boolean };
	if (g.__ftReminders) return; // guard against dev hot-reload starting it twice
	g.__ftReminders = true;

	setTimeout(() => void sendDueReminders(), 30_000).unref();
	setInterval(() => void sendDueReminders(), CHECK_INTERVAL_MS).unref();
}
