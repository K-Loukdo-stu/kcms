<script>
	import { deleteCover } from "$providers/actions/kart";
	import { createEventDispatcher } from "svelte";
	export let cover;
	const dispatch = createEventDispatcher();
	let id = cover.id;
	const onDelete = async () => {
		try {
			const res = await deleteCover.load({ id });
		} catch {}
	};
</script>

<div class="relative w-full h-full p-1 flex justify-center items-center">
	<div class=" absolute bg-white rounded-[20px]">
		<div class="relative w-80">
			<div class="flex flex-col py-6 px-6 lg:px-8">
				<div class="flex-grow">
					<h3 class="mb-4 font-medium text-base text-gray-900 text-center py-4">
						Are you sure to delete <b>"{cover.name}"</b>?
					</h3>
				</div>
				<div class="flex-grow-0">
					<div class="flex justify-center items-center space-x-4">
						<button
							class=" px-4 py-2 bg-gray-100 rounded-md"
							on:click={() => {
								dispatch("close");
							}}
						>
							Cancel
						</button>
						<button
							on:click={async () => {
								id = cover.id;
								await onDelete();
								dispatch("onDelete");
							}}
							class=" px-4 py-2 text-gray-100 rounded-md bg-red-500"
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
