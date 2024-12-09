<script>
	import SubNavButton from './SubNavButton.svelte';
	export let cid;
</script>

<div class="relative flex flex-grow-0 flex-row bg-gray-50 rounded-sm">
	<SubNavButton title="Channel" href={`/dashboard/kchannel/channel/channel/detail/${cid}`} tailwindClass="p-2"/>
	<SubNavButton title="Product" href={`/dashboard/kchannel/channel/channel/product/${cid}`}  tailwindClass="p-2"/>
	<SubNavButton title="Post" href={`/dashboard/kchannel/channel/channel/post/${cid}`}  tailwindClass="p-2"/>
</div>
