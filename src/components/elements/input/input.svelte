<script>
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();
	export let title;
	export let param;
</script>

<label for={param} class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
	>{title}</label
>
<input
	type="text"
	name={param}
	bind:value={param}
	class="bg-gray-50 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
	placeholder={title}
	required
	on:input={() => {
		dispatch('input', param);
	}}
/>
