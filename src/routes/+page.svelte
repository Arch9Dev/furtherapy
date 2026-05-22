<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const navLinks = [
		{ name: 'Home', route: '/' },
		{ name: 'About', route: '/about' },
		{ name: 'Services', route: '/services' },
		{ name: 'Education', route: '/education' },
		{ name: 'Contact', route: '/contact' }
	];

	const slides = ['Dog1.png', 'Dog2.png', 'Dog3.png', 'Dog4.png', 'Dog5.png'];

	$: currentRoute = $page.url.pathname;

	function navigateTo(route: string) {
		menuOpen = false;
		goto(route);
	}

	let menuOpen = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	onMount(() => {
		const handleWindowKeydown = (event: KeyboardEvent) => {
			if (showModal && event.key === 'Escape') closeModal();
		};

		window.addEventListener('keydown', handleWindowKeydown);

		return () => window.removeEventListener('keydown', handleWindowKeydown);
	});

	// Modal state
	let showModal = false;
	let modalMessage = '';
	let isError = false;

	// Contact form state
	let formName = '';
	let formEmail = '';
	let formMessage = '';
	let formSubmitting = false;

	async function handleSubmit() {
		formSubmitting = true;
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: formName, email: formEmail, message: formMessage })
			});

			if (response.ok) {
				modalMessage = 'Thank you! Your message has been sent.';
				isError = false;
				formName = '';
				formEmail = '';
				formMessage = '';
			} else {
				modalMessage = 'Oops! Something went wrong. Please try again.';
				isError = true;
			}
		} catch {
			modalMessage = 'Network error. Please check your connection.';
			isError = true;
		}
		formSubmitting = false;
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}

	function handleModalKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') closeModal();
	}

	function handleOverlayKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') closeModal();
	}
</script>

<svelte:head>
	<title>Fur Therapy | Canine Massage & Bodywork Auckland</title>
	<meta
		name="description"
		content="Professional canine massage and bodywork based in Mission Bay, Auckland. Helping your dog feel their best with therapeutic touch."
	/>
</svelte:head>

<!-- NAV BAR -->
<!-- svelte-ignore a11y_no_redundant_roles -->
<header class="navbar" role="banner">
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
				<button
					class:active={link.route === currentRoute}
					on:click={() => navigateTo(link.route)}
					aria-current={link.route === currentRoute ? 'page' : undefined}
				>
					{link.name}
				</button>
			{/each}
		</nav>

		<button
			class="hamburger"
			on:click={toggleMenu}
			aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
			aria-expanded={menuOpen}
			aria-controls="mobile-menu"
		>
			<span class="bar" class:open={menuOpen}></span>
			<span class="bar" class:open={menuOpen}></span>
			<span class="bar" class:open={menuOpen}></span>
		</button>
	</div>

	{#if menuOpen}
		<div
			class="mobile-overlay"
			on:click={() => (menuOpen = false)}
			on:keydown={handleOverlayKeydown}
			role="button"
			tabindex="-1"
			aria-label="Close navigation menu"
		></div>
		<nav id="mobile-menu" class="mobile-menu" class:open={menuOpen} aria-label="Mobile navigation">
			{#each navLinks as link}
				<button
					class:active={link.route === currentRoute}
					on:click={() => navigateTo(link.route)}
					aria-current={link.route === currentRoute ? 'page' : undefined}
				>
					{link.name}
				</button>
			{/each}
		</nav>
	{/if}
</header>

<!-- HERO -->
<section class="hero" aria-labelledby="hero-heading">
	<div class="hero-inner">
		<h1 class="title" id="hero-heading">Because your dog deserves to feel their best.</h1>
		<p class="subtitle">Canine massage and bodywork</p>
	</div>
</section>

<!-- IMAGE SLIDER -->
<section class="hero-image" aria-label="Photo gallery" aria-hidden="true">
	<div class="slider">
		<div class="slide-track">
			{#each slides as src}
				<div class="slide"><img {src} alt="" /></div>
			{/each}

			{#each slides as src}
				<div class="slide"><img {src} alt="" /></div>
			{/each}
		</div>
	</div>
</section>

<!-- PRICING -->
<section class="pricing" id="services" aria-labelledby="pricing-heading">
	<div class="pricing-inner">
		<h2 class="title" id="pricing-heading">Pricing Guide</h2>

		<div class="pricing-table" role="table" aria-label="Service pricing">
			<div class="pricing-header" role="row">
				<span role="columnheader">Service</span>
				<span role="columnheader">Duration</span>
				<span role="columnheader">Price</span>
			</div>

			<div class="pricing-row" role="row">
				<span class="row-label" role="cell">Initial Assessment</span>
				<span role="cell"><span class="mobile-label">Duration: </span>60 mins</span>
				<span role="cell"><span class="mobile-label">Price: </span>$150</span>
			</div>
			<div class="pricing-description">
				Intake and case history, gait observation, <br /> trust-building and hands-on assessment (as appropriate).
			</div>

			<div class="pricing-row" role="row">
				<span class="row-label" role="cell">Follow-up Appointment</span>
				<span role="cell"><span class="mobile-label">Duration: </span>45 mins</span>
				<span role="cell"><span class="mobile-label">Price: </span>$130</span>
			</div>
			<div class="pricing-description">
				Individualised therapeutic massage and bodywork session.
			</div>

			<div class="pricing-row highlight" role="row">
				<span class="row-label" role="cell">Prepaid Special (5 Sessions)</span>
				<span role="cell"><span class="mobile-label">Duration: </span>45 mins/session</span>
				<span class="price-discount" role="cell">
					<span class="old-price"><span class="sr-only">Was </span>$650</span>
					<span class="new-price"><span class="sr-only">Now </span>$600</span>
				</span>
			</div>
			<div class="pricing-description">
				Pre-pay five follow-up sessions and receive a discounted package rate.
			</div>
		</div>

		<div class="book-cta">
			<a href="/booking" on:click|preventDefault={() => navigateTo('/booking')} class="btn-primary">
				Book Now
			</a>
		</div>
	</div>
</section>

<!-- TRAVEL -->
<section class="travel" id="travel" aria-labelledby="travel-heading">
	<div class="travel-inner">
		<h2 class="title" id="travel-heading">Travel Guide</h2>

		<p class="travel-description">
			Fur Therapy is based in <strong>Mission Bay, Auckland</strong>. Travel is complimentary within
			10km of Mission Bay. For appointments outside this area, a travel fee applies to cover time
			and vehicle costs.
		</p>

		<div class="travel-table" role="table" aria-label="Travel fees by distance">
			<div class="travel-header" role="row">
				<span role="columnheader">Distance from Mission Bay</span>
				<span role="columnheader">Travel Fee</span>
				<span role="columnheader">Notes</span>
			</div>
			<div class="travel-row" role="row">
				<span class="row-label" role="cell">0 – 10 km</span>
				<span role="cell"><span class="mobile-label">Fee: </span>Complimentary</span>
				<span role="cell"><span class="mobile-label">Notes: </span>Included with session</span>
			</div>
			<div class="travel-row" role="row">
				<span class="row-label" role="cell">10 – 20 km</span>
				<span role="cell"><span class="mobile-label">Fee: </span>$20</span>
				<span role="cell"><span class="mobile-label">Notes: </span>Flat fee</span>
			</div>
			<div class="travel-row" role="row">
				<span class="row-label" role="cell">20 – 30 km</span>
				<span role="cell"><span class="mobile-label">Fee: </span>$35</span>
				<span role="cell"><span class="mobile-label">Notes: </span>Flat fee</span>
			</div>
			<div class="travel-row" role="row">
				<span class="row-label" role="cell">30 – 40 km</span>
				<span role="cell"><span class="mobile-label">Fee: </span>$50</span>
				<span role="cell"><span class="mobile-label">Notes: </span>Flat fee</span>
			</div>
			<div class="travel-row" role="row">
				<span class="row-label" role="cell">Over 40 km</span>
				<span role="cell"><span class="mobile-label">Fee: </span>$1.20/km</span>
				<span role="cell"><span class="mobile-label">Notes: </span>Return trip rate</span>
			</div>
		</div>

		<p class="travel-note">
			Travel fees are confirmed prior to booking. If you're located further away, consider booking
			multiple dogs in one visit to share the travel cost.
		</p>
	</div>

	<div class="book-cta">
		<a href="/booking" on:click|preventDefault={() => navigateTo('/booking')} class="btn-primary">
			Book Now
		</a>
	</div>
</section>

<!-- CONTACT FORM -->
<section class="contact" id="contact" aria-labelledby="contact-heading">
	<div class="contact-inner">
		<h2 class="title" id="contact-heading">Get in Touch</h2>
		<p class="contact-description">
			Have a question about whether massage is right for your dog? Send a message and we'll get back
			to you.
		</p>

		<div class="contact-form-wrapper">
			<div class="form-field">
				<label for="contact-name">Name</label>
				<input
					id="contact-name"
					type="text"
					bind:value={formName}
					placeholder="Your name"
					autocomplete="name"
				/>
			</div>

			<div class="form-field">
				<label for="contact-email">Email</label>
				<input
					id="contact-email"
					type="email"
					bind:value={formEmail}
					placeholder="your@email.com"
					autocomplete="email"
				/>
			</div>

			<div class="form-field">
				<label for="contact-message">Message</label>
				<textarea
					id="contact-message"
					bind:value={formMessage}
					placeholder="Tell us about your dog and how we can help..."
					rows="5"
				></textarea>
			</div>

			<button
				class="btn-primary btn-submit"
				on:click={handleSubmit}
				disabled={formSubmitting || !formName || !formEmail || !formMessage}
				aria-busy={formSubmitting}
			>
				{formSubmitting ? 'Sending…' : 'Send Message'}
			</button>
		</div>
	</div>
</section>

<!-- MODAL -->
{#if showModal}
	<div
		class="modal-overlay"
		on:click={closeModal}
		on:keydown={handleOverlayKeydown}
		role="button"
		tabindex="-1"
		aria-label="Close dialog"
	>
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<div
			class="modal"
			class:modal-error={isError}
			on:click|stopPropagation
			on:keydown={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			aria-live="polite"
			aria-labelledby="modal-message"
		>
			<p id="modal-message">{modalMessage}</p>
			<button class="modal-close" on:click={closeModal}>Close</button>
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

	/* Screen-reader only */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	/* ----------------- CSS CUSTOM PROPERTIES ----------------- */
	:root {
		--slide-w: 320px;
		--slide-gap: 2rem;
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

	.desktop-brand img {
		height: 45px;
	}
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

	/* Global focus ring */
	:global(*:focus-visible) {
		outline: 3px solid #fff;
		outline-offset: 2px;
		border-radius: 4px;
	}

	/* Orange focus ring inside dark sections */
	.pricing :global(*:focus-visible),
	.travel :global(*:focus-visible),
	.contact :global(*:focus-visible),


	/* ----------------- HAMBURGER ----------------- */
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
		transition:
			transform 0.25s ease,
			opacity 0.25s ease;
		transform-origin: center;
	}

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

	/* Pause on hover */
	.slider:hover .slide-track {
		animation-play-state: paused;
	}

	.slide-track {
		display: flex;
		width: calc((var(--slide-w) + var(--slide-gap)) * 10);
		animation: scroll-slides 25s linear infinite;
	}

	.slide {
		width: var(--slide-w);
		height: 320px;
		flex-shrink: 0;
		margin-right: var(--slide-gap);
		border-radius: 16px;
		background: #2a2a2a;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	.slide img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	@keyframes scroll-slides {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc((var(--slide-w) + var(--slide-gap)) * -5));
		}
	}

	/* ----------------- PRICING ----------------- */
	.pricing {
		padding: 5rem 2rem;
		background: #1f1f1f;
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

	.mobile-label {
		display: none;
	}

	/* ----------------- TRAVEL ----------------- */
	.travel {
		padding: 5rem 2rem;
		background: #2a2a2a;
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
		background: #1f1f1f;
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

	/* ----------------- CONTACT FORM ----------------- */
	.contact {
		padding: 5rem 2rem;
		background: #1f1f1f;
	}

	.contact-inner {
		max-width: 680px;
		margin: 0 auto;
	}

	.contact-description {
		margin-top: 1rem;
		margin-bottom: 2.5rem;
		color: #e0e0e0;
		font-size: 1.05rem;
	}

	.contact-form-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.form-field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.form-field label {
		font-weight: 700;
		font-size: 0.9rem;
		color: #e0e0e0;
		letter-spacing: 0.04em;
	}

	.form-field input,
	.form-field textarea {
		background: #2a2a2a;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 8px;
		padding: 0.8rem 1rem;
		color: #fff;
		font-size: 1rem;
		font-family: inherit;
		transition: border-color 0.2s ease;
		resize: vertical;
	}

	.form-field input::placeholder,
	.form-field textarea::placeholder {
		color: #666;
	}

	.form-field input:hover,
	.form-field textarea:hover {
		border-color: rgba(246, 139, 31, 0.4);
	}

	.form-field input:focus,
	.form-field textarea:focus {
		border-color: #f68b1f;
		outline: none;
	}

	.btn-submit {
		align-self: flex-start;
		border: none;
		cursor: pointer;
		font-family: inherit;
	}

	.btn-submit:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none !important;
		box-shadow: none !important;
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
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
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
	   RESPONSIVE
	   ================================================================= */

	/* ---- Tablet (≤ 1024px) ---- */
	@media (max-width: 1024px) {
		.desktop-brand {
			display: none;
		}
		.mobile-brand {
			display: block;
		}
		.nav-links {
			display: none;
		}
		.hamburger {
			display: flex;
		}

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
			from {
				opacity: 0;
				transform: translateY(-8px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
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
			padding: 0.9rem 2rem;
			width: 100%;
			border-bottom: 1px solid rgba(255, 255, 255, 0.12);
		}

		.mobile-menu button:last-child {
			border-bottom: none;
		}
		.mobile-menu button:hover {
			background: rgba(255, 255, 255, 0.1);
		}
		.mobile-menu button.active {
			color: #1f1f1f;
		}

		.title {
			font-size: 2rem;
		}
		.subtitle {
			font-size: 1.4rem;
		}

		.hero {
			height: auto;
			padding: 3rem 1.5rem;
		}
		.hero-inner {
			padding: 0;
		}

		/* Slider — override custom props for tablet */
		.hero-image {
			height: 280px;
		}
		.slide-track {
			--slide-w: 240px;
			--slide-gap: 1.5rem;
			animation-name: scroll-slides;
		}
		.slide {
			width: 240px;
			height: 240px;
			margin-right: 1.5rem;
			overflow: hidden;
		}

		.slide img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.pricing,
		.travel,
		.contact {
			padding: 4rem 1.5rem;
		}

		.pricing-header,
		.pricing-row,
		.travel-header,
		.travel-row {
			padding: 1rem 1.25rem;
			font-size: 0.95rem;
		}

		.pricing-description {
			padding: 0 1.25rem 1rem;
			font-size: 0.9rem;
		}

		.btn-primary {
			font-size: 1rem;
			padding: 0.85rem 2rem;
		}
	}

	/* ---- Mobile (≤ 767px) ---- */
	@media (max-width: 767px) {
		.title {
			font-size: 1.65rem;
			line-height: 1.25;
		}
		.subtitle {
			font-size: 1.15rem;
			margin-top: 0.75rem;
			font-weight: 400;
		}

		.hero {
			padding: 2.5rem 1.25rem;
		}

		.hero-image {
			height: 220px;
		}
		.slide {
			width: 190px;
			height: 190px;
			border-radius: 12px;
			margin-right: 1.25rem;
		}

		.pricing,
		.travel,
		.contact {
			padding: 3rem 1.25rem;
		}

		.pricing-header,
		.travel-header {
			display: none;
		}

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
		.pricing-description br {
			display: none;
		}
		.price-discount {
			flex-wrap: wrap;
			gap: 0.4rem;
		}
		.new-price {
			font-size: 1.05rem;
		}
		.travel-description {
			font-size: 0.95rem;
		}
		.travel-note {
			font-size: 0.875rem;
		}

		.btn-primary {
			display: block;
			width: 100%;
			max-width: 320px;
			margin: 0 auto;
			text-align: center;
			font-size: 1rem;
			padding: 1rem 1.5rem;
		}

		.btn-submit {
			align-self: stretch;
			max-width: 320px;
			width: 100%;
		}

		.modal {
			padding: 1.5rem 1.25rem;
		}
		.modal p {
			font-size: 0.95rem;
		}
	}

	/* ---- Small phones (≤ 479px) ---- */
	@media (max-width: 479px) {
		.title {
			font-size: 1.4rem;
		}
		.subtitle {
			font-size: 1rem;
		}

		.nav-container {
			padding: 0 1rem;
		}
		.logo-placeholder {
			width: 34px;
			height: 34px;
			font-size: 0.875rem;
		}
		.hamburger {
			width: 44px;
			height: 44px;
		}
		.mobile-menu button {
			font-size: 1rem;
			padding: 0.85rem 1.25rem;
		}

		.hero {
			padding: 2rem 1rem;
		}

		.hero-image {
			height: 180px;
		}
		.slide {
			width: 155px;
			height: 155px;
			border-radius: 10px;
			margin-right: 1rem;
		}

		.pricing,
		.travel,
		.contact {
			padding: 2.5rem 1rem;
		}

		.pricing-row,
		.travel-row {
			padding: 0.85rem 1rem 0.65rem;
		}
		.pricing-description {
			padding: 0 1rem 0.85rem;
		}
		.row-label {
			font-size: 0.95rem;
		}
		.book-cta {
			margin-top: 2rem;
		}
	}
</style>
