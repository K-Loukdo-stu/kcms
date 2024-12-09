<script>
	import Edit from "$components/icons/Edit.svelte";
	import Trash from "$components/icons/Trash.svelte";
	import StickerAnimated from "$components/modals/Sticker/StickerAnimated/StickerAnimated.svelte";
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();
	export let sticker;
	let w = 85;
	let h = 85;
	let isHover;
</script>

<button
	on:mouseleave={() => {
		isHover = false;
	}}
	on:mouseenter={() => {
		isHover = true;
	}}
	class="overflow-hidden relative flex flex-col p-2 bg-white rounded-[8px] border-2 w-32 h-32"
>
	<div class=" relative flex flex-grow w-full">
		<div class="absolute flex justify-center items-center inset-0">
			{#if sticker.animated}
				<StickerAnimated
					base64={sticker.file.url}
					frameNum={sticker.frameNum}
					fps={sticker.fps}
					{w}
					{h}
				/>
			{:else}
				<img
					class="w-20 h-20"
					src={sticker.file.url}
					alt=""
				/>
			{/if}
		</div>
	</div>
	<div class="flex flex-grow-0 w-full">
		<div class="truncate px-4 text-center w-full">{sticker.name}</div>
	</div>

	<div class="absolute top-0 left-0 w-10 h-10">
		<div class="relative w-full h-full">
			<div
				class="absolute rounded-full w-16 h-16 bg-gray-200 -top-[80%] -left-[80%]"
			/>
			<div class="absolute left-[4px] top-[4px]">
				<div class="text-sm">
					{sticker.type.url}
				</div>
			</div>
		</div>
	</div>
	{#if isHover}
		<div class=" absolute inset-0 bg-gray-500/40">
			<div class=" w-full h-full flex justify-center items-center">
				<div class=" flex flex-row space-x-2">
					<button
						class=" p-2 bg-gray-500/60 rounded-full hover:bg-gray-500/90"
						on:click={() => {
							dispatch("onEdit", sticker);
						}}
					>
						<div
							class="flex justify-center items-center w-6 h-6 text-white cursor-pointer"
						>
							<Edit />
						</div>
					</button>
					<button
						class=" p-2 bg-gray-500/60 rounded-full hover:bg-gray-500/90 cursor-pointer"
						on:click={() => {
							dispatch("onDelete", sticker);
						}}
					>
						<div class=" flex justify-center items-center w-6 h-6 text-white">
							<Trash />
						</div>
					</button>
				</div>
			</div>
		</div>
	{/if}
</button>
