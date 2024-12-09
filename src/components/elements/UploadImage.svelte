<script>
	import AddImage from "$components/icons/Add/AddImage.svelte";
	import { createEventDispatcher } from "svelte";
	export let base64;
	export let file;
	const dispatch = createEventDispatcher();
	let fileinput;
	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			base64 = e.target.result;
			dispatch("onImage", base64);
		};
	};
</script>

<div class=" flex justify-center items-center w-full flex-col">
	<label
		for="dropzone-file"
		class=" flex flex-col justify-center items-center w-[85px] h-[85px] border border-gray-300 bg-gray-50 rounded-lg border-2cursor-pointer hover:bg-bray-800 cursor-pointer"
	>
		<div class="flex flex-col justify-center items-center w-full h-full">
			{#if base64}
				<img
					src={base64}
					class="w-full h-full text-gray-600 rounded-lg"
					alt=""
				/>
			{:else if file}
				<img
					src={file.url}
					class="w-full h-full text-gray-600 rounded-lg"
					alt=""
				/>
			{:else}
				<AddImage />
				<p class="mb-2 text-sm text-gray-500">
					<span class="font-semibold">Image</span>
				</p>
			{/if}
		</div>
		<button
			on:click={() => {
				fileinput.click();
			}}
		>
			<!-- Choose Image -->
		</button>
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
