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

	const services = [
		{
			id: 'RB',
			title: 'Relaxation Bodywork',
			description:
				"Stress is not only a human condition; animals experience it too. Over-exposure to stress impacts the health of our pets. It can result in the development of chronic physical and psychological conditions. Therapeutic Massage stimulates the parasympathetic nervous system - responsible for 'rest and recovery'. It helps to relieve pain and creates balance (homeostasis) within the body. Relaxation promotes the release of hormones that support physical, emotional and mental well-being.",
			imageAlign: 'right',
			image: 'Relaxation.jpg'
		},
		{
			id: 'TR',
			title: 'Myofascial Trigger Point Therapy',
			description:
				"A Trigger Point is an extremely painful 'bunching' of connective tissue or muscle cells. It can sometimes feel like a hardened band or nodule. They may be caused by acute injuries or can develop over time. Chronic stress, structural/postural imbalances, overuse injuries or nutritional deficiencies are contributing factors. Trigger Points can limit full range of motion and cause muscle dysfunction. They also impact surrounding nerves and blood vessels. This results in hypersensitivity and reduced circulation. The use of specific compression techniques helps 'deactivate' the 'stuck' fibers. Trigger Point Therapy increases blood flow, thereby promoting healing and relieving pain.",
			imageAlign: 'left',
			image: 'Myofascial.jpg'
		},
		{
			id: 'LM',
			title: 'Lymphatic Massage',
			description:
				"The lymphatic system plays a vital role in maintaining fluid balance in the body. It acts as a defensive mechanism by removing toxins from the cells. Manual Lymphatic Massage was developed in the 1930's by Dr. Emil Vodder (a PhD from Denmark). This is a very gentle technique that encourages the flow of lymphatic fluid around the body. The treatment is ideal for those dealing with injury or illness. It has been proven effective both pre-and post-surgery. Fluid trapped in the tissues can compress blood vessels, decreasing cellular nutrition. Removal of waste products promotes wound recovery and prevents scar tissue or adhesions forming. With Lymphatic Massage, we stimulate the healing process, help to relieve pain and reduce the risk of infection.",
			imageAlign: 'right',
			image: 'Lymphatic.jpg'
		},
		{
			id: 'OF',
			title: 'Orthopaedic Friction',
			description:
				"Orthopaedic Friction is a form of rehabilitation massage used to treat injuries to tendons and ligaments. It was first described by orthopaedic surgeon Dr. James Cyriax in the 1940's. He discovered that it is effective in reducing scar tissue formation following trauma. Adhesions (scarring) can result in limited movement and cause pain throughout the body. This technique creates a controlled inflammatory response, encouraging nutrient-rich blood to the tissues. This increase in oxygen promotes healing and provides an analgesic effect.",
			imageAlign: 'left',
			image: null
		}
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

<!-- SERVICES SECTION -->
<section class="services-section">
	<div class="container">
		{#each services as service}
			<div class="service-item" class:reverse={service.imageAlign === 'left'}>
				<div class="service-content">
					<h3>{service.title}</h3>
					<p>{service.description}</p>
				</div>
				<div class="service-image">
					{#if service.image}
						<img src={service.image} alt={service.title} />
					{:else}
						<div class="image-placeholder"></div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- PRICING -->
<section class="pricing" id="pricing">
	<div class="pricing-inner">
		<h1 class="title">Pricing Guide</h1>

		<div class="pricing-table">
			<div class="pricing-header">
				<span>Service</span>
				<span>Duration</span>
				<span>Price</span>
			</div>

			<div class="pricing-row">
				<span class="row-label">Initial Assessment</span>
				<span><span class="mobile-label">Duration: </span>60 mins</span>
				<span><span class="mobile-label">Price: </span>$150</span>
			</div>
			<div class="pricing-description">
				Intake and case history, gait observation, trust-building and hands-on assessment (as appropriate).
			</div>

			<div class="pricing-row">
				<span class="row-label">Follow-up Appointment</span>
				<span><span class="mobile-label">Duration: </span>45 mins</span>
				<span><span class="mobile-label">Price: </span>$130</span>
			</div>
			<div class="pricing-description">
				Individualised therapeutic massage and bodywork session.
			</div>

			<div class="pricing-row highlight">
				<span class="row-label">Prepaid Special (5 Sessions)</span>
				<span><span class="mobile-label">Duration: </span>45 mins/session</span>
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
			<a href="/booking" on:click|preventDefault={() => navigateTo('/booking')} class="btn-primary">
				Book Now
			</a>
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

	.title { font-size: 2.5rem; font-weight: 800; line-height: 1.2; }

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

	.desktop-brand img { height: 45px; }
	.mobile-brand { display: none; }

	.logo-placeholder {
		width: 38px; height: 38px;
		background: rgba(255,255,255,0.25);
		border-radius: 8px;
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
		display: none; flex-direction: column; justify-content: center;
		align-items: center; gap: 5px; background: none; border: none;
		cursor: pointer; padding: 6px; border-radius: 6px; width: 44px; height: 44px;
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
		display: none; flex-direction: column; background: #e07a18;
		width: 100%; padding: 0.5rem 0 1rem;
		position: absolute; top: 80px; left: 0; right: 0;
		z-index: 99; box-shadow: 0 8px 20px rgba(0,0,0,0.3);
		animation: slideDown 0.2s ease;
	}
	.mobile-overlay { display: none; }

	@keyframes slideDown {
		from { opacity: 0; transform: translateY(-8px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	.mobile-menu button {
		background: none; border: none; color: #fff; font-weight: 800;
		font-size: 1.1rem; font-family: inherit; cursor: pointer;
		text-align: left; padding: 0.9rem 2rem; width: 100%;
		border-bottom: 1px solid rgba(255,255,255,0.12);
	}
	.mobile-menu button:last-child { border-bottom: none; }
	.mobile-menu button:hover { background: rgba(255,255,255,0.1); }
	.mobile-menu button.active { color: #1f1f1f; }

	/* --- SERVICES --- */
	.services-section { background: #1f1f1f; padding: 4rem 0; }
	.container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

	.service-item {
		display: flex; gap: 3rem; align-items: flex-start; margin-bottom: 4rem;
	}
	.service-item.reverse { flex-direction: row-reverse; }
	.service-content { flex: 1; }

	h3 { font-size: 1.5rem; color: #f68b1f; margin-bottom: 1.5rem; }
	.service-content p { font-size: 1.1rem; line-height: 1.8; color: #e0e0e0; }

	.service-image { width: 300px; flex-shrink: 0; }
	.service-image img {
		width: 100%; height: 220px; object-fit: cover;
		border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.4);
	}
	.image-placeholder {
		width: 100%; height: 220px; background: #2a2a2a; border-radius: 12px;
	}

	/* --- PRICING --- */
	.pricing { padding: 5rem 2rem; background: #2a2a2a; }
	.pricing-inner { max-width: 1200px; margin: 0 auto; }

	.pricing-table {
		margin-top: 3rem; background: #2a2a2a; border-radius: 12px;
		overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
	}

	.pricing-header, .pricing-row {
		display: grid; grid-template-columns: 2fr 1fr 1fr;
		padding: 1.2rem 1.5rem; align-items: center;
	}
	.pricing-header { background: #f68b1f; font-weight: 800; }
	.pricing-row { border-top: 1px solid rgba(255,255,255,0.1); }
	.pricing-row:hover { background: rgba(255,255,255,0.03); }

	.pricing-description {
		padding: 0 1.5rem 1.2rem; font-size: 0.95rem; color: #f68b1f;
		border-bottom: 1px solid rgba(255,255,255,0.1);
	}

	.highlight { background: rgba(246,139,31,0.08); }

	.mobile-label { display: none; }

	.price-discount { display: flex; gap: 0.6rem; align-items: center; }
	.old-price { text-decoration: line-through; color: #aaa; }
	.new-price { color: #f68b1f; font-weight: 800; font-size: 1.15rem; }

	.pricing-cta { text-align: center; margin-top: 2.5rem; }

	.btn-primary {
		display: inline-block; padding: 0.9rem 2.2rem; background: #f68b1f;
		color: #fff; font-weight: 800; font-size: 1.1rem; border-radius: 50px;
		text-decoration: none; transition: transform 0.2s ease, box-shadow 0.2s ease;
	}
	.btn-primary:hover {
		transform: translateY(-2px); box-shadow: 0 8px 20px rgba(246,139,31,0.4);
	}

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

		.title    { font-size: 2rem; }
		.service-content p { font-size: 1rem; }
		h3        { font-size: 1.3rem; }

		.pricing { padding: 4rem 1.5rem; }
		.pricing-header, .pricing-row { padding: 1rem 1.25rem; font-size: 0.95rem; }
		.pricing-description          { padding: 0 1.25rem 1rem; font-size: 0.875rem; }
	}

	/* --- Mobile (≤ 767px) --- */
	@media (max-width: 767px) {
		.title { font-size: 1.65rem; }
		h3     { font-size: 1.2rem; margin-bottom: 1rem; }

		/* Stack service items */
		.service-item,
		.service-item.reverse { flex-direction: column; gap: 1.5rem; margin-bottom: 3rem; }
		.service-image { width: 100%; }
		.service-image img { height: 200px; }
		.image-placeholder { height: 180px; }
		.service-content p { font-size: 0.975rem; line-height: 1.75; }

		.services-section { padding: 2.5rem 0; }
		.container { padding: 0 1.25rem; }

		/* Pricing table collapse */
		.pricing { padding: 3rem 1.25rem; }
		.pricing-header { display: none; }
		.mobile-label {
			display: inline; font-weight: 700; color: #f68b1f;
		}
		.pricing-row {
			grid-template-columns: 1fr; gap: 0.35rem; padding: 1rem 1.25rem 0.75rem;
		}
		.row-label { font-weight: 800; font-size: 0.975rem; }
		.pricing-description { padding: 0 1.25rem 1rem; font-size: 0.875rem; }
		.price-discount { flex-wrap: wrap; gap: 0.4rem; }

		.btn-primary {
			display: block; width: 100%; max-width: 320px;
			margin: 0 auto; text-align: center; font-size: 1rem; padding: 1rem 1.5rem;
		}
	}

	/* --- Small phones (≤ 479px) --- */
	@media (max-width: 479px) {
		.nav-container  { padding: 0 1rem; }
		.logo-placeholder { width: 34px; height: 34px; font-size: 0.875rem; }
		.mobile-menu button { font-size: 1rem; padding: 0.85rem 1.25rem; }

		.title { font-size: 1.4rem; }
		h3     { font-size: 1.1rem; }

		.service-image img { height: 170px; }
		.image-placeholder { height: 150px; }
		.service-content p { font-size: 0.9375rem; }

		.services-section { padding: 2rem 0; }
		.pricing { padding: 2.5rem 1rem; }
		.pricing-row { padding: 0.85rem 1rem 0.65rem; }
		.pricing-description { padding: 0 1rem 0.85rem; }
	}
</style>