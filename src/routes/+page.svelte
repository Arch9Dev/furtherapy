<script lang="ts">
	
	// Three source photos, animated as a seamless looping strip further down.
	const slides = ['Dog1.png', 'Dog2.png', 'Dog3.png'];

	const services = [
		{
			title: 'Relaxation Bodywork',
			description:
				"Therapeutic massage that stimulates the body's natural rest-and-recovery response — helping relieve pain and supporting physical, emotional and mental wellbeing.",
			image: 'Relaxation.jpg'
		},
		{
			title: 'Myofascial Trigger Point Therapy',
			description:
				'Targeted compression techniques that help release painful trigger points, improving blood flow, range of motion and comfort.',
			image: 'Myofascial.jpg'
		},
		{
			title: 'Lymphatic Massage',
			description:
				'A very gentle technique that encourages healthy lymphatic flow — supportive before and after surgery, injury or illness.',
			image: 'Lymphatic.jpg'
		},
		{
			title: 'Orthopaedic Friction',
			description:
				'A rehabilitation technique for tendon and ligament injuries, helping reduce scar tissue formation and support healing.',
			image: null
		}
	];

</script>

<svelte:head>
	<title>FurTherapy | Canine Massage &amp; Bodywork, Auckland</title>
	<meta
		name="description"
		content="FurTherapy is a Certified Canine Massage Practitioner (NBCAAM) providing professional, personalised canine massage and bodywork, based in Mission Bay, Auckland."
	/>
</svelte:head>

<main>
	<!-- ================================ HERO ================================ -->
	<section class="hero" aria-labelledby="hero-heading">
		<div class="hero-inner">
			<div class="hero-copy">
				<p class="eyebrow">Canine Massage &amp; Bodywork · Mission Bay, Auckland</p>
				<h1 id="hero-heading">Helping dogs move better, feel better, and live better.</h1>
				<p class="hero-sub">
					Professional canine massage and bodywork, tailored to your dog's individual needs —
					provided by a Nationally Board Certified Practitioner (NBCAAM).
				</p>
				<div class="hero-actions">
					<a
						href="/booking"
						class="btn-primary"
					>
						Book a Session
					</a>
					<a href="#what-is-furtherapy" class="btn-secondary">Explore FurTherapy</a>
				</div>
			</div>

			<div class="hero-visual">
				<div class="hero-image-main">
					<img src="Dog3.png" alt="A dog receiving therapeutic bodywork from FurTherapy" />
				</div>
				<div class="hero-image-accent">
					<img src="Dog1.png" alt="" aria-hidden="true" />
				</div>
				<div class="hero-badge">
					<img src="nbcaam.png" alt="" aria-hidden="true" />
					<span>NBCAAM Certified Practitioner</span>
				</div>
			</div>
		</div>
	</section>

	<!-- ========================== QUICK VALUE STRIP ========================== -->
	<section class="value-strip" aria-label="FurTherapy at a glance">
		<div class="value-strip-inner">
			<div class="value-item">
				<span class="value-icon" aria-hidden="true">✓</span>
				<span>Certified Canine Massage Practitioner</span>
			</div>
			<div class="value-item">
				<span class="value-icon" aria-hidden="true">✓</span>
				<span>Personalised, Dog-by-Dog Care</span>
			</div>
			<div class="value-item">
				<span class="value-icon" aria-hidden="true">✓</span>
				<span>Mobile Service — Mission Bay &amp; Beyond</span>
			</div>
		</div>
	</section>

	<!-- ========================= WHAT IS FURTHERAPY ========================= -->
	<section class="intro" id="what-is-furtherapy" aria-labelledby="intro-heading">
		<div class="intro-inner">
			<div class="intro-image">
				<img src="Relaxation.jpg" alt="A relaxed dog during a FurTherapy bodywork session" />
			</div>
			<div class="intro-copy">
				<p class="eyebrow">What Is FurTherapy?</p>
				<h2 id="intro-heading">More than massage — it's care designed around your dog.</h2>
				<p>
					FurTherapy provides therapeutic massage and bodywork for dogs using deliberate, focused
					touch. Through a range of movements at varying pressures, soft tissues — including
					muscles, tendons, ligaments, fascia and connective tissue — are worked to support
					healing and wellbeing.
				</p>
				<p>
					Every dog is treated as an individual. Sessions are shaped by their history, their
					movement, and how they're feeling on the day — never a one-size-fits-all routine.
				</p>
			</div>
		</div>
	</section>

	<!-- =============================== BENEFITS ============================== -->
	<section class="benefits" aria-labelledby="benefits-heading">
		<div class="benefits-inner">
			<div class="section-heading">
				<p class="eyebrow">Benefits</p>
				<h2 id="benefits-heading">Why dog owners choose bodywork</h2>
			</div>
			<div class="benefits-grid">
				<div class="benefit-card">
					<h3>Physical Benefits</h3>
					<ul>
						<li>Prevents sporting injuries and maintains optimal physical shape</li>
						<li>Maintains mobility in older or recuperating pets</li>
						<li>Treats and prevents painful trigger points</li>
						<li>Increases flexibility and ensures joint health</li>
						<li>Improves balance, posture and overall performance</li>
					</ul>
				</div>
				<div class="benefit-card">
					<h3>Mental &amp; Emotional Benefits</h3>
					<ul>
						<li>Promotes relaxation and decreases hyperactivity</li>
						<li>Calms the mind and reduces anxiety-related issues</li>
						<li>Stimulates release of dopamine and serotonin</li>
						<li>Reduces cortisol (stress hormone) levels</li>
						<li>Creates feelings of safety and wellbeing</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- ============================ WHO CAN BENEFIT =========================== -->
	<section class="who-benefits" aria-labelledby="who-heading">
		<div class="who-inner">
			<div class="section-heading">
				<p class="eyebrow">Who It's For</p>
				<h2 id="who-heading">Could FurTherapy be right for your dog?</h2>
				<p class="section-sub">
					Therapeutic massage can be used at all life stages — beneficial for sporting dogs,
					senior pets, rescue animals in rehabilitation, and any dog you want to keep healthy,
					happy and well-balanced.
				</p>
			</div>
			<div class="who-grid">
				<div class="who-card">
					<h3>Senior &amp; Aging Dogs</h3>
					<p>Supporting comfort and mobility as dogs get older.</p>
				</div>
				<div class="who-card">
					<h3>Sporting &amp; Active Dogs</h3>
					<p>Helping maintain physical shape and prevent overuse injuries.</p>
				</div>
				<div class="who-card">
					<h3>Rescue Dogs in Rehabilitation</h3>
					<p>Gentle, trust-building support during recovery.</p>
				</div>
				<div class="who-card">
					<h3>Everyday Wellness</h3>
					<p>For any dog you want to keep healthy, happy and balanced.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ============================== HOW IT WORKS ============================ -->
	<section class="how-it-works" aria-labelledby="how-heading">
		<div class="how-inner">
			<div class="section-heading">
				<p class="eyebrow">How It Works</p>
				<h2 id="how-heading">What happens when you book</h2>
			</div>
			<ol class="how-steps">
				<li>
					<span class="how-number">01</span>
					<h3>Book</h3>
					<p>Choose an appointment time that suits you and your dog.</p>
				</li>
				<li>
					<span class="how-number">02</span>
					<h3>Assessment</h3>
					<p>
						Intake and case history, gait observation, trust-building and hands-on assessment
						as appropriate.
					</p>
				</li>
				<li>
					<span class="how-number">03</span>
					<h3>Bodywork</h3>
					<p>An individualised therapeutic massage and bodywork session, tailored to your dog.</p>
				</li>
				<li>
					<span class="how-number">04</span>
					<h3>Ongoing Care</h3>
					<p>
						Discuss a suitable routine going forward, including the option of a discounted
						5-session package.
					</p>
				</li>
			</ol>
		</div>
	</section>

	<!-- ============================ PHOTO SCROLLER ============================ -->
	<section class="hero-image" aria-label="Photo gallery of dogs treated by FurTherapy">
		<div class="slider">
			<div class="slide-track">
				{#each slides as src}
					<div class="slide"><img {src} alt="" /></div>
				{/each}
				{#each slides as src}
					<div class="slide" aria-hidden="true"><img {src} alt="" /></div>
				{/each}
			</div>
		</div>
	</section>

	<!-- =============================== MEET MARISA ============================ -->
	<section class="meet" aria-labelledby="meet-heading">
		<div class="meet-inner">
			<div class="meet-image">
				<img src="image-3.jpg" alt="Marisa Du Toit, Certified Canine Massage Practitioner" />
			</div>
			<div class="meet-copy">
				<p class="eyebrow">Meet Your Practitioner</p>
				<h2 id="meet-heading">Marisa Du Toit</h2>
				<p class="meet-title">Certified Canine Massage Practitioner</p>
				<p>
					I am Marisa, a fully qualified and Nationally Board Certified Canine Massage
					Practitioner (NBCAAM), and proud to be the instructor for the Canis Bodyworks
					Mentorship Program within New Zealand.
				</p>
				<ul class="credential-list">
					<li>NBCAAM Certified — National Certification in Canine Massage</li>
					<li>Canis Bodyworks Instructor — 300-Hour Hands-On Mentorship Program, NZ</li>
					<li>Health Science, Homeopathy &amp; Graduate Diploma in Teaching background</li>
				</ul>
				<a href="/about" class="btn-secondary">
					Meet Marisa
				</a>
			</div>
		</div>
	</section>

	<!-- ============================ SERVICES PREVIEW =========================== -->
	<section class="services-preview" aria-labelledby="services-heading">
		<div class="services-preview-inner">
			<div class="section-heading">
				<p class="eyebrow">Services</p>
				<h2 id="services-heading">Therapeutic techniques FurTherapy offers</h2>
			</div>
			<div class="services-grid">
				{#each services as service}
					<div class="service-card">
						<div class="service-card-image" class:placeholder={!service.image}>
							{#if service.image}
								<img src={service.image} alt={service.title} />
							{/if}
						</div>
						<h3>{service.title}</h3>
						<p>{service.description}</p>
					</div>
				{/each}
			</div>
			<div class="services-cta">
				<a
					href="/services"
					class="btn-secondary"
				>
					Explore All Services
				</a>
			</div>
		</div>
	</section>

	<!-- ================================ PRICING ================================ -->
	<section class="pricing" id="services" aria-labelledby="pricing-heading">
		<div class="pricing-inner">
			<div class="section-heading">
				<p class="eyebrow">Pricing</p>
				<h2 id="pricing-heading">Pricing Guide</h2>
			</div>

			<div class="pricing-table" role="table" aria-label="Service pricing">
				<div class="pricing-header" role="row">
					<span role="columnheader">Service</span>
					<span role="columnheader">Duration</span>
					<span role="columnheader">Price</span>
				</div>

				<div class="pricing-row" role="row">
					<span class="row-label" role="cell">Initial Assessment</span>
					<span role="cell"><span class="mobile-label">Duration: </span>60 mins</span>
					<span role="cell"><span class="mobile-label">Price: </span>$150</span>
				</div>
				<div class="pricing-description">
					Intake and case history, gait observation, trust-building and hands-on assessment (as
					appropriate).
				</div>

				<div class="pricing-row" role="row">
					<span class="row-label" role="cell">Follow-up Appointment</span>
					<span role="cell"><span class="mobile-label">Duration: </span>45 mins</span>
					<span role="cell"><span class="mobile-label">Price: </span>$130</span>
				</div>
				<div class="pricing-description">
					Individualised therapeutic massage and bodywork session.
				</div>

				<div class="pricing-row highlight" role="row">
					<span class="row-label" role="cell">Prepaid Special (5 Sessions)</span>
					<span role="cell"><span class="mobile-label">Duration: </span>45 mins/session</span>
					<span class="price-discount" role="cell">
						<span class="old-price"><span class="sr-only">Was </span>$650</span>
						<span class="new-price"><span class="sr-only">Now </span>$600</span>
					</span>
				</div>
				<div class="pricing-description">
					Pre-pay five follow-up sessions and receive a discounted package rate.
				</div>
			</div>

			<div class="book-cta">
				<a href="/booking" class="btn-primary">
					Book a Session
				</a>
			</div>
		</div>
	</section>

	<!-- ================================= TRAVEL ================================ -->
	<section class="travel" id="travel" aria-labelledby="travel-heading">
		<div class="travel-inner">
			<div class="section-heading">
				<p class="eyebrow">Mobile Service</p>
				<h2 id="travel-heading">FurTherapy comes to you.</h2>
			</div>
			<p class="travel-description">
				Based in <strong>Mission Bay, Auckland</strong>. Travel is complimentary within 10km of
				Mission Bay; for appointments further out, a travel fee applies to cover time and
				vehicle costs.
			</p>

			<ul class="travel-list">
				<li><span>0 – 10 km</span><span>Complimentary</span></li>
				<li><span>10 – 20 km</span><span>$20 flat fee</span></li>
				<li><span>20 – 30 km</span><span>$35 flat fee</span></li>
				<li><span>30 – 40 km</span><span>$50 flat fee</span></li>
				<li><span>Over 40 km</span><span>$1.20/km, return trip rate</span></li>
			</ul>

			<p class="travel-note">
				Travel fees are confirmed prior to booking. If you're located further away, consider
				booking multiple dogs in one visit to share the travel cost.
			</p>
		</div>
	</section>

	<!-- =============================== FINAL CTA =============================== -->
	<section class="final-cta" aria-labelledby="final-cta-heading">
		<div class="final-cta-inner">
			<h2 id="final-cta-heading">Help your dog feel their best.</h2>
			<p>FurTherapy offers personalised canine massage and bodywork, tailored to your dog.</p>
			<div class="final-cta-actions">
				<a
					href="/booking"
					class="btn-primary"
				>
					Book a Session
				</a>
				<a
					href="/contact"
					class="btn-secondary btn-secondary-light"
				>
					Get in Touch
				</a>
			</div>
		</div>
	</section>
</main>

<style global>
	/* ----------------- LOCAL CUSTOM PROPERTIES ----------------- */
	:root {
		--slide-w: 320px;
		--slide-gap: 2rem;
	}

	/* ----------------- SHARED TYPOGRAPHY ----------------- */
	.eyebrow {
		display: inline-block;
		font-size: 0.85rem;
		font-weight: 800;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-orange);
		margin-bottom: 0.9rem;
	}

	h1 {
		font-size: 3.1rem;
		font-weight: 800;
		line-height: 1.15;
		letter-spacing: -0.01em;
	}

	h2 {
		font-size: 2.2rem;
		font-weight: 800;
		line-height: 1.2;
	}

	h3 {
		font-size: 1.25rem;
		font-weight: 800;
		line-height: 1.3;
	}

	.section-heading {
		max-width: 720px;
		margin: 0 auto 3rem;
		text-align: center;
	}

	.section-sub {
		margin-top: 1rem;
		font-size: 1.05rem;
		color: var(--color-text-muted);
	}

	main {
		overflow-x: hidden;
	}

	/* ----------------- HERO ----------------- */
	.hero {
		background: linear-gradient(160deg, var(--color-surface) 0%, var(--color-bg) 60%);
		padding: 5rem 2rem;
	}

	.hero-inner {
		max-width: var(--container-max);
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1.05fr 0.95fr;
		gap: 3.5rem;
		align-items: center;
	}

	.hero-sub {
		font-size: 1.15rem;
		color: var(--color-text-muted);
		max-width: 46ch;
		margin-top: 1.2rem;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 2.2rem;
	}

	.hero-visual {
		position: relative;
		min-height: 380px;
	}

	.hero-image-main {
		width: 78%;
		aspect-ratio: 4 / 5;
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-lg);
	}
	.hero-image-main img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.hero-image-accent {
		position: absolute;
		right: 0;
		bottom: -1.5rem;
		width: 42%;
		aspect-ratio: 1 / 1;
		border-radius: var(--radius-md);
		overflow: hidden;
		border: 5px solid var(--color-bg);
		box-shadow: var(--shadow-md);
	}
	.hero-image-accent img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.hero-badge {
		position: absolute;
		left: -0.5rem;
		top: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.6rem;
		background: var(--color-surface-alt);
		border: 1px solid var(--color-border);
		padding: 0.6rem 1rem 0.6rem 0.6rem;
		border-radius: var(--radius-pill);
		box-shadow: var(--shadow-sm);
		max-width: 230px;
	}
	.hero-badge img {
		width: 34px;
		height: 34px;
		object-fit: contain;
		background: #fff;
		border-radius: 50%;
		padding: 3px;
		flex-shrink: 0;
	}
	.hero-badge span {
		font-size: 0.8rem;
		font-weight: 800;
		line-height: 1.2;
	}

	/* ----------------- BUTTONS ----------------- */
	.btn-primary {
		display: inline-block;
		padding: 0.95rem 2.2rem;
		background: var(--color-orange);
		color: #fff;
		font-weight: 800;
		font-size: 1.05rem;
		border-radius: var(--radius-pill);
		text-decoration: none;
		border: none;
		cursor: pointer;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}
	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 24px rgba(246, 139, 31, 0.4);
	}

	.btn-secondary {
		display: inline-block;
		padding: 0.9rem 2.1rem;
		background: transparent;
		color: #fff;
		font-weight: 800;
		font-size: 1.05rem;
		border-radius: var(--radius-pill);
		text-decoration: none;
		border: 2px solid var(--color-border);
		transition:
			border-color 0.2s ease,
			transform 0.2s ease;
	}
	.btn-secondary:hover {
		border-color: var(--color-orange);
		transform: translateY(-2px);
	}

	.btn-secondary-light {
		border-color: rgba(0, 0, 0, 0.25);
		color: var(--color-bg);
	}
	.btn-secondary-light:hover {
		border-color: var(--color-bg);
	}

	/* ----------------- VALUE STRIP ----------------- */
	.value-strip {
		background: var(--color-surface);
		border-top: 1px solid var(--color-border);
		border-bottom: 1px solid var(--color-border);
	}
	.value-strip-inner {
		max-width: var(--container-max);
		margin: 0 auto;
		padding: 1.6rem 2rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.5rem 2.5rem;
	}
	.value-item {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-weight: 700;
		font-size: 0.98rem;
		color: var(--color-text);
	}
	.value-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: var(--color-orange-tint);
		color: var(--color-orange);
		font-size: 0.8rem;
		font-weight: 900;
		flex-shrink: 0;
	}

	/* ----------------- WHAT IS FURTHERAPY ----------------- */
	.intro {
		padding: 6rem 2rem;
		background: var(--color-bg);
	}
	.intro-inner {
		max-width: var(--container-max);
		margin: 0 auto;
		display: grid;
		grid-template-columns: 0.85fr 1.15fr;
		gap: 3.5rem;
		align-items: center;
	}
	.intro-image {
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-md);
		aspect-ratio: 1 / 1;
	}
	.intro-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.intro-copy p {
		font-size: 1.05rem;
		color: var(--color-text-muted);
		margin-top: 1.1rem;
		max-width: 60ch;
	}
	.intro-copy p:first-of-type {
		margin-top: 1.4rem;
	}

	/* ----------------- BENEFITS ----------------- */
	.benefits {
		padding: 6rem 2rem;
		background: var(--color-surface);
	}
	.benefits-inner {
		max-width: var(--container-max);
		margin: 0 auto;
	}
	.benefits-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
	}
	.benefit-card {
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 2.2rem;
	}
	.benefit-card h3 {
		color: var(--color-orange);
		margin-bottom: 1.2rem;
	}
	.benefit-card ul {
		list-style: none;
	}
	.benefit-card li {
		padding: 0.7rem 0 0.7rem 1.6rem;
		position: relative;
		line-height: 1.55;
		color: var(--color-text-muted);
		border-bottom: 1px solid var(--color-border);
	}
	.benefit-card li:last-child {
		border-bottom: none;
	}
	.benefit-card li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--color-orange);
		font-weight: bold;
	}

	/* ----------------- WHO CAN BENEFIT ----------------- */
	.who-benefits {
		padding: 6rem 2rem;
		background: var(--color-bg);
	}
	.who-inner {
		max-width: var(--container-max);
		margin: 0 auto;
	}
	.who-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
	}
	.who-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-top: 3px solid var(--color-orange);
		border-radius: var(--radius-md);
		padding: 1.8rem 1.5rem;
	}
	.who-card h3 {
		font-size: 1.05rem;
		margin-bottom: 0.6rem;
	}
	.who-card p {
		font-size: 0.92rem;
		color: var(--color-text-muted);
		line-height: 1.5;
	}

	/* ----------------- HOW IT WORKS ----------------- */
	.how-it-works {
		padding: 6rem 2rem;
		background: var(--color-surface);
	}
	.how-inner {
		max-width: var(--container-max);
		margin: 0 auto;
	}
	.how-steps {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.75rem;
		counter-reset: step;
	}
	.how-steps li {
		background: var(--color-bg);
		border-radius: var(--radius-md);
		padding: 1.8rem 1.5rem;
		border: 1px solid var(--color-border);
	}
	.how-number {
		display: block;
		font-size: 1.6rem;
		font-weight: 900;
		color: var(--color-orange);
		margin-bottom: 0.6rem;
	}
	.how-steps h3 {
		margin-bottom: 0.5rem;
	}
	.how-steps p {
		font-size: 0.92rem;
		color: var(--color-text-muted);
		line-height: 1.55;
	}

	/* ----------------- IMAGE SLIDER ----------------- */
	.hero-image {
		padding: 3.5rem 0;
		display: flex;
		align-items: center;
		overflow: hidden;
		background: var(--color-bg);
		border-top: 1px solid var(--color-border);
		border-bottom: 1px solid var(--color-border);
	}

	.slider {
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	/*
		Seamless-loop math:
		There are exactly 3 source images (`slides`), rendered twice in the
		markup (original set + identical duplicate set) = 6 slides total.
		The track must be exactly 2 set-widths wide, and the animation must
		translate by exactly 1 set-width (3 slides), so the duplicate set
		lands precisely where the original set started — no gap, no jump.
	*/
	.slide-track {
		display: flex;
		width: calc((var(--slide-w) + var(--slide-gap)) * 6);
		animation: scroll-slides 25s linear infinite;
	}

	.slide {
		width: var(--slide-w);
		height: 320px;
		flex-shrink: 0;
		margin-right: var(--slide-gap);
		border-radius: var(--radius-md);
		background: var(--color-surface-alt);
		box-shadow: var(--shadow-md);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border: 1px solid var(--color-border);
	}
	.slide img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	@keyframes scroll-slides {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc((var(--slide-w) + var(--slide-gap)) * -3));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.slide-track {
			animation: none;
			transform: translateX(0);
		}
	}

	/* ----------------- MEET MARISA ----------------- */
	.meet {
		padding: 6rem 2rem;
		background: var(--color-bg);
	}
	.meet-inner {
		max-width: var(--container-max);
		margin: 0 auto;
		display: grid;
		grid-template-columns: 0.8fr 1.2fr;
		gap: 3.5rem;
		align-items: center;
	}
	.meet-image {
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-md);
		aspect-ratio: 4 / 5;
	}
	.meet-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.meet-title {
		font-weight: 700;
		color: var(--color-text-muted);
		margin-top: -0.3rem;
		margin-bottom: 1.2rem;
	}
	.meet-copy p {
		font-size: 1.03rem;
		color: var(--color-text-muted);
		max-width: 60ch;
		margin-bottom: 1.5rem;
	}
	.credential-list {
		list-style: none;
		margin-bottom: 1.8rem;
	}
	.credential-list li {
		padding: 0.6rem 0 0.6rem 1.6rem;
		position: relative;
		border-bottom: 1px solid var(--color-border);
		font-size: 0.95rem;
		color: var(--color-text);
	}
	.credential-list li:last-child {
		border-bottom: none;
	}
	.credential-list li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--color-orange);
		font-weight: bold;
	}

	/* ----------------- SERVICES PREVIEW ----------------- */
	.services-preview {
		padding: 6rem 2rem;
		background: var(--color-surface);
	}
	.services-preview-inner {
		max-width: var(--container-max);
		margin: 0 auto;
	}
	.services-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.75rem;
		margin-bottom: 3rem;
	}
	.service-card {
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	.service-card-image {
		aspect-ratio: 4 / 3;
		background: var(--color-surface-alt);
	}
	.service-card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.service-card-image.placeholder {
		background: repeating-linear-gradient(
			135deg,
			var(--color-surface-alt),
			var(--color-surface-alt) 10px,
			var(--color-bg) 10px,
			var(--color-bg) 20px
		);
		position: relative;
	}
	.service-card-image.placeholder::after {
		content: '';
		position: absolute;
		inset: 0;
		margin: auto;
		width: 44px;
		height: 44px;
		border: 3px solid var(--color-orange);
		border-radius: 50%;
	}
	.service-card h3 {
		font-size: 1.05rem;
		padding: 1.3rem 1.3rem 0;
	}
	.service-card p {
		font-size: 0.9rem;
		color: var(--color-text-muted);
		padding: 0.6rem 1.3rem 1.4rem;
		line-height: 1.5;
	}
	.services-cta {
		text-align: center;
	}

	/* ----------------- PRICING ----------------- */
	.pricing {
		padding: 6rem 2rem;
		background: var(--color-bg);
	}

	.pricing-inner {
		max-width: var(--container-max);
		margin: 0 auto;
	}

	.pricing-table {
		margin-top: 1rem;
		background: var(--color-surface-alt);
		border-radius: var(--radius-md);
		overflow: hidden;
		box-shadow: var(--shadow-md);
	}

	.pricing-header,
	.pricing-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		padding: 1.2rem 1.5rem;
		align-items: center;
	}

	.pricing-header {
		background: var(--color-orange);
		font-weight: 800;
	}
	.pricing-row {
		border-top: 1px solid var(--color-border);
	}

	.pricing-description {
		padding: 0 1.5rem 1.2rem;
		font-size: 0.95rem;
		color: var(--color-orange-light);
		border-bottom: 1px solid var(--color-border);
	}

	.highlight {
		background: var(--color-orange-tint);
	}

	.price-discount {
		display: flex;
		gap: 0.6rem;
		align-items: center;
	}

	.old-price {
		text-decoration: line-through;
		color: #aaa;
	}
	.new-price {
		color: var(--color-orange);
		font-weight: 800;
		font-size: 1.15rem;
	}

	.mobile-label {
		display: none;
	}

	/* ----------------- TRAVEL ----------------- */
	.travel {
		padding: 6rem 2rem;
		background: var(--color-surface);
	}

	.travel-inner {
		max-width: 760px;
		margin: 0 auto;
		text-align: center;
	}

	.travel-description {
		margin-top: 0.5rem;
		font-size: 1.05rem;
		color: var(--color-text-muted);
	}

	.travel-list {
		list-style: none;
		margin: 2rem auto 0;
		max-width: 480px;
		background: var(--color-bg);
		border-radius: var(--radius-md);
		overflow: hidden;
		border: 1px solid var(--color-border);
		text-align: left;
	}
	.travel-list li {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.85rem 1.3rem;
		border-bottom: 1px solid var(--color-border);
		font-size: 0.95rem;
	}
	.travel-list li:last-child {
		border-bottom: none;
	}
	.travel-list li span:first-child {
		color: var(--color-text-muted);
	}
	.travel-list li span:last-child {
		font-weight: 700;
		color: var(--color-orange);
	}

	.travel-note {
		margin-top: 1.5rem;
		font-size: 0.9rem;
		color: var(--color-text-faint);
		font-style: italic;
	}

	/* ----------------- BOOK CTA ----------------- */
	.book-cta {
		text-align: center;
		margin-top: 2.5rem;
	}

	/* ----------------- FINAL CTA ----------------- */
	.final-cta {
		padding: 6rem 2rem;
		background: var(--color-orange);
		text-align: center;
	}
	.final-cta-inner {
		max-width: 700px;
		margin: 0 auto;
	}
	.final-cta h2 {
		color: var(--color-bg);
	}
	.final-cta p {
		font-size: 1.15rem;
		color: rgba(27, 27, 27, 0.85);
		margin-top: 1rem;
	}
	.final-cta-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		margin-top: 2.2rem;
	}
	.final-cta .btn-primary {
		background: var(--color-bg);
	}
	.final-cta .btn-primary:hover {
		box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
	}

	/* =================================================================
	   RESPONSIVE
	   ================================================================= */

	/* ---- Tablet (≤ 1024px) ---- */
	@media (max-width: 1024px) {
		h1 {
			font-size: 2.4rem;
		}
		h2 {
			font-size: 1.9rem;
		}

		.hero {
			padding: 3.5rem 1.5rem;
		}
		.hero-inner {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
		.hero-visual {
			order: -1;
			min-height: 300px;
			max-width: 420px;
			margin: 0 auto;
		}

		.intro-inner,
		.meet-inner {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		.intro-image,
		.meet-image {
			max-width: 420px;
			margin: 0 auto;
			aspect-ratio: 16 / 10;
		}

		.benefits-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.who-grid,
		.how-steps,
		.services-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.intro,
		.benefits,
		.who-benefits,
		.how-it-works,
		.meet,
		.services-preview,
		.pricing,
		.travel,
		.final-cta {
			padding: 4rem 1.5rem;
		}

		/* Slider — override custom props for tablet */
		.slide-track {
			--slide-w: 240px;
			--slide-gap: 1.5rem;
		}
		.slide {
			width: 240px;
			height: 240px;
			margin-right: 1.5rem;
		}

		.pricing-header,
		.pricing-row {
			padding: 1rem 1.25rem;
			font-size: 0.95rem;
		}

		.pricing-description {
			padding: 0 1.25rem 1rem;
			font-size: 0.9rem;
		}

		.btn-primary,
		.btn-secondary {
			font-size: 1rem;
			padding: 0.85rem 2rem;
		}
	}

	/* ---- Mobile (≤ 767px) ---- */
	@media (max-width: 767px) {
		h1 {
			font-size: 1.85rem;
			line-height: 1.25;
		}
		h2 {
			font-size: 1.6rem;
		}
		.hero-sub {
			font-size: 1.05rem;
			max-width: none;
		}

		.hero {
			padding: 2.75rem 1.25rem;
		}
		.hero-actions {
			flex-direction: column;
			align-items: stretch;
		}
		.hero-actions .btn-primary,
		.hero-actions .btn-secondary {
			text-align: center;
		}
		.hero-visual {
			min-height: 260px;
		}
		.hero-badge {
			max-width: 190px;
			padding: 0.5rem 0.85rem 0.5rem 0.5rem;
		}
		.hero-badge span {
			font-size: 0.72rem;
		}

		.value-strip-inner {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
			padding: 1.4rem 1.25rem;
		}

		.who-grid,
		.how-steps,
		.services-grid {
			grid-template-columns: 1fr;
		}

		.intro,
		.benefits,
		.who-benefits,
		.how-it-works,
		.meet,
		.services-preview,
		.pricing,
		.travel,
		.final-cta {
			padding: 3rem 1.25rem;
		}

		.section-heading {
			margin-bottom: 2rem;
		}

		.hero-image {
			padding: 2.5rem 0;
		}
		.slide {
			width: 190px;
			height: 190px;
			border-radius: var(--radius-sm);
			margin-right: 1.25rem;
		}
		.slide-track {
			--slide-w: 190px;
			--slide-gap: 1.25rem;
		}

		.pricing-header {
			display: none;
		}

		.mobile-label {
			display: inline;
			font-weight: 700;
			color: var(--color-orange);
		}

		.pricing-row {
			grid-template-columns: 1fr;
			gap: 0.35rem;
			padding: 1rem 1.25rem 0.75rem;
		}

		.row-label {
			font-weight: 800;
			font-size: 1rem;
			margin-bottom: 0.15rem;
		}
		.pricing-description {
			padding: 0 1.25rem 1rem;
			font-size: 0.875rem;
		}
		.price-discount {
			flex-wrap: wrap;
			gap: 0.4rem;
		}
		.new-price {
			font-size: 1.05rem;
		}

		.travel-list li {
			font-size: 0.9rem;
			padding: 0.75rem 1.1rem;
		}

		.final-cta-actions {
			flex-direction: column;
			align-items: stretch;
		}

		.btn-primary,
		.btn-secondary {
			display: block;
			width: 100%;
			max-width: 320px;
			margin: 0 auto;
			text-align: center;
			font-size: 1rem;
			padding: 1rem 1.5rem;
		}
	}

	/* ---- Small phones (≤ 479px) ---- */
	@media (max-width: 479px) {
		h1 {
			font-size: 1.55rem;
		}
		h2 {
			font-size: 1.4rem;
		}

		.hero {
			padding: 2.25rem 1rem;
		}

		.intro,
		.benefits,
		.who-benefits,
		.how-it-works,
		.meet,
		.services-preview,
		.pricing,
		.travel,
		.final-cta {
			padding: 2.5rem 1rem;
		}

		.hero-image {
			padding: 2rem 0;
		}
		.slide {
			width: 155px;
			height: 155px;
			border-radius: var(--radius-sm);
			margin-right: 1rem;
		}
		.slide-track {
			--slide-w: 155px;
			--slide-gap: 1rem;
		}

		.pricing-row {
			padding: 0.85rem 1rem 0.65rem;
		}
		.pricing-description {
			padding: 0 1rem 0.85rem;
		}
		.row-label {
			font-size: 0.95rem;
		}
		.book-cta {
			margin-top: 2rem;
		}
	}
</style>
