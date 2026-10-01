import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/db';
import { notifyAdminNewContact } from '$lib/email';
import { allow, clientIp } from '$lib/rateLimit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: RequestHandler = async (event) => {
	// 5 messages per hour per IP
	if (!allow(`contact:${clientIp(event)}`, 5, 60 * 60 * 1000)) {
		return json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
	}

	const body = await event.request.json().catch(() => null);
	if (!body || typeof body !== 'object') {
		return json({ error: 'Invalid request body.' }, { status: 400 });
	}

	const name = typeof body.name === 'string' ? body.name.replace(/\s+/g, ' ').trim() : '';
	const email = typeof body.email === 'string' ? body.email.trim() : '';
	const message = typeof body.message === 'string' ? body.message.trim() : '';

	if (!name || !email || !message) {
		return json({ error: 'All fields are required.' }, { status: 400 });
	}
	if (name.length > 100) {
		return json({ error: 'Name is too long (max 100 characters).' }, { status: 400 });
	}
	if (email.length > 254 || !EMAIL_RE.test(email)) {
		return json({ error: 'Please enter a valid email address.' }, { status: 400 });
	}
	if (message.length > 5000) {
		return json({ error: 'Message is too long (max 5000 characters).' }, { status: 400 });
	}

	const db = getDb();
	db.prepare(
		`INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)`
	).run(name, email, message);

	notifyAdminNewContact({ name, email, message }).catch(console.error);

	return json({ success: true });
};
