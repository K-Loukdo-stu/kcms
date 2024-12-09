<script>
    import Pagenetion from "$components/elements/pagenation/Pagenation/Pagenetion.svelte";
    import { createEventDispatcher } from "svelte";
    import ViewCover from "./ViewCover.svelte";
    let dispatch = createEventDispatcher();
    export let coverData;
    export let coverPage;
    export let currentPage;
</script>

<div class="absolute w-full flex flex-col h-full">
    <div class="flex flex-wrap">
        {#each coverData as cover}
            <div class="p-2 w-60">
                <ViewCover
                    {cover}
                    on:view={() => {
                        dispatch("view", { cover });
                    }}
                    on:edit={() => {
                        dispatch("edit", { cover });
                    }}
                    on:delete={() => {
                        dispatch("delete", { cover });
                    }}
                />
            </div>
        {/each}
    </div>
    <div class=" w-full flex-grow-0 h-full flex items-end">
        {#if coverPage != 1}
            <Pagenetion
                totalPageNumber={coverPage}
                {currentPage}
                on:onCurrentPage={async (evt) => {
                    currentPage = evt.detail;
                    dispatch("onCurrentPage", currentPage);
                }}
            />
        {/if}
    </div>
</div>
