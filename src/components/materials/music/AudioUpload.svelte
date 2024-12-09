<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let fileInfo;

  let fileinput;
  const onFileSelected = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      let base64 = e.target.result;
      var audio = document.createElement("audio");
      var objectURL = URL.createObjectURL(file);
      audio.addEventListener("loadedmetadata", function () {
        var duration = audio.duration;
        fileInfo = {
          base64,
          duration,
          name: file.name,
          size: file.size,
          type: file.type,
        };
        dispatch("handleFile", fileInfo);
        URL.revokeObjectURL(objectURL);
      });
      audio.src = objectURL;
    };
  };
</script>

<div class=" flex justify-center items-center w-full flex-col py-2">
  {#if fileInfo?.base64}
    <div class="p-4 relative">
      <audio src={fileInfo.base64} controls>
        Your browser does not support the audio element.
      </audio>

      <div class=" absolute right-6 -bottom-2">
        <button
          on:click={() => {
            fileInfo = null;
            dispatch("handleFile", fileInfo);
          }}
          class=" text-sm hover:font-semibold text-gray-500 hover:text-red-600"
          >Remove</button
        >
      </div>
    </div>
  {:else}
    <label
      for="audio-file"
      class=" text-gray-500 text-sm flex flex-col justify-center items-center w-full h-[40px] bg-gray-50 rounded-lg border-2 border-dotted cursor-pointer hover:bg-bray-800"
    >
      Choose audio file
    </label>
    <input
      name="audio-file"
      id="audio-file"
      style="display:none"
      type="file"
      accept="audio/*"
      on:change={(e) => onFileSelected(e)}
      bind:this={fileinput}
    />
  {/if}
</div>
