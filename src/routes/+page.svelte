<script>
	const navLinks = ['Home', 'About', 'Services', 'Education', 'Contact'];
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
				<!-- svelte-ignore a11y_invalid_attribute -->
				<a href="#">{link}</a>
			{/each}
		</nav>
	</div>
</header>

<!-- HERO -->
<section class="hero">
	<div class="hero-inner">
		<h1 class="title">HOOK TEXT</h1>
		<p class="subtitle">Canine massage and bodywork</p>
	</div>
</section>

<!-- IMAGE SECTION -->
<section class="hero-image">
	<!-- Placeholder image -->
	<div class="image-placeholder">IMAGE PLACEHOLDER</div>
</section>

<section class="hero">
	<div class="hero-inner">
		<h1 class="title">PRICING GUIDE</h1>
		<p class="subtitle">TEXT</p>
	</div>
</section>

<section class="hero">
	<div class="hero-inner">
		<h1 class="title">PLACEHOLDER</h1>
		<p class="subtitle">TEXT</p>
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
		font-family:
			system-ui,
			'Segoe UI',
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
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
		height: 45px; 
		width: auto;
		object-fit: contain;
		display: block;
	}

	.nav-links a {
		color: #fff;
		text-decoration: none;
		font-weight: 800;
		font-size: 1.5rem;
		margin-left: 1.5rem;
	}

	.nav-links a:hover {
		text-decoration: underline;
	}

	/* ----------------- HERO ----------------- */
	.hero {
		height: 420px;
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


	/* ----------------- RESPONSIVE ----------------- */
	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}

		.hero {
			height: 320px;
		}

		.subtitle {
			font-size: 1.3rem;
		}
	}
</style>
