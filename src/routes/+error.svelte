<script lang="ts">
	import { page } from '$app/state';

	const is404 = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{is404 ? 'Page not found' : 'Something went wrong'} | FurTherapy</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main>
	<section class="error-hero" aria-labelledby="error-heading">
		<div class="container">
			<p class="eyebrow">{page.status}</p>
			<h1 id="error-heading">
				{is404 ? "We couldn't find that page" : 'Something went wrong'}
			</h1>
			<p class="error-sub">
				{is404
					? 'The page may have moved, or the link might be mistyped.'
					: 'Please try again in a moment. If it keeps happening, get in touch and we will sort it out.'}
			</p>
			<div class="error-actions">
				<a href="/" class="btn-primary">Back to home</a>
				<a href="/contact" class="btn-secondary">Contact us</a>
			</div>
		</div>
	</section>
</main>

<style>
	.error-hero {
		background: linear-gradient(160deg, var(--color-surface) 0%, var(--color-bg) 70%);
		min-height: calc(100vh - var(--nav-h));
		display: flex;
		align-items: center;
		padding: 4rem 0;
	}
	.error-sub {
		margin-top: 1.1rem;
		font-size: 1.15rem;
		color: var(--color-text-muted);
		max-width: 52ch;
	}
	.error-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 2rem;
	}
</style>
