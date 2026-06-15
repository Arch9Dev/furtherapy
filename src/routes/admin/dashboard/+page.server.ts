import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDb } from '$lib/db';

export const load: PageServerLoad = async ({ cookies }) => {
	if (cookies.get('ft_admin_session') !== 'authenticated') {
		throw redirect(302, '/admin');
	}

	const db = getDb();

	const bookings = db.prepare(
		`SELECT * FROM bookings ORDER BY date ASC, time ASC`
	).all() as {
		id: number;
		customer_type: string;
		service: string;
		name: string;
		email: string | null;
		phone: string | null;
		dog_name: string;
		date: string;
		time: string;
		status: 'pending' | 'approved' | 'declined';
		notes: string | null;
		created_at: string;
	}[];

	const weekly = db.prepare(
		`SELECT * FROM weekly_availability ORDER BY day_of_week`
	).all() as {
		id: number;
		day_of_week: number;
		is_open: number;
		open_time: string | null;
		close_time: string | null;
	}[];

	const blocked = db.prepare(
		`SELECT * FROM blocked_dates ORDER BY date`
	).all() as {
		id: number;
		date: string;
	}[];

	return { bookings, weekly, blocked };
};