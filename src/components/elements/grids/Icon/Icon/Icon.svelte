<script>
	import { createEventDispatcher } from 'svelte';
	import SelectedCategory from './SelectedCategory.svelte';
	let dispatch = createEventDispatcher();
	export let Data;
	export let icon;
</script>

<div class="m-5 ">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
		{#each Data as data}
			<SelectedCategory
				{data}
				on:delete={(evt) => {
					icon = evt.detail;
					dispatch('delete', icon);
				}}
				on:edit={(evt) => {
					icon = evt.detail;
					dispatch('edit', icon);
				}}
			/>
		{/each}
	</div>
</div>
