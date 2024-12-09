<script>
	import CloseIcon from "$components/icons/Close/CloseIcon.svelte";
	import CirclePlus from "$components/icons/Plus/CirclePlus.svelte";
	import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";
	import { updateStickerPackage } from "$providers/actions/kart";
	import { getBase64ImageSize } from "$providers/actions/storage";
	import { uploadStickerPackage } from "$providers/actions/storage/package";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();
	export let stickerPackage;

	let fileinput;
	let checkCurrency = false;

	let fixParam = {
		title: "Edit a package",
		action: "Save",
	};

	let param = {
		calWidthHeight: 0,
		base64: "",
		viewWidth: stickerPackage.viewWidth,
		viewHeight: stickerPackage.viewHeight,
		originalWidth: stickerPackage.originalWidth,
		originalHeight: stickerPackage.originalHeight,
		currency: stickerPackage.currency,
		name: stickerPackage.name,
		price: stickerPackage.price,
		file: stickerPackage.file,
	};

	if (param.currency === "$") {
		checkCurrency = true;
	} else {
		checkCurrency = false;
	}

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

	const updatePackage = async (evt) => {
		evt.preventDefault();
		try {
			onLoadState.errMsg = '';
			onLoadState.loading = true;
			if (param.base64) {
				await uploadStickerPackage.load({
					base64: param.base64,
					onComplete: (res) => {
						// to do
						updateStickerPackage
							.load({
								id: stickerPackage.id,
								file: res.response,
								name: param.name,
								price: param.price,
								currency: param.currency,
								viewWidth: param.viewWidth,
								viewHeight: param.viewHeight,
								originalHeight: param.originalHeight,
								originalWidth: param.originalWidth,
							})
							.then((res) => {
								// to do
								dispatch("edit");
							});
					},
					onError: (err) => {
						// to do
					},
					onProgress: ({ params, loaded, total }) => {
						// to do
					},
				});
			} else {
				let res = await updateStickerPackage.load({
					id: stickerPackage.id,
					name: param.name,
					price: param.price,
					currency: param.currency,
					file: param.file,
					viewWidth: param.viewWidth,
					viewHeight: param.viewHeight,
					originalHeight: param.originalHeight,
					originalWidth: param.originalWidth,
				});
				if (res.success) dispatch("edit");
			}
		} catch (err) {
			onLoadState.errMsg = err.message;
		} finally {
			onLoadState.loading = false;
		}
	};
</script>

<div class=" relative w-full h-full flex justify-center items-center">
	<div class=" absolute bg-white rounded-md w-80 h-3/4">
		<form
			class="flex flex-col w-full h-full"
			on:submit|preventDefault={updatePackage}
			method="post"
		>
			<div class="flex items-center justify-between p-2 border-b-[1px]">
				{#if !onLoadState.loading}
					<button
						class="text-[#717171] cursor-pointer p-1 rounded-lg hover:bg-gray-50"
						on:click={() => {
							dispatch("close");
						}}
					>
						<CloseIcon />
					</button>
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
						<button
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
						</button>
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
								name={param.name}
								bind:value={param.name}
								class="bg-gray-50 border text-center border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
								placeholder="Package Name"
								required
							/>
						</div>
						<div class="flex flex-row w-full space-x-5">
							<div class="w-3/4">
								<input
									type="number"
									name={param.price}
									bind:value={param.price}
									placeholder="Price"
									class="bg-gray-50 border text-center w-full border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
									required
								/>
							</div>
							<div>
								<style>
									.spana {
										color: rgb(255 255 255);
									}
									.spanb {
										color: rgb(90 90 90);
									}
									.peer:checked ~ span .spana {
										color: rgb(90 90 90);
									}
									.peer:checked ~ span .spanb {
										color: rgb(255 255 255);
									}
								</style>
								<label
									class="relative flex justify-between items-center text-xl cursor-pointer"
								>
									<input
										type="checkbox"
										class="absolute left-0 top-0 w-20 h-10 ml-4 rounded-lg invisible peer"
										bind:checked={checkCurrency}
										on:click={() => {
											checkCurrency = !checkCurrency;
											if (checkCurrency) {
												param.currency = "$";
											} else {
												param.currency = "៛";
											}
										}}
										name={param.currency}
										bind:value={param.currency}
									/>
									<span
										class="w-20 h-10 flex items-center flex-shrink-0 bg-white rounded-md border
									after:w-10 after:h-10 after:bg-[#006EB2] after:rounded-md after:shadow-md after:duration-300
									peer-checked:active peer-checked:after:translate-x-10"
									>
										<div
											class="absolute w-20 h-[1px] z-[1] flex justify-around items-center"
										>
											<span class="relative active:text-white spana">៛</span>
											<span class="relative active:text-blue-500 spanb">$</span>
										</div>
									</span>
								</label>
							</div>
						</div>
						{#if param.file}
							<div class="flex flex-row w-full items-center">
								<div class="w-3/5 text-base">Origin Width</div>
								<div class="w-2/5 flex flex-row items-center space-x-2">
									<div
										class="bg-[#EEEEEE] text-center w-full border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
									>
										{param.originalWidth}
									</div>
									<div class="text-[#4E4E4E]">px</div>
								</div>
							</div>
							<div class="flex flex-row w-full items-center">
								<div class="w-3/5 text-base">Origin Height</div>
								<div class="w-2/5 flex flex-row items-center space-x-2">
									<div
										class="bg-[#EEEEEE] text-center w-full border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
									>
										{param.originalHeight}
									</div>
									<div class="text-[#4E4E4E]">px</div>
								</div>
							</div>
							<div class="flex flex-row w-full items-center">
								<div class="w-3/5 text-base">View Width</div>
								<div class="w-2/5 flex flex-row items-center space-x-2">
									<input
										type="number"
										name={param.viewWidth}
										bind:value={param.viewWidth}
										class="bg-gray-50 border text-center w-full border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
										placeholder="Width"
										required
									/>
									<div class="text-[#4E4E4E]">px</div>
								</div>
							</div>
							<div class="flex flex-row w-full items-center">
								<div class="w-3/5 text-base">View Height</div>
								<div class="w-2/5 flex flex-row items-center space-x-2">
									<input
										type="number"
										name={param.viewHeight}
										bind:value={param.viewHeight}
										class="bg-gray-50 border text-center w-full border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
										placeholder="Height"
										required
									/>
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

<!-- 

<div class=" relative w-full h-full p-1 flex justify-center items-center">
	<div class=" absolute bg-white rounded-2xl">
		<div class="w-80 h-3/4">
			<div class="py-6 px-6 lg:px-8 w-full h-full">
				<form
					class="flex flex-col w-full h-full"
					on:submit|preventDefault={updatePackage}
					method="post"
				>
					<div class="flex relative flex-row w-full items-center">
						<div class="w-full">
							<h3
								class="text-base font-medium text-gray-700 dark:text-white text-center"
							>
								Edit Package
							</h3>
						</div> -->
<!-- <div
							class="absolute w-full flex items-center justify-end"
						>
							<CloseButton
								on:close={() => {
									dispatch("close");
								}}
							/>
						</div> -->
<!-- </div>
					<div class="flex-grow">
						<div>
							<label
								for="name"
								class="block pb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>Name</label
							>
							<input
								type="text"
								name="name"
								bind:value={name}
								class="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								placeholder="Package name"
								required
							/>
						</div>
						<div>
							<label
								for="price"
								class="block pb-2 text-sm font-medium text-gray-900 dark:text-gray-300 pt-2"
								>Price</label
							>
							<div class="flex flex-row">
								<input
									type="number"
									name="price"
									bind:value={price}
									placeholder="0.00"
									class="bg-gray-50 border text-center w-[70%] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
									required
								/>

								<style>
									.spana {
										color: rgb(209 213 219);
									}
									.spanb {
										color: rgb(17 24 39);
									}
									.peer:checked ~ span .spana {
										color: rgb(17 24 39);
									}
									.peer:checked ~ span .spanb {
										color: rgb(209 213 219);
									}
								</style>
								<label
									class="relative flex justify-between items-center text-xl"
								>
									<input
										type="checkbox"
										class="absolute left-0 top-0 w-20 h-10 ml-4 rounded-lg invisible peer"
										bind:checked={checkCurrency}
										on:click={() => {
											checkCurrency = !checkCurrency;
											if (checkCurrency) {
												currency = "$";
											} else {
												currency = "៛";
											}
										}}
										name="currency"
										bind:value={currency}
									/>
									<span
										class="w-20 h-10
											flex items-center
											flex-shrink-0
											ml-4
											bg-gray-300
											rounded-lg
											after:w-10
											after:h-10
											after:bg-pink-700
											after:rounded-lg
											after:shadow-md
											after:duration-300
											peer-checked:active
											peer-checked:after:translate-x-10"
									>
										<div
											class="absolute w-20 h-[1px] z-[1] flex justify-around items-center"
										>
											<span
												class="relative active:text-white spana"
												>៛</span
											>
											<span
												class="relative active:text-blue-500 spanb"
												>$</span
											>
										</div>
									</span>
								</label>
							</div>
						</div>
						<div class="p-5">
							<UploadImage
								{file}
								on:onImage={(evt) => {
									base64 = evt.detail;
								}}
							/>
						</div>
					</div>
					<div class="flex-grow-0 flex flex-row w-full">
						{#if !loading}
							<div class="flex justify-start items-center w-1/2">
								<div
									class="flex items-center justify-center cursor-pointer bg-red-300 rounded-[9px] w-[80px] h-[39px] text-white"
									on:click={() => {
										dispatch("close");
									}}
								>
									Cancel
								</div>
							</div>
							<button
								type="submit"
								class="flex justify-end items-center cursor-pointer w-1/2"
							>
								<div
									class="w-[80px] h-[39px] bg-[#006EB2] rounded-[9px] text-white flex items-center justify-center"
								>
									Save
								</div>
							</button>
						{:else}
							<div
								class="flex justify-end items-center w-full cursor-pointer"
							>
								<div
									class="flex items-center justify-center bg-[#F1F1F1] rounded-[9px] w-[80px] h-[39px] text-white"
								>
									<SmfbLoading color={"#006EB2"} />
								</div>
							</div>
						{/if}
					</div>
				</form>
			</div>
		</div>
	</div>
</div> -->

<style>
	/* width */
	::-webkit-scrollbar {
		width: 4px;
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
