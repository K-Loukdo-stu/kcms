<script>
	import UploadImage from '$components/elements/UploadImage.svelte';
	import FbLoading from '$components/materials/Spinners/fbLoading/FBLoading.svelte';
	import { updateIcon } from '$providers/actions/kart/icon';
	import { uploadIcon } from '$providers/actions/storage/icon';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let categoryData = [];
	export let rawData;
	let name = rawData.name;
	let file = rawData.file;
	let base64;
	let category = rawData.category;
	let uploadPercentage = 0;
	let onLoading = false;
	let categorySelected = categoryData?.length ? (categoryData[0] = category) : null;

	const onUpload = async (evt) => {
		evt.preventDefault();
		onLoading = true;
		if (base64) {
			await uploadIcon.load({
				base64,
				onComplete: (res) => {
					// to do
					updateIcon
						.load({
							id: rawData.id,
							name,
							width: res.response.width,
							height: res.response.height,
							file: res.response,
							category: categorySelected.id
						})
						.then((res) => {
							// to do
							dispatch('edit');
							onLoading = false;
							base64 = '';
						});
				},
				onError: (err) => {
					// to do
					onLoading = false;
				},
				onProgress: ({ params, loaded, total }) => {
					// to do
					uploadPercentage = (loaded / total) * 98;
				}
			});
		} else {
			updateIcon
				.load({
					id: rawData.id,
					name,
					width: rawData.width,
					height: rawData.height,
					file,
					category: categorySelected.id
				})
				.then((res) => {
					// to do
					dispatch('edit');
					onLoading = false;
					base64 = '';
				});
		}
	};
</script>

<div class=" relative w-full h-full p-1 flex justify-center items-center">
	<div class=" absolute bg-white rounded-md">
		<div class="w-80 h-[450px]">
			<div class="py-6 px-6 lg:px-8 w-full h-full">
				<form
					class="flex flex-col w-full h-full space-y-6"
					on:submit|preventDefault={onUpload}
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
									><path
										fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/></svg
								>
							</button>
							<h3 class="mb-5 text-base font-medium text-gray-700 text-white text-center">
								Edit Icon
							</h3>
							<label
								for="name"
								class="block mb-2 text-sm font-medium text-gray-900 text-gray-300">Name</label
							>
							<input
								type="text"
								name="name"
								bind:value={name}
								class="bg-gray-50 mb-5 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
								placeholder="Name"
								required
							/>
							<label
								for="province"
								class="block mb-2 text-sm font-medium text-gray-900 text-gray-300"
								>Categoy</label
							>
							<select
								class=" border-2 border-gray-100 w-full p-2 rounded-lg font-sans bg-gray-50 text-sm text-left flex flex-row justify-between cursor-pointer"
								bind:value={categorySelected}
							>
								{#each categoryData as data}
									<option value={data}>
										{data.name}
									</option>
								{/each}
							</select>
						</div>

						<div class="flex w-full h-2/4">
							<UploadImage
								{file}
								on:onImage={(evt) => {
									base64 = evt.detail;
								}}
							/>
						</div>
					</div>
					<div class="flex-grow-0">
						{#if onLoading}
							<div class="flex justify-end items-end w-3/4">
								<FbLoading color="#FE4922" />
							</div>
						{:else}
							<div class="flex justify-center space-x-4">
								<button
									type="button"
									on:click={() => {
										dispatch('close');
									}}
									class=" w-24  h-11 text-gray-400 bg-white hover:bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
									>Cancel
								</button>
								<button
									type="submit"
									class="relative w-24  h-11 rounded-lg overflow-hidden bg-gray-100"
								>
									<div
										class="bg-gray-300 absolute left-0 top-0 bottom-0"
										style={`width: ${uploadPercentage}%;`}
									/>
									<div
										class="absolute inset-0 py-1 text-pink-600 flex justify-center items-center "
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
