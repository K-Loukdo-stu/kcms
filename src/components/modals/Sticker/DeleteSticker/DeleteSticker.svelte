<script>
	import { deleteSticker } from "$providers/actions/kart";
	import { createEventDispatcher } from "svelte";
	export let param, showDelete;
	const dispatch = createEventDispatcher();
	let id = param.id;
	const onDelete = async () => {
		try {
			showDelete = true;
			await deleteSticker.load({ id });
			dispatch("onDeleted");
		} catch {}
	};
</script>

<div class=" relative w-full h-full p-1 flex justify-center items-center">
	<div class=" absolute bg-white rounded-[20px]">
		<div class="relative w-80 h-28">
			<div class="flex flex-col py-6 px-6 lg:px-8">
				<div class="flex-grow">
					<h3 class="mb-4 font-medium text-base text-gray-900 text-center">
						Are you sure to delete this Sticker?
					</h3>
				</div>

				<div class="flex-grow-0">
					<div class="flex justify-center items-center space-x-4">
						<div
							class="text-gray-400 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-4 py-1 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
							on:click={() => {
								dispatch("close");
							}}
						>
							Cancel
						</div>
						<div
							on:click={async () => {
								id = param.id;
								showDelete = true;
								await onDelete();
							}}
							class="text-pink-700 bg-gray-300 hover:bg-pink-700 hover:text-gray-200 mr-[10%] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
						>
							Delete
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
