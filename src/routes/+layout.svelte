<script lang="ts">
	import '$lib/styles/shared.css';
	import { page } from '$app/state';

	let { children } = $props();

	const navLinks = [
		{ name: 'Home', route: '/' },
		{ name: 'About', route: '/about' },
		{ name: 'Services', route: '/services' },
		{ name: 'Education', route: '/education' },
		{ name: 'Contact', route: '/contact' }
	];

	let menuOpen = $state(false);

	// The admin area has its own screens — don't show the public nav there.
	const showNav = $derived(!page.url.pathname.startsWith('/admin'));
	const path = $derived(page.url.pathname);

	function isCurrent(route: string) {
		return route === '/' ? path === '/' : path === route || path.startsWith(route + '/');
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/favicon.png" />
	<meta name="theme-color" content="#f68b1f" />
</svelte:head>

<svelte:window onkeydown={(e) => e.key === 'Escape' && closeMenu()} />

{#if showNav}
	<header class="navbar">
		<div class="nav-container">
			<a href="/" class="brand" aria-label="FurTherapy home" onclick={closeMenu}>
				<img class="logo" src="/logo_white.png" alt="FurTherapy" />
			</a>

			<nav class="nav-links" aria-label="Primary">
				{#each navLinks as link}
					<a
						href={link.route}
						class:active={isCurrent(link.route)}
						aria-current={isCurrent(link.route) ? 'page' : undefined}
					>
						{link.name}
					</a>
				{/each}
			</nav>

			<a href="/booking" class="nav-book-cta">Book a Session</a>

			<button
				class="hamburger"
				onclick={() => (menuOpen = !menuOpen)}
				aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
			>
				<span class="bar"></span>
				<span class="bar"></span>
				<span class="bar"></span>
			</button>
		</div>

		{#if menuOpen}
			<button class="mobile-overlay" onclick={closeMenu} tabindex="-1" aria-label="Close navigation menu"
			></button>
			<nav id="mobile-menu" class="mobile-menu" aria-label="Mobile">
				{#each navLinks as link}
					<a
						href={link.route}
						class:active={isCurrent(link.route)}
						aria-current={isCurrent(link.route) ? 'page' : undefined}
						onclick={closeMenu}
					>
						{link.name}
					</a>
				{/each}
				<a href="/booking" class="mobile-book-cta" onclick={closeMenu}>Book a Session</a>
			</nav>
		{/if}
	</header>
{/if}

{@render children()}

<style>
	.navbar {
		background: var(--color-orange);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.nav-container {
		max-width: 1440px;
		margin: 0 auto;
		min-height: var(--nav-h);
		padding: 0 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
	}

	.brand {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}
	.logo {
		height: 34px;
		width: auto;
		display: block;
	}

	.nav-links {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		gap: 0.4rem;
	}
	.nav-links a {
		color: #fff;
		text-decoration: none;
		font-weight: 800;
		font-size: 1.02rem;
		padding: 0.45rem 0.9rem;
		border-radius: var(--radius-pill);
	}
	.nav-links a:hover {
		background: rgba(255, 255, 255, 0.18);
	}
	.nav-links a.active {
		color: var(--color-bg);
		background: rgba(255, 255, 255, 0.28);
	}

	.nav-book-cta {
		flex-shrink: 0;
		background: var(--color-bg);
		color: #fff;
		font-weight: 800;
		font-size: 0.95rem;
		padding: 0.65rem 1.4rem;
		border-radius: var(--radius-pill);
		text-decoration: none;
		white-space: nowrap;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}
	.nav-book-cta:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35);
	}

	:global(.navbar :focus-visible) {
		outline-color: #fff;
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
		border-radius: 6px;
		width: 44px;
		height: 44px;
		flex-shrink: 0;
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
	}
	.hamburger[aria-expanded='true'] .bar:nth-child(3) {
		transform: translateY(-7.5px) rotate(-45deg);
	}

	.mobile-overlay {
		position: fixed;
		inset: 0;
		z-index: 98;
		background: rgba(0, 0, 0, 0.35);
		border: none;
		cursor: default;
	}
	.mobile-menu {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 99;
		display: flex;
		flex-direction: column;
		background: var(--color-orange-dark);
		padding: 0.5rem 0 1.25rem;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
	}
	.mobile-menu a {
		color: #fff;
		text-decoration: none;
		font-weight: 800;
		font-size: 1.1rem;
		padding: 0.95rem 2rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.14);
	}
	.mobile-menu a.active {
		color: var(--color-bg);
	}
	.mobile-menu a.mobile-book-cta {
		margin: 1rem 2rem 0;
		background: var(--color-bg);
		text-align: center;
		border: none;
		border-radius: var(--radius-pill);
		padding: 0.95rem 1.5rem;
	}

	@media (max-width: 1024px) {
		.nav-links,
		.nav-book-cta {
			display: none;
		}
		.hamburger {
			display: flex;
		}
		.nav-container {
			min-height: 68px;
		}
	}
	@media (max-width: 479px) {
		.nav-container {
			padding: 0 1rem;
		}
		.logo {
			height: 24px;
		}
		.mobile-menu a {
			padding: 0.9rem 1.25rem;
			font-size: 1rem;
		}
		.mobile-menu a.mobile-book-cta {
			margin: 1rem 1.25rem 0;
		}
	}
</style>
