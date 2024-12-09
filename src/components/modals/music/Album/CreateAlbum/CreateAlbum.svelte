<script>
	import UploadImage from "$components/elements/UploadImage.svelte";
	import { createAlbum } from "$providers/actions/kart/music/album";
	import { uploadAlbum } from "$providers/actions/storage/music/music";
	import { createEventDispatcher } from "svelte";
	import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";

	const dispatch = createEventDispatcher();

	let name = "";
	let releasedDate = 1;
	let desc = "";
	let base64;
	let uploadPercentage = 0;

	let createAlbumState = {
		loading: false,
		errMsg: "",
	};

	const onCreateAlbum = async (file) => {
		try {
			createAlbumState.loading = true;
			await createAlbum.load({
				name,
				desc,
				releasedDate,
				imageUrl: file,
			});

			// to do
			dispatch("create");
		} catch (err) {
			createAlbumState.errMsg = err?.message || "Unknown error";
		} finally {
			createAlbumState.loading = false;
			base64 = "";
		}
	};

	const onUpload = async (evt) => {
		evt.preventDefault();
		try {
			createAlbumState.loading = true;
			if (base64) {
				await uploadAlbum.load({
					base64,
					onComplete: (res) => {
						onCreateAlbum(res.reponse);
					},
					onError: (err) => {
						// to do
						onLoading = false;
					},
					onProgress: ({ params, loaded, total }) => {
						// to do
						uploadPercentage = (loaded / total) * 98;
					},
				});
			} else {
				await onCreateAlbum(null);
			}
		} finally {
			createAlbumState.loading = false;
			base64 = "";
		}
	};
</script>

<div class=" relative w-full h-full p-1 flex justify-center items-center">
	<div class=" absolute bg-white rounded-md">
		<div class="w-80 max-h-[700px]">
			<div class=" py-6 px-6 lg:px-8 w-full h-full">
				<form
					class=" flex flex-col w-full h-full space-y-6"
					on:submit|preventDefault={onUpload}
					method="post"
				>
					<div class="flex-grow">
						<div>
							<button
								type="button"
								class="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
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
							<h3 class="mb-5 text-base font-medium text-gray-700 text-center">
								New Album
							</h3>
							<label
								for="name"
								class="block mb-2 text-sm font-medium text-gray-900">Name</label
							>
							<input
								type="text"
								name="name"
								bind:value={name}
								class=" bg-white mb-5 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
								placeholder="Name"
								required
							/>
							<label
								for="desc"
								class="block mb-2 text-sm font-medium text-gray-900"
								>Description</label
							>
							<textarea
								type="text"
								name="desc"
								bind:value={desc}
								class=" max-h-20 bg-gray-50 mb-5 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
								placeholder="Description"
								required
							/>
						</div>

						<div>
							<UploadImage
								on:onImage={(evt) => {
									base64 = evt.detail;
								}}
							/>
						</div>
					</div>
					{#if createAlbumState?.errMsg}
						<div
							class=" text-sm text-center bg-yellow-50 text-orange-700 rounded-md p-2"
						>
							{createAlbumState.errMsg}
						</div>
					{/if}
					<div class="flex-grow-0">
						{#if createAlbumState.loading}
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
										<div>Create</div>
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
