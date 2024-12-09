<script>
  import { createEventDispatcher, onMount, tick } from "svelte";
  import ChannelFollowshipListItem from "./ChannelFollowshipListItem.svelte";
  import { createOrUpdateChannelFollowship } from "$providers/actions/kchannel/channel";
  import { syncChannelFollowship } from "$providers/actions/kchannel/followship";
  const dispatch = createEventDispatcher();
  export let channels = [];
  export let selectedChannel;
  export let followships = [];
  export let loading = false;
  export let loaded = false;
  console.log("followerships2", followships);

  const onSelect = (channel) => {
    selectedChannel = channel;
    console.log("followship");
    dispatch("select", { channel });
  };

  // let syncChannelFollowshipAllState = {
  //   loading: false,
  //   loaded: false,
  //   errMsg: "",
  // };

  // const onSyncChannelFollowshipAll = async () => {
  //   console.log(followerships);
  //   try {
  //     syncChannelFollowshipAllState.loading = true;
  //     syncChannelFollowshipAllState.loaded = false;
  //     const res = await syncChannelFollowship.load({
  //       followerships,
  //     });
  //     console.log("Res", res);
  //     syncChannelFollowshipAllState.loaded = true;
  //   } catch (err) {
  //     syncChannelFollowshipAllState.errMsg =
  //       err?.message || "Unable to load sync channels followship to KChannel";
  //     // if (IN_DEV) console.log(err);
  //   } finally {
  //     syncChannelFollowshipAllState.loading = false;
  //   }
  // };

  onMount(() => {
    tick().then(() => {
      if (channels?.length > 0) {
        onSelect(channels[0]);
      }
    });
  });
</script>

{#each followships as followship}
  <ChannelFollowshipListItem
    {followship}
    {loaded}
    {loading}
    on:select={() => {}}
  />
{/each}
