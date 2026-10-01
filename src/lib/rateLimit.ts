import type { RequestEvent } from '@sveltejs/kit';

/**
 * Simple in-memory fixed-window rate limiter. State resets when the server
 * restarts, which is fine for a single-instance deployment.
 *
 * NOTE: behind a reverse proxy, set ADDRESS_HEADER=X-Forwarded-For (and
 * XFF_DEPTH=1) in the production environment so getClientAddress() returns
 * the visitor's IP rather than the proxy's. Otherwise every visitor shares
 * one bucket.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

/** Returns true if the request is allowed, false if the limit is exceeded. */
export function allow(key: string, max: number, windowMs: number): boolean {
	const now = Date.now();

	if (buckets.size > 5000) {
		for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
	}

	const bucket = buckets.get(key);
	if (!bucket || bucket.resetAt <= now) {
		buckets.set(key, { count: 1, resetAt: now + windowMs });
		return true;
	}
	bucket.count += 1;
	return bucket.count <= max;
}

export function clientIp(event: Pick<RequestEvent, 'getClientAddress'>): string {
	try {
		return event.getClientAddress();
	} catch {
		return 'unknown';
	}
}
