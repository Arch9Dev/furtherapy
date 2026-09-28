<script lang="ts">
	import { tick } from 'svelte';

	let showModal = false;
	let modalMessage = '';
	let isError = false;
	let closeBtn: HTMLButtonElement | undefined;

	let formName = '';
	let formEmail = '';
	let formMessage = '';
	let formSubmitting = false;

	async function handleSubmit() {
		formSubmitting = true;
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: formName, email: formEmail, message: formMessage })
			});

			if (response.ok) {
				modalMessage = 'Thank you! Your message has been sent.';
				isError = false;
				formName = '';
				formEmail = '';
				formMessage = '';
			} else {
				modalMessage = 'Oops! Something went wrong. Please try again.';
				isError = true;
			}
		} catch {
			modalMessage = 'Network error. Please check your connection.';
			isError = true;
		}
		formSubmitting = false;
		showModal = true;
		await tick();
		closeBtn?.focus();
	}

	function closeModal() {
		showModal = false;
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (showModal && event.key === 'Escape') closeModal();
	}
</script>

<svelte:window on:keydown={handleWindowKeydown} />

<svelte:head>
	<title>Contact FurTherapy | Canine Massage, Mission Bay Auckland</title>
	<meta
		name="description"
		content="Get in touch with FurTherapy about canine massage and bodywork in Mission Bay, Auckland. Phone 021 144 1722 or send a message."
	/>
</svelte:head>

<main>
	<section class="page-hero" aria-labelledby="contact-heading">
		<div class="container">
			<div>
				<p class="eyebrow">Contact</p>
				<h1 id="contact-heading">Get in touch with FurTherapy</h1>
				<p class="page-hero-sub">
					Have a question about whether massage is right for your dog? Send a message and we'll get
					back to you.
				</p>
			</div>
		</div>
	</section>

	<section class="section" aria-label="Contact details and form">
		<div class="container layout">
			<div class="info">
				<div class="info-card">
					<h2>Contact information</h2>
					<dl>
						<div class="row">
							<dt>Telephone</dt>
							<dd><a href="tel:02114411722">021 144 1722</a></dd>
						</div>
						<div class="row">
							<dt>Email</dt>
							<dd>
								<a href="mailto:fur.therapymassage@gmail.com">fur.therapymassage@gmail.com</a>
							</dd>
						</div>
						<div class="row">
							<dt>Based in</dt>
							<dd>Mission Bay, Auckland (mobile service)</dd>
						</div>
					</dl>
				</div>

				<div class="info-card">
					<h2>Opening hours</h2>
					<dl>
						<div class="row">
							<dt>Monday – Friday</dt>
							<dd>09:00 – 17:00</dd>
						</div>
						<div class="row">
							<dt>Weekends &amp; Evenings</dt>
							<dd>By appointment</dd>
						</div>
					</dl>
				</div>

				<p class="book-hint">
					Ready to go ahead? <a href="/booking">Book a session online</a>.
				</p>
			</div>

			<div class="form-card">
				<h2>Send a message</h2>
				<form on:submit|preventDefault={handleSubmit}>
					<div class="form-field">
						<label for="contact-name">Name</label>
						<input
							id="contact-name"
							type="text"
							bind:value={formName}
							placeholder="Your name"
							autocomplete="name"
							required
						/>
					</div>

					<div class="form-field">
						<label for="contact-email">Email</label>
						<input
							id="contact-email"
							type="email"
							bind:value={formEmail}
							placeholder="your@email.com"
							autocomplete="email"
							required
						/>
					</div>

					<div class="form-field">
						<label for="contact-message">Message</label>
						<textarea
							id="contact-message"
							bind:value={formMessage}
							placeholder="Tell us about your dog and how we can help..."
							rows="6"
							required
						></textarea>
					</div>

					<button
						type="submit"
						class="btn-primary submit"
						disabled={formSubmitting || !formName || !formEmail || !formMessage}
						aria-busy={formSubmitting}
					>
						{formSubmitting ? 'Sending…' : 'Send Message'}
					</button>
				</form>
			</div>
		</div>
	</section>
</main>

{#if showModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="modal-backdrop" on:click={closeModal} role="presentation">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="modal"
			class:modal-error={isError}
			on:click|stopPropagation
			role="dialog"
			tabindex="-1"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<h2 id="modal-title">{isError ? 'Error' : 'Success'}</h2>
			<p>{modalMessage}</p>
			<button class="btn-primary" bind:this={closeBtn} on:click={closeModal}>Close</button>
		</div>
	</div>
{/if}

<style>
	.layout {
		display: grid;
		grid-template-columns: 0.9fr 1.1fr;
		gap: 3rem;
		align-items: start;
	}

	.info {
		display: grid;
		gap: 1.5rem;
	}
	.info-card,
	.form-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 2rem;
	}
	.info-card h2,
	.form-card h2 {
		font-size: 1.35rem;
		color: var(--color-orange);
		margin-bottom: 1.1rem;
	}
	.row {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.8rem 0;
		border-top: 1px solid var(--color-border);
	}
	.row:first-child {
		border-top: none;
		padding-top: 0;
	}
	dt {
		color: var(--color-text-muted);
	}
	dd {
		font-weight: 700;
		text-align: right;
	}
	dd a {
		color: var(--color-text);
		text-decoration-color: var(--color-orange);
		text-underline-offset: 3px;
	}
	dd a:hover {
		color: var(--color-orange);
	}
	.book-hint {
		color: var(--color-text-muted);
	}
	.book-hint a {
		color: var(--color-orange);
		font-weight: 800;
	}

	form {
		display: grid;
		gap: 1.1rem;
	}
	.form-field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	label {
		font-size: 0.85rem;
		font-weight: 700;
		color: #e0e0e0;
		letter-spacing: 0.03em;
	}
	input,
	textarea {
		background: var(--color-bg);
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: var(--radius-sm);
		padding: 0.8rem 1rem;
		color: #fff;
		font-size: 1rem;
		font-family: inherit;
		transition: border-color 0.2s;
	}
	textarea {
		resize: vertical;
		min-height: 140px;
	}
	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-orange);
		box-shadow: 0 0 0 3px var(--color-orange-tint);
	}
	.submit {
		justify-self: start;
	}

	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 200;
		background: rgba(0, 0, 0, 0.65);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.25rem;
	}
	.modal {
		background: var(--color-surface-alt);
		border-top: 4px solid var(--color-success);
		border-radius: var(--radius-md);
		padding: 2rem;
		max-width: 420px;
		width: 100%;
		text-align: center;
		box-shadow: var(--shadow-lg);
	}
	.modal.modal-error {
		border-top-color: var(--color-danger);
	}
	.modal h2 {
		font-size: 1.5rem;
		margin-bottom: 0.6rem;
	}
	.modal p {
		color: var(--color-text-muted);
		margin-bottom: 1.5rem;
	}

	@media (max-width: 900px) {
		.layout {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
	@media (max-width: 767px) {
		.info-card,
		.form-card {
			padding: 1.5rem 1.25rem;
		}
		.row {
			flex-direction: column;
			gap: 0.1rem;
		}
		dd {
			text-align: left;
		}
		.submit {
			justify-self: stretch;
			max-width: none;
		}
	}
</style>
