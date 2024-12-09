<script>
	import { page } from '$app/stores';
	import { afterUpdate } from 'svelte';

	export let title = 'Sub Title';
	export let href = '#';
	export let tailwindClass = '';

	let active = false;
	afterUpdate(() => {
		active = $page.url.pathname == href;
	});
</script>

<div class="p-2">
	<a sveltekit:prefetch {href}>
		<div
			class="{active &&
				'bg-gray-600 text-white'} transition ease-in-out bg-gray-50 text-gray-600 text-sm rounded-sm hover:bg-gray-600 hover:text-white p-1 px-2  {tailwindClass}"
		>
			<span>{title}</span>
		</div>
	</a>
</div>
