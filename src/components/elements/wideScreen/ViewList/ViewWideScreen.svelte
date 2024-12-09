<script>
    import Delete from "$components/icons/Delete/Delete.svelte";
    import Pencil from "$components/icons/Pencil/Pencil.svelte";
    import StickerAnimated from "$components/modals/Sticker/StickerAnimated/StickerAnimated.svelte";
    import { createEventDispatcher } from "svelte";
    let dispatch = createEventDispatcher();
    export let wide;
</script>

<div class="bg-white rounded-md h-[400px] border">
    <div class="flex flex-col p-1 h-full">
        <div
            class="relative border rounded-md h-5/6 w-full overflow-hidden flex items-center justify-center"
        >
            <StickerAnimated
                base64={wide.file.url}
                bind:frameNum={wide.frameNum}
                bind:fps={wide.speed}
            />
        </div>
        <div class="pt-1">
            <div class="text-[#464646] text-xl">
                {wide.name}
            </div>
            <div class="text-[#464646]">
                {wide.width}X{wide.height}
            </div>
        </div>
        <div class=" flex items-end justify-end pt-5">
            <div class="flex flex-row space-x-2 p-1">
                <div
                    class="p-1 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#3F3F3F] cursor-pointer hover:text-black"
                    on:click={() => {
                        dispatch("edit");
                    }}
                >
                    <Pencil size={20} />
                </div>
                <div
                    class="bg-[#F5F5F5] p-1 rounded-full flex items-center justify-center text-[#3F3F3F] cursor-pointer hover:text-black"
                    on:click={() => {
                        dispatch("delete");
                    }}
                >
                    <Delete size={20} />
                </div>
            </div>
        </div>
    </div>
</div>
