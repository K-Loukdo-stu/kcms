<script>
	import { createEventDispatcher } from "svelte";
	import CloseIcon from "$components/icons/Close/CloseIcon.svelte";
	import CirclePlus from "$components/icons/Plus/CirclePlus.svelte";
	import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";
	import { getBase64ImageSize } from "$providers/actions/storage";
	import StickerAnimated from "$components/modals/Sticker/StickerAnimated/StickerAnimated.svelte";
	import StickerIcon from "$components/icons/Sticker/StickerIcon.svelte";
	import { updateWideScreenSticker } from "$providers/actions/kart/wide-screen-sticker";
	import { uploadWideScreenSticker } from "$providers/actions/storage/wide-screen-sticker";
	const dispatch = createEventDispatcher();
	export let wide;
	let scale = 4;

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
		title: "Edit wide screen",
		action: "Save",
	};

	let params = {
		calWidthHeight: 0,
		scale: 0,
		base64: "",
		originalWidth: wide.width,
		originalHeight: wide.height,
		name: wide.name,
		file: wide.file,
		animated: wide?.animated || true,
		speed: wide?.speed || 1,
		frameNum: wide?.frameNum || 1,
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
			if (params.base64) {
				await uploadWideScreenSticker.load({
					base64: params.base64,
					onComplete: (res) => {
						// to do
						// upload to create sticker package
						onUpdateWideScreenSticker();
					},
					onError: (err) => {
						onLoadState.errMsg = err?.message || "Unknown upload error";
					},
					onProgress: ({ params, loaded, total }) => {
						// to do
					},
				});
			} else {
				let res = await updateWideScreenSticker.load({
					id: wide.id,
					file: params.file,
					name: params.name,
					animated: params.animated,
					height: params.originalHeight,
					width: params.originalWidth,
					speed: params.speed,
					frameNum: params.frameNum,
				});
				if (res.success) dispatch("edit");
			}
		} catch (err) {
			onLoadState.errMsg = err?.message;
		} finally {
			onLoadState.loading = false;
		}
	};

	const onUpdateWideScreenSticker = async () => {
		try {
			onLoadState.loading = true;
			await updateWideScreenSticker.load({
				id: wide.id,
				file: res.response,
				name: params.name,
				animated: params.animated,
				height: params.originalHeight,
				width: params.originalWidth,
				speed: params.speed,
				frameNum: params.frameNum,
			});

			// to do
			dispatch("edit");
			params.base64 = "";
		} catch (error) {
			onLoadState.errMsg = err?.message || "Unknown updating error";
		} finally {
			onLoadState.loading = false;
		}
	};
</script>

<div class=" relative w-full h-full flex justify-center items-center">
	<div class=" bg-white rounded-md w-80">
		<form
			class="flex flex-col w-full h-full"
			on:submit|preventDefault={onUpload}
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
			<div class="relative overflow-auto max-h-[700px]">
				<div class="w-full">
					<div class="w-full flex flex-col justify-center items-center p-4">
						<button
							class="relative bg-[#EEEEEE] cursor-pointer text-[#717171] w-full h-20 rounded-lg flex items-center justify-center flex-col"
							on:click|preventDefault={() => {
								fileinput.click();
							}}
						>
							{#if params.base64}
								<div class="absolute inset-0 overflow-hidden">
									<div class=" overflow-x-auto w-full h-full">
										<div
											style={`height: 100%; width: ${(params.originalWidth / params.originalHeight) * 80}px;`}
										>
											<img
												src={params.base64}
												class=" text-gray-600 w-full h-full"
												alt=""
											/>
										</div>
									</div>
								</div>
							{:else if params.file}
								<div class="absolute inset-0 overflow-hidden">
									<div class=" overflow-x-auto w-full h-full">
										<div
											style={`height: 100%; width: ${(params.originalWidth / params.originalHeight) * 80}px;`}
										>
											<img
												src={params.file.url}
												class=" text-gray-600 h-full"
												alt=""
											/>
										</div>
									</div>
								</div>
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
						<div class="w-full flex flex-col justify-center items-center">
							<div
								class="bg-[#F8F8F9] text-[#717171] w-40 h-60 rounded-lg flex items-center justify-center flex-col"
							>
								{#if params.base64 || params.file}
									<StickerAnimated
										base64={params.base64 || params.file.url}
										bind:frameNum={params.frameNum}
										bind:fps={params.speed}
									/>
								{:else}
									<div class="text-[#BFBFBF]">
										<StickerIcon size={40} />
									</div>
								{/if}
							</div>
							<div class="text-[#939393] text-base p-2">Preview</div>
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
						<div class="w-full bg-[#F8F8F9] rounded-lg p-2 space-y-4">
							<div class="flex flex-row w-full items-center">
								<div class="w-3/5 text-base">Frame Number</div>
								<div class=" flex flex-row items-center space-x-2">
									<input
										type="number"
										name={params.frameNum}
										bind:value={params.frameNum}
										class="bg-gray-50 border text-center w-20 border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
										required
									/>
								</div>
							</div>
							<div class="flex flex-row w-full items-center">
								<div class="w-3/5 text-base">Speed</div>
								<div class=" flex flex-row items-center space-x-2">
									<input
										type="number"
										name={params.speed}
										bind:value={params.speed}
										class="bg-gray-50 border text-center w-20 border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
										required
									/>
								</div>
							</div>

							{#if params.base64}
								<div class="flex flex-row w-full items-center">
									<div class="w-3/5 text-base">Origin Width</div>
									<div class=" flex flex-row items-center space-x-2">
										<div
											class="bg-[#EEEEEE] text-center w-20 border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
										>
											{params.originalWidth}
										</div>
										<div class="text-[#4E4E4E]">px</div>
									</div>
								</div>
								<div class="flex flex-row w-full items-center">
									<div class="w-3/5 text-base">Origin Height</div>
									<div class="flex flex-row items-center space-x-2">
										<div
											class="bg-[#EEEEEE] text-center w-20 border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
										>
											{params.originalHeight}
										</div>
										<div class="text-[#4E4E4E]">px</div>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>

<style>
	/* width */
	::-webkit-scrollbar {
		width: 4px;
		height: 6px;
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
