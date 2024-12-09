<script>
    import Delete from "$components/icons/Delete/Delete.svelte";
    import Pencil from "$components/icons/Pencil/Pencil.svelte";
    import { createEventDispatcher } from "svelte";
    let dispatch = createEventDispatcher();
    export let type;
</script>

<div class="bg-white p-2">
    <div class="flex flex-row items-center justify-between">
        <div class="flex items-center justify-start w-1/4 pl-5">{type.code}</div>
        <div class="flex items-center justify-center w-1/4">
            {type.url}
        </div>
        <div class="flex items-center justify-start w-1/4">
            {type.name}
        </div>
        <div class="flex items-center justify-center w-1/4 space-x-3">
            <div
                class="flex items-center justify-center text-[#3F3F3F] cursor-pointer hover:text-black"
                on:click={() => {
                    dispatch("edit", { type });
                }}
            >
                <Pencil size={20} />
            </div>
            <div
                class="flex items-center justify-center text-[#3F3F3F] cursor-pointer hover:text-black"
                on:click={() => {
                    dispatch("delete", { type });
                }}
            >
                <Delete size={20} />
            </div>
        </div>
        <!-- <div class="relative border rounded-sm h-5/6 w-full">
            <img class="absolute w-[24px] h-[24px]" src={packages.file.url} alt="" />
        </div> -->
        <!-- <div class="pt-1">
            <div class="text-[#464646] text-xl">
                {packages.name}
            </div>
            <div class="text-[#464646]">
                {packages.width}X{packages.height}
            </div>
        </div> -->
        <!-- <div class=" flex items-end justify-end pt-5">
            <div class="flex flex-row space-x-2 p-1">
                <div
                    class="p-1 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#3F3F3F] cursor-pointer hover:text-black"
                >
                    <Pencil size={20} />
                </div>
                <div
                    class="bg-[#F5F5F5] p-1 rounded-full flex items-center justify-center text-[#3F3F3F] cursor-pointer hover:text-black"
                >
                    <Delete size={20} />
                </div>
            </div>
        </div> -->
    </div>
</div>
