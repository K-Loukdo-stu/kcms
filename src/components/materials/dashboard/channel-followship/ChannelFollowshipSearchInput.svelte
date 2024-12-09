<script>
  import Search from "$components/icons/Search.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let searchText;
  export let channelFollowshipTotal;
  let searchDelayT;
</script>

<form class="w-full flex flew-row space-x-2">
  <div class="relative w-full">
    <div
      class="flex absolute inset-y-[2px] left-0 items-center pl-4 pointer-events-none text-gray-500 w-12 h-12"
    >
      <Search />
    </div>
    <input
      bind:value={searchText}
      on:input={() => {
        if (searchDelayT) clearTimeout(searchDelayT);
        searchDelayT = setTimeout(async () => {
          dispatch("search");
        }, 500);
      }}
      hideLabel
      type="search"
      id="title_total"
      class="block p-3 pl-14 w-full text-gray-900 rounded-full border-2 border-gray-300 dark:bg-white dark:placeholder-gray-400 dark:text-gray-700 peer px-2 outline-none focus:outline-none focus:ring-0"
      placeholder="Search {channelFollowshipTotal} channel followships"
      required
    />
  </div>
  <div
    class="bg-[#1D77B8] p-3 text-white cursor-pointer flex-grow-0 pr-5 pl-5 rounded-lg"
    on:click={() => {
      dispatch("fetch");
    }}
  >
    Fetch
  </div>
</form>
