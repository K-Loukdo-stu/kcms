<script>
  import { createEventDispatcher, onMount, tick } from "svelte";
  import ChannelListItem from "./ChannelListItem.svelte";
  const dispatch = createEventDispatcher();
  export let channels = [];
  export let selectedChannel;
  export let loaded = false;
  export let loading = false;
  console.log(channels);

  const onSelect = (channel) => {
    selectedChannel = channel;
    dispatch("select", { channel });
  };

  onMount(() => {
    tick().then(() => {
      if (channels?.length > 0) {
        onSelect(channels[0]);
      }
    });
  });

</script>

{#each channels as channel}
  <ChannelListItem
    {channel}
    {loaded}
    {loading}
  />
{/each}



