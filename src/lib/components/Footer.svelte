<script lang="ts">
	import { goto } from '$app/navigation';

	const navLinks = [
		{ name: 'Home', route: '/' },
		{ name: 'About', route: '/about' },
		{ name: 'Services', route: '/services' },
		{ name: 'Education', route: '/education' },
		{ name: 'Contact', route: '/contact' }
	];

	function navigateTo(route: string) {
		goto(route);
	}
</script>

<footer class="site-footer">
	<div class="footer-inner">
		<div class="footer-brand">
			<img src="logo_white.png" alt="FurTherapy" class="footer-logo" />
			<p>Canine Massage &amp; Bodywork</p>
		</div>

		<nav class="footer-links" aria-label="Footer navigation">
			{#each navLinks as link}
				<a href={link.route} on:click|preventDefault={() => navigateTo(link.route)}>
					{link.name}
				</a>
			{/each}
		</nav>

		<div class="footer-contact">
			<a href="tel:02114411722">021 144 1722</a>
			<a href="mailto:fur.therapymassage@gmail.com">fur.therapymassage@gmail.com</a>
			<span>Mission Bay, Auckland</span>
		</div>

		<a href="/booking" class="footer-cta" on:click|preventDefault={() => navigateTo('/booking')}>
			Book a Session
		</a>
	</div>

	<div class="footer-bottom">
		<p>&copy; {new Date().getFullYear()} FurTherapy. All rights reserved.</p>
	</div>
</footer>

<style>
	.site-footer {
		background: var(--color-surface);
		border-top: 1px solid var(--color-border);
		padding: 3.5rem 2rem 0;
	}

	.footer-inner {
		max-width: var(--container-max);
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1.2fr 1fr 1fr auto;
		gap: 2.5rem;
		align-items: start;
		padding-bottom: 2.5rem;
		border-bottom: 1px solid var(--color-border);
	}

	.footer-brand {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.footer-logo {
		height: 24px;
		width: auto;
		object-fit: contain;
	}
	.footer-brand p {
		color: var(--color-text-muted);
		font-size: 0.9rem;
	}

	.footer-links {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.footer-links a {
		color: var(--color-text);
		text-decoration: none;
		font-size: 0.95rem;
		font-weight: 600;
	}
	.footer-links a:hover {
		color: var(--color-orange);
	}

	.footer-contact {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		font-size: 0.95rem;
	}
	.footer-contact a {
		color: var(--color-text);
		text-decoration: none;
	}
	.footer-contact a:hover {
		color: var(--color-orange);
	}
	.footer-contact span {
		color: var(--color-text-muted);
	}

	.footer-cta {
		align-self: start;
		display: inline-block;
		background: var(--color-orange);
		color: #fff;
		font-weight: 800;
		font-size: 0.95rem;
		padding: 0.75rem 1.6rem;
		border-radius: var(--radius-pill);
		text-decoration: none;
		white-space: nowrap;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}
	.footer-cta:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 22px rgba(246, 139, 31, 0.35);
	}

	.footer-bottom {
		max-width: var(--container-max);
		margin: 0 auto;
		padding: 1.5rem 0;
		text-align: center;
	}
	.footer-bottom p {
		color: var(--color-text-faint);
		font-size: 0.82rem;
	}

	@media (max-width: 900px) {
		.footer-inner {
			grid-template-columns: 1fr 1fr;
			row-gap: 2rem;
		}
		.footer-cta {
			grid-column: 1 / -1;
			justify-self: start;
		}
	}

	@media (max-width: 560px) {
		.site-footer {
			padding: 3rem 1.25rem 0;
		}
		.footer-inner {
			grid-template-columns: 1fr;
			gap: 1.75rem;
		}
		.footer-cta {
			width: 100%;
			text-align: center;
		}
	}
</style>
