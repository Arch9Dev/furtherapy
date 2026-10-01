<svelte:head>
	<title>Canine Massage Education &amp; Mentorship NZ | FurTherapy</title>
	<meta
		name="description"
		content="Education and one-to-one mentorship in canine massage and bodywork for aspiring practitioners, therapy professionals and dog owners across New Zealand, with Marisa Du Toit."
	/>
</svelte:head>

<main>
	<section class="page-hero" aria-labelledby="edu-heading">
		<div class="container">
			<div>
				<p class="eyebrow">Education &amp; Mentorship</p>
				<h1 id="edu-heading">Grow your confidence in canine wellness</h1>
				<p class="page-hero-sub">
					Sharing knowledge with the canine wellness community across New Zealand - safe,
					ethical and effective techniques that improve canine wellbeing.
				</p>
			</div>
		</div>
	</section>

	<section class="section" aria-labelledby="who-heading">
		<div class="container">
			<div class="section-heading">
				<p class="eyebrow">Who It's For</p>
				<h2 id="who-heading">Whether you're just beginning or expanding your skills</h2>
			</div>
			<div class="card-grid three">
				<article class="card">
					<h3>Aspiring canine massage practitioners</h3>
					<p>Start your journey with guided learning and one-to-one mentorship.</p>
				</article>
				<article class="card">
					<h3>Therapy professionals</h3>
					<p>Expand your professional skillset with canine-specific knowledge.</p>
				</article>
				<article class="card">
					<h3>Dedicated dog owners</h3>
					<p>Better understand your own dog's body, comfort and movement.</p>
				</article>
			</div>
		</div>
	</section>

	<section class="section section-alt" aria-labelledby="learn-heading">
		<div class="container split">
			<div>
				<p class="eyebrow">What You'll Explore</p>
				<h2 id="learn-heading">Understanding how dogs move and feel</h2>
				<div class="prose lead">
					<p>
						Education covers the foundations that good bodywork is built on, delivered in a
						supportive, accessible way tailored for the New Zealand community.
					</p>
				</div>
			</div>
			<ul class="topic-list">
				<li>Canine anatomy</li>
				<li>Movement</li>
				<li>Comfort</li>
				<li>Therapeutic touch</li>
			</ul>
		</div>
	</section>

	<section class="section" aria-labelledby="how-heading">
		<div class="container">
			<div class="section-heading">
				<p class="eyebrow">How It Works</p>
				<h2 id="how-heading">Learning that meets you where you are</h2>
			</div>
			<ol class="steps">
				<li>
					<span class="num">01</span>
					<h3>Guided learning</h3>
					<p>Structured teaching that builds your understanding step by step.</p>
				</li>
				<li>
					<span class="num">02</span>
					<h3>Practical advice</h3>
					<p>Real-world guidance you can apply with confidence.</p>
				</li>
				<li>
					<span class="num">03</span>
					<h3>One-to-one mentorship</h3>
					<p>Personal support as you develop your skills.</p>
				</li>
			</ol>
		</div>
	</section>

	<section class="section section-alt" aria-labelledby="mentor-heading">
		<div class="container mentor">
			<div class="mentor-image">
				<img src="/instructor.jpg" alt="Canis Bodyworks Certificate of Completion" loading="lazy" />
			</div>
			<div>
				<p class="eyebrow">Your Mentor</p>
				<h2 id="mentor-heading">Marisa Du Toit</h2>
				<div class="prose lead">
					<p>
						Marisa is a Nationally Board Certified Canine Massage Practitioner (NBCAAM) and the
						instructor for the Canis Bodyworks Mentorship Program within New Zealand — a
						300-hour hands-on canine masscaamage mentorship.
					</p>
				</div>
				<a href="/about" class="btn-secondary">Meet Marisa</a>
			</div>
		</div>
	</section>

	<section class="section" aria-labelledby="nbcaam-heading">
		<div class="container credential">
			<div class="credential-logo">
				<img
					src="/nbcaam-logo.png"
					alt="NBCAAM - National Board of Certification for Animal Acupressure &amp; Massage"
					loading="lazy"
				/>
			</div>
			<div>
				<p class="eyebrow">Certification</p>
				<h2 id="nbcaam-heading">About NBCAAM</h2>
				<div class="prose lead">
					<p>
						The National Board of Certification for Animal Acupressure &amp; Massage (NBCAAM) sets
						the standards for entry into the field of animal massage. It provides certification
						exams for canine and equine acupressure and massage, so that animal owners can be
						confident their practitioner is highly trained.
					</p>
				</div>
				<a
					href="https://www.nbcaam.org/"
					class="btn-secondary"
					target="_blank"
					rel="noopener noreferrer"
				>
					Visit NBCAAM
				</a>
			</div>
		</div>
	</section>

	<section class="cta-band" aria-labelledby="edu-cta-heading">
		<h2 id="edu-cta-heading">Interested in learning with FurTherapy?</h2>
		<p>Get in touch to ask about education and mentorship.</p>
		<div class="cta-band-actions">
			<a href="/contact" class="btn-primary">Get in Touch</a>
			<a href="/services" class="btn-secondary">Explore Services</a>
		</div>
	</section>
</main>

<style>
	.card-grid {
		display: grid;
		gap: 1.75rem;
	}
	.card-grid.three {
		grid-template-columns: repeat(3, 1fr);
	}
	.card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-top: 3px solid var(--color-orange);
		border-radius: var(--radius-md);
		padding: 1.8rem 1.6rem;
	}
	.card h3 {
		margin-bottom: 0.5rem;
	}
	.card p {
		color: var(--color-text-muted);
		font-size: 0.97rem;
	}

	.split {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: 3.5rem;
		align-items: center;
	}
	.lead {
		margin-top: 1.25rem;
	}
	.topic-list {
		list-style: none;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	.topic-list li {
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 1.4rem 1.2rem;
		font-weight: 800;
		position: relative;
		padding-left: 2.6rem;
	}
	.topic-list li::before {
		content: '✓';
		position: absolute;
		left: 1.1rem;
		color: var(--color-orange);
	}

	.steps {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.75rem;
	}
	.steps li {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 1.8rem 1.6rem;
	}
	.num {
		display: block;
		font-size: 1.6rem;
		font-weight: 900;
		color: var(--color-orange);
		margin-bottom: 0.5rem;
	}
	.steps h3 {
		margin-bottom: 0.4rem;
	}
	.steps p {
		color: var(--color-text-muted);
		font-size: 0.95rem;
	}

	.mentor {
		display: grid;
		grid-template-columns: 0.8fr 1.2fr;
		gap: 3.5rem;
		align-items: center;
	}
	.mentor-image {
		background: #fff;
		border-radius: var(--radius-lg);
		padding: 1.25rem;
		box-shadow: var(--shadow-md);
	}
	.mentor-image img {
		width: 100%;
		display: block;
		border-radius: var(--radius-sm);
	}
	.mentor .btn-secondary {
		margin-top: 1.75rem;
	}

	.credential {
		display: grid;
		grid-template-columns: 0.8fr 1.2fr;
		gap: 3.5rem;
		align-items: center;
	}
	.credential-logo {
		background: #fff;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 1.5rem;
		box-shadow: var(--shadow-md);
	}
	.credential-logo img {
		width: 100%;
		max-width: 220px;
		margin: 0 auto;
		display: block;
	}
	.credential .btn-secondary {
		margin-top: 1.75rem;
	}

	@media (max-width: 1024px) {
		.split,
		.mentor,
		.credential {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		.mentor-image,
		.credential-logo {
			max-width: 460px;
		}
	}
	@media (max-width: 767px) {
		.card-grid.three,
		.steps {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 420px) {
		.topic-list {
			grid-template-columns: 1fr;
		}
	}
</style>