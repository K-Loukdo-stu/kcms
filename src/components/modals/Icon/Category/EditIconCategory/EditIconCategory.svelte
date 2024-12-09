<!-- <script>
	import UploadImage from '$components/elements/UploadImage.svelte';
	import FbLoading from '$components/materials/Spinners/fbLoading/FBLoading.svelte';
	import { updateIconCategory } from '$providers/actions/kart/icon-category';
	import { uploadIconCategory } from '$providers/actions/storage/icon-category';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let rawData;
	let name = rawData.name;
	let file = rawData.file;
	let base64;
	let uploadPercentage = 0;
	let onLoading = false;

	const onUpload = async (evt) => {
		evt.preventDefault();
		onLoading = true;
		if (base64) {
			await uploadIconCategory.load({
				base64,
				onComplete: (res) => {
					// to do
					updateIconCategory
						.load({
							id: rawData.id,
							name,
							width: res.response.width,
							height: res.response.height,
							file: res.response
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
			updateIconCategory
				.load({
					id: rawData.id,
					name,
					width: rawData.width,
					height: rawData.height,
					file
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
								Edit Category
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
</div> -->

<script>
	import { createEventDispatcher } from "svelte";
	import { updateCover } from "$providers/actions/kart";
	import { uploadCover } from "$providers/actions/storage/cover";
	import CloseIcon from "$components/icons/Close/CloseIcon.svelte";
	import CirclePlus from "$components/icons/Plus/CirclePlus.svelte";
	import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";
	import { getBase64ImageSize } from "$providers/actions/storage";
	import { updateGif } from "$providers/actions/kart/gif";
	import { uploadStickerPackage } from "$providers/actions/storage/package";
	import { uploadIconCategory } from "$providers/actions/storage/icon-category";
	import { updateIconCategory } from "$providers/actions/kart/icon-category";

	export let category;
	const dispatch = createEventDispatcher();

	let fileinput;

	let fixParam = {
		title: "Edit a category",
		action: "Edit",
	};

	let param = {
		calWidthHeight: 0,
		originalWidth: category.width,
		originalHeight: category.height,
		base64: "",
		name: category.name,
		code: category.code,
		file: category.file,
	};

	let onLoadState = {
		loading: false,
		loaded: false,
		errMsg: "",
	};

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = async (e) => {
			param.base64 = e.target.result;
			param.calWidthHeight = await getBase64ImageSize(param.base64);
			param.originalWidth = param.calWidthHeight.width;
			param.originalHeight = param.calWidthHeight.height;
		};
	};

	const onUpload = async (evt) => {
		evt.preventDefault();
		try {
			onLoadState.loading = true;
			if (param.base64) {
				await uploadIconCategory.load({
					base64: param.base64,
					onComplete: (res) => {
						// to do
						updateIconCategory
							.load({
								id: category.id,
								name: param.name,
								file: res.response,
								width: res.response.width,
								height: res.response.height,
								code: param.code,
							})
							.then((res) => {
								// to do
								dispatch("edit");
								param.base64 = "";
							});

						// upload to create sticker package
					},
					onError: (err) => {
						// to do
					},
					onProgress: ({ params, loaded, total }) => {
						// to do
					},
				});
			} else {
				let res = await updateIconCategory.load({
					id: category.id,
					name: param.name,
					file: param.file,
					width: param.originalWidth,
					height: param.originalHeight,
					code: param.code,
				});
				if (res.success) dispatch("edit");
			}
		} catch (err) {
			onLoadState.errMsg = err.message;
		} finally {
			onLoadState.loading = true;
		}
	};
</script>

<div class=" relative w-full h-full flex justify-center items-center">
	<div class=" absolute bg-white rounded-md w-80 h-3/4">
		<form
			class="flex flex-col w-full h-full"
			on:submit|preventDefault={onUpload}
			method="post"
		>
			<div class="flex items-center justify-between p-2 border-b-[1px]">
				{#if !onLoadState.loading}
					<div
						class="text-[#717171] cursor-pointer p-1 rounded-lg hover:bg-gray-50"
						on:click={() => {
							dispatch("close");
						}}
					>
						<CloseIcon />
					</div>
				{/if}
				<div class="text-[#494949]">{fixParam.title}</div>
				<div>
					{#if !onLoadState.loading}
						<button type="submit">
							<div
								class="cursor-pointer flex items-center justify-center bg-[#006EB2] rounded-md p-1 pl-3 pr-3 text-white"
							>
								{fixParam.action}
							</div>
						</button>
					{:else}
						<div
							class="cursor-pointer flex items-center justify-center bg-[#F1F1F1] rounded-md p-2 pl-4 pr-4 text-white"
						>
							<SmfbLoading color={"#006EB2"} />
						</div>
					{/if}
				</div>
			</div>
			<div class="relative h-full overflow-auto">
				<div class="absolute w-full h-full">
					<div
						class="w-full flex flex-col justify-center items-center pt-10 pb-10"
					>
						<div
							class="bg-[#F8F8F9] cursor-pointer text-[#717171] w-40 h-40 rounded-md flex items-center justify-center flex-col"
							on:click={() => {
								fileinput.click();
							}}
						>
							{#if param.base64}
								<img
									src={param.base64}
									class="w-40 h-40 text-gray-600 p-1 rounded-md"
									alt=""
								/>
							{:else if param.file}
								<img
									src={param.file.url}
									class="w-40 h-40 text-gray-600 p-1 rounded-md"
									alt=""
								/>
							{:else}
								<div>
									<CirclePlus size={40} />
								</div>
								<div class="text-xs">Image</div>
							{/if}
						</div>
						<input
							id="dropzone-file"
							style="display:none"
							type="file"
							accept=".jpg, .jpeg, .png, .GIF"
							on:change={(e) => onFileSelected(e)}
							bind:this={fileinput}
						/>
					</div>
					<div class=" flex flex-col p-7 pt-0 space-y-4">
						<div>
							<input
								type="text"
								name={param.code}
								bind:value={param.code}
								class="bg-gray-50 border text-center border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
								placeholder="Category Code"
								required
							/>
						</div>
						<div>
							<input
								type="text"
								name={param.name}
								bind:value={param.name}
								class="bg-gray-50 border text-center border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
								placeholder="Category Name"
								required
							/>
						</div>
						{#if param.base64 || param.file}
							<div class="flex flex-row w-full items-center">
								<div class="w-3/5 text-base">Width</div>
								<div
									class="w-2/5 flex flex-row items-center space-x-2"
								>
									<div
										class="bg-[#EEEEEE] text-center w-full border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
									>
										{param.originalWidth}
									</div>
									<div class="text-[#4E4E4E]">px</div>
								</div>
							</div>
							<div class="flex flex-row w-full items-center">
								<div class="w-3/5 text-base">Height</div>
								<div
									class="w-2/5 flex flex-row items-center space-x-2"
								>
									<div
										class="bg-[#EEEEEE] text-center w-full border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
									>
										{param.originalHeight}
									</div>
									<div class="text-[#4E4E4E]">px</div>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</form>
	</div>
</div>

<style>
	/* width */
	::-webkit-scrollbar {
		width: 5px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
