<script>
    import CopyClipBoard from "$components/elements/CopyClipBoard/CopyClipBoard.svelte";
    import Copy from "$components/icons/Copy/Copy.svelte";
    import Delete from "$components/icons/Delete/Delete.svelte";
    import Pencil from "$components/icons/Pencil/Pencil.svelte";
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    let dispatch = createEventDispatcher();
    export let icon;
    let text = icon.file.url;
    let linkCopied;
    const onCopy = () => {
        linkCopied = true;
        const app = new CopyClipBoard({
            target: document.getElementById("clipboard"),
            props: { name: text },
        });
        app.$destroy();

        const T = setTimeout(() => {
            linkCopied = false;
            clearTimeout(T);
        }, 5000);
    };
</script>

<div class="bg-white p-2">
    <div class="flex flex-row items-center justify-between">
        <div class="flex items-center justify-start w-1/6">{icon.code}</div>
        <div class="flex items-center justify-center w-1/6">
            <img
                class="absolute w-[24px] h-[24px]"
                src={icon.file.url}
                alt=""
            />
        </div>
        <div class="flex items-center justify-start w-1/6">
            {icon.name}
        </div>
        <div class="flex items-center justify-center w-1/6">
            {icon.width}
        </div>
        <div class="flex items-center justify-center w-1/6">
            {icon.height}
        </div>
        <div class="flex items-center justify-center w-1/6 space-x-3">
            <div
                class="flex items-center justify-center text-[#3F3F3F] cursor-pointer hover:text-black"
                on:click={() => {
                    dispatch("edit");
                }}
            >
                <Pencil size={20} />
            </div>
            <div
                class="flex items-center justify-center text-[#3F3F3F] cursor-pointer hover:text-black"
                on:click={() => {
                    dispatch("delete");
                }}
            >
                <Delete size={20} />
            </div>
            <div
                class="flex items-center justify-center text-[#3F3F3F] cursor-pointer hover:text-black relative"
                on:click={onCopy}
            >
                <Copy size={20} />
                <div id="clipboard" />
                {#if linkCopied}
                    <div
                        in:fade
                        class="absolute -top-3/4 left-0 right-0 text-primary text-center text-sm"
                    >
                        Copied
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>
