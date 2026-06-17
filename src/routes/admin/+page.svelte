<script lang="ts">
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';
	let error = '';
	let submitting = false;

	

	async function handleLogin() {
		submitting = true;
		error = '';

		const response = await fetch('/admin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		if (response.ok) {
			goto('/admin/dashboard');
		} else {
			const data = await response.json();
			error = data.message ?? 'Invalid credentials.';
		}

		submitting = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') handleLogin();
	}
</script>

<svelte:head>
	<title>Admin Login | Fur Therapy</title>
</svelte:head>

<div class="page">
	<div class="card">
		<div class="logo-mark" aria-hidden="true">FT</div>
		<h1>Admin Login</h1>
		<p class="subtitle">Fur Therapy internal access</p>

		{#if error}
			<div class="error" role="alert">{error}</div>
		{/if}

		<div class="form">
			<div class="field">
				<label for="username">Username</label>
				<input
					id="username"
					type="text"
					bind:value={username}
					placeholder="Username"
					autocomplete="username"
					on:keydown={handleKeydown}
				/>
			</div>

			<div class="field">
				<label for="password">Password</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					placeholder="Password"
					autocomplete="current-password"
					on:keydown={handleKeydown}
				/>
			</div>

			<button
				class="btn"
				on:click={handleLogin}
				disabled={submitting || !username || !password}
				aria-busy={submitting}
			>
				{submitting ? 'Signing in…' : 'Sign In'}
			</button>
		</div>
	</div>
</div>

<style>
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

	.page {
		min-height: 100vh;
		background: #1f1f1f;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.card {
		background: #2a2a2a;
		border-radius: 16px;
		padding: 2.5rem 2rem;
		width: 100%;
		max-width: 400px;
		text-align: center;
		border-top: 4px solid #f68b1f;
	}

	.logo-mark {
		width: 52px;
		height: 52px;
		background: #f68b1f;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 900;
		font-size: 1.1rem;
		color: #fff;
		margin: 0 auto 1.25rem;
	}

	h1 {
		font-family: system-ui, sans-serif;
		font-size: 1.5rem;
		font-weight: 800;
		color: #fff;
	}

	.subtitle {
		font-family: system-ui, sans-serif;
		font-size: 0.9rem;
		color: #aaa;
		margin-top: 0.3rem;
		margin-bottom: 2rem;
	}

	.error {
		background: rgba(224, 82, 82, 0.15);
		border: 1px solid rgba(224, 82, 82, 0.4);
		color: #f08080;
		border-radius: 8px;
		padding: 0.75rem 1rem;
		font-size: 0.9rem;
		font-family: system-ui, sans-serif;
		margin-bottom: 1.25rem;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		text-align: left;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	label {
		font-family: system-ui, sans-serif;
		font-size: 0.85rem;
		font-weight: 700;
		color: #e0e0e0;
		letter-spacing: 0.04em;
	}

	input {
		background: #1f1f1f;
		border: 1px solid rgba(255,255,255,0.12);
		border-radius: 8px;
		padding: 0.75rem 1rem;
		color: #fff;
		font-size: 1rem;
		font-family: system-ui, sans-serif;
		transition: border-color 0.2s;
	}

	input:focus {
		outline: none;
		border-color: #f68b1f;
	}

	.btn {
		margin-top: 0.5rem;
		padding: 0.85rem;
		background: #f68b1f;
		color: #fff;
		border: none;
		border-radius: 50px;
		font-weight: 800;
		font-size: 1rem;
		font-family: system-ui, sans-serif;
		cursor: pointer;
		transition: opacity 0.2s;
	}

	.btn:hover:not(:disabled) { opacity: 0.88; }
	.btn:disabled { opacity: 0.45; cursor: not-allowed; }
</style>