<script>
	import Plus from "$components/icons/Plus.svelte";
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();
	export let title = "Title";
</script>

<button
	class="text-white bg-gray-500 hover:bg-gray-600 rounded-lg text-sm px-3 py-2 cursor-pointer"
	type="button"
	data-modal-toggle="defaultModal"
	on:click={() => {
		dispatch("click");
	}}
>
	<div class="flex flex-row items-center">
		<div><Plus /></div>
		<div class="w-2"></div>
		<div>{title}</div>
	</div>
</button>
