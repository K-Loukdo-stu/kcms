<script>
    import AddImage from "$components/icons/Add/AddImage.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let base64;
    export let file;

    let fileinput;
    const onFileSelected = (e) => {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
            base64 = e.target.result;
            dispatch("onImage", base64);
        };
    };
</script>

<div class="flex justify-center items-center w-full flex-col">
    <div
        class="bg-[#F8F8F9] w-[150px] h-[150px] flex items-center justify-center rounded-lg overflow-hidden"
    >
        <div
            class="relative flex flex-col justify-center items-center w-full h-full"
        >
            <div
                class="absolute flex items-center text-[#939393] justify-center flex-col cursor-pointer w-full h-full"
                on:click={() => {
                    fileinput.click();
                }}
            >
                {#if base64}
                    <div class="w-full h-full">
                        <img
                            src={base64}
                            class="w-full h-full text-gray-600"
                            alt=""
                        />
                    </div>
                {:else if file}
                    <img
                        src={file.url}
                        class="w-full h-full text-gray-600"
                        alt=""
                    />
                {:else}
                    <AddImage size={45} />
                    <div>Image</div>
                {/if}
            </div>
        </div>
        <input
            id="dropzone-file"
            style="display:none"
            type="file"
            accept=".jpg, .jpeg, .png"
            on:change={(e) => onFileSelected(e)}
            bind:this={fileinput}
        />
    </div>
</div>
