<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { formatTime, SERVICE_LABELS } from '$lib/bookingHelpers';

	// ── Nav ──────────────────────────────────────────────────────────
	const navLinks = [
		{ name: 'Home', route: '/' },
		{ name: 'About', route: '/about' },
		{ name: 'Services', route: '/services' },
		{ name: 'Education', route: '/education' },
		{ name: 'Contact', route: '/contact' }
	];
	$: currentRoute = $page.url.pathname;
	let menuOpen = false;
	function navigateTo(route: string) { menuOpen = false; goto(route); }
	function toggleMenu() { menuOpen = !menuOpen; }

	// ── Step state ───────────────────────────────────────────────────
	let step = 1; // 1=service, 2=customer type, 3=details, 4=date, 5=time, 6=confirm, 7=done

	// ── Form data ────────────────────────────────────────────────────
	let service = '';
	let customerType = '';
	let name = '';
	let email = '';
	let phone = '';
	let dogName = '';
	let selectedDate = '';
	let selectedTime = '';

	// ── Calendar state ───────────────────────────────────────────────
	let calYear = new Date().getFullYear();
	let calMonth = new Date().getMonth() + 1;
	let availableDates: string[] = [];
	let slots: Record<string, string[]> = {};
	let calLoading = false;

	async function loadCalendar() {
		if (!service) return;
		calLoading = true;
		const res = await fetch(`/api/bookings?year=${calYear}&month=${calMonth}&service=${service}`);
		const data = await res.json();
		availableDates = data.availableDates;
		slots = data.slots;
		calLoading = false;
	}

	function prevMonth() {
		if (calMonth === 1) { calMonth = 12; calYear--; } else calMonth--;
		selectedDate = '';
		selectedTime = '';
		loadCalendar();
	}
	function nextMonth() {
		if (calMonth === 12) { calMonth = 1; calYear++; } else calMonth++;
		selectedDate = '';
		selectedTime = '';
		loadCalendar();
	}

	function buildCalendar(year: number, month: number) {
		const firstDay = new Date(year, month - 1, 1).getDay();
		const days = new Date(year, month, 0).getDate();
		const cells: (number | null)[] = Array(firstDay).fill(null);
		for (let d = 1; d <= days; d++) cells.push(d);
		while (cells.length % 7 !== 0) cells.push(null);
		return cells;
	}

	$: calCells = buildCalendar(calYear, calMonth);

	function dateStr(d: number) {
		return `${calYear}-${calMonth.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
	}

	function isAvailable(d: number | null) {
		if (!d) return false;
		const today = new Date(); today.setHours(0,0,0,0);
		const cellDate = new Date(calYear, calMonth - 1, d);
		if (cellDate < today) return false;
		return availableDates.includes(dateStr(d));
	}

	function selectDate(d: number | null) {
		if (!isAvailable(d)) return;
		selectedDate = dateStr(d!);
		selectedTime = '';
		step = 5;
	}

	// ── Submission ───────────────────────────────────────────────────
	let submitting = false;
	let submitError = '';

	async function submitBooking() {
		submitting = true;
		submitError = '';
		const res = await fetch('/api/bookings', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				customer_type: customerType,
				service,
				name,
				email: customerType === 'new' ? email : undefined,
				phone: customerType === 'new' ? phone : undefined,
				dog_name: dogName,
				date: selectedDate,
				time: selectedTime
			})
		});
		const data = await res.json();
		if (res.ok) {
			step = 7;
		} else {
			submitError = data.error ?? 'Something went wrong. Please try again.';
		}
		submitting = false;
	}

	const MONTHS = ['January','February','March','April','May','June',
	                'July','August','September','October','November','December'];
	const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

	function formatDateDisplay(d: string) {
		if (!d) return '';
		const [y, m, day] = d.split('-').map(Number);
		const names = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		const dow = new Date(y, m - 1, day).getDay();
		return `${names[dow]} ${day} ${MONTHS[m - 1]} ${y}`;
	}

	function goToStep(s: number) { step = s; }
</script>

<svelte:head>
	<title>Book an Appointment | Fur Therapy</title>
</svelte:head>

<!-- NAV BAR -->
<header class="navbar">
	<div class="nav-container">
		<div class="brand desktop-brand">
			<a href="/" on:click|preventDefault={() => navigateTo('/')}>
				<img src="logo_white.png" alt="Fur Therapy Logo" />
			</a>
		</div>
		<div class="brand mobile-brand">
			<a href="/" on:click|preventDefault={() => navigateTo('/')} aria-label="Fur Therapy home">
				<div class="logo-placeholder" aria-hidden="true">FT</div>
			</a>
		</div>
		<nav class="nav-links" aria-label="Primary navigation">
			{#each navLinks as link}
				<button class:active={link.route === currentRoute} on:click={() => navigateTo(link.route)}>
					{link.name}
				</button>
			{/each}
		</nav>
		<button class="hamburger" on:click={toggleMenu}
			aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
			<span class="bar" class:open={menuOpen}></span>
			<span class="bar" class:open={menuOpen}></span>
			<span class="bar" class:open={menuOpen}></span>
		</button>
	</div>
	{#if menuOpen}
		<div class="mobile-overlay" on:click={() => (menuOpen = false)} role="presentation"></div>
		<nav class="mobile-menu" aria-label="Mobile navigation">
			{#each navLinks as link}
				<button class:active={link.route === currentRoute} on:click={() => navigateTo(link.route)}>
					{link.name}
				</button>
			{/each}
		</nav>
	{/if}
</header>

<!-- HERO -->
<section class="hero">
	<div class="hero-inner">
		<h1 class="title">Book an Appointment</h1>
		<p class="subtitle">Canine massage & bodywork, Mission Bay Auckland</p>
	</div>
</section>

<!-- BOOKING WIZARD -->
<section class="wizard-section">
	<div class="wizard-container">

		<!-- Progress bar -->
		{#if step < 7}
		<div class="progress-bar" aria-label="Booking progress">
			{#each [1,2,3,4,5,6] as s}
				<div class="progress-step" class:done={step > s} class:active={step === s}>
					<div class="step-dot">{step > s ? '✓' : s}</div>
					<span class="step-label">
						{['Service','Customer','Details','Date','Time','Confirm'][s-1]}
					</span>
				</div>
				{#if s < 6}<div class="progress-line" class:done={step > s}></div>{/if}
			{/each}
		</div>
		{/if}

		<!-- STEP 1: Service selection -->
		{#if step === 1}
		<div class="step-card">
			<h2>Select a service</h2>
			<div class="service-cards">
				<button class="service-card" class:selected={service === 'first_visit'}
					on:click={() => { service = 'first_visit'; step = 2; }}>
					<div class="service-icon">🐾</div>
					<div class="service-name">First Visit</div>
					<div class="service-detail">Initial assessment · 60 minutes</div>
					<div class="service-price">$150</div>
				</button>
				<button class="service-card" class:selected={service === 'return_visit'}
					on:click={() => { service = 'return_visit'; step = 2; }}>
					<div class="service-icon">💆</div>
					<div class="service-name">Return Visit</div>
					<div class="service-detail">Follow-up session · 45 minutes</div>
					<div class="service-price">$130</div>
				</button>
			</div>
		</div>

		<!-- STEP 2: New or returning -->
		{:else if step === 2}
		<div class="step-card">
			<h2>Are you a new or returning client?</h2>
			<div class="type-cards">
				<button class="type-card" on:click={() => { customerType = 'new'; step = 3; }}>
					<div class="type-icon">✨</div>
					<div class="type-name">New client</div>
					<div class="type-detail">First time with Fur Therapy</div>
				</button>
				<button class="type-card" on:click={() => { customerType = 'returning'; step = 3; }}>
					<div class="type-icon">👋</div>
					<div class="type-name">Returning client</div>
					<div class="type-detail">We've worked together before</div>
				</button>
			</div>
			<button class="back-btn" on:click={() => step = 1}>← Back</button>
		</div>

		<!-- STEP 3: Details form -->
		{:else if step === 3}
		<div class="step-card">
			<h2>Your details</h2>

			<div class="form-grid">
				<div class="form-field">
					<label for="name">Your name *</label>
					<input id="name" type="text" bind:value={name} placeholder="Full name" autocomplete="name" />
				</div>

				<div class="form-field">
					<label for="dog">Dog's name *</label>
					<input id="dog" type="text" bind:value={dogName} placeholder="Dog's name" />
				</div>

				{#if customerType === 'new'}
				<div class="form-field">
					<label for="email">Email address *</label>
					<input id="email" type="email" bind:value={email} placeholder="your@email.com" autocomplete="email" />
				</div>

				<div class="form-field">
					<label for="phone">Phone number *</label>
					<input id="phone" type="tel" bind:value={phone} placeholder="021 000 0000" autocomplete="tel" />
				</div>
				{/if}
			</div>

			<div class="step-actions">
				<button class="back-btn" on:click={() => step = 2}>← Back</button>
				<button class="btn-primary"
					disabled={!name || !dogName || (customerType === 'new' && (!email || !phone))}
					on:click={() => { step = 4; loadCalendar(); }}>
					Choose a date →
				</button>
			</div>
		</div>

		<!-- STEP 4: Calendar -->
		{:else if step === 4}
		<div class="step-card">
			<h2>Pick a date</h2>

			<div class="cal-header">
				<button class="cal-nav" on:click={prevMonth} aria-label="Previous month">‹</button>
				<span class="cal-month">{MONTHS[calMonth - 1]} {calYear}</span>
				<button class="cal-nav" on:click={nextMonth} aria-label="Next month">›</button>
			</div>

			{#if calLoading}
				<div class="cal-loading">Loading availability…</div>
			{:else}
				<div class="calendar" role="grid" aria-label="Booking calendar">
					{#each DAYS as d}
						<div class="cal-dow" role="columnheader">{d}</div>
					{/each}
					{#each calCells as cell}
						<button
							class="cal-cell"
							class:available={isAvailable(cell)}
							class:unavailable={cell && !isAvailable(cell)}
							class:empty={!cell}
							class:selected={cell && dateStr(cell) === selectedDate}
							disabled={!isAvailable(cell)}
							on:click={() => selectDate(cell)}
							aria-label={cell ? `${cell} ${MONTHS[calMonth-1]}${isAvailable(cell) ? ', available' : ', unavailable'}` : undefined}
						>
							{cell ?? ''}
						</button>
					{/each}
				</div>

				<div class="cal-legend">
					<span class="legend-dot available"></span> Available
					<span class="legend-dot unavailable"></span> Unavailable
				</div>
			{/if}

			<button class="back-btn" on:click={() => step = 3}>← Back</button>
		</div>

		<!-- STEP 5: Time slots -->
		{:else if step === 5}
		<div class="step-card">
			<h2>Pick a time</h2>
			<p class="step-sub">{formatDateDisplay(selectedDate)}</p>

			{#if slots[selectedDate]?.length}
				<div class="time-grid">
					{#each slots[selectedDate] as t}
						<button class="time-slot" class:selected={selectedTime === t}
							on:click={() => selectedTime = t}>
							{formatTime(t)}
						</button>
					{/each}
				</div>
			{:else}
				<p class="no-slots">No times available for this date.</p>
			{/if}

			<div class="step-actions">
				<button class="back-btn" on:click={() => { step = 4; selectedDate = ''; selectedTime = ''; }}>← Back</button>
				<button class="btn-primary" disabled={!selectedTime} on:click={() => step = 6}>
					Review booking →
				</button>
			</div>
		</div>

		<!-- STEP 6: Confirm -->
		{:else if step === 6}
		<div class="step-card">
			<h2>Confirm your booking</h2>
			<p class="step-sub">Please review your details before submitting.</p>

			<div class="summary-table">
				<div class="summary-row"><span>Service</span><span>{SERVICE_LABELS[service]}</span></div>
				<div class="summary-row"><span>Date</span><span>{formatDateDisplay(selectedDate)}</span></div>
				<div class="summary-row"><span>Time</span><span>{formatTime(selectedTime)}</span></div>
				<div class="summary-row"><span>Name</span><span>{name}</span></div>
				<div class="summary-row"><span>Dog</span><span>{dogName}</span></div>
				{#if customerType === 'new'}
				<div class="summary-row"><span>Email</span><span>{email}</span></div>
				<div class="summary-row"><span>Phone</span><span>{phone}</span></div>
				{/if}
				<div class="summary-row"><span>Client type</span>
					<span>{customerType === 'new' ? 'New client' : 'Returning client'}</span>
				</div>
			</div>

			<p class="pending-note">
				⏳ Your booking will be <strong>pending approval</strong>. You'll be contacted once it's confirmed.
			</p>

			{#if submitError}
				<div class="error-msg">{submitError}</div>
			{/if}

			<div class="step-actions">
				<button class="back-btn" on:click={() => step = 5}>← Back</button>
				<button class="btn-primary" on:click={submitBooking} disabled={submitting} aria-busy={submitting}>
					{submitting ? 'Submitting…' : 'Submit booking request'}
				</button>
			</div>
		</div>

		<!-- STEP 7: Done -->
		{:else if step === 7}
		<div class="step-card done-card">
			<div class="done-icon">🐾</div>
			<h2>Booking request sent!</h2>
			<p>Thanks, <strong>{name}</strong>! Your request for <strong>{dogName}</strong> on <strong>{formatDateDisplay(selectedDate)}</strong> at <strong>{formatTime(selectedTime)}</strong> has been received.</p>
			<p class="done-sub">We'll be in touch soon to confirm your appointment.</p>
			<button class="btn-primary" on:click={() => goto('/')}>Back to home</button>
		</div>
		{/if}

	</div>
</section>

<style global>
	* { box-sizing: border-box; margin: 0; padding: 0; }

	:global(body) {
		font-family: system-ui, 'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif;
		background: #1f1f1f; color: #fff; line-height: 1.65;
	}

	/* ── Navbar ── */
	.navbar {
		background: #f68b1f; height: 80px; display: flex;
		flex-direction: column; position: sticky; top: 0; z-index: 100;
	}
	.nav-container {
		width: 100%; height: 80px; padding: 0 2rem;
		display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;
	}
	.desktop-brand img { height: 45px; }
	.mobile-brand { display: none; }
	.logo-placeholder {
		width: 38px; height: 38px; background: rgba(255,255,255,0.25);
		border-radius: 8px; display: flex; align-items: center; justify-content: center;
		font-weight: 900; font-size: 1rem; color: #fff;
	}
	.nav-links { display: flex; align-items: center; }
	.nav-links button {
		color: #fff; background: none; border: none; cursor: pointer;
		font-weight: 800; font-size: 1.1rem; margin-left: 1.5rem; font-family: inherit;
	}
	.nav-links button:hover { text-decoration: underline; }
	.nav-links button.active { color: #1f1f1f; }
	.hamburger {
		display: none; flex-direction: column; justify-content: center;
		align-items: center; gap: 5px; background: none; border: none; cursor: pointer;
		padding: 6px; border-radius: 6px; width: 44px; height: 44px;
	}
	.bar {
		display: block; width: 24px; height: 2.5px; background: #fff;
		border-radius: 2px; transition: transform 0.25s, opacity 0.25s;
	}
	.mobile-overlay { display: none; }
	.mobile-menu { display: none; }

	/* ── Hero ── */
	.hero { height: 220px; display: flex; align-items: center; background: #2a2a2a; }
	.hero-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
	.title { font-size: 2.5rem; font-weight: 800; }
	.subtitle { font-size: 1.2rem; margin-top: 0.75rem; font-weight: 300; color: #ccc; }

	/* ── Wizard section ── */
	.wizard-section { padding: 3rem 1.5rem 5rem; }
	.wizard-container { max-width: 760px; margin: 0 auto; }

	/* ── Progress bar ── */
	.progress-bar {
		display: flex; align-items: center; justify-content: center;
		margin-bottom: 2.5rem; flex-wrap: nowrap; overflow-x: auto;
		padding-bottom: 0.5rem;
	}
	.progress-step { display: flex; flex-direction: column; align-items: center; gap: 4px; }
	.step-dot {
		width: 32px; height: 32px; border-radius: 50%; background: #2a2a2a;
		border: 2px solid #444; display: flex; align-items: center; justify-content: center;
		font-size: 0.8rem; font-weight: 700; color: #888; transition: all 0.2s;
	}
	.progress-step.active .step-dot { background: #f68b1f; border-color: #f68b1f; color: #fff; }
	.progress-step.done .step-dot { background: #3a9e6e; border-color: #3a9e6e; color: #fff; }
	.step-label { font-size: 0.7rem; color: #666; white-space: nowrap; }
	.progress-step.active .step-label { color: #f68b1f; }
	.progress-step.done .step-label { color: #3a9e6e; }
	.progress-line { flex: 1; height: 2px; background: #333; min-width: 16px; margin: 0 4px; transition: background 0.2s; }
	.progress-line.done { background: #3a9e6e; }

	/* ── Step card ── */
	.step-card {
		background: #2a2a2a; border-radius: 16px; padding: 2rem 2rem 2.5rem;
		box-shadow: 0 10px 30px rgba(0,0,0,0.3);
	}
	.step-card h2 { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem; }
	.step-sub { color: #aaa; font-size: 0.95rem; margin-bottom: 1.5rem; }

	/* ── Service cards ── */
	.service-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; }
	.service-card {
		background: #1f1f1f; border: 2px solid #333; border-radius: 12px;
		padding: 1.5rem; cursor: pointer; text-align: left; color: #fff;
		font-family: inherit; transition: border-color 0.2s, background 0.2s;
	}
	.service-card:hover { border-color: #f68b1f; background: rgba(246,139,31,0.05); }
	.service-card.selected { border-color: #f68b1f; background: rgba(246,139,31,0.1); }
	.service-icon { font-size: 2rem; margin-bottom: 0.75rem; }
	.service-name { font-size: 1.1rem; font-weight: 800; }
	.service-detail { font-size: 0.85rem; color: #aaa; margin-top: 0.25rem; }
	.service-price { font-size: 1.3rem; font-weight: 800; color: #f68b1f; margin-top: 0.75rem; }

	/* ── Type cards ── */
	.type-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; margin-bottom: 1.5rem; }
	.type-card {
		background: #1f1f1f; border: 2px solid #333; border-radius: 12px;
		padding: 1.5rem; cursor: pointer; text-align: center; color: #fff;
		font-family: inherit; transition: border-color 0.2s, background 0.2s;
	}
	.type-card:hover { border-color: #f68b1f; background: rgba(246,139,31,0.05); }
	.type-icon { font-size: 2rem; margin-bottom: 0.5rem; }
	.type-name { font-size: 1rem; font-weight: 800; }
	.type-detail { font-size: 0.85rem; color: #aaa; margin-top: 0.25rem; }

	/* ── Form ── */
	.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.25rem; }
	.form-field { display: flex; flex-direction: column; gap: 0.4rem; }
	.form-field label { font-size: 0.85rem; font-weight: 700; color: #e0e0e0; letter-spacing: 0.04em; }
	.form-field input {
		background: #1f1f1f; border: 1px solid rgba(255,255,255,0.12);
		border-radius: 8px; padding: 0.75rem 1rem; color: #fff;
		font-size: 1rem; font-family: inherit; transition: border-color 0.2s;
	}
	.form-field input:focus { outline: none; border-color: #f68b1f; }

	/* ── Calendar ── */
	.cal-header {
		display: flex; align-items: center; justify-content: space-between;
		margin: 1.25rem 0 1rem;
	}
	.cal-month { font-size: 1.1rem; font-weight: 800; }
	.cal-nav {
		background: #1f1f1f; border: 1px solid #444; color: #fff; border-radius: 8px;
		width: 36px; height: 36px; font-size: 1.2rem; cursor: pointer; display: flex;
		align-items: center; justify-content: center;
	}
	.cal-nav:hover { border-color: #f68b1f; color: #f68b1f; }
	.cal-loading { text-align: center; color: #888; padding: 2rem 0; }

	.calendar {
		display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-bottom: 1rem;
	}
	.cal-dow {
		text-align: center; font-size: 0.75rem; font-weight: 700; color: #666;
		padding: 0.4rem 0;
	}
	.cal-cell {
		aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
		border-radius: 8px; font-size: 0.9rem; font-weight: 600;
		border: none; cursor: default; background: transparent; color: #555;
		transition: background 0.15s, color 0.15s;
	}
	.cal-cell.empty { background: transparent; }
	.cal-cell.available {
		background: rgba(58, 158, 110, 0.15); color: #5ecf9a; cursor: pointer;
		border: 1px solid rgba(58, 158, 110, 0.3);
	}
	.cal-cell.available:hover { background: rgba(58, 158, 110, 0.3); }
	.cal-cell.selected { background: #f68b1f !important; color: #fff !important; border-color: #f68b1f !important; }
	.cal-cell.unavailable { color: #3a3a3a; cursor: not-allowed; }

	.cal-legend { display: flex; gap: 1.25rem; font-size: 0.8rem; color: #888; margin-bottom: 1.25rem; align-items: center; }
	.legend-dot { width: 12px; height: 12px; border-radius: 3px; display: inline-block; margin-right: 4px; }
	.legend-dot.available { background: rgba(58,158,110,0.4); border: 1px solid rgba(58,158,110,0.6); }
	.legend-dot.unavailable { background: #2a2a2a; border: 1px solid #333; }

	/* ── Time slots ── */
	.time-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.6rem; margin: 1.25rem 0 1.5rem; }
	.time-slot {
		background: #1f1f1f; border: 1px solid #333; border-radius: 8px;
		padding: 0.65rem 0.5rem; text-align: center; color: #fff; font-family: inherit;
		font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.15s;
	}
	.time-slot:hover { border-color: #f68b1f; color: #f68b1f; }
	.time-slot.selected { background: #f68b1f; border-color: #f68b1f; color: #fff; }
	.no-slots { color: #888; font-size: 0.95rem; margin: 1rem 0; }

	/* ── Summary table ── */
	.summary-table { background: #1f1f1f; border-radius: 10px; overflow: hidden; margin: 1.25rem 0; }
	.summary-row {
		display: flex; justify-content: space-between; padding: 0.85rem 1.25rem;
		border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 0.95rem;
	}
	.summary-row:last-child { border-bottom: none; }
	.summary-row span:first-child { color: #888; }
	.summary-row span:last-child { font-weight: 600; text-align: right; }

	.pending-note {
		background: rgba(246,139,31,0.1); border: 1px solid rgba(246,139,31,0.25);
		border-radius: 8px; padding: 0.85rem 1.1rem; font-size: 0.9rem;
		color: #f0c080; margin-bottom: 1.5rem;
	}

	.error-msg {
		background: rgba(224,82,82,0.15); border: 1px solid rgba(224,82,82,0.4);
		color: #f08080; border-radius: 8px; padding: 0.75rem 1rem;
		font-size: 0.9rem; margin-bottom: 1rem;
	}

	/* ── Done card ── */
	.done-card { text-align: center; padding: 3rem 2rem; }
	.done-icon { font-size: 3rem; margin-bottom: 1rem; }
	.done-card h2 { font-size: 1.8rem; margin-bottom: 1rem; }
	.done-card p { color: #ccc; margin-bottom: 0.75rem; font-size: 1rem; }
	.done-sub { color: #888 !important; font-size: 0.9rem !important; margin-bottom: 2rem !important; }

	/* ── Shared ── */
	.step-actions { display: flex; align-items: center; justify-content: space-between; margin-top: 1.75rem; flex-wrap: wrap; gap: 0.75rem; }
	.back-btn {
		background: none; border: none; color: #888; font-size: 0.95rem;
		cursor: pointer; font-family: inherit; padding: 0.5rem 0;
	}
	.back-btn:hover { color: #fff; }
	.btn-primary {
		display: inline-block; padding: 0.85rem 2rem; background: #f68b1f;
		color: #fff; font-weight: 800; font-size: 1rem; border-radius: 50px;
		text-decoration: none; border: none; cursor: pointer; font-family: inherit;
		transition: opacity 0.2s, transform 0.2s;
	}
	.btn-primary:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
	.btn-primary:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

	/* ── Responsive ── */
	@media (max-width: 1024px) {
		.desktop-brand { display: none; }
		.mobile-brand { display: block; }
		.nav-links { display: none; }
		.hamburger { display: flex; }
		.mobile-menu {
			display: flex; flex-direction: column; background: #e07a18; width: 100%;
			padding: 0.5rem 0 1rem; position: absolute; top: 80px; left: 0; right: 0;
			z-index: 99; box-shadow: 0 8px 20px rgba(0,0,0,0.3);
		}
		.mobile-overlay { display: block; position: fixed; inset: 0; top: 80px; z-index: 98; }
		.mobile-menu button {
			background: none; border: none; color: #fff; font-weight: 800; font-size: 1.1rem;
			font-family: inherit; cursor: pointer; text-align: left;
			padding: 0.9rem 2rem; width: 100%; border-bottom: 1px solid rgba(255,255,255,0.12);
		}
		.mobile-menu button:last-child { border-bottom: none; }
		.mobile-menu button.active { color: #1f1f1f; }
	}

	@media (max-width: 640px) {
		.service-cards { grid-template-columns: 1fr; }
		.type-cards { grid-template-columns: 1fr; }
		.form-grid { grid-template-columns: 1fr; }
		.time-grid { grid-template-columns: repeat(3, 1fr); }
		.step-card { padding: 1.5rem 1.25rem 2rem; }
		.progress-bar { gap: 0; }
		.step-label { font-size: 0.6rem; }
		.title { font-size: 1.8rem; }
	}

	@media (max-width: 400px) {
		.time-grid { grid-template-columns: repeat(2, 1fr); }
	}
</style>