<script>
    import { createEventDispatcher } from "svelte";
    let dispatch = createEventDispatcher();
    export let number;
    export let active = false;
</script>

<div
    class={"cursor-pointer p-2 pl-3 pr-3 rounded-lg border " +
        (active ? "bg-[#4d4d4d]  text-white" : "  text-[#808080] bg-white")}
    on:click={() => {
        dispatch("onCurrentPage", { number });
    }}
>
    {number}
</div>
