const TZ = 'Pacific/Auckland';

/** Current date (YYYY-MM-DD) and minutes since midnight in Auckland. */
export function nzNow(): { date: string; minutes: number } {
	const parts = Object.fromEntries(
		new Intl.DateTimeFormat('en-CA', {
			timeZone: TZ,
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hourCycle: 'h23'
		})
			.formatToParts(new Date())
			.map((p) => [p.type, p.value])
	);
	return {
		date: `${parts.year}-${parts.month}-${parts.day}`,
		minutes: Number(parts.hour) * 60 + Number(parts.minute)
	};
}
