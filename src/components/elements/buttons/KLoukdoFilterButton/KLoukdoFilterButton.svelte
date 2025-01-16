<script>
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();
	// export let titles;
    export let categoryList;
    export let subCategoryList;

    let category;
    let subCategory;
</script>

<div class="flex">
    <button
        class="text-white bg-gray-500 hover:bg-gray-600 text-sm px-5 py-2 cursor-pointer rounded-l-md"
        type="button"
        data-modal-toggle="defaultModal"
        on:click={() => dispatch("click", { title:"all", index:0 })}
    >
        <div class="flex flex-row items-center">
            <div>All</div>
        </div>
    </button>
    <!-- {#each titles as title, index} -->
    <!-- <button
        class="text-white bg-gray-500 hover:bg-gray-600 text-sm px-5 py-2 cursor-pointer
        {index === titles.length - 1 ? 'rounded-r-md' : ''}"
        type="button"
        data-modal-toggle="defaultModal"
        on:click={() => dispatch("click", { title, index })}
    >
        <div class="flex flex-row items-center">
            <div>{title}</div>
        </div>
    </button> -->
    <select
        bind:value={category}
        name="category" 
        class="border text-center text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 text-white appearance-none"
        required
    >
        <option value="">Select Category</option>
        {#each categoryList as category}
            <option value="{category.id}">{category.name}</option>
        {/each}
    </select>
    <select
        bind:value={subCategory}
        name="category" 
        class="border text-center text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 text-white appearance-none"
        required
    >
        <option value="">Select Sub Category</option>
        {#each subCategoryList as category}
            <option value="{category.id}">{category.name}</option>
        {/each}
    </select>
    <!-- {/each} -->
</div>