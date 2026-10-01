import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { destroySession } from '$lib/sessions';

export const POST: RequestHandler = async ({ cookies }) => {
	destroySession(cookies);
	return json({ success: true });
};
