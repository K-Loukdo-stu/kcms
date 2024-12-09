<script>
	import Edit from "$components/icons/Edit.svelte";
	import { createEventDispatcher } from "svelte";
	import { goto } from "$app/navigation";
	import Pagenetion from "$components/elements/pagenation/Pagenation/Pagenetion.svelte";
	import Trash from "$components/icons/Trash.svelte";
	import Pencil from "$components/icons/Pencil/Pencil.svelte";
	import Delete from "$components/icons/Delete/Delete.svelte";
	import CloseEye from "$components/icons/CloseEye/CloseEye.svelte";
	import Eye from "$components/icons/Eye/Eye.svelte";
	let dispatch = createEventDispatcher();
	export let gifsData;
	export let gifPage;
	export let currentPage;
	const onClickDetail = (packages) => {
		goto(`/dashboard/kart/sticker/package/${packages}`);
	};
</script>

<div class="absolute w-full p-2 flex flex-col space-y-2 h-full">
	<div class="flex-grow space-y-2">
		{#each gifsData as gif}
			<div
				class="bg-white hover:bg-gray-100 cursor-pointer flex items-center justify-between w-full shadow-sm border-[#DFDFDF] border-[1px] rounded-xl"
			>
				<div class="flex p-1 pl-2 justify-center">
					{#if gif.file}
						<div
							class="bg-gray-50 rounded-2xl relative w-14 h-14 flex items-center justify-center overflow-hidden"
						>
							<img
								class="absolute"
								src={gif.file.url}
								alt=""
							/>
						</div>
					{:else}
						<div
							class=" w-16 flex items-center justify-center p-2 bg-gray-100 rounded-2xl overflow-hidden"
						>
							<img
								class="h-full"
								src="https://cdn.worldvectorlogo.com/logos/standout-stickers-1.svg"
								alt=""
							/>
						</div>
					{/if}
				</div>
				<div class="w-2/6 text-base flex justify-start">
					<div class="p-2 flex flex-col">
						<div class="text-lg">{gif.name}</div>
					</div>
				</div>
				<div class="text-base flex justify-start">
					<div class="p-2 flex flex-col text-gray-600">
						<div class="text-sm">W: {gif.width}px</div>
					</div>
				</div>
				<div class="text-base flex justify-start">
					<div class="p-2 flex flex-col text-gray-600">
						<div class="text-sm">H: {gif.height}px</div>
					</div>
				</div>
				<div class="flex justify-center pl-5 pr-5 space-x-2">
					<button
						class="flex items-center justify-center text-[#3F3F3F] cursor-pointer hover:text-black"
						on:click={() => {
							dispatch("edit", gif);
						}}
					>
						<Pencil size={20} />
					</button>
					<button
						class="flex items-center justify-center text-[#3F3F3F] cursor-pointer hover:text-black"
						on:click={() => {
							dispatch("delete", gif);
						}}
					>
						<Delete size={20} />
					</button>
					<button
						class="flex items-center justify-center text-[#3F3F3F] cursor-pointer hover:text-black"
						on:click={() => {
							dispatch("view", gif);
						}}
					>
						{#if gif.visible}
							<CloseEye size={20} />
						{:else}
							<Eye size={20} />
						{/if}
					</button>
				</div>
			</div>
		{/each}
	</div>
	<div class=" w-full flex-grow-0 h-full flex items-end">
		{#if gifPage != 1}
			<Pagenetion
				totalPageNumber={gifPage}
				{currentPage}
				on:onCurrentPage={async (evt) => {
					currentPage = evt.detail;
					dispatch("onCurrentPage", currentPage);
				}}
			/>
		{/if}
	</div>
</div>
