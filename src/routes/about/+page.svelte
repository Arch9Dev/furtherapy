<script lang="ts">
	// Add real client testimonials here and the section will appear automatically.
	// (The old placeholder "Testimony 1/2/3" entries were removed so they don't show publicly.)
	type Testimonial = { quote: string; client: string; pet: string };
	const testimonials: Testimonial[] = [];

	const physical = [
		'Prevents sporting injuries and maintains optimal physical shape',
		'Maintains mobility in older or recuperating pets',
		'Treats and prevents painful trigger points',
		'Increases flexibility and ensures joint health',
		'Improves balance, posture and overall performance'
	];
	const mental = [
		'Promotes relaxation and decreases hyperactivity',
		'Calms the mind and reduces anxiety-related issues',
		'Stimulates release of dopamine and serotonin',
		'Reduces cortisol (stress hormone) levels',
		'Creates feelings of safety and wellbeing'
	];
</script>

<svelte:head>
	<title>About Marisa Du Toit | FurTherapy Canine Massage, Auckland</title>
	<meta
		name="description"
		content="Meet Marisa Du Toit, a Nationally Board Certified Canine Massage Practitioner (NBCAAM) and Canis Bodyworks instructor, providing canine massage and bodywork from Mission Bay, Auckland."
	/>
</svelte:head>

<main>
	<!-- HERO -->
	<section class="page-hero has-image" aria-labelledby="about-heading">
		<div class="container">
			<div>
				<p class="eyebrow">About FurTherapy</p>
				<h1 id="about-heading">Marisa Du Toit</h1>
				<p class="role">Certified Canine Massage Practitioner</p>
				<p class="page-hero-sub">
					Helping dogs live their best lives through therapeutic massage and bodywork.
				</p>
				<div class="hero-actions">
					<a href="/booking" class="btn-primary">Book a Session</a>
					<a href="/contact" class="btn-secondary">Get in Touch</a>
				</div>
			</div>
			<div class="page-hero-image">
				<img src="/image-3.jpg" alt="Marisa Du Toit, Certified Canine Massage Practitioner" />
			</div>
		</div>
	</section>

	<!-- STORY -->
	<section class="section" aria-labelledby="story-heading">
		<div class="container story">
			<div>
				<p class="eyebrow">My Story</p>
				<h2 id="story-heading">Working with dogs and their people</h2>
			</div>
			<div class="prose">
				<p>
					Welcome to FurTherapy. I am Marisa, a fully qualified and Nationally Board Certified
					Canine Massage Practitioner (NBCAAM) and proud to be the instructor for the Canis
					Bodyworks Mentorship Program within New Zealand.
				</p>
				<p>
					I began my professional career with a degree in Health Science and a certificate in
					Homeopathy, followed by a Graduate Diploma in Teaching and a Conservation and
					Environmental Science qualification. Having always had a love for animals, I decided to
					follow my true passion — working with dogs and their people.
				</p>
				<p>
					When my own dogs began to face age-related health issues including arthritis, ligament
					injuries, and immune disorders, my desire to help them encouraged me to research
					restorative and preventative care. The positive effects I saw in my own dogs far exceeded
					my expectations, and I wanted all dogs to experience this — and for pet parents to feel
					empowered to support their furry family members too.
				</p>
			</div>
		</div>
	</section>

	<!-- CREDENTIALS -->
	<section class="section section-alt" aria-labelledby="creds-heading">
		<div class="container">
			<div class="section-heading">
				<p class="eyebrow">Credentials</p>
				<h2 id="creds-heading">Certifications &amp; qualifications</h2>
			</div>
			<div class="cred-grid">
				<article class="cred-card">
					<div class="cred-image">
						<img src="/nbcaam.png" alt="NBCAAM National Certification in Canine Massage" />
					</div>
					<h3>NBCAAM Certified</h3>
					<p>National Certification in Canine Massage — Certificate No. M-309-20</p>
				</article>
				<article class="cred-card">
					<div class="cred-image">
						<img src="/instructor.jpg" alt="Canis Bodyworks Certificate of Completion" />
					</div>
					<h3>Canis Bodyworks Instructor</h3>
					<p>300-Hour Hands-On Canine Massage Mentorship Program — New Zealand</p>
				</article>
				<article class="cred-card">
					<div class="cred-image cred-text" aria-hidden="true">
						<span>Academic</span>
					</div>
					<h3>Academic Background</h3>
					<p>
						Health Science, Homeopathy, Graduate Diploma in Teaching, Conservation &amp;
						Environmental Science
					</p>
				</article>
			</div>
		</div>
	</section>

	<!-- WHAT I DO -->
	<section class="section" aria-labelledby="do-heading">
		<div class="container">
			<div class="section-heading">
				<p class="eyebrow">What I Do</p>
				<h2 id="do-heading">Therapeutic massage and bodywork for dogs</h2>
				<p class="section-sub">
					I use deliberate and focused touch techniques. Through a range of movements at varying
					pressures, I manipulate soft tissues including muscles, tendons, ligaments, fascia, and
					connective tissue to promote healing and wellbeing.
				</p>
			</div>

			<div class="benefit-grid">
				<div class="benefit-card">
					<h3>Physical Benefits</h3>
					<ul>
						{#each physical as item}<li>{item}</li>{/each}
					</ul>
				</div>
				<div class="benefit-card">
					<h3>Mental &amp; Emotional Benefits</h3>
					<ul>
						{#each mental as item}<li>{item}</li>{/each}
					</ul>
				</div>
			</div>

			<aside class="who">
				<h3>Who Can Benefit</h3>
				<p>
					Therapeutic massage can be used at all life stages and is beneficial for sporting dogs,
					senior pets, rescue animals in rehabilitation, and any dog you want to keep healthy,
					happy, and well-balanced.
				</p>
			</aside>
		</div>
	</section>

	{#if testimonials.length}
		<section class="section section-alt" aria-labelledby="testimonials-heading">
			<div class="container">
				<div class="section-heading">
					<p class="eyebrow">Testimonials</p>
					<h2 id="testimonials-heading">What clients say</h2>
				</div>
				<div class="testimonial-grid">
					{#each testimonials as t}
						<figure class="testimonial">
							<blockquote>“{t.quote}”</blockquote>
							<figcaption>— {t.client} &amp; {t.pet}</figcaption>
						</figure>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- CTA -->
	<section class="cta-band" aria-labelledby="about-cta-heading">
		<h2 id="about-cta-heading">Ready to help your dog feel their best?</h2>
		<p>Book a session, or get in touch to ask how therapeutic massage could suit your dog.</p>
		<div class="cta-band-actions">
			<a href="/booking" class="btn-primary">Book a Session</a>
			<a href="/contact" class="btn-secondary">Get in Touch</a>
		</div>
	</section>
</main>

<style>
	.role {
		font-weight: 700;
		color: var(--color-orange);
		margin-top: 0.5rem;
		font-size: 1.15rem;
	}
	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 2rem;
	}

	.story {
		display: grid;
		grid-template-columns: 0.8fr 1.2fr;
		gap: 3.5rem;
		align-items: start;
	}

	.cred-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.75rem;
	}
	.cred-card {
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 1.5rem;
	}
	.cred-image {
		height: 190px;
		border-radius: var(--radius-sm);
		background: #fff;
		padding: 0.9rem;
		margin-bottom: 1.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.cred-image img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.cred-text {
		background: var(--color-orange-tint);
		border: 1px solid rgba(246, 139, 31, 0.35);
	}
	.cred-text span {
		font-size: 1.6rem;
		font-weight: 800;
		color: var(--color-orange);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}
	.cred-card h3 {
		color: var(--color-orange);
		margin-bottom: 0.4rem;
	}
	.cred-card p {
		color: var(--color-text-muted);
		font-size: 0.95rem;
	}

	.benefit-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
	}
	.benefit-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 2.1rem;
	}
	.benefit-card h3 {
		color: var(--color-orange);
		margin-bottom: 1rem;
	}
	.benefit-card ul {
		list-style: none;
	}
	.benefit-card li {
		position: relative;
		padding: 0.7rem 0 0.7rem 1.6rem;
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
		font-weight: 800;
	}

	.who {
		margin-top: 2rem;
		background: var(--color-surface-alt);
		border-left: 4px solid var(--color-orange);
		border-radius: var(--radius-md);
		padding: 1.75rem 2rem;
	}
	.who h3 {
		color: var(--color-orange);
		margin-bottom: 0.5rem;
	}
	.who p {
		color: var(--color-text-muted);
		font-size: 1.05rem;
	}

	.testimonial-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.75rem;
	}
	.testimonial {
		background: var(--color-bg);
		border-left: 4px solid var(--color-orange);
		border-radius: var(--radius-md);
		padding: 1.75rem;
	}
	.testimonial blockquote {
		font-style: italic;
		line-height: 1.7;
		margin-bottom: 1rem;
	}
	.testimonial figcaption {
		color: var(--color-text-muted);
		font-size: 0.95rem;
		text-align: right;
	}

	@media (max-width: 1024px) {
		.story {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		.cred-grid {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 767px) {
		.cred-grid,
		.benefit-grid {
			grid-template-columns: 1fr;
		}
		.benefit-card {
			padding: 1.5rem;
		}
		.cred-image {
			height: 160px;
		}
		.hero-actions {
			flex-direction: column;
			align-items: stretch;
		}
		.who {
			padding: 1.4rem;
		}
	}
</style>
