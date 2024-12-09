<script>
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { createWideScreenSticker } from '$providers/actions/kart/wide-screen-sticker';
	import { uploadWideScreenSticker } from '$providers/actions/storage/wide-screen-sticker';

	export let base64;
	const dispatch = createEventDispatcher();
	let fileinput;
	let name = '';
	let uploading = false;
	let progress = false;
	let uploadPercentage = 0;
	let animated = true;

	// Upload Image to S3
	const onUpload = async (evt) => {
		evt.preventDefault();
		uploading = true;
		await uploadWideScreenSticker.load({
			base64,
			onComplete: (res) => {
				// to do
				createWideScreenSticker
					.load({
						name,
						width: res.response.width,
						height: res.response.height,
						file: res.response,
						animated
					})
					.then((res) => {
						// to do
						dispatch('onDone');
						uploading = false;
						base64 = '';
					});

				// upload to create wide screen sticker
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
		<div class="relative w-72 h-[500px]">
			<div class="relative py-6 px-6 lg:px-8">
				<h3 class="mb-4 text-base font-medium text-gray-700 text-white text-center">
					New Wide Screen Sticker
				</h3>
				<form class="space-y-6" on:submit|preventDefault={onUpload} method="post">
					<div class="relative flex justify-center items-center w-full flex-col">
						<div class="mb-2">
							<input
								type="text"
								name="name"
								bind:value={name}
								class="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg py-1 w-48"
								placeholder="Name"
								required
							/>
						</div>
						<label
							for="dropzone-file"
							class="flex flex-col justify-center items-center w-48 h-72 bg-gray-50 rounded-lg border-2 border-gray-300 shadow-md cursor-pointer hover:bg-bray-800 bg-gray-700 hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
						>
							<div class="flex flex-col justify-center items-center">
								{#if base64}
									<img src={base64} class="w-48 h-72 text-gray-600 " alt="" />
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
								accept=".jpg, .jpeg, .png .gif"
								on:change={(e) => onFileSelected(e)}
								bind:this={fileinput}
							/>
						</label>
						<p class="text-xs text-gray-500 text-gray-400 mt-1">Preview</p>
					</div>
					<div class="flex justify-center space-x-1">
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
								<div>Create</div>
							</div>
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
