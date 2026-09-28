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

	let menuOpen = false;

	function navigateTo(route: string) {
		menuOpen = false;
		goto(route);
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function handleOverlayKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') menuOpen = false;
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && menuOpen) menuOpen = false;
	}
</script>

<svelte:window on:keydown={handleWindowKeydown} />

<!-- svelte-ignore a11y_no_redundant_roles -->
<header class="navbar" role="banner">
	<div class="nav-container">
		<a href="/" class="brand" on:click|preventDefault={() => navigateTo('/')} aria-label="FurTherapy home">
			<img class="logo" src="logo_white.png" alt="FurTherapy" />
		</a>

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

		<a href="/booking" class="nav-book-cta" on:click|preventDefault={() => navigateTo('/booking')}>
			Book a Session
		</a>

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
		<nav id="mobile-menu" class="mobile-menu" aria-label="Mobile navigation">
			{#each navLinks as link}
				<button
					class:active={link.route === currentRoute}
					on:click={() => navigateTo(link.route)}
					aria-current={link.route === currentRoute ? 'page' : undefined}
				>
					{link.name}
				</button>
			{/each}
			<button class="mobile-book-cta" on:click={() => navigateTo('/booking')}>
				Book a Session
			</button>
		</nav>
	{/if}
</header>

<style>
	.navbar {
		background: var(--color-orange);
		min-height: 80px;
		display: flex;
		flex-direction: column;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.nav-container {
		width: 100%;
		min-height: 80px;
		padding: 0 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1.5rem;
		flex-shrink: 0;
	}

	.brand {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.brand .logo {
		height: 34px;
		width: auto;
		object-fit: contain;
		display: block;
	}

	.nav-links {
		display: flex;
		align-items: center;
		flex: 1;
		justify-content: center;
	}

	.nav-links button {
		color: #fff;
		background: none;
		border: none;
		cursor: pointer;
		font-weight: 800;
		font-size: 1.05rem;
		margin: 0 1.1rem;
		font-family: inherit;
		padding: 0.4rem 0.1rem;
	}

	.nav-links button:hover {
		text-decoration: underline;
	}
	.nav-links button.active {
		color: var(--color-bg);
	}

	.nav-book-cta {
		display: inline-block;
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

	.mobile-overlay {
		display: none;
	}
	.mobile-menu {
		display: none;
	}
	.mobile-book-cta {
		display: none;
	}

	@media (max-width: 1024px) {
		.nav-links {
			display: none;
		}
		.nav-book-cta {
			display: none;
		}
		.hamburger {
			display: flex;
		}

		.mobile-menu {
			display: flex;
			flex-direction: column;
			background: var(--color-orange-dark);
			width: 100%;
			padding: 0.5rem 0 1.25rem;
			position: absolute;
			top: 100%;
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
			z-index: 98;
			background: rgba(0, 0, 0, 0.3);
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

		.mobile-menu button:hover {
			background: rgba(255, 255, 255, 0.1);
		}
		.mobile-menu button.active {
			color: var(--color-bg);
		}

		.mobile-book-cta {
			display: block;
			margin: 1rem 2rem 0;
			width: calc(100% - 4rem);
			background: var(--color-bg) !important;
			color: #fff !important;
			text-align: center !important;
			border-radius: var(--radius-pill);
			font-weight: 800;
			padding: 0.9rem 1.5rem !important;
		}
	}

	@media (max-width: 479px) {
		.nav-container {
			padding: 0 1rem;
		}
		.brand .logo {
			height: 24px;
		}
		.hamburger {
			width: 44px;
			height: 44px;
		}
		.mobile-menu button {
			font-size: 1rem;
			padding: 0.85rem 1.25rem;
		}
	}
</style>
