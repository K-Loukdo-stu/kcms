<script>
	import SubNavButton from './SubNavButton.svelte';
</script>

<div class="relative flex flex-grow-0 flex-row bg-gray-50 rounded-sm">
	<SubNavButton title="Hotel" href={`/dashboard/ktour/hotel/hotel`} tailwindClass="p-2"/>
	<SubNavButton title="Channel" href={`/dashboard/ktour/hotel/hotel/channel`}  tailwindClass="p-2"/>
</div>
