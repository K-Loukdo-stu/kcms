<script>
    import AddImage from '$components/icons/Add/AddImage.svelte';
	import { createEventDispatcher } from 'svelte';
	export let mediaFileBase64;
	export let file;
	const dispatch = createEventDispatcher();

	let fileinput;
	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			mediaFileBase64 = e.target.result;
			dispatch('onImage', mediaFileBase64);
		};
	};
</script>

<div class=" flex justify-center items-center w-full flex-col">
	<label
		for="dropzone-file"
		class="flex flex-col justify-center items-center w-[85px] h-[85px] bg-gray-50 rounded-lg border-2 border-gray-300 cursor-pointer hover:bg-bray-800 bg-gray-700 hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
	>
		<div class="flex flex-col justify-center items-center">
			<AddImage />
			<p class="mb-2 text-sm text-gray-500 text-gray-400">
				<span class="font-semibold">Image</span>
			</p>
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
</div>
{#if mediaFileBase64}
	<div class="ml-2 flex justify-center items-center w-full flex-col">
		<label
			for="dropzone-file"
			class="flex flex-col justify-center items-center w-[85px] h-[85px] bg-gray-50 rounded-lg border-2 border-gray-300 cursor-pointer hover:bg-bray-800 bg-gray-700 hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
		>
			<div class="flex flex-col justify-center items-center w-full h-full">
				<img src={mediaFileBase64} class="w-full h-full text-gray-600 " alt="" />
			</div>
		</label>
	</div>
{:else if file}
	<div class="ml-2 flex justify-center items-center w-full flex-col">
		<label
			for="dropzone-file"
			class="flex flex-col justify-center items-center w-[85px] h-[85px] bg-gray-50 rounded-lg border-2 border-gray-300 cursor-pointer hover:bg-bray-800 bg-gray-700 hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
		>
			<div class="flex flex-col justify-center items-center w-full h-full">
				<img src={file.url} class="w-full h-full text-gray-600 " alt="" />
			</div>
		</label>
	</div>
{/if}
