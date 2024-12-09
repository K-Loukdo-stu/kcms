<script>
	import { createEventDispatcher } from "svelte";
	import EditAnimatedSticker from "./EditAnimateSticker/EditAnimatedSticker.svelte";
	import EditStaticSticker from "./EditStaticSticker/EditStaticSticker.svelte";
	const dispatch = createEventDispatcher();
	export let packages;
	export let stickerTypes;
	export let param;
	let animatedSticker = param.animated;
</script>

{#if animatedSticker}
	<EditAnimatedSticker
		{packages}
		{stickerTypes}
		sticker={param}
		on:edit={() => {
			dispatch("edit");
		}}
		on:close={() => {
			dispatch("close");
		}}
	/>
{:else}
	<EditStaticSticker
		{stickerTypes}
		{packages}
		sticker={param}
		file={param.file}
		on:edit={() => {
			dispatch("edit");
		}}
		on:close={() => {
			dispatch("close");
		}}
	/>
{/if}
