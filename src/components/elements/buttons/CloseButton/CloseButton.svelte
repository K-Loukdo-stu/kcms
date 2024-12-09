<script>
    import CloseIcon from "$components/icons/Close/CloseIcon.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
</script>

<div
    class="flex items-center justify-center p-1 text-gray-400  hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm"
    on:click={() => {
        dispatch("close");
    }}
>
    <CloseIcon size={20}/>
</div>
