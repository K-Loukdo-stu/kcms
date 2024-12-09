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

	export let gif;
	const dispatch = createEventDispatcher();

	let fileinput;

	let fixParam = {
		title: "Edit a GIF",
		action: "Save",
	};

	let param = {
		calWidthHeight: 0,
		originalWidth: gif.width,
		originalHeight: gif.height,
		base64: "",
		name: gif.name,
		visible: gif.visible,
		file: gif.file,
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
				await uploadStickerPackage.load({
					base64: param.base64,
					onComplete: (res) => {
						// to do
						updateGif
							.load({
								id: gif.id,
								name: param.name,
								file: res.response,
								width: res.response.width,
								height: res.response.height,
								visible: param.visible,
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
				let res = await updateGif.load({
					id: gif.id,
					name: param.name,
					file: param.file,
					width: param.originalWidth,
					height: param.originalHeight,
					visible: param.visible,
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
							class="bg-[#F8F8F9] cursor-pointer text-[#717171] w-40 h-60 rounded-md flex items-center justify-center flex-col"
							on:click={() => {
								fileinput.click();
							}}
						>
							{#if param.base64}
								<img
									src={param.base64}
									class="w-40 h-60 text-gray-600 p-[2px] rounded-md"
									alt=""
								/>
							{:else if param.file}
								<img
									src={param.file.url}
									class="w-40 h-60 text-gray-600 p-[2px] rounded-md"
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
								name={param.name}
								bind:value={param.name}
								class="bg-gray-50 border text-center border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
								placeholder="Covers Name"
								required
							/>
						</div>
						<div class="flex flex-row w-full items-center">
							<div class="w-3/5 text-base">Visible</div>
							<div class="w-2/5 flex flex-row items-start">
								<input
									type="checkbox"
									checked={param.visible}
									name={param.visible}
									value={param.visible}
									class="w-5 h-5"
									on:click={() => {
										param.visible = !param.visible;
									}}
								/>
							</div>
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
