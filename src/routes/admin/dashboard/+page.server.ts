import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	if (cookies.get('ft_admin_session') !== 'authenticated') {
		throw redirect(302, '/admin');
	}
	return {};
};