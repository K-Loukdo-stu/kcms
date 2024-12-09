<script>
	import { createEventDispatcher } from "svelte";
	import Pagenetion from "$components/elements/pagenation/Pagenation/Pagenetion.svelte";
	import StickerPackageListItem from "./StickerPackageListItem.svelte";
	let dispatch = createEventDispatcher();
	export let packageData;
	export let packagePage;
	export let currentPage;
</script>

<div class="absolute w-full p-2 flex flex-col space-y-2 h-full">
	<div class="flex-grow space-y-2">
		{#each packageData as stickerPackage}
			<StickerPackageListItem
				bind:stickerPackage
				on:edit={(evt) => {
					dispatch("edit", evt.detail);
				}}
				on:delete={(evt) => {
					dispatch("delete", evt.detail);
				}}
			/>
		{/each}
	</div>
	<div class=" w-full flex-grow-0 h-full flex items-end">
		{#if packagePage != 1}
			<Pagenetion
				totalPageNumber={packagePage}
				{currentPage}
				on:onCurrentPage={async (evt) => {
					currentPage = evt.detail;
					dispatch("onCurrentPage", currentPage);
				}}
			/>
		{/if}
	</div>
</div>
