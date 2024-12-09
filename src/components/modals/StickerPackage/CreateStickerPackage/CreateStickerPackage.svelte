<script>
	import CloseIcon from "$components/icons/Close/CloseIcon.svelte";
	import CirclePlus from "$components/icons/Plus/CirclePlus.svelte";
	import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";
	import { createStickerPackage } from "$providers/actions/kart";
	import { getBase64ImageSize } from "$providers/actions/storage";
	import { uploadStickerPackage } from "$providers/actions/storage/package";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	let fileinput;
	let checkCurrency = false;

	let fixParam = {
		title: "Add a new package",
		action: "Create",
	};

	let param = {
		calWidthHeight: 0,
		originalWidth: 0,
		originalHeight: 0,
		viewWidth: 0,
		viewHeight: 0,
		base64: "",
		currency: "៛",
		name: "",
		price: 0,
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
			// dispatch("onImage", base64);
		};
	};

	const onUpload = async (evt) => {
		evt.preventDefault();
		try {
			onLoadState.errMsg = "";
			onLoadState.loading = true;
			await uploadStickerPackage.load({
				base64: param.base64,
				onComplete: async (res) => {
					try {
						await createStickerPackage.load({
							name: param.name,
							price: param.price,
							currency: param.currency,
							file: res.response,
							viewWidth: param.viewWidth,
							viewHeight: param.viewHeight,
							originalHeight: param.originalHeight,
							originalWidth: param.originalWidth,
						});
						dispatch("create");
						param.base64 = "";
					} catch (error) {
						onLoadState.errMsg = error.message;
					} finally {
						onLoadState.loading = false;
					}
				},
				onError: (err) => {
					// to do
				},
				onProgress: ({ params, loaded, total }) => {
					// to do
				},
			});
		} catch (err) {
			onLoadState.loading = false;
			onLoadState.errMsg = err.message;
		}
	};
</script>

<div class=" relative w-full h-full flex justify-center items-center">
	<div class="  bg-white rounded-md w-80 max-h-[75%]">
		<form
			class="flex flex-col w-full h-full"
			on:submit|preventDefault={onUpload}
			method="post"
		>
			<div class="relative flex items-center justify-center p-2 border-b-[1px]">
				<div class="text-[#494949]">{fixParam.title}</div>
				<div class=" absolute inset-y-0 right-1 flex items-center">
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
				</div>
			</div>
			<div class="relative overflow-auto">
				<div class=" w-full bg-white">
					<div
						class="w-full flex flex-col justify-center items-center pt-10 pb-10"
					>
						<button
							class="bg-[#F8F8F9] cursor-pointer text-[#717171] w-40 h-40 rounded-md flex items-center justify-center flex-col"
							on:click={(evt) => {
								evt.preventDefault();
								fileinput.click();
							}}
						>
							{#if param.base64}
								<img
									src={param.base64}
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
						{#if param.base64}
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
					{#if onLoadState.errMsg}
						<div class=" p-2">
							<div
								class="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50"
							>
								{onLoadState.errMsg}
							</div>
						</div>
					{/if}

					<div class=" flex justify-center p-2 w-full">
						{#if !onLoadState.loading}
							<button type="submit" class=" w-full">
								<div
									class="cursor-pointer w-full flex items-center justify-center bg-[#006EB2] rounded-md p-2 pl-3 pr-3 text-white"
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
			</div>
		</form>
	</div>
</div>

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
