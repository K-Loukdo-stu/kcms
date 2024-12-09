<script>
	import { createEventDispatcher, onMount } from "svelte";
	import CloseIcon from "$components/icons/Close/CloseIcon.svelte";
	import CirclePlus from "$components/icons/Plus/CirclePlus.svelte";
	import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";
	import { getBase64ImageSize } from "$providers/actions/storage";
	import DropDown from "$components/icons/DropDown.svelte";
	import SelectStickerType from "$components/modals/Sticker/SelectStickerType/SelectStickerType.svelte";
	import { createSticker } from "$providers/actions/kart";
	import { uploadStickerStatic } from "$providers/actions/storage";
	const dispatch = createEventDispatcher();
	export let stickerTypes;
	export let packageId;
	let onModal = {
		shownModal: false,
		showType: false,
		selectedType: null,
	};

	$: selectedTypeValue = onModal.selectedType?.id || "";

	let fileinput;
	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = async (e) => {
			params.base64 = e.target.result;
			params.calWidthHeight = await getBase64ImageSize(params.base64);
			params.originalWidth = params.calWidthHeight.width;
			params.originalHeight = params.calWidthHeight.height;
		};
	};

	let fixParam = {
		title: "New static sticker",
		action: "Create",
	};

	let params = {
		calWidthHeight: 0,
		scale: 0,
		originalWidth: 0,
		originalHeight: 0,
		viewWidth: 0,
		viewHeight: 0,
		name: "",
		code: "",
		base64: "",
		type: "",
		file: {},
		animated: false,
		isLoop: false,
		forward: 1,
		reverse: 0,
		speed: 10,
		frameNum: 1,
		fps: 10,
	};

	let onLoadState = {
		loading: false,
		loaded: false,
		errMsg: "",
	};

	const onUpload = async (evt) => {
		evt.preventDefault();
		try {
			onLoadState.loading = true;
			await uploadStickerStatic.load({
				base64: params.base64,
				onComplete: (res) => {
					// to do
					createSticker
						.load({
							packageId: packageId,
							file: res.response,
							name: params.name,
							code: params.code,
							animated: params.animated,
							type: params.type.id,
							frameNum: params.frameNum,
							fps: params.fps,
							viewWidth: params.viewWidth,
							viewHeight: params.viewHeight,
							originalHeight: params.originalHeight,
							originalWidth: params.originalWidth,
							isLoop: params.isLoop,
							forward: params.forward,
							reverse: params.reverse,
							speed: params.speed,
							frameNum: params.frameNum,
						})
						.then((res) => {
							// to do
							dispatch("create");
							params.base64 = "";
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
		} catch (err) {
			onLoadState.errMsg = err.message;
		} finally {
			onLoadState.loading = true;
		}
	};
</script>

<div class="relative w-full h-full flex justify-center items-center">
	<div class="  bg-white rounded-md w-80">
		<form
			class="relative flex flex-col w-full h-full"
			on:submit|preventDefault={onUpload}
			method="post"
		>
			<div class="flex items-center justify-between p-2 border-b-[1px]">
				{#if !onLoadState.loading}
					<button
						class=" text-[#717171] cursor-pointer p-1 rounded-lg hover:bg-gray-50"
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
						<button
							disabled={!params.base64 || !onModal.selectedType}
							type="submit"
							class="disabled:bg-gray-300 bg-[#006EB2] flex items-center justify-center rounded-md p-1 pl-3 pr-3 text-white"
						>
							{fixParam.action}
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
			<div class="relative overflow-auto max-h-[75%]">
				<div class=" w-full">
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
							{#if params.base64}
								<img
									src={params.base64}
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
						<div class="flex flex-row w-full space-x-5">
							<div class=" flex justify-center w-full">
								<button
									on:click|preventDefault={(evt) => {
										evt.preventDefault();
										onModal.shownModal = true;
									}}
									class="w-full border-2 border-gray-100 p-2 rounded-lg font-sans text-sm text-left flex flex-row justify-between cursor-pointer"
								>
									{#if onModal.showType}
										<div class="flex flex-row space-x-1">
											<div class="pl-2">
												{onModal.selectedType.url}
											</div>
											<div class="">
												{onModal.selectedType.name}
											</div>
										</div>
									{:else}
										Select Emotion
									{/if}
									<input
										type="hidden"
										name="type"
										bind:value={selectedTypeValue}
										required
									/>
									<DropDown />
								</button>
							</div>
						</div>
						<div>
							<input
								type="text"
								name={params.code}
								bind:value={params.code}
								class="bg-gray-50 border text-center border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
								placeholder="Sticker Code"
								required
							/>
						</div>
						<div>
							<input
								type="text"
								name={params.name}
								bind:value={params.name}
								class="bg-gray-50 border text-center border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
								placeholder="Name"
								required
							/>
						</div>
						{#if params.base64}
							<div class="flex flex-row w-full items-center">
								<div class="w-3/5 text-base">Scale</div>
								<div class="w-2/5 flex flex-row items-center space-x-2">
									<input
										type="number"
										name={params.scale}
										bind:value={params.scale}
										class="bg-gray-50 border text-center w-full border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
										placeholder="Scale"
										required
										on:change={() => {
											params.viewHeight = params.originalHeight / params.scale;
											params.viewWidth = params.originalWidth / params.scale;
										}}
									/>
								</div>
							</div>
							<div class="flex flex-row w-full items-center">
								<div class="w-3/5 text-base">Origin Width</div>
								<div class="w-2/5 flex flex-row items-center space-x-2">
									<div
										class="bg-[#EEEEEE] text-center w-full border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
									>
										{params.originalWidth}
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
										{params.originalHeight}
									</div>
									<div class="text-[#4E4E4E]">px</div>
								</div>
							</div>
							<div class="flex flex-row w-full items-center">
								<div class="w-3/5 text-base">View Width</div>
								<div class="w-2/5 flex flex-row items-center space-x-2">
									<input
										type="number"
										name={params.viewWidth}
										bind:value={params.viewWidth}
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
										name={params.viewHeight}
										bind:value={params.viewHeight}
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
			<SelectStickerType
				shown={onModal.shownModal}
				{stickerTypes}
				on:select={(evt) => {
					const { type } = evt.detail;
					onModal.selectedType = type;
					params.type = onModal.selectedType;
					onModal.shownModal = false;
					onModal.showType = true;
				}}
				on:close={() => (onModal.shownModal = false)}
			/>
		</form>
	</div>
</div>

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
