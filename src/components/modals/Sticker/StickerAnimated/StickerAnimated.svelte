<script>
  import { onDestroy, onMount } from "svelte";

  export let scale = 1;
  export let w = 130;
  export let h = 130;
  export let base64;
  export let frameNum = 1;
  export let fps = 10;

  let imgW = w * scale;
  let imgH = h * scale;
  let stickerBgPos;
  let count = 1;
  let positionX = 0;
  let T;
  onMount(() => {
    setFps();
  });

  $: if (fps) {
    setFps();
  }

  const setFps = () => {
    if(T) clearInterval(T);
    T = setInterval(() => {
      positionX = -(w * count) * scale;
      stickerBgPos = `${positionX}px 0`;
      count++;
      count = count >= frameNum ? 0 : count;
    }, 1000 / fps);
  };

  onDestroy(() => {
    clearInterval(T);
  });
</script>

<div>
  <div
    style="width:{imgW}px;height:{imgH}px;background-position: {stickerBgPos};background: url({base64}) no-repeat 0 0;background-size: {imgW *
      frameNum}px {imgH}px;"
    class="sticker"
  />
</div>

<style>
  .sticker {
    margin: 0 auto;
  }
</style>
