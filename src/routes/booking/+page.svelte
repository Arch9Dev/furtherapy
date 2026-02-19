<script>
	const navLinks = [
		{ name: 'Home', route: '/' },
		{ name: 'About', route: '/about' },
		{ name: 'Services', route: '/services' },
		{ name: 'Education', route: '/education' },
		{ name: 'Contact', route: '/contact' }
	];

	// Set this to the current page route
	const currentRoute = '/booking';

	/**
	 * @param {string} route
	 */
	function navigateTo(route) {
		window.location.href = route;
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

<!-- HERO SECTION -->
<section class="hero" id="about">
	<div class="hero-inner">
		<div class="hero-content">
			<div class="hero-text">
				<h1 class="title">Booking</h1>
				<p class="subtitle">If you would like to make a booking please contact me:</p>
			</div>
		</div>
	</div>
</section>

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
	/* ----------------- RESPONSIVE ----------------- */
	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}

		.subtitle {
			font-size: 1.3rem;
		}
	}
</style>
