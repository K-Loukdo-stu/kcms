<script>
	import FbLoading from "$components/materials/Spinners/fbLoading/FBLoading.svelte";
	import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";
	import { updateGenre } from "$providers/actions/kart/music/genre";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let rawData;
	let name = rawData.name;
	let uploadPercentage = 0;
	let editGenreState = {
		loading: false,
		errMsg: "",
	};

	const onCreateGenre = async (evt) => {
		evt.preventDefault();
		try {
			editGenreState.loading = true;
			await updateGenre.load({
				id: rawData.id,
				name,
			});

			dispatch("edit");
		} catch (err) {
			editGenreState.errMsg = err?.message || "Unknown error";
		} finally {
			editGenreState.loading = false;
		}
	};
</script>

<div class=" relative w-full h-full p-1 flex justify-center items-center">
	<div class=" absolute bg-white rounded-md">
		<div class="w-80 h-[300px]">
			<div class=" py-6 px-6 lg:px-8 w-full h-full">
				<form
					class=" flex flex-col w-full h-full space-y-6"
					on:submit|preventDefault={onCreateGenre}
					method="post"
				>
					<div class="flex-grow">
						<div>
							<button
								type="button"
								class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
								data-modal-toggle="authentication-modal"
								on:click={() => {
									dispatch("close");
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
							<h3
								class="mb-5 text-base font-medium text-gray-700 text-white text-center"
							>
								Edit Genre
							</h3>
							<label
								for="name"
								class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
								>Name</label
							>
							<input
								type="text"
								name="name"
								bind:value={name}
								class=" bg-white mb-5 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
								required
							/>
						</div>
					</div>
					{#if editGenreState?.errMsg}
						<div
							class=" text-sm text-center bg-yellow-50 text-orange-700 rounded-md p-2"
						>
							{editGenreState.errMsg}
						</div>
					{/if}
					<div class="flex-grow-0">
						{#if editGenreState.loading}
							<div class="flex justify-end items-end w-3/4">
								<SmfbLoading color="#FE4922" />
							</div>
						{:else}
							<div class="flex justify-center space-x-4">
								<button
									type="button"
									on:click={() => {
										dispatch("close");
									}}
									class=" w-24 h-11 text-gray-600 bg-white focus:ring-4 focus:outline-none rounded-lg border ext-sm font-medium px-5 py-2.5 focus:z-10"
									>Cancel
								</button>
								<button
									type="submit"
									class="relative w-24 h-11 rounded-lg overflow-hidden bg-gray-100"
								>
									<div
										class="bg-gray-300 absolute left-0 top-0 bottom-0"
										style={`width: ${uploadPercentage}%;`}
									/>
									<div
										class="absolute inset-0 py-1 text-pink-600 flex justify-center items-center"
									>
										<div>Save</div>
									</div>
								</button>
							</div>
						{/if}
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
