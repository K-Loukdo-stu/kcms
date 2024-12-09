<script>
  import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";

  export let src;

  let loaded = false;
</script>

<div class="p-2 relative">
  <audio {src} controls on:canplay={() => (loaded = true)}>
    Your browser does not support the audio element.
  </audio>

  {#if !loaded}
    <div class=" absolute inset-0 flex items-center justify-center">
      <SmfbLoading color="grey" />
    </div>
  {/if}
</div>
