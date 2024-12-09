<script>
	import { fade, fly } from "svelte/transition";

	export let shown;
</script>

{#if shown}
	<div in:fade={{ duration: 200 }} class=" fixed inset-0 z-50 bg-gray-300/50">
		<div in:fly={{ duration: 200, y: 50 }} class=" w-full h-full">
			<slot />
		</div>
	</div>
{/if}
