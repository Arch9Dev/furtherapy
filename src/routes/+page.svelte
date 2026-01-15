<script>
	const navLinks = ['Home', 'About', 'Services', 'Gallery', 'FAQ', 'Contact'];
</script>

<!-- NAV BAR -->
<header class="navbar">
	<div class="nav-container">
		<div class="brand">
			<!-- svelte-ignore a11y_invalid_attribute -->
			<a href="#">
				<img src="src/lib/assets/furtherapy_trans.png" alt="Furtherapy logo" />
			</a>
		</div>

		<nav class="nav-links">
			{#each navLinks as link}
				<!-- svelte-ignore a11y_invalid_attribute -->
				<a href="#">{link}</a>
			{/each}
		</nav>
	</div>
</header>

<!-- HERO -->
<section class="hero">
	<div class="hero-inner">
		<h1>
			<span class="fur">FUR</span>
			<span class="therapy">THERAPY</span>
		</h1>
		<p class="subtitle">Canine massage and bodywork</p>
	</div>
</section>

<!-- IMAGE SECTION -->
<section class="hero-image">
	<!-- Placeholder image -->
	<div class="image-placeholder">IMAGE PLACEHOLDER</div>
</section>

<!-- FLOATING CHAT -->
<button class="chat">💬 Let’s Chat</button>

<style global>
	/* ----------------- RESET ----------------- */
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
		background: #0b0d14;
		color: #ffffff;
		line-height: 1.65;
	}

	/* ----------------- NAVBAR ----------------- */
	.navbar {
		background: #000000;
		height: 64px;
		display: flex;
		align-items: center;
	}

	.nav-container {
		max-width: 1200px;
		width: 100%;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.brand {
		display: flex;
		align-items: center;
	}

	.brand img {
		height: 42px; 
		width: auto;
		object-fit: contain;
		display: block;
	}

	.nav-links a {
		color: #fff;
		text-decoration: none;
		font-size: 0.9rem;
		margin-left: 1.5rem;
	}

	.nav-links a:hover {
		text-decoration: underline;
	}

	/* ----------------- HERO ----------------- */
	.hero {
		background: #f68b1f;
		height: 420px;
		display: flex;
		align-items: center;
	}

	.hero-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.hero h1 {
		font-size: 6rem;
		font-weight: 800;
		line-height: 1;
		letter-spacing: 2px;
	}

	.hero h1 .therapy {
		font-weight: 300;
		margin-left: 0.5rem;
	}

	.subtitle {
		font-size: 2rem;
		margin-top: 1rem;
		font-weight: 300;
	}

	/* ----------------- IMAGE SECTION ----------------- */
	.hero-image {
		width: 100%;
		height: 320px;
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		background: #ccc;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		letter-spacing: 2px;
		color: #555;
	}

	/* ----------------- CHAT BUTTON ----------------- */
	.chat {
		position: fixed;
		right: 1.5rem;
		bottom: 1.5rem;
		background: #e06f00;
		color: white;
		border: none;
		padding: 0.9rem 1.2rem;
		border-radius: 6px;
		font-size: 0.9rem;
		cursor: pointer;
		box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
	}

	.chat:hover {
		background: #c86100;
	}

	/* ----------------- RESPONSIVE ----------------- */
	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}

		.hero {
			height: 320px;
		}

		.hero h1 {
			font-size: 3.5rem;
		}

		.subtitle {
			font-size: 1.3rem;
		}
	}
</style>
