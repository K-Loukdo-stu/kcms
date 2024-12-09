<script>
    import { clickOutside } from "$lib/utils/clickOutside";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let shown = false;
    export let stickerTypes = [];
</script>

<!-- Emoji Modal -->
{#if shown}
    <div class=" absolute inset-0 z-10">
        <div
            class=" relative p-1 flex justify-center items-center w-80 h-full bg-gray-600/25 rounded-lg"
        >
            <div
                use:clickOutside
                on:click_outside={() => {
                    dispatch("close");
                }}
                class="absolute bg-white rounded-lg"
            >
                <div
                    class="w-72 h-[400px] overflow-y-auto flex flex-row flex-wrap p-2"
                >
                    {#each stickerTypes as type}
                        <div
                            on:click={() => {
                                dispatch("select", { type });
                            }}
                            class=" hover:bg-gray-300 p-1 h-fit cursor-pointer rounded-md"
                        >
                            {#if type.file}
                                <div>
                                    <img
                                        src={type.file.url}
                                        class="w-5 h-5"
                                        alt=""
                                    />
                                </div>
                            {:else}
                                <div>{type.url}</div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
{/if}
