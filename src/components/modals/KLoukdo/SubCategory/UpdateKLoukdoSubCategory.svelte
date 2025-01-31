<script>
	import { createService } from '$providers/actions/kauth/service';
  import { updateKLoukdoSubCategory } from '$providers/actions/kloukdo/kloukdosubcategory';
	import { createEventDispatcher } from 'svelte';

	export let param;
	export let categoryList;
	const dispatch = createEventDispatcher();

	let category;
	let name;
	let disabledCreate = false;
	let icon;
	const updateSubCategory = async (evt) => {
		evt.preventDefault();
		if (category == "") category = undefined
		let res = await updateKLoukdoSubCategory.load({
			id: param.id, name, category, icon
		});
		if (res.success) disabledCreate = true;
		dispatch('edit');
	};
</script>

<div class=" relative w-full h-full p-1 flex justify-center items-center">
	<div class=" absolute bg-white">
		<div class="w-80 h-[28-rem]">
			<button
				type="button"
				class="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
				data-modal-toggle="authentication-modal"
				on:click={() => {
					dispatch('close');
				}}
			>
				<svg
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/></svg
				>
			</button>
			<div class="py-6 px-6 lg:px-8">
				<form
					class="space-y-6 w-full h-full flex flex-col"
					on:submit|preventDefault={updateSubCategory}
					method="post"
				>
					<div class="flex-grow-0">
						<h3 class="text-xl font-medium text-gray-900 text-center">
							Edit Sub Category
						</h3>
					</div>
					<div class="flex-grow">
						<div class="mb-2">
							<label
								for="name"
								class="block mb-2 text-sm font-medium text-gray-900">Name</label
							>
							<input
								type="text"
								name="name"
								bind:value={name}
								class="border text-center text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
								placeholder="Name"
							/>
						</div>
						
                        <div class="mb-4 relative">
                            <label for="category" class="block mb-2 text-sm font-medium text-gray-900">
                                Category
                            </label>
                            <select
                                bind:value={category}
                                name="category" 
                                class="border text-center text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 text-white appearance-none"
                            >
                                <option value="">Select Category</option>
                                {#each categoryList as category}
                                    <option value="{category.id}">{category.name}</option>
                                {/each}
                            </select>
                            <svg 
                                class="absolute right-3 top-[38px] w-5 h-5 pointer-events-none text-white"
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="2" 
                                stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
						<div class="mb-2">
							<label
								for="icon"
								class="block mb-2 text-sm font-medium text-gray-900">Icon</label
							>
							<input
								type="text"
								name="icon"
								bind:value={icon}
								class="border text-center text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
								placeholder="Icon"
							/>
						</div>
					</div>
					<div class="flex-grow-0">
						<div class="flex space-x-2 justify-center mb-4">
							<button
								type="button"
								class="text-gray-400 bg-white focus:ring-4 focus:outline-none rounded-lg border  text-sm font-medium px-5 py-2.5 focus:z-10 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
								on:click={() => {
									dispatch('close');
								}}>Cancel</button
							>
							<button
								disabled={disabledCreate}
								type="submit"
								class="text-pink-700 bg-gray-300 hover:bg-pink-700 hover:text-gray-200 mr-[10%] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800"
								>Create</button
							>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
