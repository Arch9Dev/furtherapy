<script lang="ts">
	import { goto } from '$app/navigation';

	type Booking = {
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
	};

	type WeekDay = {
		id: number;
		day_of_week: number;
		is_open: number;
		open_time: string | null;
		close_time: string | null;
	};

	type BlockedDate = {
		id: number;
		date: string;
	};

	type ContactSubmission = {
		id: number;
		name: string;
		email: string;
		message: string;
		read: number;
		created_at: string;
	};

	export let data: {
		bookings: Booking[];
		weekly: WeekDay[];
		blocked: BlockedDate[];
		contacts: ContactSubmission[];
	};

	const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const SERVICE_LABELS: Record<string, string> = {
		first_visit: 'First Visit (60 min)',
		return_visit: 'Return Visit (45 min)'
	};

	let activeTab: 'contacts' | 'bookings' | 'availability' = 'bookings';

	// ── Contacts ─────────────────────────────────────────────────────────
	let contacts: ContactSubmission[] = data.contacts ?? [];

	$: unreadCount = contacts.filter(c => !c.read).length;

	async function markRead(id: number) {
		await fetch(`/api/contact/${id}`, { method: 'PATCH' });
		contacts = contacts.map(c => c.id === id ? { ...c, read: 1 } : c);
	}

	async function deleteContact(id: number) {
		if (!confirm('Delete this message?')) return;
		const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
		if (res.ok) contacts = contacts.filter(c => c.id !== id);
	}

	function formatRelative(iso: string) {
		const date = new Date(iso);
		const now = new Date();
		const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
		if (diff < 60) return 'just now';
		if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
		if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
		return date.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' });
	}

	// ── Bookings ────────────────────────────────────────────────────────
	let bookings: Booking[] = data.bookings ?? [];
	type BookingFilter = 'all' | 'pending' | 'approved' | 'declined';
	let bookingFilter: BookingFilter = 'pending';
	let bookingActionLoading: Record<number, boolean> = {};

	$: filteredBookings =
		bookingFilter === 'all' ? bookings : bookings.filter((b) => b.status === bookingFilter);

	$: pendingCount = bookings.filter((b) => b.status === 'pending').length;

	async function updateBookingStatus(id: number, status: 'approved' | 'declined') {
		bookingActionLoading[id] = true;
		bookingActionLoading = { ...bookingActionLoading };
		const res = await fetch(`/api/bookings/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ status })
		});
		if (res.ok) {
			bookings = bookings.map((b) => (b.id === id ? { ...b, status } : b));
		}
		bookingActionLoading[id] = false;
		bookingActionLoading = { ...bookingActionLoading };
	}

	async function deleteBooking(id: number) {
		if (!confirm('Delete this booking permanently?')) return;
		const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
		if (res.ok) {
			bookings = bookings.filter((b) => b.id !== id);
		}
	}

	function formatDate(d: string) {
		return new Date(d + 'T00:00:00').toLocaleDateString('en-NZ', {
			weekday: 'short',
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}

	function formatTime(t: string) {
		const [h, m] = t.split(':').map(Number);
		const ampm = h >= 12 ? 'pm' : 'am';
		const hour = h % 12 || 12;
		return `${hour}:${m.toString().padStart(2, '0')}${ampm}`;
	}

	// ── Availability ────────────────────────────────────────────────────
	let weekly: WeekDay[] = data.weekly ?? [];
	let blockedDates: BlockedDate[] = data.blocked ?? [];
	let newBlockedDate = '';
	let availSaving = false;
	let availSaved = false;
	let availError = '';

	async function saveAvailability() {
		availSaving = true;
		availSaved = false;
		availError = '';
		const res = await fetch('/api/availability', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				weekly: weekly.map((d) => ({
					day_of_week: d.day_of_week,
					is_open: !!d.is_open,
					open_time: d.open_time,
					close_time: d.close_time
				})),
				blockedDates: blockedDates.map((b) => b.date)
			})
		});
		if (res.ok) {
			availSaved = true;
			setTimeout(() => (availSaved = false), 3000);
		} else {
			availError = 'Failed to save. Please try again.';
		}
		availSaving = false;
	}

	function addBlockedDate() {
		if (!newBlockedDate) return;
		if (blockedDates.some((b) => b.date === newBlockedDate)) return;
		blockedDates = [...blockedDates, { id: Date.now(), date: newBlockedDate }];
		newBlockedDate = '';
	}

	function removeBlockedDate(date: string) {
		blockedDates = blockedDates.filter((b) => b.date !== date);
	}

	function toggleDay(dow: number) {
		weekly = weekly.map((d) => {
			if (d.day_of_week !== dow) return d;
			const nowOpen = !d.is_open;
			return {
				...d,
				is_open: nowOpen ? 1 : 0,
				open_time: nowOpen ? d.open_time ?? '09:00' : d.open_time,
				close_time: nowOpen ? d.close_time ?? '17:00' : d.close_time
			};
		});
	}

	function setTime(dow: number, field: 'open_time' | 'close_time', val: string) {
		weekly = weekly.map((d) => (d.day_of_week === dow ? { ...d, [field]: val } : d));
	}

	// ── Logout ──────────────────────────────────────────────────────────
	async function logout() {
		await fetch('/admin/logout', { method: 'POST' });
		goto('/admin');
	}
</script>

<svelte:head>
	<title>Admin Dashboard | Fur Therapy</title>
</svelte:head>

<div class="page">
	<!-- Sidebar -->
	<aside class="sidebar">
		<div class="brand">
			<div class="logo-mark" aria-hidden="true">FT</div>
			<span>Admin</span>
		</div>

		<nav class="nav">
			<button class:active={activeTab === 'bookings'} on:click={() => (activeTab = 'bookings')}>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
				</svg>
				Bookings
				{#if pendingCount > 0}
					<span class="nav-badge">{pendingCount}</span>
				{/if}
			</button>

			<button class:active={activeTab === 'availability'} on:click={() => (activeTab = 'availability')}>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
				</svg>
				Availability
			</button>

			<button class:active={activeTab === 'contacts'} on:click={() => (activeTab = 'contacts')}>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
				</svg>
				Contact Submissions
				{#if unreadCount > 0}
					<span class="nav-badge">{unreadCount}</span>
				{/if}
			</button>
		</nav>

		<button class="logout" on:click={logout}>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
				<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
			</svg>
			Log out
		</button>
	</aside>

	<!-- Main content -->
	<main class="main">

		<!-- ── BOOKINGS TAB ─────────────────────────────────────────────── -->
		{#if activeTab === 'bookings'}
			<div class="section-header">
				<h1>Bookings</h1>
				{#if pendingCount > 0}
					<span class="badge">{pendingCount} pending</span>
				{/if}
			</div>

			<div class="filter-row">
				{#each ['pending', 'approved', 'declined', 'all'] as f}
					<button
						class="filter-btn"
						class:active={bookingFilter === f}
						on:click={() => (bookingFilter = f as BookingFilter)}
					>
						{f.charAt(0).toUpperCase() + f.slice(1)}
						<span class="filter-count">
							{f === 'all' ? bookings.length : bookings.filter((b) => b.status === f).length}
						</span>
					</button>
				{/each}
			</div>

			{#if filteredBookings.length === 0}
				<div class="empty-state">
					<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="1.5">
						<rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
					</svg>
					<p>No {bookingFilter === 'all' ? '' : bookingFilter} bookings yet.</p>
				</div>
			{:else}
				<div class="booking-list">
					{#each filteredBookings as b (b.id)}
						<div class="booking-card" class:status-pending={b.status === 'pending'} class:status-approved={b.status === 'approved'} class:status-declined={b.status === 'declined'}>
							<div class="booking-header">
								<div class="booking-who">
									<div class="avatar">{b.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div>
									<div>
										<p class="booking-name">{b.name}</p>
										<p class="booking-dog">🐾 {b.dog_name}</p>
									</div>
								</div>
								<span class="status-pill status-{b.status}">{b.status}</span>
							</div>

							<div class="booking-meta">
								<div class="meta-item">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
									{formatDate(b.date)}
								</div>
								<div class="meta-item">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
									{formatTime(b.time)}
								</div>
								<div class="meta-item">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
									{SERVICE_LABELS[b.service] ?? b.service}
								</div>
								<div class="meta-item">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
									{b.customer_type === 'new' ? 'New customer' : 'Returning'}
								</div>
							</div>

							{#if b.email || b.phone}
								<div class="booking-contact">
									{#if b.email}<a href="mailto:{b.email}" class="contact-link">✉ {b.email}</a>{/if}
									{#if b.phone}<a href="tel:{b.phone}" class="contact-link">📞 {b.phone}</a>{/if}
								</div>
							{/if}

							{#if b.notes}
								<p class="booking-notes">"{b.notes}"</p>
							{/if}

							{#if b.status === 'pending'}
								<div class="booking-actions">
									<button
										class="action-btn approve"
										disabled={bookingActionLoading[b.id]}
										on:click={() => updateBookingStatus(b.id, 'approved')}
									>
										{bookingActionLoading[b.id] ? '...' : '✓ Approve'}
									</button>
									<button
										class="action-btn decline"
										disabled={bookingActionLoading[b.id]}
										on:click={() => updateBookingStatus(b.id, 'declined')}
									>
										{bookingActionLoading[b.id] ? '...' : '✕ Decline'}
									</button>
									<button class="action-btn delete" on:click={() => deleteBooking(b.id)}>
										Delete
									</button>
								</div>
							{:else}
								<div class="booking-actions">
									{#if b.status === 'approved'}
										<button
											class="action-btn decline"
											disabled={bookingActionLoading[b.id]}
											on:click={() => updateBookingStatus(b.id, 'declined')}
										>
											Mark Declined
										</button>
									{:else}
										<button
											class="action-btn approve"
											disabled={bookingActionLoading[b.id]}
											on:click={() => updateBookingStatus(b.id, 'approved')}
										>
											Re-approve
										</button>
									{/if}
									<button class="action-btn delete" on:click={() => deleteBooking(b.id)}>
										Delete
									</button>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/if}

		<!-- ── AVAILABILITY TAB ─────────────────────────────────────────── -->
		{:else if activeTab === 'availability'}
			<div class="section-header">
				<h1>Availability</h1>
			</div>
			<p class="section-note">Set your weekly hours and block out specific dates. Customers can only book slots within these windows.</p>

			<div class="avail-grid">
				<!-- Weekly hours -->
				<section class="avail-section">
					<h2 class="avail-heading">Weekly Hours</h2>
					<div class="day-list">
						{#each weekly as day (day.day_of_week)}
							<div class="day-row" class:day-closed={!day.is_open}>
								<label class="day-toggle">
									<input
										type="checkbox"
										checked={!!day.is_open}
										on:change={() => toggleDay(day.day_of_week)}
									/>
									<span class="toggle-track">
										<span class="toggle-thumb"></span>
									</span>
									<span class="day-name">{DAY_NAMES[day.day_of_week]}</span>
								</label>

								{#if day.is_open}
									<div class="time-range">
										<input
											type="time"
											class="time-input"
											value={day.open_time ?? '09:00'}
											on:change={(e) => setTime(day.day_of_week, 'open_time', e.currentTarget.value)}
										/>
										<span class="time-sep">to</span>
										<input
											type="time"
											class="time-input"
											value={day.close_time ?? '17:00'}
											on:change={(e) => setTime(day.day_of_week, 'close_time', e.currentTarget.value)}
										/>
									</div>
								{:else}
									<span class="closed-label">Closed</span>
								{/if}
							</div>
						{/each}
					</div>
				</section>

				<!-- Blocked dates -->
				<section class="avail-section">
					<h2 class="avail-heading">Blocked Dates</h2>
					<p class="avail-sub">Specific dates that will be unavailable even if they fall on an open day.</p>

					<div class="blocked-add">
						<input
							type="date"
							class="date-input"
							bind:value={newBlockedDate}
							min={new Date().toISOString().split('T')[0]}
						/>
						<button class="add-date-btn" on:click={addBlockedDate} disabled={!newBlockedDate}>
							Block Date
						</button>
					</div>

					{#if blockedDates.length === 0}
						<p class="no-blocked">No dates blocked.</p>
					{:else}
						<ul class="blocked-list">
							{#each blockedDates.sort((a, b) => a.date.localeCompare(b.date)) as bd (bd.date)}
								<li class="blocked-item">
									<span>{formatDate(bd.date)}</span>
									<button class="remove-btn" on:click={() => removeBlockedDate(bd.date)} aria-label="Remove">✕</button>
								</li>
							{/each}
						</ul>
					{/if}
				</section>
			</div>

			<div class="save-row">
				{#if availError}
					<span class="save-error">{availError}</span>
				{/if}
				{#if availSaved}
					<span class="save-success">✓ Saved successfully</span>
				{/if}
				<button class="save-btn" on:click={saveAvailability} disabled={availSaving}>
					{availSaving ? 'Saving…' : 'Save Availability'}
				</button>
			</div>

		<!-- ── CONTACTS TAB ─────────────────────────────────────────────── -->
		{:else}
			<div class="section-header">
				<h1>Contact Submissions</h1>
				{#if contacts.length > 0}
					<span class="badge">{contacts.length}</span>
				{/if}
				{#if unreadCount > 0}
					<span class="badge" style="background:#3ecf8e;">{unreadCount} unread</span>
				{/if}
			</div>
			<p class="section-note">Messages submitted via the contact form. Reply directly by clicking the email address.</p>

			{#if contacts.length === 0}
				<div class="empty-state">
					<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="1.5">
						<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
					</svg>
					<p>No contact submissions yet.</p>
				</div>
			{:else}
				<div class="cards">
					{#each contacts as c (c.id)}
						<div class="contact-card" class:unread={!c.read}>
							<div class="card-top">
								<div class="avatar">{c.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}</div>
								<div style="flex:1; min-width:0;">
									<p class="booking-name">
										{c.name}
										{#if !c.read}<span class="unread-dot">●</span>{/if}
									</p>
									<a href="mailto:{c.email}" class="contact-link">{c.email}</a>
								</div>
								<span class="date-label">{formatRelative(c.created_at)}</span>
							</div>
							<p class="message">"{c.message}"</p>
							<div class="contact-actions">
								{#if !c.read}
									<button class="action-btn approve" on:click={() => markRead(c.id)}>
										✓ Mark read
									</button>
								{/if}
								<a href="mailto:{c.email}?subject=Re: Your FurTherapy enquiry" class="action-btn approve" style="text-decoration:none; display:inline-block;">
									Reply by email
								</a>
								<button class="action-btn delete" on:click={() => deleteContact(c.id)}>
									Delete
								</button>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		{/if}
	</main>
</div>

<style>
	:global(body) {
		font-family: system-ui, 'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif;
		background: #1a1a1a;
		color: #ffffff;
		line-height: 1.65;
		margin: 0;
		padding: 0;
	}

	* { box-sizing: border-box; margin: 0; padding: 0; }

	.page {
		display: flex;
		min-height: 100vh;
		background: #1a1a1a;
		font-family: system-ui, sans-serif;
		color: #fff;
	}

	/* ── Sidebar ── */
	.sidebar {
		width: 240px;
		background: #222;
		display: flex;
		flex-direction: column;
		padding: 1.75rem 1.25rem;
		flex-shrink: 0;
		border-right: 1px solid rgba(255,255,255,0.07);
		position: sticky;
		top: 0;
		height: 100vh;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 2rem;
	}

	.logo-mark {
		width: 38px; height: 38px;
		background: #f68b1f;
		border-radius: 8px;
		display: flex; align-items: center; justify-content: center;
		font-weight: 900; font-size: 0.9rem; color: #fff;
		flex-shrink: 0;
	}

	.brand span { font-weight: 800; font-size: 1rem; color: #fff; }

	.nav { display: flex; flex-direction: column; gap: 0.25rem; flex: 1; }

	.nav button {
		display: flex; align-items: center; gap: 0.6rem;
		background: none; border: none; color: #aaa;
		font-size: 0.875rem; font-weight: 600; font-family: inherit;
		cursor: pointer; padding: 0.65rem 0.75rem;
		border-radius: 8px; text-align: left;
		transition: background 0.15s, color 0.15s;
		position: relative;
	}

	.nav button:hover { background: rgba(255,255,255,0.06); color: #fff; }
	.nav button.active { background: rgba(246,139,31,0.15); color: #f68b1f; }

	.nav-badge {
		background: #f68b1f; color: #fff;
		font-size: 0.7rem; font-weight: 800;
		padding: 0.1rem 0.45rem; border-radius: 50px;
		margin-left: auto;
	}

	.logout {
		display: flex; align-items: center; gap: 0.5rem;
		background: none; border: 1px solid rgba(255,255,255,0.12);
		border-radius: 8px; color: #aaa;
		font-size: 0.875rem; font-weight: 600; font-family: inherit;
		cursor: pointer; padding: 0.6rem 0.75rem;
		transition: border-color 0.15s, color 0.15s;
	}
	.logout:hover { border-color: rgba(255,255,255,0.3); color: #fff; }

	/* ── Main ── */
	.main { flex: 1; padding: 2.5rem 2rem; overflow-y: auto; max-width: 900px; }

	.section-header {
		display: flex; align-items: center; gap: 0.75rem;
		margin-bottom: 0.5rem;
	}

	h1 { font-size: 1.5rem; font-weight: 800; }

	.badge {
		background: #f68b1f; color: #fff;
		font-size: 0.8rem; font-weight: 800;
		padding: 0.15rem 0.6rem; border-radius: 50px;
	}

	.section-note {
		color: #888; font-size: 0.875rem;
		margin-bottom: 1.75rem; max-width: 580px;
	}

	/* ── Filter row ── */
	.filter-row {
		display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;
	}

	.filter-btn {
		display: flex; align-items: center; gap: 0.4rem;
		background: rgba(255,255,255,0.06);
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 8px; color: #aaa;
		font-size: 0.825rem; font-weight: 600; font-family: inherit;
		cursor: pointer; padding: 0.45rem 0.9rem;
		transition: background 0.15s, color 0.15s, border-color 0.15s;
	}

	.filter-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
	.filter-btn.active { background: rgba(246,139,31,0.18); border-color: rgba(246,139,31,0.5); color: #f68b1f; }

	.filter-count {
		background: rgba(255,255,255,0.12);
		border-radius: 50px;
		padding: 0 0.4rem;
		font-size: 0.75rem;
	}

	/* ── Booking cards ── */
	.booking-list { display: flex; flex-direction: column; gap: 1rem; }

	.booking-card {
		background: #252525;
		border-radius: 12px; padding: 1.25rem 1.5rem;
		border: 1px solid rgba(255,255,255,0.07);
		border-left: 3px solid transparent;
	}

	.booking-card.status-pending { border-left-color: #f68b1f; }
	.booking-card.status-approved { border-left-color: #3ecf8e; }
	.booking-card.status-declined { border-left-color: #666; opacity: 0.75; }

	.booking-header {
		display: flex; align-items: center;
		justify-content: space-between; gap: 1rem;
		margin-bottom: 0.9rem;
	}

	.booking-who { display: flex; align-items: center; gap: 0.75rem; }

	.avatar {
		width: 40px; height: 40px; border-radius: 50%;
		background: rgba(246,139,31,0.18); color: #f68b1f;
		font-weight: 800; font-size: 0.875rem;
		display: flex; align-items: center; justify-content: center; flex-shrink: 0;
		text-transform: uppercase;
	}

	.booking-name { font-weight: 700; font-size: 0.95rem; }
	.booking-dog { font-size: 0.8rem; color: #888; margin-top: 0.1rem; }

	.status-pill {
		font-size: 0.75rem; font-weight: 700;
		padding: 0.25rem 0.7rem; border-radius: 50px;
		flex-shrink: 0; text-transform: capitalize;
	}
	.status-pill.status-pending { background: rgba(246,139,31,0.2); color: #f68b1f; }
	.status-pill.status-approved { background: rgba(62,207,142,0.2); color: #3ecf8e; }
	.status-pill.status-declined { background: rgba(255,255,255,0.08); color: #666; }

	.booking-meta {
		display: flex; flex-wrap: wrap; gap: 0.5rem 1.25rem;
		margin-bottom: 0.75rem;
	}

	.meta-item {
		display: flex; align-items: center; gap: 0.35rem;
		font-size: 0.825rem; color: #bbb;
	}

	.booking-contact {
		display: flex; gap: 1rem; flex-wrap: wrap;
		margin-bottom: 0.75rem;
	}

	.contact-link {
		font-size: 0.825rem; color: #f68b1f;
		text-decoration: none;
	}
	.contact-link:hover { text-decoration: underline; }

	.booking-notes {
		font-size: 0.875rem; color: #aaa;
		border-left: 2px solid rgba(246,139,31,0.35);
		padding-left: 0.75rem; margin-bottom: 0.75rem;
		font-style: italic;
	}

	.booking-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.75rem; }

	.action-btn {
		font-size: 0.825rem; font-weight: 700; font-family: inherit;
		border: none; border-radius: 7px; cursor: pointer;
		padding: 0.45rem 1rem; transition: opacity 0.15s, transform 0.1s;
	}
	.action-btn:disabled { opacity: 0.5; cursor: not-allowed; }
	.action-btn:not(:disabled):hover { opacity: 0.85; }
	.action-btn:not(:disabled):active { transform: scale(0.97); }

	.action-btn.approve { background: #3ecf8e; color: #111; }
	.action-btn.decline { background: rgba(255,255,255,0.1); color: #fff; }
	.action-btn.delete { background: rgba(255,80,80,0.15); color: #ff6b6b; }

	/* ── Empty state ── */
	.empty-state {
		display: flex; flex-direction: column; align-items: center;
		gap: 0.75rem; padding: 4rem 1rem; color: #555; text-align: center;
	}

	/* ── Availability ── */
	.avail-grid {
		display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;
		margin-bottom: 1.5rem;
	}

	@media (max-width: 700px) { .avail-grid { grid-template-columns: 1fr; } }

	.avail-section {
		background: #252525;
		border: 1px solid rgba(255,255,255,0.07);
		border-radius: 12px; padding: 1.5rem;
	}

	.avail-heading {
		font-size: 1rem; font-weight: 700;
		margin-bottom: 1rem; color: #fff;
	}

	.avail-sub { font-size: 0.825rem; color: #888; margin-bottom: 1rem; line-height: 1.5; }

	.day-list { display: flex; flex-direction: column; gap: 0.6rem; }

	.day-row {
		display: flex; align-items: center; gap: 1rem;
		padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);
	}
	.day-row:last-child { border-bottom: none; }
	.day-row.day-closed { opacity: 0.6; }

	.day-toggle {
		display: flex; align-items: center; gap: 0.6rem;
		cursor: pointer; flex-shrink: 0; user-select: none;
	}

	.day-toggle input[type="checkbox"] { display: none; }

	.toggle-track {
		width: 36px; height: 20px; background: rgba(255,255,255,0.12);
		border-radius: 50px; position: relative;
		transition: background 0.2s;
		flex-shrink: 0;
	}

	.day-toggle input:checked + .toggle-track { background: #f68b1f; }

	.toggle-thumb {
		width: 14px; height: 14px; background: #fff;
		border-radius: 50%; position: absolute; top: 3px; left: 3px;
		transition: transform 0.2s;
	}

	.day-toggle input:checked + .toggle-track .toggle-thumb { transform: translateX(16px); }

	.day-name { font-size: 0.875rem; font-weight: 600; color: #ddd; width: 80px; }

	.time-range { display: flex; align-items: center; gap: 0.4rem; margin-left: auto; }

	.time-sep { font-size: 0.75rem; color: #666; }

	.time-input {
		background: rgba(255,255,255,0.07);
		border: 1px solid rgba(255,255,255,0.12);
		border-radius: 6px; color: #fff;
		font-size: 0.8rem; padding: 0.3rem 0.5rem;
		font-family: inherit; cursor: pointer;
		color-scheme: dark;
	}
	.time-input:focus { outline: none; border-color: #f68b1f; }

	.closed-label { font-size: 0.8rem; color: #555; margin-left: auto; font-style: italic; }

	/* Blocked dates */
	.blocked-add { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }

	.date-input {
		background: rgba(255,255,255,0.07);
		border: 1px solid rgba(255,255,255,0.12);
		border-radius: 8px; color: #fff;
		font-size: 0.875rem; padding: 0.5rem 0.75rem;
		font-family: inherit; cursor: pointer; flex: 1; min-width: 140px;
		color-scheme: dark;
	}
	.date-input:focus { outline: none; border-color: #f68b1f; }

	.add-date-btn {
		background: #f68b1f; color: #fff;
		border: none; border-radius: 8px;
		font-size: 0.875rem; font-weight: 700; font-family: inherit;
		cursor: pointer; padding: 0.5rem 1rem;
		transition: opacity 0.15s;
	}
	.add-date-btn:disabled { opacity: 0.4; cursor: not-allowed; }
	.add-date-btn:not(:disabled):hover { opacity: 0.85; }

	.no-blocked { font-size: 0.825rem; color: #555; font-style: italic; }

	.blocked-list { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }

	.blocked-item {
		display: flex; align-items: center; justify-content: space-between;
		background: rgba(255,255,255,0.04);
		border-radius: 7px; padding: 0.5rem 0.75rem;
		font-size: 0.85rem; color: #ccc;
	}

	.remove-btn {
		background: none; border: none; color: #666;
		cursor: pointer; font-size: 0.875rem; padding: 0.1rem 0.3rem;
		border-radius: 4px; transition: color 0.15s, background 0.15s;
	}
	.remove-btn:hover { color: #ff6b6b; background: rgba(255,80,80,0.1); }

	/* Save row */
	.save-row {
		display: flex; align-items: center; gap: 1rem;
		padding-top: 0.5rem;
	}

	.save-btn {
		background: #f68b1f; color: #fff;
		border: none; border-radius: 9px;
		font-size: 0.9rem; font-weight: 700; font-family: inherit;
		cursor: pointer; padding: 0.7rem 1.75rem;
		transition: opacity 0.15s;
	}
	.save-btn:disabled { opacity: 0.5; cursor: not-allowed; }
	.save-btn:not(:disabled):hover { opacity: 0.85; }

	.save-success { font-size: 0.875rem; color: #3ecf8e; font-weight: 600; }
	.save-error { font-size: 0.875rem; color: #ff6b6b; }

	/* ── Contact cards ── */
	.cards { display: flex; flex-direction: column; gap: 1rem; max-width: 720px; }

	.contact-card {
		background: #252525; border-radius: 12px;
		padding: 1.25rem 1.5rem;
		border: 1px solid rgba(255,255,255,0.07);
	}

	.card-top {
		display: flex; align-items: center; gap: 0.9rem;
		margin-bottom: 0.9rem;
	}

	.date-label { margin-left: auto; font-size: 0.8rem; color: #666; white-space: nowrap; }

	.message {
		font-size: 0.9rem; color: #ccc; line-height: 1.55;
		border-left: 3px solid rgba(246,139,31,0.4); padding-left: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.contact-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }

	.contact-card.unread { border-left: 3px solid #3ecf8e; }

	.unread-dot { color: #3ecf8e; font-size: 0.6rem; margin-left: 0.35rem; vertical-align: middle; }

	/* ── Mobile ── */
	@media (max-width: 640px) {
		.sidebar { display: none; }
		.main { padding: 1rem 0.875rem 5rem; }
		.mobile-nav { display: flex; }
		.avail-grid { grid-template-columns: 1fr; }
		.day-row { flex-wrap: wrap; gap: 0.5rem; }
		.time-range { margin-left: 0; width: 100%; }
		.booking-meta { gap: 0.4rem 0.75rem; }
		.booking-actions { flex-wrap: wrap; }
		.section-header h1 { font-size: 1.25rem; }
		.filter-row { gap: 0.35rem; }
		.filter-btn { font-size: 0.75rem; padding: 0.4rem 0.65rem; }
		.blocked-add { flex-direction: column; }
		.date-input { min-width: unset; width: 100%; }
	}

	.mobile-nav {
		display: none;
		position: fixed;
		bottom: 0; left: 0; right: 0;
		background: #222;
		border-top: 1px solid rgba(255,255,255,0.1);
		z-index: 200;
		padding: 0.5rem 0 0.75rem;
	}

	:global(.mobile-nav button) {
		flex: 1;
		display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
		background: none; border: none; color: #888;
		font-size: 0.65rem; font-weight: 700; font-family: inherit;
		cursor: pointer; padding: 0.4rem 0;
		transition: color 0.15s;
		position: relative;
	}

	:global(.mobile-nav button.active) { color: #f68b1f; }

	:global(.mobile-nav svg) { flex-shrink: 0; }

	.mob-badge {
		position: absolute; top: 0; right: calc(50% - 18px);
		background: #f68b1f; color: #fff;
		font-size: 0.6rem; font-weight: 800;
		padding: 0.05rem 0.35rem; border-radius: 50px;
	}
</style>