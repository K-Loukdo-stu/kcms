<script>
	import { deleteStickerPackage } from "$providers/actions/kart";
	import { createEventDispatcher } from "svelte";
	export let param, showDelete;
	const dispatch = createEventDispatcher();
	let id = param.id;
	const onDelete = async () => {
		try {
			showDelete = true;
			const res = await deleteStickerPackage.load({ id });
		} catch {}
	};
</script>

<div class=" relative w-full h-full p-1 flex justify-center items-center">
	<div class=" absolute bg-white rounded-md">
		<div class="relative max-w-[320px] w-full">
			<div class="flex flex-col py-6 px-6 lg:px-8">
				<div class="flex-grow">
					<h3 class="mb-4 font-medium text-base text-gray-900 text-center">
						Are you sure to delete this Cover?
					</h3>
				</div>
				<div class="flex-grow-0">
					<div class="flex justify-center items-center space-x-4">
						<button
							class="text-gray-600 bg-white focus:ring-4 focus:outline-none rounded-md border text-sm font-medium px-4 py-2 border-gray-200"
							on:click={() => {
								dispatch("close");
							}}
						>
							Cancel
						</button>
						<button
							on:click={async () => {
								id = param.id;
								showDelete = true;
								await onDelete();
								dispatch("onDelete");
							}}
							class="text-white bg-red-600 focus:ring-4 focus:outline-none rounded-md border text-sm font-medium px-4 py-2 border-gray-200"
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
