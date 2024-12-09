<script>
    import { createEventDispatcher } from "svelte";
    import CoverDetail from "./CoverDetail.svelte";
    export let coversData, param;
    let dispatch = createEventDispatcher();
    let shownDelete = true;
</script>

{#each coversData as cover}
    <CoverDetail
        {cover}
        on:onDelete={(evt) => {
            param = evt.detail;
            dispatch("onDelete", { param, shownDelete });
        }}
    />
{/each}
