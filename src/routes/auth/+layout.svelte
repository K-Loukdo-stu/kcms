<script context="module">
	export async function load({}) {
		return { props: {} };
	}
</script>

<script>
	import { goto } from '$app/navigation';
	import { ensureSignedIn } from '$lib/middleware/auth';
	import { onMount } from 'svelte';

	export let signedIn = false;
	onMount(async () => {
		signedIn = await ensureSignedIn();
		if (signedIn) return goto('/dashboard');
	});
</script>

<div>
	{#if !signedIn}
		<slot />
	{/if}
</div>
