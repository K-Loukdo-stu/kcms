<script>
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  // import { IN_DEV } from "$lib/statics";
  import {
    getChannelById,
    getLatestChannel,
    syncChannels,
  } from "$providers/actions/kchannel/channel";
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import ReloadButton from "$components/materials/buttons/ReloadButton.svelte";
  import ChannelSearchInput from "$components/materials/dashboard/channel/ChannelSearchInput.svelte";
  import ChannelList from "./channel-list/ChannelList.svelte";
  import { getChannelsKtalk } from "$providers/actions/ktalk/channel";
  const dispatch = createEventDispatcher();

  let searchChannelState = {
    searchText: "",
    channels: [],
    lastUpdatedAt: 0,
    loading: false,
    loaded: false,
    errMsg: "",
  };

  let loaded = false;
  let loading = false;

  const onSearchChannelById = async () => {
    try {
      searchChannelState.loading = true;
      searchChannelState.loaded = false;
      const res = await getChannelById.load({
        id: searchChannelState.searchText,
      });
      searchChannelState.channels = res.data;
      searchChannelState.loaded = true;
    } catch (err) {
      searchChannelState.errMsg =
        err?.message || "Unable to load channels from KTalk";
      // if (IN_DEV) console.log(err);
    } finally {
      searchChannelState.loading = false;
    }
  };

  const onSearchChannel = async () => {
    try {
      searchChannelState.loading = true;
      searchChannelState.loaded = false;
      const res = await getChannelsKtalk.load({
        lastUpdatedAt: searchChannelState.lastUpdatedAt,
      });
      searchChannelState.channels = res.data;
      searchChannelState.loaded = true;
    } catch (err) {
      searchChannelState.errMsg =
        err?.message || "Unable to load channels from KTalk";
      // if (IN_DEV) console.log(err);
    } finally {
      searchChannelState.loading = false;
    }
  };

  let syncChannelState = {
    channels: searchChannelState.channels,
    loading: false,
    loaded: false,
    errMsg: "",
  };

  const onSyncChannels = async () => {
    try {
      syncChannelState.loading = true;
      loading = syncChannelState.loading;
      syncChannelState.loaded = false;
      loaded = syncChannelState.loaded;
      const res = await syncChannels.load({
        channels: searchChannelState.channels,
      });
      syncChannelState.channels = res.data;
      syncChannelState.loaded = true;
      loaded = syncChannelState.loaded;
    } catch (err) {
      syncChannelState.errMsg =
        err?.message || "Unable to load sync channels to KChannel";
    } finally {
      syncChannelState.loading = false;
      loading = syncChannelState.loading;
    }
  };

  let fetchChannelState = {
    channel: {},
    loading: false,
    loaded: false,
    errMsg: "",
  };

  const onFetchChannel = async () => {
    try {
      fetchChannelState.loading = true;
      fetchChannelState.loaded = false;
      const res = await getLatestChannel.load();
      fetchChannelState.channel = res.data;
      fetchChannelState.loaded = true;
      searchChannelState.lastUpdatedAt = fetchChannelState.channel[0].updatedAt
      onSearchChannel();
      loading = false;
      loaded = false;
    } catch (err) {
      fetchChannelState.errMsg = err?.message || "Unable to load channels";
      // if (IN_DEV) console.log(err);
    } finally {
      fetchChannelState.loading = false;
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
      <ChannelSearchInput
        bind:searchText={searchChannelState.searchText}
        bind:channelTotal={searchChannelState.channels.length}
        on:search={onSearchChannelById}
        on:fetch={onFetchChannel}
      />
    </div>
    {#if searchChannelState.loaded}
      <div
        class="flex items-center justify-end"
        on:click={() => {
          onSyncChannels();
        }}
      >
        <div
          class="bg-[#1D77B8] p-3 text-white cursor-pointer flex-grow-0 pr-5 pl-5 rounded-lg"
        >
          Sync All
        </div>
      </div>
    {:else if searchChannelState.loading}
      <div class="flex items-center justify-end">
        <div
          class="bg-[#1D77B8] p-3 text-white cursor-pointer flex-grow-0 pr-5 pl-5 rounded-lg"
        >
          <SmfbLoading color="white" />
        </div>
      </div>
    {/if}

    <div class=" w-full flex-grow overflow-y-auto">
      {#if !searchChannelState.loading && searchChannelState.errMsg}
        <div class=" flex text-warning justify-center text-sm py-2 text-center">
          <div>
            <div class="py-2">{searchChannelState.errMsg}</div>
            <ReloadButton on:click={() => onFetchChannel()} />
          </div>
        </div>
      {:else if searchChannelState.loaded && searchChannelState.channels.length == 0}
        <div class=" text-center py-2 text-gray-400 font-semibold">
          Not found
        </div>
      {/if}

      {#if searchChannelState.channels.length > 0}
        <ChannelList
          {loaded}
          {loading}
          bind:channels={searchChannelState.channels}
          on:select={(evt) => {
            // const channel = evt.detail.channel;
            // dispatch("select", { channel });
          }}
        />
      {/if}
    </div>

    <!-- search found status -->
    <div class="py-1">
      {#if searchChannelState.loading}
        <div in:fade={{ duration: 200 }} class=" flex justify-end py-2 px-2">
          <SmfbLoading color="gray" />
        </div>
      {:else}
        <h2 in:fade={{ duration: 200 }} class=" text-gray-600 text-right">
          {searchChannelState.channels?.length} Channels found
        </h2>
      {/if}
    </div>
  </div>
</div>
