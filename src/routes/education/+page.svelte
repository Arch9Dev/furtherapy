<script>
	const navLinks = [
		{ name: 'Home', route: '/' },
		{ name: 'About', route: '/about' },
		{ name: 'Services', route: '/services' },
		{ name: 'Education', route: '/education' },
		{ name: 'Contact', route: '/contact' }
	];

	// Set this to the current page route
	const currentRoute = '/education';

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
				<button 
					class:active={link.route === currentRoute}
					on:click={() => navigateTo(link.route)}
				>
					{link.name}
				</button>
			{/each}
		</nav>
	</div>
</header>


<!-- EDUCATION SECTION -->
<section class="hero" id="education">
	<div class="hero-inner">
		<h1 class="title">Education & Mentorship</h1>
		<div class="content">
			<p>At FurTherapy, I am committed not only to supporting dogs through professional bodywork, but also to sharing my knowledge and helping you grow confidence within the canine wellness community across New Zealand.</p>
			
			<p>I provide education and mentorship for aspiring canine massage practitioners, therapy professionals, and dedicated dog owners who want to better understand canine anatomy, movement, comfort, and therapeutic touch. Through guided learning, practical advice, and one-to-one mentorship, my goal is to empower you with safe, ethical, and effective techniques that improve canine wellbeing.</p>
			
			<p>Whether you are just beginning or looking to expand your professional skillset, I offer supportive, accessible education tailored for the New Zealand community.</p>
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
		min-height: 250px;
		display: flex;
		align-items: center;
		padding: 3rem 0;
	}

	.hero-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.title {
		font-size: 2.5rem;
		margin-bottom: 2rem;
		font-weight: 700;
	}

	.content p {
		font-size: 1.125rem;
		margin-bottom: 1.5rem;
		font-weight: 300;
		line-height: 1.8;
	}

	.content p:last-child {
		margin-bottom: 0;
	}

	/* ----------------- RESPONSIVE ----------------- */
	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}

		.title {
			font-size: 1.8rem;
			margin-bottom: 1.5rem;
		}

		.content p {
			font-size: 1rem;
		}
	}
</style>