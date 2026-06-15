import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/db';
import { notifyAdminNewContact } from '$lib/email';

export const POST: RequestHandler = async ({ request }) => {
	const { name, email, message } = await request.json();

	if (!name?.trim() || !email?.trim() || !message?.trim()) {
		return json({ error: 'All fields are required.' }, { status: 400 });
	}

	const db = getDb();
	db.prepare(`
		INSERT INTO contact_submissions (name, email, message)
		VALUES (?, ?, ?)
	`).run(name.trim(), email.trim(), message.trim());

	// Fire-and-forget admin notification email
	notifyAdminNewContact({ name, email, message }).catch(console.error);

	return json({ success: true });
};