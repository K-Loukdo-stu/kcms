<script>
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  // import { IN_DEV } from "$lib/statics";
  import { getLatestChannelFollowship } from "$providers/actions/kchannel/channel";
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import ReloadButton from "$components/materials/buttons/ReloadButton.svelte";
  import {
    getChannelFollowship,
    getFollowship,
    syncChannelFollowship,
  } from "$providers/actions/kchannel/followship";
  import ChannelFollowshipSearchInput from "$components/materials/dashboard/channel-followship/ChannelFollowshipSearchInput.svelte";
  import ChannelFollowshipList from "./channel-followship-list/ChannelFollowshipList.svelte";
  const dispatch = createEventDispatcher();

  let searchChannelFollowshipState = {
    searchText: "",
    findById: false,
    followships: [],
    lastUpdatedAt: 0,
    loading: false,
    loaded: false,
    errMsg: "",
  };

  let loaded = false;
  let loading = false;

  const onSearchChannelFollowshipById = async () => {
    try {
      searchChannelFollowshipState.loading = true;
      searchChannelFollowshipState.loaded = false;
      const res = await getFollowship.load({
        id: searchChannelFollowshipState.searchText,
      });
      searchChannelFollowshipState.followships = res.data;
      searchChannelFollowshipState.loaded = true;
    } catch (err) {
      searchChannelFollowshipState.errMsg =
        err?.message || "Unable to load channel followships from KTalk";
      // if (IN_DEV) console.log(err);
    } finally {
      searchChannelFollowshipState.loading = false;
    }
  };

  const onSearchChannelFollowship = async () => {
    try {
      searchChannelFollowshipState.loading = true;
      searchChannelFollowshipState.loaded = false;
      const res = await getChannelFollowship.load({
        lastUpdatedAt: searchChannelFollowshipState.lastUpdatedAt,
      });
      searchChannelFollowshipState.followships = res.data;
      searchChannelFollowshipState.loaded = true;
      console.log(
        "searchChannelFollowshipState.followships",
        searchChannelFollowshipState.followships,
      );
    } catch (err) {
      searchChannelFollowshipState.errMsg =
        err?.message || "Unable to load channels followship from KTalk";
      // if (IN_DEV) console.log(err);
    } finally {
      searchChannelFollowshipState.loading = false;
    }
  };

  let syncChannelFollowshipState = {
    followships: searchChannelFollowshipState.followships,
    loading: false,
    loaded: false,
    errMsg: "",
  };

  const onSyncChannelFollowship = async () => {
    console.log(searchChannelFollowshipState.followships);
    try {
      syncChannelFollowshipState.loading = true;
      loading = syncChannelFollowshipState.loading;
      syncChannelFollowshipState.loaded = false;
      loaded = syncChannelFollowshipState.loaded;
      const res = await syncChannelFollowship.load({
        followerships: searchChannelFollowshipState.followships,
      });
      syncChannelFollowshipState.followships = res.data;
      syncChannelFollowshipState.loaded = true;
      loaded = syncChannelFollowshipState.loaded;
    } catch (err) {
      syncChannelFollowshipState.errMsg =
        err?.message || "Unable to load sync channels followship to KChannel";
    } finally {
      syncChannelFollowshipState.loading = false;
      loading = syncChannelFollowshipState.loading;
    }
  };

  let fetchChannelFollowshipState = {
    followship: {},
    loading: false,
    loaded: false,
    errMsg: "",
  };

  const onFetchChannelFollowship = async () => {
    try {
      fetchChannelFollowshipState.loading = true;
      fetchChannelFollowshipState.loaded = false;
      const res = await getLatestChannelFollowship.load();
      fetchChannelFollowshipState.followship = res.data;
      fetchChannelFollowshipState.loaded = true;
      console.log(fetchChannelFollowshipState.followship);
      console.log(fetchChannelFollowshipState.followship[0].joinAt);
      // searchChannelFollowshipState.lastUpdatedAt = fetchChannelFollowshipState.followship[0].joinAt;
      onSearchChannelFollowship();
      console.log(fetchChannelFollowshipState.followship[0].joinAt);
      loading = false;
      loaded = false;
    } catch (err) {
      fetchChannelFollowshipState.errMsg =
        err?.message || "Unable to load channel followship";
      // if (IN_DEV) console.log(err);
    } finally {
      fetchChannelFollowshipState.loading = false;
    }
  };

  onMount(() => {
    // onSearchChannel();
  });
</script>

<div class=" p-4">
  <div
    class=" flex flex-col h-96 w-full bg-gray-100 border shadow-sm rounded-xl p-3 pb-1 space-y-3"
  >
    <div class=" w-full pb-2">
      <ChannelFollowshipSearchInput
        bind:searchText={searchChannelFollowshipState.searchText}
        bind:channelFollowshipTotal={searchChannelFollowshipState.followships
          .length}
        on:search={onSearchChannelFollowshipById}
        on:fetch={onFetchChannelFollowship}
      />
    </div>
    {#if searchChannelFollowshipState.loaded}
      <div
        class="flex items-center justify-end"
        on:click={() => {
          console.log("Sync");

          onSyncChannelFollowship();
        }}
      >
        <div
          class="bg-[#1D77B8] p-3 text-white cursor-pointer flex-grow-0 pr-5 pl-5 rounded-lg"
        >
          Sync All
        </div>
      </div>
    {:else if searchChannelFollowshipState.loading}
      <div class="flex items-center justify-end">
        <div
          class="bg-[#1D77B8] p-3 text-white cursor-pointer flex-grow-0 pr-5 pl-5 rounded-lg"
        >
          <SmfbLoading color="white" />
        </div>
      </div>
    {/if}

    <div class=" w-full flex-grow overflow-y-auto">
      {#if !searchChannelFollowshipState.loading && searchChannelFollowshipState.errMsg}
        <div class=" flex text-warning justify-center text-sm py-2 text-center">
          <div>
            <div class="py-2">{searchChannelFollowshipState.errMsg}</div>
            <ReloadButton on:click={() => onFetchChannelFollowship()} />
          </div>
        </div>
      {:else if searchChannelFollowshipState.loaded && searchChannelFollowshipState.followships.length == 0}
        <div class=" text-center py-2 text-gray-400 font-semibold">
          Not found 
        </div>
      {/if}

      {#if searchChannelFollowshipState.followships.length > 0}
        <ChannelFollowshipList
          {loaded}
          {loading}
          bind:followships={searchChannelFollowshipState.followships}
          on:select={(evt) => {
            // const channel = evt.detail.channel;
            // dispatch("select", { channel });
          }}
        />
      {/if}
    </div>

    <!-- search found status -->
    <div class="py-1">
      {#if searchChannelFollowshipState.loading}
        <div in:fade={{ duration: 200 }} class=" flex justify-end py-2 px-2">
          <SmfbLoading color="gray" />
        </div>
      {:else}
        <h2 in:fade={{ duration: 200 }} class=" text-gray-600 text-right">
          {searchChannelFollowshipState.followships?.length} Channel Followships
          found
        </h2>
      {/if}
    </div>
  </div>
</div>
