<script lang="ts">
	const services = [
		{
			id: 'RB',
			title: 'Relaxation Bodywork',
			summary:
				"Therapeutic massage that stimulates the body's natural rest-and-recovery response.",
			description:
				"Stress is not only a human condition; animals experience it too. Over-exposure to stress impacts the health of our pets. It can result in the development of chronic physical and psychological conditions. Therapeutic Massage stimulates the parasympathetic nervous system - responsible for 'rest and recovery'. It helps to relieve pain and creates balance (homeostasis) within the body. Relaxation promotes the release of hormones that support physical, emotional and mental well-being.",
			image: 'Relaxation.jpg'
		},
		{
			id: 'TR',
			title: 'Myofascial Trigger Point Therapy',
			summary:
				'Targeted compression to release painful trigger points and improve blood flow and range of motion.',
			description:
				"A Trigger Point is an extremely painful 'bunching' of connective tissue or muscle cells. It can sometimes feel like a hardened band or nodule. They may be caused by acute injuries or can develop over time. Chronic stress, structural/postural imbalances, overuse injuries or nutritional deficiencies are contributing factors. Trigger Points can limit full range of motion and cause muscle dysfunction. They also impact surrounding nerves and blood vessels. This results in hypersensitivity and reduced circulation. The use of specific compression techniques helps 'deactivate' the 'stuck' fibers. Trigger Point Therapy increases blood flow, thereby promoting healing and relieving pain.",
			image: 'Myofascial.jpg'
		},
		{
			id: 'LM',
			title: 'Lymphatic Massage',
			summary:
				'A very gentle technique that encourages lymphatic flow — ideal around injury, illness or surgery.',
			description:
				"The lymphatic system plays a vital role in maintaining fluid balance in the body. It acts as a defensive mechanism by removing toxins from the cells. Manual Lymphatic Massage was developed in the 1930's by Dr. Emil Vodder (a PhD from Denmark). This is a very gentle technique that encourages the flow of lymphatic fluid around the body. The treatment is ideal for those dealing with injury or illness. It has been proven effective both pre-and post-surgery. Fluid trapped in the tissues can compress blood vessels, decreasing cellular nutrition. Removal of waste products promotes wound recovery and prevents scar tissue or adhesions forming. With Lymphatic Massage, we stimulate the healing process, help to relieve pain and reduce the risk of infection.",
			image: 'Lymphatic.jpg'
		},
		{
			id: 'OF',
			title: 'Orthopaedic Friction',
			summary:
				'A rehabilitation massage for tendon and ligament injuries that helps reduce scar tissue.',
			description:
				"Orthopaedic Friction is a form of rehabilitation massage used to treat injuries to tendons and ligaments. It was first described by orthopaedic surgeon Dr. James Cyriax in the 1940's. He discovered that it is effective in reducing scar tissue formation following trauma. Adhesions (scarring) can result in limited movement and cause pain throughout the body. This technique creates a controlled inflammatory response, encouraging nutrient-rich blood to the tissues. This increase in oxygen promotes healing and provides an analgesic effect.",
			image: 'orthopaedic.jpg'
		}
	];
</script>

<svelte:head>
	<title>Canine Massage Services &amp; Pricing | FurTherapy Auckland</title>
	<meta
		name="description"
		content="Relaxation bodywork, myofascial trigger point therapy, lymphatic massage and orthopaedic friction for dogs, with clear pricing. Mobile service from Mission Bay, Auckland."
	/>
</svelte:head>

<main>
	<section class="page-hero" aria-labelledby="services-heading">
		<div class="container">
			<div>
				<p class="eyebrow">Services</p>
				<h1 id="services-heading">Therapeutic techniques, tailored to your dog</h1>
				<p class="page-hero-sub">
					Every session is individualised. Techniques are chosen around your dog's history,
					movement and comfort.
				</p>
			</div>
		</div>
	</section>

	<section class="section" aria-label="Techniques">
		<div class="container">
			{#each services as service, i}
				<article class="service" class:reverse={i % 2 === 1}>
					<div class="service-visual">
						{#if service.image}
							<img src="/{service.image}" alt={service.title} loading="lazy" />
						{:else}
							<div class="numeral" aria-hidden="true">0{i + 1}</div>
						{/if}
					</div>
					<div class="service-body">
						<p class="service-num">0{i + 1}</p>
						<h2>{service.title}</h2>
						<p class="service-summary">{service.summary}</p>
						<details>
							<summary>Read more</summary>
							<p>{service.description}</p>
						</details>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="section section-alt" id="pricing" aria-labelledby="pricing-heading">
		<div class="container">
			<div class="section-heading">
				<p class="eyebrow">Pricing</p>
				<h2 id="pricing-heading">Pricing guide</h2>
			</div>

			<div class="price-list">
				<div class="price-item">
					<div class="price-top">
						<div>
							<div class="price-name">Initial Assessment</div>
							<div class="price-meta">60 mins</div>
						</div>
						<div class="price-amount">$150</div>
					</div>
					<p class="price-desc">
						Intake and case history, gait observation, trust-building and hands-on assessment (as
						appropriate).
					</p>
				</div>
				<div class="price-item">
					<div class="price-top">
						<div>
							<div class="price-name">Follow-up Appointment</div>
							<div class="price-meta">45 mins</div>
						</div>
						<div class="price-amount">$130</div>
					</div>
					<p class="price-desc">Individualised therapeutic massage and bodywork session.</p>
				</div>
				<div class="price-item featured">
					<div class="price-top">
						<div>
							<div class="price-name">Prepaid Special · 5 sessions</div>
							<div class="price-meta">45 mins per session</div>
						</div>
						<div class="price-amount">
							<span class="price-was"><span class="sr-only">Was </span>$650</span>
							<span><span class="sr-only">Now </span>$600</span>
						</div>
					</div>
					<p class="price-desc">
						Pre-pay five follow-up sessions and receive a discounted package rate.
					</p>
				</div>
			</div>

			<p class="travel-note">
				FurTherapy is a mobile service based in Mission Bay. Travel is complimentary within 10km;
				travel fees for further distances are confirmed before booking.
			</p>
		</div>
	</section>

	<section class="cta-band" aria-labelledby="services-cta-heading">
		<h2 id="services-cta-heading">Help your dog feel their best.</h2>
		<p>Book a session, or get in touch if you'd like to talk it through first.</p>
		<div class="cta-band-actions">
			<a href="/booking" class="btn-primary">Book a Session</a>
			<a href="/contact" class="btn-secondary">Get in Touch</a>
		</div>
	</section>
</main>

<style>
	.service {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3.5rem;
		align-items: center;
		padding: 2.5rem 0;
		border-bottom: 1px solid var(--color-border);
	}
	.service:first-child {
		padding-top: 0;
	}
	.service:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}
	.service.reverse .service-visual {
		order: 2;
	}

	.service-visual {
		border-radius: var(--radius-lg);
		overflow: hidden;
		aspect-ratio: 4 / 3;
		box-shadow: var(--shadow-md);
		background: var(--color-surface-alt);
	}
	.service-visual img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.numeral {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 7rem;
		font-weight: 900;
		color: var(--color-orange);
		background: repeating-linear-gradient(
			135deg,
			var(--color-surface-alt),
			var(--color-surface-alt) 12px,
			var(--color-bg) 12px,
			var(--color-bg) 24px
		);
	}

	.service-num {
		font-weight: 900;
		color: var(--color-orange);
		font-size: 1rem;
		letter-spacing: 0.1em;
		margin-bottom: 0.4rem;
	}
	.service-summary {
		margin-top: 0.8rem;
		font-size: 1.1rem;
		color: var(--color-text);
	}
	details {
		margin-top: 1.25rem;
		border-top: 1px solid var(--color-border);
		padding-top: 1rem;
	}
	summary {
		cursor: pointer;
		font-weight: 800;
		color: var(--color-orange);
		width: fit-content;
	}
	details p {
		margin-top: 0.9rem;
		color: var(--color-text-muted);
		font-size: 0.98rem;
	}

	.travel-note {
		text-align: center;
		color: var(--color-text-faint);
		font-size: 0.92rem;
		margin: 1.75rem auto 0;
		max-width: 60ch;
	}

	@media (max-width: 900px) {
		.service {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		.service.reverse .service-visual {
			order: 0;
		}
		.service-visual {
			aspect-ratio: 16 / 10;
		}
		.numeral {
			font-size: 4.5rem;
		}
	}
</style>
