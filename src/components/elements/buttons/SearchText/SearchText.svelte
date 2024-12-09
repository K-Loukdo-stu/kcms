<script>
	import Search from "$components/icons/search/Search.svelte";
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();
	export let searchText;
</script>

<div class="relative text-gray-600 focus-within:text-gray-400 h-9">
	<span class="absolute inset-y-0 left-1 flex items-center p-1">
		<Search />
	</span>
	<input
		type="search"
		name="searchText"
		bind:value={searchText}
		class="p-1 pl-10 bg-[#FCFCFC] border rounded-lg focus:outline-none text-base h-full w-full"
		placeholder="Search"
		autocomplete="off"
		on:input={() => {
			dispatch("onSearch", searchText);
		}}
	/>
</div>
