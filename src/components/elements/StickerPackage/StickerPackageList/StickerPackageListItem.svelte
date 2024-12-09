<script>
	import Edit from "$components/icons/Edit.svelte";
	import { createEventDispatcher } from "svelte";
	import { goto } from "$app/navigation";
	import Trash from "$components/icons/Trash.svelte";
	let dispatch = createEventDispatcher();
	export let stickerPackage;
	const onClickDetail = (packages) => {
		goto(`/dashboard/kart/sticker/package/${packages}`);
	};

	let imgLoaded = false;
</script>

<div
	class="bg-white hover:bg-gray-100 cursor-pointer flex items-center justify-between w-full shadow-sm border-[#DFDFDF] border-[1px] rounded-xl"
>
	<button
		class="w-1/4 flex p-1 justify-center"
		on:click={onClickDetail(stickerPackage.id)}
	>
		<div
			class="bg-gray-100 rounded-full w-14 h-14 flex items-center justify-center overflow-hidden"
		>
			<img
				hidden={!imgLoaded}
				class="rounded-full p-1 object-cover w-full h-full"
				src={stickerPackage.file.url}
				alt=""
				on:load={() => (imgLoaded = true)}
			/>
		</div>
	</button>
	<button
		class="w-1/4 text-base flex justify-start"
		on:click={onClickDetail(stickerPackage.id)}
	>
		<div class="p-2 flex flex-col">
			<div class="text-lg">{stickerPackage.name}</div>
		</div>
	</button>
	<button
		class="w-1/4 text-base flex justify-start"
		on:click={onClickDetail(stickerPackage.id)}
	>
		{#if stickerPackage.price}
			<div class="text-sm flex space-x-2 text-[#5F5F5F]">
				<div>{stickerPackage.price}{stickerPackage.currency}</div>
			</div>
		{:else}
			<div class="text-sm flex space-x-2 text-[#5F5F5F]">
				<div>0</div>
			</div>
		{/if}
	</button>
	<button
		class="w-1/4 text-base flex justify-start"
		on:click={onClickDetail(stickerPackage.id)}
	>
		<div
			class="p-2 flex flex-col {stickerPackage?.stickerCount > 0
				? ''
				: ' text-red-400'}"
		>
			<div class="text-lg">{stickerPackage?.stickerCount}</div>
		</div>
	</button>
	<div class="w-1/4 flex justify-center">
		<button
			class="text-blue-500 hover:text-blue-600 flex items-center"
			on:click={() => {
				dispatch("edit", stickerPackage);
			}}
		>
			<Edit />
		</button>
		<div class="w-2"></div>
		<button
			title={stickerPackage?.stickerCount > 0
				? "This package contains stickers"
				: ""}
			disabled={stickerPackage?.stickerCount > 0}
			class="text-red-500 hover:text-red-600 disabled:text-red-300 flex items-center"
			on:click={() => {
				dispatch("delete", stickerPackage);
			}}
		>
			<Trash />
		</button>
	</div>
</div>
