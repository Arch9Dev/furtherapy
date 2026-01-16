<script>
	const navLinks = [
		{ name: 'Home', route: '/' },
		{ name: 'About', route: '/about' },
		{ name: 'Services', route: '/services' },
		{ name: 'Education', route: '/education' },
		{ name: 'Contact', route: '/contact' }
	];

	const currentRoute = '/services';

	const services = [
		{
			id: 'RB',
			title: 'Relaxation Bodywork',
			description: 'Stress is not only a human condition; animals experience it too. Over-exposure to stress impacts the health of our pets. It can result in the development of chronic physical and psychological conditions. Therapeutic Massage stimulates the parasympathetic nervous system - responsible for \'rest and recovery\'. It helps to relieve pain and creates balance (homeostasis) within the body. Relaxation promotes the release of hormones that support physical, emotional and mental well-being.',
			imageAlign: 'right'
		},
		{
			id: 'TR',
			title: 'Myofascial Trigger Point Therapy',
			description: 'A Trigger Point is an extremely painful \'bunching\' of connective tissue or muscle cells. It can sometimes feel like a hardened band or nodule. They may be caused by acute injuries or can develop over time. Chronic stress, structural/postural imbalances, overuse injuries or nutritional deficiencies are contributing factors. Trigger Points can limit full range of motion and cause muscle dysfunction. They also impact surrounding nerves and blood vessels. This results in hypersensitivity and reduced circulation. The use of specific compression techniques helps \'deactivate\' the \'stuck\' fibers. Trigger Point Therapy increases blood flow, thereby promoting healing and relieving pain.',
			imageAlign: 'left'
		},
		{
			id: 'LM',
			title: 'Lymphatic Massage',
			description: 'The lymphatic system plays a vital role in maintaining fluid balance in the body. It acts as a defensive mechanism by removing toxins from the cells. Manual Lymphatic Massage was developed in the 1930\'s by Dr. Emil Vodder (a PhD from Denmark). This is a very gentle technique that encourages the flow of lymphatic fluid around the body. The treatment is ideal for those dealing with injury or illness. It has been proven effective both pre-and post-surgery. Fluid trapped in the tissues can compress blood vessels, decreasing cellular nutrition. Removal of waste products promotes wound recovery and prevents scar tissue or adhesions forming. With Lymphatic Massage, we stimulate the healing process, help to relieve pain and reduce the risk of infection.',
			imageAlign: 'right'
		},
		{
			id: 'OF',
			title: 'Orthopaedic Friction',
			description: 'Orthopaedic Friction is a form of rehabilitation massage used to treat injuries to tendons and ligaments. It was first described by orthopaedic surgeon Dr. James Cyriax in the 1940\'s. He discovered that it is effective in reducing scar tissue formation following trauma. Adhesions (scarring) can result in limited movement and cause pain throughout the body. This technique creates a controlled inflammatory response, encouraging nutrient-rich blood to the tissues. This increase in oxygen promotes healing and provides an analgesic effect.',
			imageAlign: 'left'
		}
	];

	const pricing = [
		{
			price: '$150',
			title: 'Initial Assessment',
			duration: '1 hour',
			description: 'Intake and case history, gait observation, trust-building and hands-on assessment (as appropriate).'
		},
		{
			price: '$130',
			title: 'Follow-up Appointment',
			duration: '45 minutes',
			description: 'Individualised therapeutic massage and bodywork session.'
		},
		{
			price: 'was $650 now $600',
			title: 'Pre-paid Special',
			duration: '$50 off',
			description: 'Pre-pay 5 Follow-up Sessions for the discounted rate.'
		}
	];

	/**
	 * @param {string} route
	 */
	function navigateTo(route) {
		window.location.href = route;
	}
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
				<button 
					class:active={link.route === currentRoute}
					on:click={() => navigateTo(link.route)}
				>
					{link.name}
				</button>
			{/each}
		</nav>
	</div>
</header>

<!-- SERVICES SECTION -->
<section class="services-section">
	<div class="container">
		{#each services as service, index}
			<div class="service-item" class:reverse={service.imageAlign === 'left'}>
				<div class="service-content">
					<h3>{service.title}</h3>
					<p>{service.description}</p>
				</div>
				<div class="service-image">
					<div class="image-placeholder"></div>
				</div>
			</div>
		{/each}
	</div>
</section>


<!-- PRICING -->
<section class="pricing" id="services">
	<div class="pricing-inner">
		<h1 class="title">Pricing Guide</h1>

		<div class="pricing-table">
			<div class="pricing-header">
				<span>Service</span>
				<span>Duration</span>
				<span>Price</span>
			</div>

			<div class="pricing-row">
				<span>Initial Assessment</span>
				<span>60 mins</span>
				<span>$150</span>
			</div>
			<div class="pricing-description">
				Intake and case history, gait observation, <br /> trust-building and hands-on assessment (as appropriate).
			</div>

			<div class="pricing-row">
				<span>Follow-up Appointment</span>
				<span>45 mins</span>
				<span>$130</span>
			</div>
			<div class="pricing-description">
				Individualised therapeutic massage and bodywork session.
			</div>

			<div class="pricing-row highlight">
				<span>Prepaid Special (5 Sessions)</span>
				<span>45 mins/session</span>
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
			<a href="/booking" class="btn-primary">Book Now</a>
		</div>
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

	/* ----------------- COMMON SECTION STYLES ----------------- */
	section {
		padding: 4rem 0;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	h3 {
		font-size: 1.5rem;
		color: #f68b1f;
		margin-bottom: 1rem;
	}

	/* ----------------- SERVICES SECTION ----------------- */
	.services-section {
		background: #1f1f1f;
	}

	.service-item {
		display: flex;
		gap: 3rem;
		align-items: flex-start;
		margin-bottom: 4rem;
	}

	.service-item.reverse {
		flex-direction: row-reverse;
	}

	.service-content {
		flex: 1;
	}

	.service-content h3 {
		margin-bottom: 1.5rem;
	}

	.service-content p {
		font-size: 1.1rem;
		line-height: 1.8;
		color: #e0e0e0;
	}

	.service-image {
		width: 150px;
		flex-shrink: 0;
	}

	.image-placeholder {
		width: 100%;
		height: 100px;
		background: #2a2a2a;
		border-radius: 4px;
	}


	/* ----------------- PRICING ----------------- */
	.pricing {
		padding: 5rem 2rem;
	}

	.pricing-inner {
		max-width: 1200px;
		margin: 0 auto;
	}

	.pricing-table {
		margin-top: 3rem;
		background: #2a2a2a;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	.pricing-header,
	.pricing-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		padding: 1.2rem 1.5rem;
		align-items: center;
	}

	.pricing-header {
		background: #f68b1f;
		font-weight: 800;
	}

	.pricing-row {
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.pricing-row:hover {
		background: rgba(255, 255, 255, 0.03);
	}

	.pricing-description {
		padding: 0 1.5rem 1.2rem;
		font-size: 0.95rem;
		color: #f68b1f;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	/* Discount */
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
		color: #f68b1f;
		font-weight: 800;
		font-size: 1.15rem;
	}

	.highlight {
		background: rgba(246, 139, 31, 0.08);
	}

	.pricing-cta {
		text-align: center;
		margin-top: 2.5rem;
	}

	.btn-primary {
		display: inline-block;
		padding: 0.9rem 2.2rem;
		background: #f68b1f;
		color: #fff;
		font-weight: 800;
		font-size: 1.1rem;
		border-radius: 50px;
		text-decoration: none;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(246, 139, 31, 0.4);
	}

	/* ----------------- RESPONSIVE ----------------- */
	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}

		.service-item,
		.service-item.reverse {
			flex-direction: column;
		}

		.service-image {
			width: 100%;
		}


		h3 {
			font-size: 1.3rem;
		}

		.service-content p{
			font-size: 1rem;
		}
	}
</style>