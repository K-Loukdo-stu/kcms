<script>
	import Copy from '$components/icons/Copy.svelte';
	import Edit from '$components/icons/Edit.svelte';
	import Trash from '$components/icons/Trash.svelte';
	import { createEventDispatcher } from 'svelte';
	import Clipboard from 'svelte-clipboard';
	let dispatch = createEventDispatcher();
	export let data;
	let isHover;
</script>

<div
	on:mouseleave={() => {
		isHover = false;
	}}
	on:mouseenter={() => {
		isHover = true;
	}}
	class="relative w-32 h-32"
>
	{#if data.file}
		<div class="w-32 h-32 flex justify-center items-center">
			<img class="h-fit cursor-pointer w-10" src={data.file.thumbnail.url} alt="" />
		</div>
	{/if}
	{#if isHover}
		<div class=" absolute inset-0 bg-gray-300/40 rounded-md">
			<div class=" w-full h-full flex justify-start flex-col items-end">
				<div class=" p-1 bg-white rounded-md hover:bg-gray-50 m-1">
					<div class="flex justify-center items-center  w-6 h-6 text-gray-600  cursor-pointer">
						<Clipboard
							text={data.file.url}
							let:copy
							on:copy={() => {
								alert('Has Copied to Clipboard👏');
							}}
						>
							<div on:click={copy}>
								<Copy />
							</div>
						</Clipboard>
					</div>
				</div>
				<div
					class=" p-1 bg-green-500 rounded-md hover:bg-green-600 cursor-pointer m-1 mt-0"
					on:click={() => {
						dispatch('edit', data);
					}}
				>
					<div class=" flex justify-center items-center w-6 h-6 text-white ">
						<Edit />
					</div>
				</div>
				<div
					class=" p-1 bg-red-500 rounded-md hover:bg-red-600 cursor-pointer m-1 mt-0"
					on:click={() => {
						dispatch('delete', data);
					}}
				>
					<div class=" flex justify-center items-center w-6 h-6 text-white ">
						<Trash />
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
