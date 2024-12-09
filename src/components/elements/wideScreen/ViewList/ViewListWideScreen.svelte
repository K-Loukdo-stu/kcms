<script>
    import Pagenetion from "$components/elements/pagenation/Pagenation/Pagenetion.svelte";
    import { createEventDispatcher } from "svelte";
    import ViewWideScreen from "./ViewWideScreen.svelte";
    let dispatch = createEventDispatcher();
    export let wideData;
    export let widePage;
    export let currentPage;
</script>

<div class="absolute w-full flex flex-col h-full">
    <div class="flex-grow flex flex-row flex-wrap">
        {#each wideData as wide}
            <div class="p-2 w-60">
                <ViewWideScreen
                    {wide}
                    on:view={() => {
                        dispatch("view", { wide });
                    }}
                    on:edit={() => {
                        dispatch("edit", { wide });
                    }}
                    on:delete={() => {
                        dispatch("delete", { wide });
                    }}
                />
            </div>
        {/each}
    </div>
    <div class=" w-full flex-grow-0 h-full flex items-end">
        {#if widePage != 1}
            <Pagenetion
                totalPageNumber={widePage}
                {currentPage}
                on:onCurrentPage={async (evt) => {
                    currentPage = evt.detail;
                    dispatch("onCurrentPage", currentPage);
                }}
            />
        {/if}
    </div>
</div>
