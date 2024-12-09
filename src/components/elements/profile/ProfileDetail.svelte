<script>
	import Edit from "$components/icons/Edit.svelte";
	import Trash from "$components/icons/Trash.svelte";
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();
	export let data;
	let isHover;
</script>

<button
	on:mouseleave={() => {
		isHover = false;
	}}
	on:mouseenter={() => {
		isHover = true;
	}}
	class="relative w-48 h-72"
>
	{#if data.file}
		<div class=" w-48 h-72 flex justify-center items-center">
			<img
				class="rounded-md w-48 h-72 cursor-pointer"
				src={data.file.url}
				alt=""
			/>
		</div>
	{/if}
	{#if isHover}
		<div class=" absolute inset-0 bg-gray-300/40 rounded-md">
			<div class=" w-full h-full flex justify-start flex-col items-end">
				<button
					class=" p-1 bg-green-500 rounded-md hover:bg-green-600 cursor-pointer m-1"
					on:click={() => {
						dispatch("edit", data);
					}}
				>
					<div class=" flex justify-center items-center w-6 h-6 text-white">
						<Edit />
					</div>
				</button>
				<button
					class=" p-1 bg-red-500 rounded-md hover:bg-red-600 cursor-pointer m-1 mt-0"
					on:click={() => {
						dispatch("delete", data);
					}}
				>
					<div class=" flex justify-center items-center w-6 h-6 text-white">
						<Trash />
					</div>
				</button>
			</div>
		</div>
	{/if}
</button>
