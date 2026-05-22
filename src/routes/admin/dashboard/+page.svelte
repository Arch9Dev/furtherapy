<script lang="ts">
	import { goto } from '$app/navigation';

	let activeTab: 'contacts' | 'bookings' = 'contacts';

	// Placeholder contact submissions — in a real setup these would come
	// from your database or API. Wire up to /api/contact data as needed.
	const contacts = [
		{
			id: 1,
			name: 'Sarah Mitchell',
			email: 'sarah@example.com',
			message: 'Hi! My golden retriever has been limping after walks — would massage help?',
			date: '2025-05-20'
		},
		{
			id: 2,
			name: 'James Teo',
			email: 'james.teo@example.com',
			message: 'Interested in the 5-session prepaid package. Can you travel to Remuera?',
			date: '2025-05-19'
		},
		{
			id: 3,
			name: 'Priya Nair',
			email: 'priya.n@example.com',
			message:
				'My 10-year-old lab has arthritis. Would love to find out more about initial assessment.',
			date: '2025-05-17'
		}
	];

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
			<button class:active={activeTab === 'contacts'} on:click={() => (activeTab = 'contacts')}>
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
					><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg
				>
				Contact Submissions
			</button>

			<button class:active={activeTab === 'bookings'} on:click={() => (activeTab = 'bookings')}>
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
					><rect x="3" y="4" width="18" height="18" rx="2" /><line
						x1="16"
						y1="2"
						x2="16"
						y2="6"
					/><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg
				>
				Bookings
			</button>
		</nav>

		<button class="logout" on:click={logout}>
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				aria-hidden="true"
				><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline
					points="16 17 21 12 16 7"
				/><line x1="21" y1="12" x2="9" y2="12" /></svg
			>
			Log out
		</button>
	</aside>

	<!-- Main content -->
	<main class="main">
		{#if activeTab === 'contacts'}
			<div class="section-header">
				<h1>Contact Submissions</h1>
				<span class="badge">{contacts.length}</span>
			</div>
			<p class="section-note">
				Messages sent via the contact form on your website. Connect these to your database or email
				inbox as your backend develops.
			</p>

			<div class="cards">
				{#each contacts as c}
					<div class="contact-card">
						<div class="card-top">
							<div class="avatar">
								{c.name
									.split(' ')
									.map((n) => n[0])
									.join('')}
							</div>
							<div>
								<p class="name">{c.name}</p>
								<a href="mailto:{c.email}" class="email">{c.email}</a>
							</div>
							<span class="date">{c.date}</span>
						</div>
						<p class="message">"{c.message}"</p>
					</div>
				{/each}
			</div>
		{:else}
			<div class="section-header">
				<h1>Bookings</h1>
			</div>

			<div class="placeholder">
				<svg
					width="48"
					height="48"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#f68b1f"
					stroke-width="1.5"
					aria-hidden="true"
					><rect x="3" y="4" width="18" height="18" rx="2" /><line
						x1="16"
						y1="2"
						x2="16"
						y2="6"
					/><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg
				>
				<h2>Booking management coming soon</h2>
				<p>
					Once you have a booking system in place — whether that's Calendly, Acuity, or something
					built into the site — this panel will display upcoming appointments, client details, and
					session history.
				</p>
			</div>
		{/if}
	</main>
</div>

<style>
	:global(body) {
		font-family: system-ui, 'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif;
		background: #1f1f1f;
		color: #ffffff;
		line-height: 1.65;
		margin: 0;
		padding: 0;
	}

	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	.page {
		display: flex;
		min-height: 100vh;
		background: #1f1f1f;
		font-family: system-ui, sans-serif;
		color: #fff;
	}

	/* ---- Sidebar ---- */
	.sidebar {
		width: 240px;
		background: #2a2a2a;
		display: flex;
		flex-direction: column;
		padding: 1.75rem 1.25rem;
		flex-shrink: 0;
		border-right: 1px solid rgba(255, 255, 255, 0.08);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 2rem;
	}

	.logo-mark {
		width: 38px;
		height: 38px;
		background: #f68b1f;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 900;
		font-size: 0.9rem;
		color: #fff;
		flex-shrink: 0;
	}

	.brand span {
		font-weight: 800;
		font-size: 1rem;
		color: #fff;
	}

	.nav {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 1;
	}

	.nav button {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		background: none;
		border: none;
		color: #aaa;
		font-size: 0.9rem;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		padding: 0.65rem 0.75rem;
		border-radius: 8px;
		text-align: left;
		transition:
			background 0.15s,
			color 0.15s;
	}

	.nav button:hover {
		background: rgba(255, 255, 255, 0.06);
		color: #fff;
	}
	.nav button.active {
		background: rgba(246, 139, 31, 0.15);
		color: #f68b1f;
	}

	.logout {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: none;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 8px;
		color: #aaa;
		font-size: 0.875rem;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		padding: 0.6rem 0.75rem;
		transition:
			border-color 0.15s,
			color 0.15s;
	}

	.logout:hover {
		border-color: rgba(255, 255, 255, 0.3);
		color: #fff;
	}

	/* ---- Main ---- */
	.main {
		flex: 1;
		padding: 2.5rem 2rem;
		overflow-y: auto;
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.5rem;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 800;
	}

	.badge {
		background: #f68b1f;
		color: #fff;
		font-size: 0.8rem;
		font-weight: 800;
		padding: 0.15rem 0.6rem;
		border-radius: 50px;
	}

	.section-note {
		color: #888;
		font-size: 0.875rem;
		margin-bottom: 1.75rem;
		max-width: 580px;
	}

	/* ---- Contact cards ---- */
	.cards {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 720px;
	}

	.contact-card {
		background: #2a2a2a;
		border-radius: 12px;
		padding: 1.25rem 1.5rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.card-top {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		margin-bottom: 0.9rem;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(246, 139, 31, 0.18);
		color: #f68b1f;
		font-weight: 800;
		font-size: 0.875rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.name {
		font-weight: 700;
		font-size: 0.95rem;
	}

	.email {
		font-size: 0.825rem;
		color: #f68b1f;
		text-decoration: none;
	}
	.email:hover {
		text-decoration: underline;
	}

	.date {
		margin-left: auto;
		font-size: 0.8rem;
		color: #666;
		white-space: nowrap;
	}

	.message {
		font-size: 0.9rem;
		color: #ccc;
		line-height: 1.55;
		padding-left: 0.25rem;
		border-left: 3px solid rgba(246, 139, 31, 0.4);
		padding-left: 0.75rem;
	}

	/* ---- Bookings placeholder ---- */
	.placeholder {
		max-width: 480px;
		margin: 4rem auto;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.placeholder h2 {
		font-size: 1.2rem;
		font-weight: 800;
		color: #fff;
	}

	.placeholder p {
		font-size: 0.9rem;
		color: #888;
		line-height: 1.6;
	}

	/* ---- Mobile ---- */
	@media (max-width: 640px) {
		.sidebar {
			display: none;
		}
		.main {
			padding: 1.5rem 1rem;
		}
	}
</style>
