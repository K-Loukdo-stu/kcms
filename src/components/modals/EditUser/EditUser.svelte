<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let user;

	let param = 'Updated';
</script>

<div class="relative flex justify-center items-center h-full w-full">
	<div class="absolute w-96 h-[500px] bg-gray-300">
		<button
			on:click={() => {
				dispatch('close');
			}}
		>
			Close
		</button>

		<button
			on:click={() => {
				dispatch('update', { param, test: 'fdf' });
			}}
		>
			Update
		</button>
		{user}
	</div>
</div>
