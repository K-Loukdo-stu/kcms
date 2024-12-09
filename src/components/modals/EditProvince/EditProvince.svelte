<script>
	import { updateProvince } from '$providers/actions/ktour/province';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let province;

	let disabledEdit = false;
	let name = province.name;

	const onUpdateProvince = async (evt) => {
		evt.preventDefault();
		let place = await updateProvince.load({
			id: province.id,
			name
		});
		if (place?.success) disabledEdit = true;
		dispatch('onEdit');
	};
</script>

<div class=" relative w-full h-full p-1 flex justify-center items-center">
	<div class=" absolute bg-white">
		<div class="relative w-80 h-[200px]">
			<!-- <div class="absolute inset-0 py-6 px-6 lg:px-8"> -->
			<form
				class="overflow-y-scroll  flex flex-col space-y-6 w-full h-full absolute inset-0 py-6 px-6 lg:px-8"
				on:submit|preventDefault={onUpdateProvince}
				method="post"
			>
				<div class="flex-grow">
					<div>
						<button
							type="button"
							class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
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
							>
								<path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>

						<div class="flex-col w-full mb-5">
							<label
								for="name"
								class="block mb-2 text-sm font-medium text-gray-900 text-gray-300">Name</label
							>
							<input
								type="text"
								name="name"
								bind:value={name}
								class="bg-gray-50  w-full border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
								placeholder="Name"
								required
							/>
						</div>
					</div>
				</div>
				<div class="flex-grow-0">
					<div class="flex space-x-2 justify-center items-center">
						<button
							type="button"
							class="text-gray-400 bg-white hover:bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
							on:click={() => {
								dispatch('close');
							}}
							>Cancel
						</button>
						<button
							disabled={disabledEdit}
							type="submit"
							class="text-pink-700 bg-gray-300 hover:bg-pink-700 hover:text-gray-200 mr-[10%] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
							>Save
						</button>
					</div>
				</div>
			</form>
			<!-- </div> -->
		</div>
	</div>
</div>
