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

	const testimonials = [
		{ quote: 'Testimony 1', client: 'Name', pet: 'Pet' },
		{ quote: 'Testimony 2', client: 'Name', pet: 'Pet' },
		{ quote: 'Testimony 3', client: 'Name', pet: 'Pet' }
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

<!-- HERO -->
<section class="hero" id="about">
	<div class="hero-inner">
		<div class="hero-content">
			<div class="hero-text">
				<h1 class="title">Marisa Du Toit <br /> Certified Canine Massage Practitioner</h1>
				<p class="subtitle">Helping dogs live their best lives through therapeutic massage and bodywork</p>
			</div>
			<div class="hero-image">
				<img src="image-3.jpg" alt="Marisa Du Toit" />
			</div>
		</div>
	</div>
</section>

<!-- ABOUT MYSELF -->
<section class="about-section">
	<div class="container">
		<h2>About Myself</h2>
		<div class="about-content">
			<p>
				Welcome to FurTherapy. I am Marisa, a fully qualified and Nationally Board Certified Canine
				Massage Practitioner (NBCAAM) and proud to be the instructor for the Canis Bodyworks
				Mentorship Program within New Zealand.
			</p>
			<p>
				I began my professional career with a degree in Health Science and a certificate in
				Homeopathy, followed by a Graduate Diploma in Teaching and a Conservation and Environmental
				Science qualification. Having always had a love for animals, I decided to follow my true
				passion - working with dogs and their people.
			</p>
			<p>
				When my own dogs began to face age-related health issues including arthritis, ligament
				injuries, and immune disorders, my desire to help them encouraged me to research restorative
				and preventative care. The positive effects I saw in my own dogs far exceeded my
				expectations, and I wanted all dogs to experience this - and for pet parents to feel
				empowered to support their furry family members too.
			</p>
		</div>
	</div>
</section>

<!-- CERTIFICATIONS -->
<section class="certifications-section">
	<div class="container">
		<h2>Certifications & Qualifications</h2>
		<div class="cert-grid">
			<div class="cert-card">
				<div class="cert-image">
					<img src="nbcaam.png" alt="NBCAAM National Certification in Canine Massage" />
				</div>
				<h3>NBCAAM Certified</h3>
				<p>National Certification in Canine Massage — Certificate No. M-309-20</p>
			</div>
			<div class="cert-card">
				<div class="cert-image">
					<img src="instructor.jpg" alt="Canis Bodyworks Certificate of Completion" />
				</div>
				<h3>Canis Bodyworks Instructor</h3>
				<p>300-Hour Hands-On Canine Massage Mentorship Program — New Zealand</p>
			</div>
			<div class="cert-card">
				<div class="cert-image cert-image--placeholder">
					<div class="image-placeholder"></div>
				</div>
				<h3>Academic Background</h3>
				<p>Health Science, Homeopathy, Graduate Diploma in Teaching, Conservation & Environmental Science</p>
			</div>
		</div>
	</div>
</section>

<!-- WHAT I DO -->
<section class="services-section">
	<div class="container">
		<h2>What I Do</h2>
		<div class="service-intro">
			<p>
				I provide therapeutic massage and bodywork for dogs using deliberate and focused touch
				techniques. Through a range of movements at varying pressures, I manipulate soft tissues
				including muscles, tendons, ligaments, fascia, and connective tissue to promote healing and
				wellbeing.
			</p>
		</div>
		<div class="benefits-grid">
			<div class="benefit-column">
				<h3>Physical Benefits</h3>
				<ul>
					<li>Prevents sporting injuries and maintains optimal physical shape</li>
					<li>Maintains mobility in older or recuperating pets</li>
					<li>Treats and prevents painful trigger points</li>
					<li>Increases flexibility and ensures joint health</li>
					<li>Improves balance, posture and overall performance</li>
				</ul>
			</div>
			<div class="benefit-column">
				<h3>Mental & Emotional Benefits</h3>
				<ul>
					<li>Promotes relaxation and decreases hyperactivity</li>
					<li>Calms the mind and reduces anxiety-related issues</li>
					<li>Stimulates release of dopamine and serotonin</li>
					<li>Reduces cortisol (stress hormone) levels</li>
					<li>Creates feelings of safety and wellbeing</li>
				</ul>
			</div>
		</div>
		<div class="who-benefits">
			<h3>Who Can Benefit</h3>
			<p>
				Therapeutic massage can be used at all life stages and is beneficial for sporting dogs,
				senior pets, rescue animals in rehabilitation, and any dog you want to keep healthy, happy,
				and well-balanced.
			</p>
		</div>
	</div>
</section>

<!-- TESTIMONIALS -->
<section class="testimonials-section">
	<div class="container">
		<h2>What Clients Say</h2>
		<div class="testimonials-grid">
			{#each testimonials as testimonial}
				<div class="testimonial-card">
					<p class="quote">"{testimonial.quote}"</p>
					<p class="client-info">— {testimonial.client} & {testimonial.pet}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA -->
<section class="cta-section">
	<div class="container">
		<h2>Ready to Help Your Dog Live Their Best Life?</h2>
		<p>Get in touch to learn more about how therapeutic massage can benefit your furry friend.</p>
		<button class="cta-button" on:click={() => navigateTo('/contact')}>Get in Touch</button>
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

	/* --- HERO --- */
	.hero { background: #2a2a2a; padding: 4rem 0; }
	.hero-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
	.hero-content { display: flex; align-items: center; justify-content: space-between; gap: 3rem; }
	.hero-text { flex: 1; }
	.hero-image { flex: 0 0 320px; }
	.hero-image img {
		width: 100%; height: 380px; object-fit: cover;
		border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);
	}
	.title    { font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; color: #f68b1f; line-height: 1.2; }
	.subtitle { font-size: 1.3rem; font-weight: 300; color: #e0e0e0; }

	/* --- SECTIONS --- */
	.about-section,
	.certifications-section,
	.services-section,
	.testimonials-section,
	.cta-section { padding: 4rem 0; }

	.container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

	h2 { font-size: 2.2rem; color: #f68b1f; margin-bottom: 2rem; text-align: center; }
	h3 { font-size: 1.5rem; color: #f68b1f; margin-bottom: 1rem; }

	/* --- ABOUT --- */
	.about-section { background: #1f1f1f; }
	.about-content p { margin-bottom: 1.5rem; font-size: 1.1rem; line-height: 1.8; }
	.about-content p:last-child { margin-bottom: 0; }

	/* --- CERTIFICATIONS --- */
	.certifications-section { background: #2a2a2a; }
	.cert-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
	.cert-card {
		background: #1f1f1f; padding: 2rem; border-radius: 8px;
		text-align: center; transition: transform 0.3s ease;
	}
	.cert-card:hover { transform: translateY(-4px); }
	.cert-image { margin-bottom: 1.5rem; }
	.cert-image img {
		width: 100%; height: 200px; object-fit: contain;
		background: #fff; padding: 1rem; border-radius: 4px;
	}
	.cert-image--placeholder .image-placeholder {
		width: 100%; height: 200px; background: #2a2a2a;
		border-radius: 4px; border: 2px dashed #444;
	}
	.cert-card h3 { margin-bottom: 0.5rem; }
	.cert-card p  { color: #b0b0b0; font-size: 0.95rem; }

	/* --- WHAT I DO --- */
	.services-section { background: #1f1f1f; }
	.service-intro { font-size: 1.1rem; text-align: center; max-width: 900px; margin: 0 auto 3rem; }
	.benefits-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 3rem; margin-bottom: 3rem; }
	.benefit-column ul { list-style: none; padding: 0; }
	.benefit-column li {
		padding: 0.75rem 0 0.75rem 1.5rem; position: relative;
		line-height: 1.6; border-bottom: 1px solid rgba(255,255,255,0.06);
	}
	.benefit-column li:last-child { border-bottom: none; }
	.benefit-column li::before { content: '✓'; position: absolute; left: 0; color: #f68b1f; font-weight: bold; }
	.who-benefits {
		background: #2a2a2a; padding: 2rem; border-radius: 8px; border-left: 4px solid #f68b1f;
	}
	.who-benefits h3 { margin-top: 0; }
	.who-benefits p  { font-size: 1.1rem; margin: 0; }

	/* --- TESTIMONIALS --- */
	.testimonials-section { background: #2a2a2a; }
	.testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
	.testimonial-card { background: #1f1f1f; padding: 2rem; border-radius: 8px; border-left: 4px solid #f68b1f; }
	.quote       { font-style: italic; font-size: 1.1rem; margin-bottom: 1rem; line-height: 1.7; }
	.client-info { color: #b0b0b0; font-size: 0.95rem; text-align: right; }

	/* --- CTA --- */
	.cta-section { background: #f68b1f; text-align: center; color: #1f1f1f; }
	.cta-section h2 { color: #1f1f1f; }
	.cta-section p  { font-size: 1.2rem; margin-bottom: 2rem; }
	.cta-button {
		background: #1f1f1f; color: #fff; border: none;
		padding: 1rem 3rem; font-size: 1.2rem; font-weight: 700; font-family: inherit;
		border-radius: 4px; cursor: pointer; transition: transform 0.2s ease;
	}
	.cta-button:hover { transform: scale(1.05); }

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
		.subtitle { font-size: 1.15rem; }
		h2        { font-size: 1.9rem; }
		h3        { font-size: 1.3rem; }

		.hero { padding: 3rem 0; }
		.hero-image { flex: 0 0 280px; }
		.hero-image img { height: 320px; }

		.about-section, .certifications-section,
		.services-section, .testimonials-section, .cta-section { padding: 3.5rem 0; }

		.about-content p { font-size: 1rem; }
		.service-intro   { font-size: 1rem; }
		.who-benefits p  { font-size: 1rem; }
		.cta-section p   { font-size: 1.1rem; }
	}

	/* --- Mobile (≤ 767px) --- */
	@media (max-width: 767px) {
		.title    { font-size: 1.65rem; line-height: 1.25; }
		.subtitle { font-size: 1rem; margin-top: 0.75rem; }
		h2        { font-size: 1.6rem; margin-bottom: 1.5rem; }
		h3        { font-size: 1.2rem; margin-bottom: 0.75rem; }

		/* Stack hero: image above text on mobile */
		.hero { padding: 2.5rem 0; }
		.hero-content { flex-direction: column-reverse; gap: 1.75rem; }
		.hero-text    { text-align: center; }
		.hero-image   { flex: 0 0 auto; width: 100%; max-width: 400px; margin: 0 auto; }
		.hero-image img { height: 260px; }

		.about-section, .certifications-section,
		.services-section, .testimonials-section, .cta-section { padding: 3rem 0; }

		.container { padding: 0 1.25rem; }

		.about-content p { font-size: 0.975rem; line-height: 1.75; }

		.cert-grid, .benefits-grid, .testimonials-grid { grid-template-columns: 1fr; gap: 1.25rem; }
		.cert-card { padding: 1.5rem; }
		.cert-image img { height: 160px; }
		.cert-image--placeholder .image-placeholder { height: 160px; }
		.cert-card p { font-size: 0.9rem; }

		.service-intro { font-size: 0.975rem; margin-bottom: 2rem; }
		.benefit-column li { font-size: 0.9375rem; }
		.who-benefits { padding: 1.5rem; }
		.who-benefits p { font-size: 0.975rem; }

		.quote       { font-size: 1rem; }
		.client-info { font-size: 0.875rem; }
		.testimonial-card { padding: 1.5rem; }

		.cta-section p { font-size: 1rem; margin-bottom: 1.5rem; }
		.cta-button { padding: 0.9rem 2rem; font-size: 1.1rem; width: 100%; max-width: 280px; }
	}

	/* --- Small phones (≤ 479px) --- */
	@media (max-width: 479px) {
		.nav-container { padding: 0 1rem; }
		.logo-placeholder { width: 34px; height: 34px; font-size: 0.875rem; }
		.mobile-menu button { font-size: 1rem; padding: 0.85rem 1.25rem; }

		.title    { font-size: 1.4rem; }
		.subtitle { font-size: 0.9375rem; }
		h2        { font-size: 1.4rem; }

		.hero { padding: 2rem 0; }
		.hero-image img { height: 220px; }

		.container { padding: 0 1rem; }

		.about-section, .certifications-section,
		.services-section, .testimonials-section, .cta-section { padding: 2.5rem 0; }

		.cert-card { padding: 1.25rem; }
		.cert-image img { height: 140px; }
		.cert-image--placeholder .image-placeholder { height: 140px; }

		.who-benefits { padding: 1.25rem; }
		.cta-button   { width: 100%; max-width: 260px; font-size: 1rem; }
	}
</style>