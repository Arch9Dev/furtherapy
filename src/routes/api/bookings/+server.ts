import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/db';
import { generateSlots, SERVICE_DURATIONS } from '$lib/bookingHelpers';
import { notifyAdminNewBooking } from '$lib/email';

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
		`SELECT date, time FROM bookings WHERE status = 'approved' AND date LIKE ?`
	).all(`${year}-${month.toString().padStart(2, '0')}%`) as { date: string; time: string }[];

	const takenMap: Record<string, Set<string>> = {};
	for (const b of approvedBookings) {
		if (!takenMap[b.date]) takenMap[b.date] = new Set();
		takenMap[b.date].add(b.time);
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
		const taken = takenMap[dateStr] ?? new Set();
		daySlots = daySlots.filter(s => !taken.has(s));

		if (daySlots.length > 0) {
			slots[dateStr] = daySlots;
			availableDates.push(dateStr);
		}
	}

	return json({ availableDates, blockedDates: [...blockedSet], slots });
};

export const POST: RequestHandler = async ({ request }) => {
	const db = getDb();
	const body = await request.json().catch(() => null);
	if (!body) return json({ error: 'Invalid request body.' }, { status: 400 });

	const { customer_type, service, name, email, phone, dog_name, date, time } = body;

	if (!customer_type || !service || !name || !dog_name || !date || !time) {
		return json({ error: 'Missing required fields.' }, { status: 400 });
	}
	if (!['new', 'returning'].includes(customer_type)) {
		return json({ error: 'Invalid customer type.' }, { status: 400 });
	}
	if (!['first_visit', 'return_visit'].includes(service)) {
		return json({ error: 'Invalid service.' }, { status: 400 });
	}
	if (customer_type === 'new' && (!email || !phone)) {
		return json({ error: 'New customers must provide email and phone.' }, { status: 400 });
	}
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
		return json({ error: 'Invalid date format.' }, { status: 400 });
	}
	if (!/^\d{2}:\d{2}$/.test(time)) {
		return json({ error: 'Invalid time format.' }, { status: 400 });
	}

	const conflict = db.prepare(
		`SELECT id FROM bookings WHERE date = ? AND time = ? AND status = 'approved'`
	).get(date, time);
	if (conflict) {
		return json({ error: 'That slot has just been taken. Please choose another time.' }, { status: 409 });
	}

	const result = db.prepare(`
		INSERT INTO bookings (customer_type, service, name, email, phone, dog_name, date, time, status)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')
	`).run(customer_type, service, name, email ?? null, phone ?? null, dog_name, date, time);

	notifyAdminNewBooking({ name, dog_name, service, date, time, email, phone }).catch(console.error);

	return json({ success: true, id: result.lastInsertRowid }, { status: 201 });
};