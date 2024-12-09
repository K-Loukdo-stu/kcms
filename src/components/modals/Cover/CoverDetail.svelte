<script>
	import Trash from '$components/icons/Trash.svelte';
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();
	export let cover;
	let isHover;
</script>

<div
	on:mouseleave={() => {
		isHover = false;
	}}
	on:mouseenter={() => {
		isHover = true;
	}}
	class="overflow-hidden relative flex flex-col bg-white rounded-[20px] border-2 w-48 h-72"
>
	<div class=" relative flex flex-grow w-full">
		<div class="absolute flex justify-center items-center inset-0">
			<img class="w-48 h-72" src={cover.file.url} alt="" />
		</div>
	</div>
	{#if isHover}
		<div class=" absolute bottom-0 left-0 right-0 bg-gray-700/40 w-48 h-12">
			<div class="w-full h-full flex justify-center items-center">
				<div class="flex flex-row">
					<div
						class="p-2 bg-gray-500/60 rounded-full hover:bg-gray-500/90 cursor-pointer"
						on:click={() => {
							dispatch('onDelete', cover);
						}}
					>
						<div class=" flex justify-center items-center w-6 h-6 text-white ">
							<Trash />
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
