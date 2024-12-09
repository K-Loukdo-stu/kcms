<script>
	export let stickers;
	import StickerItem from "$components/elements/grids/ViewSticker/StickerItem.svelte";
	export let param = {};
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
</script>

<div class="flex flex-row flex-wrap p-1">
	{#if stickers}
		{#each stickers as sticker}
			<div class="p-2">
				<StickerItem
					{sticker}
					on:onEdit={(evt) => {
						param = evt.detail;
						dispatch("onEdit", param);
					}}
					on:onDelete={(evt) => {
						param = evt.detail;
						dispatch("onDelete", param);
					}}
				/>
			</div>
		{/each}
	{/if}
</div>
