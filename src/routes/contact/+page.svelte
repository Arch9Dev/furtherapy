<script lang="ts">
	const navLinks = [
		{ name: 'Home', route: '/' },
		{ name: 'About', route: '/about' },
		{ name: 'Services', route: '/services' },
		{ name: 'Education', route: '/education' },
		{ name: 'Contact', route: '/contact' }
	];

	// Set this to the current page route
	const currentRoute = '/contact';

	/**
	 * @param {string} route
	 */
	function navigateTo(route: string) {
		window.location.href = route;
	}

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
				headers: {
					Accept: 'application/json'
				}
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
		<div class="brand">
			<!-- svelte-ignore a11y_invalid_attribute -->
			<a href="#">
				<img src="logo_white.png" alt="Furtherapy Logo white" />
			</a>
		</div>

		<nav class="nav-links">
			{#each navLinks as link}
				<button class:active={link.route === currentRoute} on:click={() => navigateTo(link.route)}>
					{link.name}
				</button>
			{/each}
		</nav>
	</div>
</header>

<!-- PLACEHOLDER SECTION -->
<section class="hero" id="about">
	<div class="hero-inner">
		<h1 class="title">PLACEHOLDER</h1>
		<p class="subtitle">TEXT</p>
	</div>
</section>

<!-- INFO TABLES SECTION -->
<section class="info-section">
	<div class="info-container">
		<!-- Opening Hours Table -->
		<div class="info-table">
			<div class="table-header">
				<h2>Opening Hours</h2>
			</div>
			<div class="table-body">
				<div class="table-row">
					<span class="day">Monday - Friday</span>
					<span class="time">09:00 - 17:00</span>
				</div>
				<div class="table-row">
					<span class="day">Weekends and Evenings</span>
					<span class="time">By appointment</span>
				</div>
			</div>
		</div>

		<!-- Contact Information Table -->
		<div class="info-table">
			<div class="table-header">
				<h2>Contact Information</h2>
			</div>
			<div class="table-body">
				<div class="table-row">
					<span class="label">Telephone</span>
					<span class="value">021 144 1722</span>
				</div>
				<div class="table-row">
					<span class="label">Email</span>
					<span class="value">fur.therapymassage@gmail.com</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CONTACT -->
<section class="contact" id="contact">
	<div class="contact-inner">
		<h1 class="title">Get in Touch</h1>
		<p class="subtitle">Book a session or ask a question</p>

		<form
			action="https://formspree.io/f/maqqngvd"
			method="POST"
			class="contact-form"
			on:submit|preventDefault={handleSubmit}
		>
			<input type="text" name="name" placeholder="Your Name" required />

			<input type="text" name="contact" placeholder="Email or Phone Number" required />

			<textarea name="message" rows="5" placeholder="Your Message" required></textarea>

			<button type="submit" class="btn-primary"> Send Message </button>
		</form>
		{#if showModal}
			<div class="modal-backdrop">
				<div class="modal">
					<h2>{isError ? 'Error' : 'Success'}</h2>
					<p>{modalMessage}</p>

					<button class="btn-primary" on:click={() => (showModal = false)}> Close </button>
				</div>
			</div>
		{/if}
	</div>
</section>

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

	/* ----------------- NAVBAR ----------------- */
	.navbar {
		background: #f68b1f;
		height: 80px;
		display: flex;
		align-items: center;
	}

	.nav-container {
		width: 100%;
		padding: 0 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.brand img {
		height: 45px;
	}

	.nav-links button {
		color: #fff;
		background: none;
		border: none;
		cursor: pointer;
		font-weight: 800;
		font-size: 1.5rem;
		margin-left: 1.5rem;
		font-family: inherit;
	}

	.nav-links button:hover {
		text-decoration: underline;
	}

	.nav-links button.active {
		color: #1f1f1f;
	}

	/* ----------------- HERO ----------------- */
	.hero {
		height: 250px;
		display: flex;
		align-items: center;
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

	/* ----------------- INFO TABLES ----------------- */
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
		padding: 1.5rem 1.5rem;
	}

	.table-header h2 {
		font-size: 1.5rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0;
	}

	.table-body {
		background: #2a2a2a;
	}

	.table-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2.0rem 1.5rem;
	}

	.day,
	.label {
		font-size: 1rem;
		color: #ffffff;
		font-weight: 500;
	}

	.time,
	.value {
		font-size: 1rem;
		color: #f68b1f;
		font-weight: 600;
	}

	/* ----------------- CONTACT ----------------- */
	.contact {
		padding: 5rem 2rem;
		background: #1f1f1f;
	}

	.contact-inner {
		max-width: 700px;
		margin: 0 auto;
		text-align: center;
	}

	.contact-form {
		margin-top: 3rem;
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	.contact-form input,
	.contact-form textarea {
		padding: 1rem 1.2rem;
		border-radius: 10px;
		border: none;
		font-size: 1rem;
		font-family: inherit;
	}

	.contact-form textarea {
		resize: vertical;
		min-height: 140px;
	}

	.contact-form input:focus,
	.contact-form textarea:focus {
		outline: 2px solid #f68b1f;
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
	/* ----------------- RESPONSIVE ----------------- */
	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}

		.info-container {
			grid-template-columns: 1fr;
		}

		.info-table {
			min-width: unset;
		}
	}
</style>
