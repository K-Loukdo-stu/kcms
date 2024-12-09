<script>
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();
</script>

<button
	class="absolute z-10 right-0 flex items-center text-[#F05052] bg-gray-100  rounded-full text-sm px-5 py-1.5  bg-gray-600 hover:bg-gray-700 mt-5 mr-5 p-2"
	type="button"
	data-modal-toggle="defaultModal"
	on:click={() => {
		dispatch('close');
	}}
>
	<!-- on:click={onCreateStickerPackage} -->
	<i class="fas fa-plus" /> &nbsp New Admin
</button>
