<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let uploading;
	export let uploadPercentage;
	export let title;
</script>

<div class="flex justify-center mb-4 space-x-4">
	<button
		disabled={uploading}
		type="button"
		on:click={() => {
			dispatch('close');
		}}
		class=" w-24  h-11 text-gray-400 bg-white hover:bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
		>Cancel
	</button>
	<button
		disabled={uploading}
		type="submit"
		class="relative w-24  h-11 rounded-lg overflow-hidden bg-gray-100"
	>
		<!-- Uploading background -->
		<div
			class="bg-gray-300 absolute left-0 top-0 bottom-0"
			style={`width: ${uploadPercentage}%;`}
		/>
		<div class="absolute inset-0 py-1 text-pink-600 flex justify-center items-center ">
			<div>{title}</div>
		</div>
	</button>
</div>
