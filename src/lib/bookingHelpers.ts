export const SERVICE_DURATIONS: Record<string, number> = {
	first_visit: 60,
	return_visit: 45
};

export const SERVICE_LABELS: Record<string, string> = {
	first_visit: 'First Visit (60 min)',
	return_visit: 'Return Visit (45 min)'
};

/** Generate HH:MM time slots between open and close, stepping by slotMinutes */
export function generateSlots(
	openTime: string,
	closeTime: string,
	slotMinutes: number
): string[] {
	const slots: string[] = [];
	const [oh, om] = openTime.split(':').map(Number);
	const [ch, cm] = closeTime.split(':').map(Number);
	let current = oh * 60 + om;
	const end = ch * 60 + cm;
	while (current + slotMinutes <= end) {
		const h = Math.floor(current / 60).toString().padStart(2, '0');
		const m = (current % 60).toString().padStart(2, '0');
		slots.push(`${h}:${m}`);
		current += slotMinutes;
	}
	return slots;
}

/** Format HH:MM to 12-hour display */
export function formatTime(t: string): string {
	const [h, m] = t.split(':').map(Number);
	const ampm = h >= 12 ? 'pm' : 'am';
	const hour = h % 12 || 12;
	return `${hour}:${m.toString().padStart(2, '0')}${ampm}`;
}