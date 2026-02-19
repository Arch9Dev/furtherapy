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

	const slides = [
		'Image 1',
		'Image 2',
		'Image 3',
		'Image 4',
		'Image 5'
	];

	$: currentRoute = $page.url.pathname;

	function navigateTo(route: string) {
		goto(route);
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
		<div class="brand">
			<a href="/" on:click|preventDefault={() => navigateTo('/')}>
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
				<span>Initial Assessment</span>
				<span>60 mins</span>
				<span>$150</span>
			</div>
			<div class="pricing-description">
				Intake and case history, gait observation, <br /> trust-building and hands-on assessment (as appropriate).
			</div>

			<div class="pricing-row">
				<span>Follow-up Appointment</span>
				<span>45 mins</span>
				<span>$130</span>
			</div>
			<div class="pricing-description">
				Individualised therapeutic massage and bodywork session.
			</div>

			<div class="pricing-row highlight">
				<span>Prepaid Special (5 Sessions)</span>
				<span>45 mins/session</span>
				<span class="price-discount">
					<span class="old-price">$650</span>
					<span class="new-price">$600</span>
				</span>
			</div>
			<div class="pricing-description">
				Pre-pay five follow-up sessions and receive a discounted package rate.
			</div>
		</div>

		<div class="pricing-cta">
			<a href="/booking" on:click|preventDefault={() => navigateTo('/booking')} class="btn-primary"
				>Book Now</a
			>
		</div>
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

	/* ----------------- IMAGE SECTION ----------------- */
	.hero-image {
		height: 320px;
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
		width: calc(320px * 10); /* 5 slides × 2 */
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

	/* Animation */
	@keyframes scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-320px * 5 - 2rem * 5));
		}
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

	.pricing-row:hover {
		background: rgba(255, 255, 255, 0.03);
	}

	.pricing-description {
		padding: 0 1.5rem 1.2rem;
		font-size: 0.95rem;
		color: #f68b1f;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	/* Discount */
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

	.highlight {
		background: rgba(246, 139, 31, 0.08);
	}

	.pricing-cta {
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

	/* ----------------- RESPONSIVE ----------------- */
	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}

		.subtitle {
			font-size: 1.3rem;
		}

		.pricing-header {
			display: none;
		}

		.pricing-row {
			grid-template-columns: 1fr;
			gap: 0.4rem;
		}
	}
</style>
