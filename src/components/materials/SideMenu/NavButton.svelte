<script>
	import SubNavButton from './SubNavButton.svelte';
	export let uid;
</script>

<div class="relative flex flex-grow-0 flex-row bg-gray-50 rounded-sm">
	<SubNavButton title="Information" href={`/dashboard/ktour/hotel/hotel/detail/info/${uid}`} tailwindClass="p-2"/>
	<SubNavButton title="Feature" href={`/dashboard/ktour/hotel/hotel/detail/feature/${uid}`}  tailwindClass="p-2"/>
	<SubNavButton title="Extra Feature" href={`/dashboard/ktour/hotel/hotel/detail/extraFeature/${uid}`}  tailwindClass="p-2"/>
	<SubNavButton title="Availability" href={`/dashboard/ktour/hotel/hotel/detail/availability/${uid}`}  tailwindClass="p-2"/>
	<SubNavButton title="Booking" href={`/dashboard/ktour/hotel/hotel/detail/booking/${uid}`}  tailwindClass="p-2"/>
</div>
