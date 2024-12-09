<script>
	import AddImage from "$components/icons/Add/AddImage.svelte";
	import DropDown from "$components/icons/DropDown.svelte";
	import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";
	import SelectStickerType from "$components/modals/Sticker/SelectStickerType/SelectStickerType.svelte";
	import { createSticker } from "$providers/actions/kart";
	import { uploadStickerStatic } from "$providers/actions/storage";
	import { getBase64ImageSize } from "$providers/actions/storage/storage";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	export let stickerTypes;
	export let packages;
	export let animatedSticker = false;

	let stickerTypeModalShown = false;
	let showType = false;
	let selectedStickerType = {};

	// export let base64;
	export let file;
	let calWidthHeight;

	let loadCreateState = {
		loading: false,
		loaded: false,
		errMsg: "",
	};

	let params = {
		base64: "",
		frameNum: 0,
		fps: 0,
		type: "",
		width: 0,
		height: 0,
		name: "Static",
	};

	let fileinput;
	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = async (e) => {
			params.base64 = e.target.result;
			calWidthHeight = await getBase64ImageSize(params.base64);
			params.width = calWidthHeight.width;
			params.height = calWidthHeight.height;
			// dispatch("onImage", base64);
		};
	};

	const onCreate = async (evt) => {
		evt.preventDefault();
		try {
			loadCreateState.loading = true;
			loadCreateState.loaded = false;

			// Upload Image to S3
			await uploadStickerStatic.load({
				base64: params.base64,
				onComplete: (res) => {
					// to do
					createSticker
						.load({
							name: params.name,
							width: params.width,
							height: params.height,
							file: res.response,
							animated: animatedSticker,
							packages: packages,
							type: params.type.id,
							frameNum: params.frameNum,
							fps: params.fps,
						})
						.then((res) => {
							// to do
							dispatch("done");
						});
					// upload to create sticker
				},
				onError: (err) => {
					// to do
				},
				onProgress: ({ params, loaded, total }) => {
					// to do
				},
			});
			loadCreateState.loaded = true;
		} catch (err) {
			loadCreateState.errMsg = err.message;
		} finally {
			loadCreateState.loading = true;
		}
	};
</script>

<form on:submit|preventDefault={onCreate} method="post" class="h-full w-full">
	<div class="flex flex-col rounded-lg h-full">
		<div class="flex justify-center items-center w-full flex-col">
			<div
				class="bg-[#F8F8F9] w-[150px] h-[150px] flex items-center justify-center rounded-lg overflow-hidden"
			>
				<div
					class="relative flex flex-col justify-center items-center w-full h-full"
				>
					<div
						class="absolute flex items-center text-[#939393] justify-center flex-col cursor-pointer w-full h-full"
						on:click={() => {
							fileinput.click();
						}}
					>
						{#if params.base64}
							<div class="w-full h-full">
								<img
									src={params.base64}
									class="w-full h-full text-gray-600"
									alt=""
								/>
							</div>
						{:else if file}
							<img
								src={file.url}
								class="w-64 h-16 text-gray-600"
								alt=""
							/>
						{:else}
							<AddImage size={45} />
							<div>Image</div>
						{/if}
					</div>
				</div>
				<input
					id="dropzone-file"
					style="display:none"
					type="file"
					accept=".jpg, .jpeg, .png"
					on:change={(e) => onFileSelected(e)}
					bind:this={fileinput}
				/>
			</div>
		</div>
		<div class="pt-5 w-full">
			<div class=" flex justify-center w-full">
				<label
					on:click={() => (stickerTypeModalShown = true)}
					class="w-full border-2 border-gray-100 p-2 rounded-lg font-sans text-sm text-left flex flex-row justify-between cursor-pointer"
				>
					{#if showType}
						<div class="flex flex-row space-x-1">
							<div class="pl-2">
								{selectedStickerType.url}
							</div>
							<div class="">
								{selectedStickerType.name}
							</div>
						</div>
					{:else}
						Select Emotion
					{/if}
					<input
						type="hidden"
						name="type"
						bind:value={selectedStickerType.id}
					/>
					<DropDown />
				</label>
			</div>
		</div>
		<div class="flex items-end w-full h-full">
			{#if !loadCreateState.loading}
				<div
					class="flex justify-start items-center cursor-pointer w-1/2"
					on:click={() => {
						dispatch("close");
					}}
				>
					<div
						class="flex items-center justify-center bg-red-300 rounded-[9px] w-[80px] h-[39px] text-white"
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
						Create
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
	</div>
	<SelectStickerType
		shown={stickerTypeModalShown}
		{stickerTypes}
		on:select={(evt) => {
			const { type } = evt.detail;
			selectedStickerType = type;
			params.type = selectedStickerType;
			stickerTypeModalShown = false;
			showType = true;
		}}
		on:close={() => (stickerTypeModalShown = false)}
	/>
</form>
