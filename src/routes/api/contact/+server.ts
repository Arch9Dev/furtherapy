import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/db';
import { notifyAdminNewContact } from '$lib/email';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json().catch(() => null);
	if (!body) return json({ error: 'Invalid request body.' }, { status: 400 });

	const { name, email, message } = body;

	if (!name?.trim() || !email?.trim() || !message?.trim()) {
		return json({ error: 'All fields are required.' }, { status: 400 });
	}

	if (!EMAIL_RE.test(email.trim())) {
		return json({ error: 'Please enter a valid email address.' }, { status: 400 });
	}

	if (message.trim().length > 5000) {
		return json({ error: 'Message is too long (max 5000 characters).' }, { status: 400 });
	}

	const db = getDb();
	db.prepare(`
		INSERT INTO contact_submissions (name, email, message)
		VALUES (?, ?, ?)
	`).run(name.trim(), email.trim(), message.trim());

	notifyAdminNewContact({ name: name.trim(), email: email.trim(), message: message.trim() }).catch(console.error);

	return json({ success: true });
};