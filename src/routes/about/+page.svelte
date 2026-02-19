<script>
	const navLinks = [
		{ name: 'Home', route: '/' },
		{ name: 'About', route: '/about' },
		{ name: 'Services', route: '/services' },
		{ name: 'Education', route: '/education' },
		{ name: 'Contact', route: '/contact' }
	];

	// Set this to the current page route
	const currentRoute = '/about';

	/**
	 * @param {string} route
	 */
	function navigateTo(route) {
		window.location.href = route;
	}

	// Placeholder testimonials
	const testimonials = [
		{
			quote: 'Testimony 1',
			client: 'Name',
			pet: 'Pet'
		},
		{
			quote: 'Testimony 2',
			client: 'Name',
			pet: 'Pet'
		},
		{
			quote: 'Testimony 3',
			client: 'Name',
			pet: 'Pet'
		}
	];
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
				<h1 class="title">Marisa Du Toit <br /> Certified Canine Massage Practitioner</h1>
				<p class="subtitle">
					Helping dogs live their best lives through therapeutic massage and bodywork
				</p>
			</div>
			<div class="hero-image">
				<img src="image-3.jpg" alt="about" />
			</div>
		</div>
	</div>
</section>

<!-- ABOUT MYSELF SECTION -->
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

<!-- CERTIFICATIONS SECTION -->
<section class="certifications-section">
	<div class="container">
		<h2>Certifications & Qualifications</h2>
		<div class="cert-grid">
			<div class="cert-card">
				<div class="cert-image">
					<img src="placeholder-cert1.jpg" alt="NBCAAM Certification" />
				</div>
				<h3>NBCAAM Certified</h3>
				<p>Nationally Board Certified Animal Acupressure & Massage</p>
			</div>
			<div class="cert-card">
				<div class="cert-image">
					<img src="placeholder-cert2.jpg" alt="Canis Bodyworks" />
				</div>
				<h3>Canis Bodyworks Instructor</h3>
				<p>Mentorship Program - New Zealand</p>
			</div>
			<div class="cert-card">
				<div class="cert-image">
					<img src="placeholder-cert3.jpg" alt="Academic qualifications" />
				</div>
				<h3>Academic Background</h3>
				<p>
					Health Science, Homeopathy, Graduate Diploma in Teaching, Conservation & Environmental
					Science
				</p>
			</div>
		</div>
	</div>
</section>

<!-- WHAT I DO SECTION -->
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

<!-- TESTIMONIALS SECTION -->
<section class="testimonials-section">
	<div class="container">
		<h2>What Clients Say</h2>
		<div class="testimonials-grid">
			{#each testimonials as testimonial}
				<div class="testimonial-card">
					<p class="quote">"{testimonial.quote}"</p>
					<p class="client-info">- {testimonial.client} & {testimonial.pet}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CALL TO ACTION -->
<section class="cta-section">
	<div class="container">
		<h2>Ready to Help Your Dog Live Their Best Life?</h2>
		<p>Get in touch to learn more about how therapeutic massage can benefit your furry friend.</p>
		<button class="cta-button" on:click={() => navigateTo('/contact')}>Get in Touch</button>
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
		background: #2a2a2a;
		padding: 4rem 0;
	}

	.hero-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.hero-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 3rem;
	}

	.hero-text {
		flex: 1;
	}

	.hero-image {
		flex: 0 0 320px;
	}

	.hero-image img {
		width: 100%;
		height: 380px;
		object-fit: cover;
		border-radius: 12px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
	}
	.title {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		color: #f68b1f;
	}

	.subtitle {
		font-size: 1.3rem;
		font-weight: 300;
		color: #e0e0e0;
	}

	/* ----------------- COMMON SECTION STYLES ----------------- */
	section {
		padding: 4rem 0;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	h2 {
		font-size: 2.2rem;
		color: #f68b1f;
		margin-bottom: 2rem;
		text-align: center;
	}

	h3 {
		font-size: 1.5rem;
		color: #f68b1f;
		margin-bottom: 1rem;
	}

	/* ----------------- ABOUT SECTION ----------------- */
	.about-section {
		background: #1f1f1f;
	}

	.about-content p {
		margin-bottom: 1.5rem;
		font-size: 1.1rem;
		line-height: 1.8;
	}

	/* ----------------- CERTIFICATIONS SECTION ----------------- */
	.certifications-section {
		background: #2a2a2a;
	}

	.cert-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.cert-card {
		background: #1f1f1f;
		padding: 2rem;
		border-radius: 8px;
		text-align: center;
		transition: transform 0.3s ease;
	}

	.cert-image {
		margin-bottom: 1.5rem;
	}

	.cert-image img {
		width: 100%;
		height: 200px;
		object-fit: contain;
		background: #fff;
		padding: 1rem;
		border-radius: 4px;
	}

	.cert-card h3 {
		margin-bottom: 0.5rem;
	}

	.cert-card p {
		color: #b0b0b0;
		font-size: 0.95rem;
	}

	/* ----------------- SERVICES SECTION ----------------- */
	.services-section {
		background: #1f1f1f;
	}

	.service-intro {
		margin-bottom: 3rem;
		font-size: 1.1rem;
		text-align: center;
		max-width: 900px;
		margin-left: auto;
		margin-right: auto;
	}

	.benefits-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 3rem;
		margin-bottom: 3rem;
	}

	.benefit-column ul {
		list-style: none;
		padding: 0;
	}

	.benefit-column li {
		padding: 0.75rem 0;
		padding-left: 1.5rem;
		position: relative;
		line-height: 1.6;
	}

	.benefit-column li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: #f68b1f;
		font-weight: bold;
	}

	.who-benefits {
		background: #2a2a2a;
		padding: 2rem;
		border-radius: 8px;
		border-left: 4px solid #f68b1f;
	}

	.who-benefits h3 {
		margin-top: 0;
	}

	.who-benefits p {
		font-size: 1.1rem;
		margin: 0;
	}

	/* ----------------- TESTIMONIALS SECTION ----------------- */
	.testimonials-section {
		background: #2a2a2a;
	}

	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.testimonial-card {
		background: #1f1f1f;
		padding: 2rem;
		border-radius: 8px;
		border-left: 4px solid #f68b1f;
	}

	.quote {
		font-style: italic;
		font-size: 1.1rem;
		margin-bottom: 1rem;
		line-height: 1.7;
	}

	.client-info {
		color: #b0b0b0;
		font-size: 0.95rem;
		text-align: right;
	}

	/* ----------------- CTA SECTION ----------------- */
	.cta-section {
		background: #f68b1f;
		text-align: center;
		color: #1f1f1f;
	}

	.cta-section h2 {
		color: #1f1f1f;
	}

	.cta-section p {
		font-size: 1.2rem;
		margin-bottom: 2rem;
	}

	.cta-button {
		background: #1f1f1f;
		color: #fff;
		border: none;
		padding: 1rem 3rem;
		font-size: 1.2rem;
		font-weight: 700;
		border-radius: 4px;
		cursor: pointer;
		transition: transform 0.2s ease;
	}

	.cta-button:hover {
		transform: scale(1.05);
	}

	/* ----------------- RESPONSIVE ----------------- */
	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}

		.hero-content {
			flex-direction: column-reverse;
			text-align: center;
		}

		.hero-image {
			flex: 0 0 200px;
		}

		.title {
			font-size: 1.8rem;
		}

		.subtitle {
			font-size: 1.1rem;
		}

		h2 {
			font-size: 1.8rem;
		}

		.cert-grid,
		.benefits-grid,
		.testimonials-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
