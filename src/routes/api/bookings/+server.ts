import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/db';
import { generateSlots, isSlotFree, SERVICE_DURATIONS } from '$lib/bookingHelpers';
import { nzNow } from '$lib/nzTime';
import { notifyAdminNewBooking } from '$lib/email';
import { allow, clientIp } from '$lib/rateLimit';

export const GET: RequestHandler = async ({ url }) => {
	const db = getDb();
	const year = Number(url.searchParams.get('year') ?? new Date().getFullYear());
	const month = Number(url.searchParams.get('month') ?? new Date().getMonth() + 1);
	const service = url.searchParams.get('service') ?? 'first_visit';
	const slotMinutes = SERVICE_DURATIONS[service] ?? 60;

	const weekly = db.prepare('SELECT * FROM weekly_availability').all() as {
		day_of_week: number; is_open: number; open_time: string; close_time: string;
	}[];

	const blockedRaw = db.prepare(
		`SELECT date FROM blocked_dates WHERE date LIKE ?`
	).all(`${year}-${month.toString().padStart(2, '0')}%`) as { date: string }[];
	const blockedSet = new Set(blockedRaw.map(r => r.date));

	const approvedBookings = db.prepare(
		`SELECT date, time, service FROM bookings WHERE status = 'approved' AND date LIKE ?`
	).all(`${year}-${month.toString().padStart(2, '0')}%`) as { date: string; time: string; service: string }[];

	const takenMap: Record<string, { time: string; service: string }[]> = {};
	for (const b of approvedBookings) {
		(takenMap[b.date] ??= []).push({ time: b.time, service: b.service });
	}

	const daysInMonth = new Date(year, month, 0).getDate();
	const slots: Record<string, string[]> = {};
	const availableDates: string[] = [];

	for (let d = 1; d <= daysInMonth; d++) {
		const dateObj = new Date(year, month - 1, d);
		const dateStr = `${year}-${month.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
		const dow = dateObj.getDay();

		if (blockedSet.has(dateStr)) continue;

		const dayRule = weekly.find(w => w.day_of_week === dow);
		if (!dayRule || !dayRule.is_open || !dayRule.open_time || !dayRule.close_time) continue;

		let daySlots = generateSlots(dayRule.open_time, dayRule.close_time, slotMinutes);
		const taken = takenMap[dateStr] ?? [];
		daySlots = daySlots.filter(s => isSlotFree(s, service, taken));

		if (daySlots.length > 0) {
			slots[dateStr] = daySlots;
			availableDates.push(dateStr);
		}
	}

	return json({ availableDates, blockedDates: [...blockedSet], slots });
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-\s]{6,30}$/;
/** Day of week (0-6) for a YYYY-MM-DD string, or null if it isn't a real date. */
function dayOfWeek(date: string): number | null {
	const [y, m, d] = date.split('-').map(Number);
	const dt = new Date(Date.UTC(y, m - 1, d));
	if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) return null;
	return dt.getUTCDay();
}

/** Trim and collapse whitespace so single-line fields can't carry line breaks. */
const clean = (v: unknown, max: number): string | null => {
	if (typeof v !== 'string') return null;
	const s = v.replace(/\s+/g, ' ').trim();
	return s.length > 0 && s.length <= max ? s : null;
};

export const POST: RequestHandler = async (event) => {
	// 10 booking requests per hour per IP
	if (!allow(`booking:${clientIp(event)}`, 10, 60 * 60 * 1000)) {
		return json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
	}

	const db = getDb();
	const body = await event.request.json().catch(() => null);
	if (!body || typeof body !== 'object') {
		return json({ error: 'Invalid request body.' }, { status: 400 });
	}

	const { customer_type, service, date, time } = body;

	if (!['new', 'returning'].includes(customer_type)) {
		return json({ error: 'Invalid customer type.' }, { status: 400 });
	}
	if (!['first_visit', 'return_visit'].includes(service)) {
		return json({ error: 'Invalid service.' }, { status: 400 });
	}

	const name = clean(body.name, 100);
	const dog_name = clean(body.dog_name, 100);
	if (!name || !dog_name) {
		return json({ error: 'Missing or invalid name or dog name.' }, { status: 400 });
	}

	const email = body.email ? clean(body.email, 254) : null;
	const phone = body.phone ? clean(body.phone, 30) : null;
	if (body.email && (!email || !EMAIL_RE.test(email))) {
		return json({ error: 'Please enter a valid email address.' }, { status: 400 });
	}
	if (body.phone && (!phone || !PHONE_RE.test(phone))) {
		return json({ error: 'Please enter a valid phone number.' }, { status: 400 });
	}
	if (customer_type === 'new' && (!email || !phone)) {
		return json({ error: 'New customers must provide email and phone.' }, { status: 400 });
	}

	if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
		return json({ error: 'Invalid date format.' }, { status: 400 });
	}
	if (typeof time !== 'string' || !/^\d{2}:\d{2}$/.test(time)) {
		return json({ error: 'Invalid time format.' }, { status: 400 });
	}

	// The requested slot must be a real, future, open, unblocked slot.
	const dow = dayOfWeek(date);
	const now = nzNow();
	const maxDate = new Date(Date.now() + 366 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
	if (dow === null || date < now.date || date > maxDate) {
		return json({ error: 'Please choose a valid upcoming date.' }, { status: 400 });
	}

	const blocked = db.prepare('SELECT 1 FROM blocked_dates WHERE date = ?').get(date);
	const rule = db.prepare('SELECT * FROM weekly_availability WHERE day_of_week = ?').get(dow) as
		| { is_open: number; open_time: string | null; close_time: string | null }
		| undefined;
	if (blocked || !rule || !rule.is_open || !rule.open_time || !rule.close_time) {
		return json({ error: 'That date is not available. Please choose another.' }, { status: 400 });
	}

	const validSlots = generateSlots(rule.open_time, rule.close_time, SERVICE_DURATIONS[service] ?? 60);
	const [th, tm] = time.split(':').map(Number);
	if (!validSlots.includes(time) || (date === now.date && th * 60 + tm <= now.minutes)) {
		return json({ error: 'That time is not available. Please choose another.' }, { status: 400 });
	}

	const sameDay = db
		.prepare(`SELECT time, service FROM bookings WHERE date = ? AND status = 'approved'`)
		.all(date) as { time: string; service: string }[];
	if (!isSlotFree(time, service, sameDay)) {
		return json({ error: 'That time is no longer available. Please choose another time.' }, { status: 409 });
	}

	const result = db
		.prepare(
			`INSERT INTO bookings (customer_type, service, name, email, phone, dog_name, date, time, status)
			 VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`
		)
		.run(customer_type, service, name, email, phone, dog_name, date, time);

	notifyAdminNewBooking({ name, dog_name, service, date, time, email, phone }).catch(console.error);

	return json({ success: true, id: result.lastInsertRowid }, { status: 201 });
};
