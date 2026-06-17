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

	$: currentRoute = $page.url.pathname;

	function navigateTo(route: string) {
		menuOpen = false;
		goto(route);
	}

	let menuOpen = false;
	function toggleMenu() {
		menuOpen = !menuOpen;
	}

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

<!-- NAV BAR -->
<header class="navbar">
	<div class="nav-container">
		<div class="brand desktop-brand">
			<a href="/" on:click|preventDefault={() => navigateTo('/')}>
				<img src="logo_white.png" alt="FurTherapy Logo" />
			</a>
		</div>
		<div class="brand mobile-brand">
			<a href="/" on:click|preventDefault={() => navigateTo('/')}>
				<div class="logo-placeholder">FT</div>
			</a>
		</div>

		<nav class="nav-links">
			{#each navLinks as link}
				<button class:active={link.route === currentRoute} on:click={() => navigateTo(link.route)}>
					{link.name}
				</button>
			{/each}
		</nav>

		<button
			class="hamburger"
			on:click={toggleMenu}
			aria-label="Toggle navigation menu"
			aria-expanded={menuOpen}
		>
			<span class="bar"></span>
			<span class="bar"></span>
			<span class="bar"></span>
		</button>
	</div>

	{#if menuOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<div class="mobile-overlay" on:click={() => (menuOpen = false)} role="presentation"></div>
		<nav class="mobile-menu">
			{#each navLinks as link}
				<button class:active={link.route === currentRoute} on:click={() => navigateTo(link.route)}>
					{link.name}
				</button>
			{/each}
		</nav>
	{/if}
</header>

<!-- HERO -->
<section class="hero" id="contact-hero">
	<div class="hero-inner">
		<h1 class="title">Contact Us</h1>
		<p class="subtitle">Get in touch with FurTherapy</p>
	</div>
</section>

<!-- INFO TABLES -->
<section class="info-section">
	<div class="info-container">
		<div class="info-table">
			<div class="table-header"><h2>Opening Hours</h2></div>
			<div class="table-body">
				<div class="table-row">
					<span class="day">Monday – Friday</span>
					<span class="time">09:00 – 17:00</span>
				</div>
				<div class="table-row">
					<span class="day">Weekends & Evenings</span>
					<span class="time">By appointment</span>
				</div>
			</div>
		</div>

		<div class="info-table">
			<div class="table-header"><h2>Contact Information</h2></div>
			<div class="table-body">
				<div class="table-row">
					<span class="label">Telephone</span>
					<a href="tel:02114411722" class="value">021 144 1722</a>
				</div>
				<div class="table-row">
					<span class="label">Email</span>
					<a href="mailto:fur.therapymassage@gmail.com" class="value"
						>fur.therapymassage@gmail.com</a
					>
				</div>
			</div>
		</div>
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
	<div class="modal-backdrop" on:click={() => (showModal = false)} role="presentation">
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="modal"
			class:modal-error={isError}
			on:click|stopPropagation
			role="dialog"
			aria-modal="true"
		>
			<h2>{isError ? 'Error' : 'Success'}</h2>
			<p>{modalMessage}</p>
			<button class="btn-primary" on:click={() => (showModal = false)}>Close</button>
		</div>
	</div>
{/if}

<style global>
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

	/* --- NAVBAR --- */
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
		width: 44px;
		height: 44px;
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

	.mobile-menu {
		display: none;
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
		display: none;
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

	/* --- HERO --- */
	.hero {
		height: 250px;
		display: flex;
		align-items: center;
		background: #2a2a2a;
	}
	.hero-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}
	.title {
		font-size: 2.5rem;
		font-weight: 800;
		line-height: 1.2;
	}
	.subtitle {
		font-size: 1.5rem;
		margin-top: 1rem;
		font-weight: 300;
	}

	/* --- INFO TABLES --- */
	.info-section {
		padding: 3rem 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}
	.info-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 2rem;
	}
	.info-table {
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
	}
	.table-header {
		background: #f68b1f;
		padding: 1.5rem;
	}
	.table-header h2 {
		font-size: 1.1rem;
		font-weight: 700;
		color: #fff;
		margin: 0;
	}
	.table-body {
		background: #2a2a2a;
	}
	.table-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.25rem 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}
	.table-row:first-child {
		border-top: none;
	}
	.day,
	.label {
		font-size: 1rem;
		color: #fff;
		font-weight: 500;
	}
	.time,
	.value {
		font-size: 1rem;
		color: #f68b1f;
		font-weight: 600;
		text-decoration: none;
	}
	.value:hover {
		text-decoration: underline;
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

	/* --- MODAL --- */
	.modal-backdrop {
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
	.modal h2 {
		margin-bottom: 1rem;
		font-size: 1.4rem;
	}
	.modal p {
		margin-bottom: 1.5rem;
		color: #e0e0e0;
	}

	/* ================================================================
	   RESPONSIVE
	   ================================================================ */

	/* --- Tablet (≤ 1024px) --- */
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
		}
		.mobile-overlay {
			display: block;
			position: fixed;
			inset: 0;
			top: 80px;
			z-index: 98;
		}

		.title {
			font-size: 2rem;
		}
		.subtitle {
			font-size: 1.3rem;
		}
		.hero {
			height: auto;
			padding: 2.5rem 1.5rem;
		}
		.hero-inner {
			padding: 0;
		}

		.info-section {
			padding: 2.5rem 1.5rem;
		}
		.contact {
			padding: 4rem 1.5rem;
		}
	}

	/* --- Mobile (≤ 767px) --- */
	@media (max-width: 767px) {
		.title {
			font-size: 1.65rem;
		}
		.subtitle {
			font-size: 1.15rem;
			margin-top: 0.65rem;
		}
		.hero {
			padding: 2rem 1.25rem;
		}

		.info-section {
			padding: 2rem 1.25rem;
		}
		.info-container {
			grid-template-columns: 1fr;
			gap: 1.25rem;
		}

		/* Email wraps gracefully */
		.table-row {
			flex-wrap: wrap;
			gap: 0.25rem;
			padding: 1rem 1.25rem;
		}
		.value {
			word-break: break-all;
		}

		.contact {
			padding: 3rem 1.25rem;
		}

		.modal {
			padding: 1.5rem 1.25rem;
		}
		.modal h2 {
			font-size: 1.2rem;
		}
		.modal p {
			font-size: 0.95rem;
		}
	}

	/* --- Small phones (≤ 479px) --- */
	@media (max-width: 479px) {
		.nav-container {
			padding: 0 1rem;
		}
		.logo-placeholder {
			width: 34px;
			height: 34px;
			font-size: 0.875rem;
		}
		.mobile-menu button {
			font-size: 1rem;
			padding: 0.85rem 1.25rem;
		}

		.title {
			font-size: 1.4rem;
		}
		.subtitle {
			font-size: 1rem;
		}

		.info-section {
			padding: 1.75rem 1rem;
		}
		.table-header {
			padding: 1.1rem 1.25rem;
		}
		.table-row {
			padding: 0.9rem 1.25rem;
		}
		.day,
		.label,
		.time,
		.value {
			font-size: 0.9375rem;
		}

		.contact {
			padding: 2.5rem 1rem;
		}
	}
</style>
