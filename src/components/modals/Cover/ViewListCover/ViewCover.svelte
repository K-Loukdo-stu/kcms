<script>
    import CloseEye from "$components/icons/CloseEye/CloseEye.svelte";
    import Delete from "$components/icons/Delete/Delete.svelte";
    import Eye from "$components/icons/Eye/Eye.svelte";
    import Pencil from "$components/icons/Pencil/Pencil.svelte";
    import { createEventDispatcher } from "svelte";
    let dispatch = createEventDispatcher();
    export let cover;
</script>

<div class="bg-white rounded-md h-[400px] border">
    <div class="flex flex-col p-1 h-full">
        <div class="relative border rounded-md h-5/6 w-full overflow-hidden flex items-center">
            <img class="absolute" src={cover.file.url} alt="" />
        </div>
        <div class="pt-1">
            <div class="text-[#464646] text-xl">
                {cover.name}
            </div>
            <div class="text-[#464646]">
                {cover.width}x{cover.height}
            </div>
        </div>
        <div class=" flex items-end justify-end pt-5">
            <div class="flex flex-row space-x-2 p-1">
                {#if cover.visible}
                    <div
                        class="p-1 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#3F3F3F] cursor-pointer hover:text-black"
                        on:click={() => {
                            dispatch("view");
                        }}
                    >
                        <CloseEye size={20} />
                    </div>
                {:else}
                    <div
                        class="p-1 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#3F3F3F] cursor-pointer hover:text-black"
                        on:click={() => {
                            dispatch("view");
                        }}
                    >
                        <Eye size={20} />
                    </div>
                {/if}
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
