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
	function toggleMenu() { menuOpen = !menuOpen; }
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

		<button class="hamburger" on:click={toggleMenu} aria-label="Toggle navigation menu" aria-expanded={menuOpen}>
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

<!-- EDUCATION SECTION -->
<section class="hero" id="education">
	<div class="hero-inner">
		<h1 class="title">Education & Mentorship</h1>
		<div class="content">
			<p>
				At FurTherapy, I am committed not only to supporting dogs through professional bodywork, but
				also to sharing my knowledge and helping you grow confidence within the canine wellness
				community across New Zealand.
			</p>
			<p>
				I provide education and mentorship for aspiring canine massage practitioners, therapy
				professionals, and dedicated dog owners who want to better understand canine anatomy,
				movement, comfort, and therapeutic touch. Through guided learning, practical advice, and
				one-to-one mentorship, my goal is to empower you with safe, ethical, and effective
				techniques that improve canine wellbeing.
			</p>
			<p>
				Whether you are just beginning or looking to expand your professional skillset, I offer
				supportive, accessible education tailored for the New Zealand community.
			</p>
		</div>
	</div>
</section>

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
		background: #f68b1f; height: 80px; display: flex; flex-direction: column;
		position: sticky; top: 0; z-index: 100;
	}
	.nav-container {
		width: 100%; height: 80px; padding: 0 2rem;
		display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;
	}
	.desktop-brand img { height: 45px; }
	.mobile-brand { display: none; }
	.logo-placeholder {
		width: 38px; height: 38px; background: rgba(255,255,255,0.25); border-radius: 8px;
		display: flex; align-items: center; justify-content: center;
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
		display: none; flex-direction: column; justify-content: center; align-items: center;
		gap: 5px; background: none; border: none; cursor: pointer;
		padding: 6px; border-radius: 6px; width: 44px; height: 44px;
	}
	.hamburger:hover { background: rgba(255,255,255,0.15); }
	.bar {
		display: block; width: 24px; height: 2.5px; background: #fff;
		border-radius: 2px; transition: transform 0.25s ease, opacity 0.25s ease;
	}
	.hamburger[aria-expanded='true'] .bar:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
	.hamburger[aria-expanded='true'] .bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
	.hamburger[aria-expanded='true'] .bar:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

	.mobile-menu {
		display: none; flex-direction: column; background: #e07a18; width: 100%;
		padding: 0.5rem 0 1rem; position: absolute; top: 80px; left: 0; right: 0;
		z-index: 99; box-shadow: 0 8px 20px rgba(0,0,0,0.3); animation: slideDown 0.2s ease;
	}
	.mobile-overlay { display: none; }
	@keyframes slideDown {
		from { opacity: 0; transform: translateY(-8px); }
		to   { opacity: 1; transform: translateY(0); }
	}
	.mobile-menu button {
		background: none; border: none; color: #fff; font-weight: 800; font-size: 1.1rem;
		font-family: inherit; cursor: pointer; text-align: left;
		padding: 0.9rem 2rem; width: 100%; border-bottom: 1px solid rgba(255,255,255,0.12);
	}
	.mobile-menu button:last-child { border-bottom: none; }
	.mobile-menu button:hover { background: rgba(255,255,255,0.1); }
	.mobile-menu button.active { color: #1f1f1f; }

	/* --- EDUCATION --- */
	.hero {
		min-height: 250px; display: flex; align-items: center;
		padding: 4rem 0; background: #2a2a2a;
	}
	.hero-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

	.title { font-size: 2.5rem; font-weight: 800; margin-bottom: 2rem; line-height: 1.2; }

	.content p {
		font-size: 1.125rem; margin-bottom: 1.5rem;
		font-weight: 300; line-height: 1.8; color: #e0e0e0;
	}
	.content p:last-child { margin-bottom: 0; }

	/* ================================================================
	   RESPONSIVE
	   ================================================================ */

	/* --- Tablet (≤ 1024px) --- */
	@media (max-width: 1024px) {
		.desktop-brand { display: none; }
		.mobile-brand  { display: block; }
		.nav-links     { display: none; }
		.hamburger     { display: flex; }
		.mobile-menu   { display: flex; }
		.mobile-overlay {
			display: block; position: fixed; inset: 0; top: 80px; z-index: 98;
		}

		.title { font-size: 2rem; margin-bottom: 1.75rem; }
		.hero  { padding: 3.5rem 0; }
		.content p { font-size: 1.05rem; }
	}

	/* --- Mobile (≤ 767px) --- */
	@media (max-width: 767px) {
		.title { font-size: 1.65rem; margin-bottom: 1.5rem; }
		.hero  { padding: 2.5rem 0; min-height: unset; }
		.hero-inner { padding: 0 1.25rem; }
		.content p  { font-size: 0.975rem; line-height: 1.75; margin-bottom: 1.25rem; }
	}

	/* --- Small phones (≤ 479px) --- */
	@media (max-width: 479px) {
		.nav-container { padding: 0 1rem; }
		.logo-placeholder { width: 34px; height: 34px; font-size: 0.875rem; }
		.mobile-menu button { font-size: 1rem; padding: 0.85rem 1.25rem; }

		.title { font-size: 1.4rem; margin-bottom: 1.25rem; }
		.hero  { padding: 2rem 0; }
		.hero-inner { padding: 0 1rem; }
		.content p { font-size: 0.9375rem; }
	}
</style>