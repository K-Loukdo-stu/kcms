<script context="module">
	export async function load({ session, fetch }) {
		return { props: { session } };
	}
</script>

<div class="bg-gray-500">
	<slot />
</div>

<style lang="postcss" global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
