<script>
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { updateSticker } from '$providers/actions/kart';
	import StickerAnimated from '../StickerAnimated/StickerAnimated.svelte';
	import StickerType from './StickerType.svelte';
	import { uploadSticker } from '$providers/actions/storage/sticker';
	
	const dispatch = createEventDispatcher();
	export let param, stickerTypes;
	export let w = 85;
	export let h = 85;
	export let frameNum = param.frameNum;
	export let fps = param.fps;

	let base64;
	let fileinput;
	let name = param.name;
	let width = param.width;
	let height = param.height;
	let uploading = false;
	let uploadPercentage = 0;
	let animatedSticker = param.animated;
	let id = param.id;
	let packages = param.packages.id;
	let file = param.file;
	let stickerTypeModalShown = false;
	let selectedStickerType = param.type;
	let showType = false;

	let checkAnimated = false;
	let unCheckAnimated = false;

	if (param.animated) {
		checkAnimated = true;
	} else {
		unCheckAnimated = true;
	}

	// Upload Image to S3
	const onUpload = async (evt) => {
		evt.preventDefault();
		uploading = true;

		if (base64) {
			await uploadSticker.load({
				base64,
				onComplete: async (res) => {
					await updateSticker
						.load({
							id: id,
							name,
							width: res.response.width,
							height: res.response.height,
							file: res.response,
							animated: animatedSticker,
							packages: packages,
							type: selectedStickerType.id,
							frameNum: parseInt(frameNum),
							fps: parseInt(fps)
						})
						.then((res) => {
							// to do
							dispatch('onDone');
							uploading = false;
						});
				},
				onError: (err) => {
					// to do
					uploading = false;
				},
				onProgress: ({ params, loaded, total }) => {
					// to do
					progress = true;
					uploadPercentage = (loaded / total) * 98;
				}
			});
		} else {
			updateSticker
				.load({
					id: id,
					name: name,
					width: width,
					height: height,
					file: file,
					animated: animatedSticker,
					packages: packages,
					type: selectedStickerType.id,
					frameNum: parseInt(frameNum),
					fps: parseInt(fps)
				})
				.then((res) => {
					dispatch('onDone');
					uploading = false;
				});
		}

		// errMsg = data.msg;
	};

	// Convert file to base64
	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			base64 = e.target.result;
		};
	};
</script>

<div class="relative w-full h-full p-1 flex justify-center items-center">
	<div class="absolute bg-white rounded-lg">
		<div class="relative w-80 h-[500px]">
			<form class="space-y-6 h-full" on:submit|preventDefault={onUpload} method="post">
				<div class=" h-full flex flex-col bg-white rounded-lg">
					<div class="flex-grow-0 mt-3">
						<div>
							<h3 class="mb-5 text-base font-medium text-gray-700 text-white text-center">
								Edit Sticker
							</h3>
						</div>
						<div class="mb-5 flex justify-center">
							<label
								on:click={() => (stickerTypeModalShown = true)}
								class="w-64 border-2 border-gray-100 p-2 rounded-lg font-sans text-sm text-left flex flex-row justify-between"
							>
								{#if showType}
									<div class="flex flex-row">
										<div class="pl-2">
											{selectedStickerType.url}
										</div>
									</div>
								{:else}
									<div class="pl-2">
										{selectedStickerType.url}
									</div>
								{/if}
								<input type="hidden" name="type" bind:value={selectedStickerType.id} />
								<img
									src="https://icon-library.com/images/drop-down-menu-icon/drop-down-menu-icon-19.jpg"
									class="w-4 h-4 right-1 self-center"
									alt=""
								/>
							</label>
						</div>
					</div>
					<div class="flex-grow">
						<div class="mb-5 flex flex-row justify-center space-x-12 items-center">
							<div class="flex items-center">
								<div class="flex items-center">
									<input
										id="staticSticker"
										type="radio"
										checked={unCheckAnimated}
										name="animatedSticker"
										on:click={() => {
											animatedSticker = false;
										}}
										class="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300"
									/>
									<label
										for="staticSticker"
										class="ml-2 text-sm font-medium text-gray-900 text-gray-300">Static</label
									>
								</div>
							</div>
							<div class="flex items-center">
								<div class="flex items-center">
									<input
										checked={checkAnimated}
										name="animatedSticker"
										on:click={() => {
											animatedSticker = true;
										}}
										id="animatedSticker"
										type="radio"
										class="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300"
									/>
									<label
										for="animatedSticker"
										class="ml-2 text-sm font-medium text-gray-900 text-gray-300"
										>Animated</label
									>
								</div>
							</div>
						</div>
						{#if animatedSticker}
							<div class="flex justify-center items-center w-full flex-col ">
								<label
									for="image-file"
									class="flex flex-col justify-center items-center w-64 h-16 bg-gray-100 rounded-lg border-2 border-gray-300 cursor-pointer hover:bg-bray-800 bg-gray-700 hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
								>
									<div class="flex flex-col justify-center bg-scroll items-center">
										{#if base64}
											<div class=" w-full overflow-auto">
												<img
													src={base64}
													width={param.width * param.frameNum}
													height={param.height}
													class=" text-gray-600 "
													alt=""
												/>
											</div>
										{:else}
											<div class=" w-[250px] overflow-hidden">
												<div class=" overflow-auto w-full">
													<div style="width: {width / 2}px; height: {height / 2}px;">
														<img src={file.url} class=" text-gray-600 w-full h-full " alt="" />
													</div>
												</div>
											</div>
										{/if}
									</div>
								</label>
							</div>
							<div class="flex flex-col justify-center items-center mb-5 mt-5">
								<div class="flex flex-row space-x-14">
									<div class="flex flex-row justify-center items-center">
										<label for="staticSticker" class="text-xs font-sans text-gray-600 "> H: </label>
										<div class="h-6 w-11 text-xs font-sans bg-gray-100/30 rounded-sm p-1">
											{param.height} x
										</div>
									</div>
									<div class="flex flex-row justify-center items-center">
										<label for="animatedSticker" class="text-xs font-sans text-gray-600 ">
											Frame:
										</label>
										<input
											type="number"
											name="frameNum"
											bind:value={frameNum}
											class="h-6 w-11 text-xs font-sans bg-gray-100/30 rounded-sm p-1"
										/>
									</div>
								</div>
								<div class="flex flex-row space-x-14 mt-1 mr-1">
									<div class="flex flex-row justify-center items-center">
										<label for="staticSticker" class="text-xs font-sans text-gray-600 "> W: </label>
										<div class="h-6 w-11 text-xs font-sans bg-gray-100/30 rounded-sm p-1">
											{param.width} x
										</div>
									</div>
									<div class="flex flex-row justify-center items-center">
										<label for="animatedSticker" class="text-xs font-sans text-gray-600 ">
											Speed:
											<input
												type="number"
												name="fps"
												bind:value={fps}
												class="h-6 w-11 text-xs font-sans rounded-sm p-1 bg-gray-100/30"
											/>
										</label>
									</div>
								</div>
							</div>
						{/if}

						<div class=" flex justify-center items-center w-full flex-col">
							<label
								for="dropzone-file"
								class="flex flex-col justify-center items-center w-[85px] h-[85px] bg-gray-50 rounded-lg border-2 border-gray-300 cursor-pointer hover:bg-bray-800 bg-gray-700 hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
							>
								<div class="flex flex-col justify-center items-center">
									{#if file}
										{#if animatedSticker}
											<StickerAnimated base64={file.url} {frameNum} {fps} {w} {h} />
										{:else}
											<img src={file.url} class="w-64 h-16 text-gray-600 " alt="" />
										{/if}
									{:else}
										<img
											src="https://pixlok.com/wp-content/uploads/2021/12/Add-Icon-SVG-98ygj.png"
											class="w-10 h-10 text-gray-600 "
											alt=""
										/>
										<p class="mb-2 text-sm text-gray-500 text-gray-400">
											<span class="font-semibold">Image</span>
										</p>
									{/if}
								</div>
								<div
									on:click={() => {
										fileinput.click();
									}}
								>
									<!-- Choose Image -->
								</div>
								<input
									id="dropzone-file"
									style="display:none"
									type="file"
									accept=".jpg, .jpeg, .png"
									on:change={(e) => onFileSelected(e)}
									bind:this={fileinput}
								/>
							</label>
							<p class="text-xs text-gray-500 text-gray-400 mt-2">Preview</p>
						</div>
					</div>
					<div class="flex-grow-0">
						<div class="flex justify-center mb-4 space-x-4">
							<button
								disabled={uploading}
								type="button"
								on:click={() => {
									dispatch('close');
								}}
								class=" w-24  h-11 text-gray-400 bg-white hover:bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
								>Cancel</button
							>
							<button
								disabled={uploading}
								type="submit"
								class="relative w-24  h-11 rounded-lg overflow-hidden bg-gray-100"
							>
								<!-- Uploading background -->
								<div
									class="bg-gray-300 absolute left-0 top-0 bottom-0"
									style={`width: ${uploadPercentage}%;`}
								/>
								<div class="absolute inset-0 py-1 text-pink-600 flex justify-center items-center ">
									<div>Save</div>
								</div>
							</button>
						</div>
					</div>
				</div>
			</form>

			<!-- Emoji Modal -->
			<StickerType
				shown={stickerTypeModalShown}
				{stickerTypes}
				on:select={(evt) => {
					const { type } = evt.detail;
					selectedStickerType = type;
					stickerTypeModalShown = false;
				}}
				on:close={() => (stickerTypeModalShown = false)}
			/>
		</div>
	</div>
</div>
