<script>
	import { deleteIconCategory } from "$providers/actions/kart/icon-category";
	import { createEventDispatcher } from "svelte";
	export let category;
	const dispatch = createEventDispatcher();
	let id = category.id;
	const onDelete = async () => {
		try {
			const res = await deleteIconCategory.load({ id });
		} catch {}
	};
</script>

<div class="relative w-full h-full p-1 flex justify-center items-center">
	<div class=" absolute bg-white rounded-[20px]">
		<div class="relative w-80">
			<div class="flex flex-col py-6 px-6 lg:px-8">
				<div class="flex-grow">
					<h3
						class="mb-4 font-medium text-base text-gray-900 dark:text-white text-center"
					>
						Are you sure to delete <b>"{category.name}"</b>?
					</h3>
				</div>
				<div class="flex-grow-0">
					<div class="flex justify-center items-center space-x-4">
						<div
							class="text-gray-400 cursor-pointer bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-4 py-1 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
							on:click={() => {
								dispatch("close");
							}}
						>
							Cancel
						</div>
						<div
							on:click={async () => {
								id = category.id;
								await onDelete();
								dispatch("onDelete");
							}}
							class="text-white cursor-pointer bg-pink-500 hover:bg-pink-700 hover:text-gray-200 mr-[10%] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Delete
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
