<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/favicon.png" />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{@render children()}