import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/db';
import { isAdmin } from '$lib/sessions';

// GET /api/availability
export const GET: RequestHandler = async () => {
	const db = getDb();
	const weekly = db.prepare('SELECT * FROM weekly_availability ORDER BY day_of_week').all();
	const blocked = db.prepare('SELECT * FROM blocked_dates ORDER BY date').all();
	return json({ weekly, blocked });
};

// PUT /api/availability — update weekly hours + blocked dates (admin only)
export const PUT: RequestHandler = async ({ request, cookies }) => {
	if (!isAdmin(cookies)) {
		return json({ error: 'Unauthorised' }, { status: 401 });
	}
	const db = getDb();
	const body = await request.json().catch(() => null);
	if (!body) return json({ error: 'Invalid request body.' }, { status: 400 });

	const { weekly, blockedDates } = body;

	const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
	const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
	const weeklyValid =
		Array.isArray(weekly) &&
		weekly.every(
			(d) =>
				Number.isInteger(d?.day_of_week) &&
				d.day_of_week >= 0 &&
				d.day_of_week <= 6 &&
				(!d.is_open ||
					(TIME_RE.test(d.open_time ?? '') &&
						TIME_RE.test(d.close_time ?? '') &&
						d.open_time < d.close_time))
		);
	const blockedValid =
		blockedDates === undefined ||
		(Array.isArray(blockedDates) &&
			blockedDates.every((d) => typeof d === 'string' && DATE_RE.test(d)));
	if (!weeklyValid || !blockedValid) {
		return json({ error: 'Invalid availability data.' }, { status: 400 });
	}

	// Update weekly availability
	const updateDay = db.prepare(`
		UPDATE weekly_availability SET is_open = ?, open_time = ?, close_time = ?
		WHERE day_of_week = ?
	`);
	const updateMany = db.transaction((days: { day_of_week: number; is_open: boolean; open_time: string; close_time: string }[]) => {
		for (const d of days) {
			updateDay.run(d.is_open ? 1 : 0, d.open_time || null, d.close_time || null, d.day_of_week);
		}
	});
	updateMany(weekly);

	// Replace blocked dates
	db.prepare('DELETE FROM blocked_dates').run();
	const insertBlocked = db.prepare('INSERT OR IGNORE INTO blocked_dates (date) VALUES (?)');
	const insertAll = db.transaction((dates: string[]) => {
		for (const date of dates) insertBlocked.run(date);
	});
	insertAll(blockedDates ?? []);

	return json({ success: true });
};