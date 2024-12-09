<script>
    import CloseIcon from "$components/icons/Close/CloseIcon.svelte";
    import SmfbLoading from "../Spinners/fbLoading/SMFBLoading.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let param = {
        title: "Title",
        action: "Action",
        loading: false,
    };
</script>

<div class="flex items-center justify-between p-2  border-b-[1px]">
    <div
        class="text-[#717171] cursor-pointer p-1 rounded-lg hover:bg-gray-50"
        on:click={() => {
            dispatch("close");
        }}
    >
        <CloseIcon />
    </div>
    <div class="text-[#494949]">{param.title}</div>
    <div>
        {#if !param.loading}
            <div
                class="cursor-pointer flex items-center justify-center bg-[#006EB2] rounded-md p-1 pl-3 pr-3 text-white"
                on:click={() => {
                    param.loading = true;
                }}
            >
                {param.action}
            </div>
        {:else}
            <div
                class="cursor-pointer flex items-center justify-center bg-[#F1F1F1] rounded-md p-2 pl-4 pr-4 text-white"
            >
                <SmfbLoading color={"#006EB2"} />
            </div>
        {/if}
    </div>
</div>
