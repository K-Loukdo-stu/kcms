<script>
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { createSticker } from '$providers/actions/kart';
	import StickerType from '../EditSticker/StickerType.svelte';
	import AnimatedSticker from '$components/elements/AnimatedSticker.svelte';
	import StaticSticker from '$components/elements/StaticSticker.svelte';
	import DropDown from '$components/icons/DropDown.svelte';
	import { uploadSticker } from '$providers/actions/storage/sticker';
	const dispatch = createEventDispatcher();

	export let frameNum = 1;
	export let fps = 20;

	export let base64;
	export let packages;
	export let stickerTypes;
	let stickerTypeModalShown = false;
	let selectedStickerType = {};

	let name = 'Test';
	let uploading = false;
	let uploadPercentage = 0;
	let animatedSticker = false;
	let showType = false;

	// Upload Image to S3
	const onUpload = async (evt) => {
		evt.preventDefault();
		uploading = true;
		await uploadSticker.load({
			base64,
			onComplete: (res) => {
				// to do
				createSticker
					.load({
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
						base64 = '';
					});

				// upload to create sticker
			},
			onError: (err) => {
				// to do
				uploading = false;
			},
			onProgress: ({ params, loaded, total }) => {
				// to do
				uploadPercentage = (loaded / total) * 98;
			}
		});
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
								New Sticker
							</h3>
						</div>
						<div class="mb-5 flex justify-center">
							<label
								on:click={() => (stickerTypeModalShown = true)}
								class="w-64 border-2 border-gray-100 p-2 rounded-lg font-sans text-sm text-left flex flex-row justify-between cursor-pointer"
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
								<input type="hidden" name="type" bind:value={selectedStickerType.id} />
								<DropDown />
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
										checked={true}
										name="animatedSticker"
										on:click={() => {
											animatedSticker = false;
										}}
										class="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 cursor-pointer"
									/>
									<label
										for="staticSticker"
										class="ml-2 text-sm font-medium text-gray-900 text-gray-300 cursor-pointer"
										>Static</label
									>
								</div>
							</div>
							<div class="flex items-center">
								<div class="flex items-center">
									<input
										checked=""
										name="animatedSticker"
										on:click={() => {
											animatedSticker = true;
										}}
										id="animatedSticker"
										type="radio"
										class="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 cursor-pointer"
									/>
									<label
										for="animatedSticker"
										class="ml-2 text-sm font-medium text-gray-900 text-gray-300 cursor-pointer"
										>Animated</label
									>
								</div>
							</div>
						</div>
						{#if animatedSticker}
							<AnimatedSticker
								on:onImage={(evt) => {
									base64 = evt.detail.base64;
									frameNum = evt.detail.frameNum;
									fps = evt.detail.fps;
								}}
							/>
						{:else}
							<div class="flex w-full h-full">
								<StaticSticker
									on:onImage={(evt) => {
										base64 = evt.detail;
									}}
								/>
							</div>
						{/if}
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
								>Cancel
							</button>
							<button
								disabled={uploading}
								type="submit"
								class="relative w-24  h-11 rounded-lg overflow-hidden bg-gray-100"
							>
								<div
									class="bg-gray-300 absolute left-0 top-0 bottom-0"
									style={`width: ${uploadPercentage}%;`}
								/>
								<div class="absolute inset-0 py-1 text-pink-600 flex justify-center items-center ">
									<div>Create</div>
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
					showType = true;
				}}
				on:close={() => (stickerTypeModalShown = false)}
			/>
		</div>
	</div>
</div>
