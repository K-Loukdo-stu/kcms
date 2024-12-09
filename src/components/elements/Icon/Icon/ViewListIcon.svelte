<script>
    import Pagenetion from "$components/elements/pagenation/Pagenation/Pagenetion.svelte";
    import { createEventDispatcher } from "svelte";
    let dispatch = createEventDispatcher();
    import ViewIcon from "./ViewIcon.svelte";
    export let iconData;
    export let iconPage;
    export let currentPage;
</script>

<div class="absolute w-full flex flex-col h-full pt-5">
    <div class="flex-grow flex flex-row flex-wrap">
        <div class="bg-[#F6F6F6] border p-2 w-full rounded-md">
            <div
                class="flex flex-row items-center justify-between text-[#444444]"
            >
                <div class="flex items-center justify-center w-1/6">Code</div>
                <div class="flex items-center justify-center w-1/6">Icon</div>
                <div class="flex items-center justify-center w-1/6">Name</div>
                <div class="flex items-center justify-center w-1/6">
                    Width(px)
                </div>
                <div class="flex items-center justify-center w-1/6">
                    Height(px)
                </div>
                <div class="flex items-center justify-center w-1/6">Action</div>
            </div>
        </div>
        {#each iconData as icon}
            <div class="w-full">
                <ViewIcon
                    {icon}
                    on:edit={() => {
                        dispatch("edit", { icon });
                    }}
                    on:delete={() => {
                        dispatch("delete", { icon });
                    }}
                />
            </div>
        {/each}
    </div>
    <div class=" w-full flex-grow-0 h-full flex items-end">
        {#if iconPage != 1}
            <Pagenetion
                totalPageNumber={iconPage}
                {currentPage}
                on:onCurrentPage={async (evt) => {
                    currentPage = evt.detail;
                    dispatch("onCurrentPage", currentPage);
                }}
            />
        {/if}
    </div>
</div>
