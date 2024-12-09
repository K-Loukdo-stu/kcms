<script>
  import TimeIcon from "$components/icons/Time.svelte";
  import TagIcon from "$components/icons/tag/Tag.svelte";
  import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";
  import { createOrUpdateChannelFollowship } from "$providers/actions/kchannel/channel";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let followship;
  console.log("followershipfollowershipfollowership0", followship);
  export let loading = false;
  export let loaded = false;
  let channelFollowshipState = {
    errMsg: "",
  };

  const onSync = async () => {
    console.log("followship");
    try {
      loading = true;
      loaded = false;
      const res = await createOrUpdateChannelFollowship.load({
        id: followship.id,
        joinAt: followship.joinAt,
        addedBy: followship.addedBy?.id || null,
        channel: followship.channel?.id || null,
        user: followship.user?.id || null,
        createdAt: followship.createdAt,
        updatedAt: followship.updatedAt,
        deleted: followship.deleted,
      });
      console.log("res", res);
      loaded = true;
    } catch (err) {
      channelFollowshipState.errMsg = err?.message || "Unable to load channels";
    } finally {
      loading = false;
    }
  };
  let imgLoaded = false;
</script>

<div class=" w-full">
  <label
    for={`${followship.id}`}
    class="flex bg-white p-1 px-3 mt-2 space-x-4 items-center rounded-2xl border-2"
  >
    <div class=" flex justify-center items-center">
      <div class="h-14 w-14 rounded-[20px] bg-gray-200 border">
        <img
          class:invisible={!imgLoaded}
          src={followship.channel?.profile?.thumbnail?.url || null}
          alt=""
          class=" w-full h-full"
          on:load={() => (imgLoaded = true)}
        />
      </div>
    </div>
    <div class=" flex w-full justify-between">
      <div>
        <h2 class=" text-gray-600 font-medium text-lg">
          {`${followship.channel?.name || null}`}
        </h2>
      </div>
      <div class=" flex justify-end items-center">
        <p class=" text-gray-600 select-text px-2">{`${followship.id}`}</p>
      </div>
      {#if loading}
        <div class="flex items-center justify-center">
          <div
            class="bg-[#1D77B8] text-white pl-5 pr-5 pb-3 pt-3 rounded-lg w-[90px] flex justify-center"
          >
            <SmfbLoading></SmfbLoading>
          </div>
        </div>
      {:else if loaded}
        <div class="flex items-center justify-center">
          <div
            class="bg-[#D9D9D9] text-[#949494] pl-5 pr-5 pb-3 pt-3 rounded-lg w-[90px]"
          >
            Synced
          </div>
        </div>
      {:else}
        <div
          class="flex items-center justify-center"
          on:click={() => {
            onSync();
            dispatch("select", { followship });
          }}
        >
          <div
            class="bg-[#1D77B8] text-white pl-5 pr-5 pb-3 pt-3 rounded-lg cursor-pointer w-[90px] flex justify-center"
          >
            Sync
          </div>
        </div>
      {/if}

      <!-- {#if active}
        <div
          class=" w-20 h-6 p-[4px] bg-blue-500 border-2 border-gray-300 relative flex justify-centers items-center rounded-lg"
        >
          <div class="absolute w-full text-white">Not Sync</div>
        </div>
      {:else}
        <div
          class=" w-20 h-6 p-[2px] border-2 border-gray-300 relative flex justify-centers items-center rounded-lg" 
        >
          <div class="absolute w-full text-gray-300">Sync</div>
        </div>
      {/if} -->
    </div>
  </label>
</div>
