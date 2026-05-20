<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const navLinks = [
		{ name: 'Home', route: '/' },
		{ name: 'About', route: '/about' },
		{ name: 'Services', route: '/services' },
		{ name: 'Education', route: '/education' },
		{ name: 'Contact', route: '/contact' }
	];

	const slides = ['Image 1', 'Image 2', 'Image 3', 'Image 4', 'Image 5'];

	$: currentRoute = $page.url.pathname;

	function navigateTo(route: string) {
		menuOpen = false;
		goto(route);
	}

	let menuOpen = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	// Modal state
	let showModal = false;
	let modalMessage = '';
	let isError = false;

	async function handleSubmit(event: SubmitEvent) {
		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);

		try {
			const response = await fetch(form.action, {
				method: 'POST',
				body: formData,
				headers: { Accept: 'application/json' }
			});

			if (response.ok) {
				modalMessage = 'Thank you! Your message has been sent.';
				isError = false;
				form.reset();
			} else {
				modalMessage = 'Oops! Something went wrong. Please try again.';
				isError = true;
			}
		} catch {
			modalMessage = 'Network error. Please check your connection.';
			isError = true;
		}

		showModal = true;
	}
</script>

<!-- NAV BAR -->
<header class="navbar">
	<div class="nav-container">
		<!-- Desktop logo -->
		<div class="brand desktop-brand">
			<a href="/" on:click|preventDefault={() => navigateTo('/')}>
				<img src="logo_white.png" alt="Furtherapy Logo white" />
			</a>
		</div>

		<!-- Mobile logo (smaller placeholder) -->
		<div class="brand mobile-brand">
			<a href="/" on:click|preventDefault={() => navigateTo('/')}>
				<div class="logo-placeholder">FT</div>
			</a>
		</div>

		<!-- Desktop nav links -->
		<nav class="nav-links">
			{#each navLinks as link}
				<button class:active={link.route === currentRoute} on:click={() => navigateTo(link.route)}>
					{link.name}
				</button>
			{/each}
		</nav>

		<!-- Hamburger button (mobile/tablet only) -->
		<button
			class="hamburger"
			on:click={toggleMenu}
			aria-label="Toggle navigation menu"
			aria-expanded={menuOpen}
		>
			<span class="bar" class:open={menuOpen}></span>
			<span class="bar" class:open={menuOpen}></span>
			<span class="bar" class:open={menuOpen}></span>
		</button>
	</div>

	<!-- Mobile dropdown menu -->
	{#if menuOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<div class="mobile-overlay" on:click={() => (menuOpen = false)} role="presentation"></div>
		<nav class="mobile-menu" class:open={menuOpen}>
			{#each navLinks as link}
				<button class:active={link.route === currentRoute} on:click={() => navigateTo(link.route)}>
					{link.name}
				</button>
			{/each}
		</nav>
	{/if}
</header>

<!-- HERO -->
<section class="hero" id="home">
	<div class="hero-inner">
		<h1 class="title">Because your dog deserves to feel their best.</h1>
		<p class="subtitle">Canine massage and bodywork</p>
	</div>
</section>

<!-- IMAGE SLIDER SECTION -->
<section class="hero-image">
	<div class="slider">
		<div class="slide-track">
			{#each slides as text}
				<div class="slide">
					<div class="slide-content">{text}</div>
				</div>
			{/each}
			{#each slides as text}
				<div class="slide">
					<div class="slide-content">{text}</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- PRICING -->
<section class="pricing" id="services">
	<div class="pricing-inner">
		<h1 class="title">Pricing Guide</h1>

		<div class="pricing-table">
			<div class="pricing-header">
				<span>Service</span>
				<span>Duration</span>
				<span>Price</span>
			</div>

			<div class="pricing-row">
				<span class="row-label">Initial Assessment</span>
				<span><span class="mobile-label">Duration: </span>60 mins</span>
				<span><span class="mobile-label">Price: </span>$150</span>
			</div>
			<div class="pricing-description">
				Intake and case history, gait observation, <br /> trust-building and hands-on assessment (as appropriate).
			</div>

			<div class="pricing-row">
				<span class="row-label">Follow-up Appointment</span>
				<span><span class="mobile-label">Duration: </span>45 mins</span>
				<span><span class="mobile-label">Price: </span>$130</span>
			</div>
			<div class="pricing-description">
				Individualised therapeutic massage and bodywork session.
			</div>

			<div class="pricing-row highlight">
				<span class="row-label">Prepaid Special (5 Sessions)</span>
				<span><span class="mobile-label">Duration: </span>45 mins/session</span>
				<span class="price-discount">
					<span class="old-price">$650</span>
					<span class="new-price">$600</span>
				</span>
			</div>
			<div class="pricing-description">
				Pre-pay five follow-up sessions and receive a discounted package rate.
			</div>
		</div>
	</div>
</section>

<!-- TRAVEL -->
<section class="travel" id="travel">
	<div class="travel-inner">
		<h1 class="title">Travel Guide</h1>

		<p class="travel-description">
			Fur Therapy is based in <strong>Mission Bay, Auckland</strong>.
			Travel is complimentary within 10km of Mission Bay.
			For appointments outside this area, a travel fee applies to cover time and vehicle costs.
		</p>

		<div class="travel-table">
			<div class="travel-header">
				<span>Distance from Mission Bay</span>
				<span>Travel Fee</span>
				<span>Notes</span>
			</div>

			<div class="travel-row">
				<span class="row-label">0 – 10 km</span>
				<span><span class="mobile-label">Fee: </span>Complimentary</span>
				<span><span class="mobile-label">Notes: </span>Included with session</span>
			</div>

			<div class="travel-row">
				<span class="row-label">10 – 20 km</span>
				<span><span class="mobile-label">Fee: </span>$20</span>
				<span><span class="mobile-label">Notes: </span>Flat fee</span>
			</div>

			<div class="travel-row">
				<span class="row-label">20 – 30 km</span>
				<span><span class="mobile-label">Fee: </span>$35</span>
				<span><span class="mobile-label">Notes: </span>Flat fee</span>
			</div>

			<div class="travel-row">
				<span class="row-label">30 – 40 km</span>
				<span><span class="mobile-label">Fee: </span>$50</span>
				<span><span class="mobile-label">Notes: </span>Flat fee</span>
			</div>

			<div class="travel-row">
				<span class="row-label">Over 40 km</span>
				<span><span class="mobile-label">Fee: </span>$1.20/km</span>
				<span><span class="mobile-label">Notes: </span>Return trip rate</span>
			</div>
		</div>

		<p class="travel-note">
			Travel fees are confirmed prior to booking. If you're located further away,
			consider booking multiple dogs in one visit to share the travel cost.
		</p>
	</div>

	<div class="book-cta">
		<a href="/booking" on:click|preventDefault={() => navigateTo('/booking')} class="btn-primary">
			Book Now
		</a>
	</div>
</section>

<!-- MODAL -->
{#if showModal}
	<div class="modal-overlay" on:click={() => (showModal = false)} role="presentation">
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="modal" class:modal-error={isError} on:click|stopPropagation role="dialog" aria-modal="true">
			<p>{modalMessage}</p>
			<button class="modal-close" on:click={() => (showModal = false)}>Close</button>
		</div>
	</div>
{/if}

<style global>
	/* ----------------- RESET ----------------- */
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		font-family: system-ui, 'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif;
		background: #1f1f1f;
		color: #ffffff;
		line-height: 1.65;
		margin: 0;
		padding: 0;
	}

	/* ----------------- SHARED TYPOGRAPHY ----------------- */
	.title {
		font-size: 2.5rem;
		font-weight: 800;
		line-height: 1.2;
	}

	/* ----------------- NAVBAR ----------------- */
	.navbar {
		background: #f68b1f;
		height: 80px;
		display: flex;
		flex-direction: column;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.nav-container {
		width: 100%;
		height: 80px;
		padding: 0 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-shrink: 0;
	}

	/* Desktop logo */
	.desktop-brand img {
		height: 45px;
	}

	/* Mobile logo placeholder */
	.mobile-brand {
		display: none;
	}

	.logo-placeholder {
		width: 38px;
		height: 38px;
		background: rgba(255, 255, 255, 0.25);
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 900;
		font-size: 1rem;
		color: #fff;
		letter-spacing: 0.5px;
	}

	/* Desktop nav links */
	.nav-links {
		display: flex;
		align-items: center;
	}

	.nav-links button {
		color: #fff;
		background: none;
		border: none;
		cursor: pointer;
		font-weight: 800;
		font-size: 1.1rem;
		margin-left: 1.5rem;
		font-family: inherit;
	}

	.nav-links button:hover {
		text-decoration: underline;
	}

	.nav-links button.active {
		color: #1f1f1f;
	}

	/* ----------------- HAMBURGER BUTTON ----------------- */
	.hamburger {
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 6px;
		border-radius: 6px;
		width: 40px;
		height: 40px;
	}

	.hamburger:hover {
		background: rgba(255, 255, 255, 0.15);
	}

	.bar {
		display: block;
		width: 24px;
		height: 2.5px;
		background: #fff;
		border-radius: 2px;
		transition: transform 0.25s ease, opacity 0.25s ease;
		transform-origin: center;
	}

	/* Animate bars into an X when open */
	.hamburger[aria-expanded='true'] .bar:nth-child(1) {
		transform: translateY(7.5px) rotate(45deg);
	}

	.hamburger[aria-expanded='true'] .bar:nth-child(2) {
		opacity: 0;
		transform: scaleX(0);
	}

	.hamburger[aria-expanded='true'] .bar:nth-child(3) {
		transform: translateY(-7.5px) rotate(-45deg);
	}

	/* ----------------- MOBILE MENU ----------------- */
	.mobile-overlay {
		display: none;
	}

	.mobile-menu {
		display: none;
	}

	/* ----------------- HERO ----------------- */
	.hero {
		height: 350px;
		display: flex;
		align-items: center;
		background: #2a2a2a;
	}

	.hero-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.subtitle {
		font-size: 2rem;
		margin-top: 1rem;
		font-weight: 300;
	}

	/* ----------------- IMAGE SLIDER ----------------- */
	.hero-image {
		height: 340px;
		display: flex;
		align-items: center;
		overflow: hidden;
		background: #1f1f1f;
	}

	.slider {
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	.slide-track {
		display: flex;
		width: calc((320px + 2rem) * 10);
		animation: scroll 25s linear infinite;
	}

	.slide {
		width: 320px;
		height: 320px;
		flex-shrink: 0;
		margin-right: 2rem;
		border-radius: 16px;
		background: #2a2a2a;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.slide-content {
		color: #f68b1f;
		font-weight: 800;
		font-size: 1.2rem;
		text-align: center;
		padding: 1rem;
		letter-spacing: 1px;
	}

	@keyframes scroll {
		from { transform: translateX(0); }
		to { transform: translateX(calc((320px + 2rem) * -5)); }
	}

	/* ----------------- PRICING ----------------- */
	.pricing {
		padding: 5rem 2rem;
		background: #2a2a2a;
	}

	.pricing-inner {
		max-width: 1200px;
		margin: 0 auto;
	}

	.pricing-table {
		margin-top: 3rem;
		background: #2a2a2a;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	.pricing-header,
	.pricing-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		padding: 1.2rem 1.5rem;
		align-items: center;
	}

	.pricing-header {
		background: #f68b1f;
		font-weight: 800;
	}

	.pricing-row {
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.pricing-description {
		padding: 0 1.5rem 1.2rem;
		font-size: 0.95rem;
		color: #f68b1f;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.highlight {
		background: rgba(246, 139, 31, 0.08);
	}

	.price-discount {
		display: flex;
		gap: 0.6rem;
		align-items: center;
	}

	.old-price {
		text-decoration: line-through;
		color: #aaa;
	}

	.new-price {
		color: #f68b1f;
		font-weight: 800;
		font-size: 1.15rem;
	}

	/* Mobile labels hidden on desktop */
	.mobile-label {
		display: none;
	}

	/* ----------------- TRAVEL ----------------- */
	.travel {
		padding: 5rem 2rem;
		background: #1f1f1f;
	}

	.travel-inner {
		max-width: 1200px;
		margin: 0 auto;
	}

	.travel-description {
		margin-top: 1.5rem;
		font-size: 1.05rem;
		color: #e0e0e0;
		max-width: 700px;
	}

	.travel-table {
		margin-top: 2rem;
		background: #2a2a2a;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	.travel-header,
	.travel-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		padding: 1.2rem 1.5rem;
		align-items: center;
	}

	.travel-header {
		background: #f68b1f;
		font-weight: 800;
	}

	.travel-row {
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.travel-note {
		margin-top: 1.5rem;
		font-size: 0.95rem;
		color: #aaa;
		font-style: italic;
		max-width: 700px;
	}

	/* ----------------- BOOK CTA ----------------- */
	.book-cta {
		text-align: center;
		margin-top: 2.5rem;
	}

	.btn-primary {
		display: inline-block;
		padding: 0.9rem 2.2rem;
		background: #f68b1f;
		color: #fff;
		font-weight: 800;
		font-size: 1.1rem;
		border-radius: 50px;
		text-decoration: none;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(246, 139, 31, 0.4);
	}

	/* ----------------- MODAL ----------------- */
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.65);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 200;
	}

	.modal {
		background: #2a2a2a;
		border-radius: 12px;
		padding: 2rem 2.5rem;
		max-width: 420px;
		width: 90%;
		text-align: center;
		border-top: 4px solid #f68b1f;
	}

	.modal.modal-error {
		border-top-color: #e05252;
	}

	.modal p {
		font-size: 1.05rem;
		margin-bottom: 1.5rem;
	}

	.modal-close {
		background: #f68b1f;
		color: #fff;
		border: none;
		padding: 0.6rem 1.6rem;
		border-radius: 50px;
		font-weight: 800;
		cursor: pointer;
		font-size: 1rem;
		font-family: inherit;
	}

	.modal-close:hover {
		opacity: 0.85;
	}

	/* =================================================================
	   RESPONSIVE — three tiers
	   1. Tablet  : 768px – 1024px  (hamburger, adjusted type + layout)
	   2. Mobile  : 480px – 767px   (stacked tables, tighter type)
	   3. Small   : ≤ 479px         (compact slider, minimum padding)
	   ================================================================= */

	/* ---- TIER 1 : Tablet (≤ 1024px) ---- */
	@media (max-width: 1024px) {

		/* --- Logo swap --- */
		.desktop-brand { display: none; }
		.mobile-brand  { display: block; }

		/* --- Nav → hamburger --- */
		.nav-links  { display: none; }
		.hamburger  { display: flex; }

		/* --- Mobile dropdown --- */
		.mobile-menu {
			display: flex;
			flex-direction: column;
			background: #e07a18;
			width: 100%;
			padding: 0.5rem 0 1rem;
			position: absolute;
			top: 80px;
			left: 0;
			right: 0;
			z-index: 99;
			box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
			animation: slideDown 0.2s ease;
		}

		.mobile-overlay {
			display: block;
			position: fixed;
			inset: 0;
			top: 80px;
			z-index: 98;
			background: transparent;
		}

		@keyframes slideDown {
			from { opacity: 0; transform: translateY(-8px); }
			to   { opacity: 1; transform: translateY(0); }
		}

		.mobile-menu button {
			background: none;
			border: none;
			color: #fff;
			font-weight: 800;
			font-size: 1.1rem;
			font-family: inherit;
			cursor: pointer;
			text-align: left;
			/* 48px min touch target height */
			padding: 0.9rem 2rem;
			width: 100%;
			border-bottom: 1px solid rgba(255, 255, 255, 0.12);
		}

		.mobile-menu button:last-child { border-bottom: none; }
		.mobile-menu button:hover      { background: rgba(255, 255, 255, 0.1); }
		.mobile-menu button.active     { color: #1f1f1f; }

		/* --- Typography --- */
		.title    { font-size: 2rem; }
		.subtitle { font-size: 1.4rem; }

		/* --- Hero --- */
		.hero       { height: auto; padding: 3rem 1.5rem; }
		.hero-inner { padding: 0; }

		/* --- Slider : medium cards --- */
		.hero-image   { height: 280px; }
		.slide        { width: 240px; height: 240px; }
		.slide-track  { width: calc((240px + 1.5rem) * 10); animation-name: scroll-tablet; }

		@keyframes scroll-tablet {
			from { transform: translateX(0); }
			to   { transform: translateX(calc((240px + 1.5rem) * -5)); }
		}

		/* --- Section padding --- */
		.pricing { padding: 4rem 1.5rem; }
		.travel  { padding: 4rem 1.5rem; }

		/* --- Tables: 3-col still fits on tablet --- */
		.pricing-header,
		.pricing-row,
		.travel-header,
		.travel-row {
			padding: 1rem 1.25rem;
			font-size: 0.95rem;
		}

		.pricing-description { padding: 0 1.25rem 1rem; font-size: 0.9rem; }

		/* --- CTA button --- */
		.btn-primary { font-size: 1rem; padding: 0.85rem 2rem; }
	}

	/* ---- TIER 2 : Mobile (≤ 767px) ---- */
	@media (max-width: 767px) {

		/* --- Typography --- */
		.title    { font-size: 1.65rem; line-height: 1.25; }
		.subtitle { font-size: 1.15rem; margin-top: 0.75rem; font-weight: 400; }

		/* --- Hero --- */
		.hero { padding: 2.5rem 1.25rem; }

		/* --- Slider : small cards --- */
		.hero-image   { height: 220px; }
		.slide        { width: 190px; height: 190px; border-radius: 12px; }
		.slide-content { font-size: 1rem; }
		.slide-track  { width: calc((190px + 1.25rem) * 10); animation-name: scroll-mobile; }

		@keyframes scroll-mobile {
			from { transform: translateX(0); }
			to   { transform: translateX(calc((190px + 1.25rem) * -5)); }
		}

		/* --- Section padding --- */
		.pricing { padding: 3rem 1.25rem; }
		.travel  { padding: 3rem 1.25rem; }

		/* --- Tables: collapse to stacked cards --- */
		.pricing-header,
		.travel-header { display: none; }

		.mobile-label {
			display: inline;
			font-weight: 700;
			color: #f68b1f;
		}

		.pricing-row,
		.travel-row {
			grid-template-columns: 1fr;
			gap: 0.35rem;
			padding: 1rem 1.25rem 0.75rem;
		}

		.row-label {
			font-weight: 800;
			font-size: 1rem;
			margin-bottom: 0.15rem;
		}

		.pricing-description {
			padding: 0 1.25rem 1rem;
			font-size: 0.875rem;
		}

		/* Remove <br> line-break on mobile so text reflows naturally */
		.pricing-description br { display: none; }

		/* --- Price discount stacks nicely --- */
		.price-discount { flex-wrap: wrap; gap: 0.4rem; }
		.new-price      { font-size: 1.05rem; }

		/* --- Travel description & note --- */
		.travel-description { font-size: 0.95rem; }
		.travel-note        { font-size: 0.875rem; }

		/* --- Book CTA button full-width on mobile --- */
		.btn-primary {
			display: block;
			width: 100%;
			max-width: 320px;
			margin: 0 auto;
			text-align: center;
			font-size: 1rem;
			padding: 1rem 1.5rem;
		}

		/* --- Modal --- */
		.modal { padding: 1.5rem 1.25rem; }
		.modal p { font-size: 0.95rem; }
	}

	/* ---- TIER 3 : Small phones (≤ 479px) ---- */
	@media (max-width: 479px) {

		/* --- Typography --- */
		.title    { font-size: 1.4rem; }
		.subtitle { font-size: 1rem; }

		/* --- Navbar shrinks slightly --- */
		.nav-container { padding: 0 1rem; }
		.logo-placeholder { width: 34px; height: 34px; font-size: 0.875rem; }

		/* --- Hamburger touch area --- */
		.hamburger { width: 44px; height: 44px; }

		/* --- Mobile menu font --- */
		.mobile-menu button { font-size: 1rem; padding: 0.85rem 1.25rem; }

		/* --- Hero --- */
		.hero { padding: 2rem 1rem; }

		/* --- Slider : compact --- */
		.hero-image  { height: 180px; }
		.slide       { width: 155px; height: 155px; border-radius: 10px; margin-right: 1rem; }
		.slide-track { width: calc((155px + 1rem) * 10); animation-name: scroll-small; }

		@keyframes scroll-small {
			from { transform: translateX(0); }
			to   { transform: translateX(calc((155px + 1rem) * -5)); }
		}

		/* --- Section padding --- */
		.pricing { padding: 2.5rem 1rem; }
		.travel  { padding: 2.5rem 1rem; }

		/* --- Table rows tighter --- */
		.pricing-row,
		.travel-row { padding: 0.85rem 1rem 0.65rem; }

		.pricing-description { padding: 0 1rem 0.85rem; }

		.row-label { font-size: 0.95rem; }

		/* --- Book CTA --- */
		.book-cta { margin-top: 2rem; }
	}
</style>