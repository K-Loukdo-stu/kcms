<script>
    import CirclePlus from "$components/icons/Plus/CirclePlus.svelte";
    import { createEventDispatcher } from "svelte";
    export let title = "Title";
    export let isDisabled = false;
    let dispatch = createEventDispatcher();
    const onClick = () => {
        dispatch("click");
    };
</script>

<button
    disabled={isDisabled}
    class=" disabled:text-gray-100 flex flex-row flex-nowrap justify-center items-center p-1 px-2 text-gray-600 bg-[#F6F6F6] border hover:bg-gray-300 rounded-lg text-sm cursor-pointer"
    type="button"
    data-modal-toggle="defaultModal"
    on:click={onClick}
>
    <div class="pr-1"><CirclePlus /></div>
    {title}
</button>
