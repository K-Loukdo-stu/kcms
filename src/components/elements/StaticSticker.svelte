<script>
	import AddImage from "$components/icons/AddImage.svelte";
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
		class="flex flex-col justify-center items-center p-2 min-w-[100px] min-h-[100px] bg-gray-50 rounded-lg border-dotted border-2 cursor-pointer hover:bg-bray-800 border-gray-400 hover:border-gray-500 hover:bg-gray-200"
	>
		<div class="flex flex-col justify-center items-center">
			{#if base64}
				<img src={base64} class=" text-gray-600" alt="" />
			{:else if file}
				<img src={file.url} class=" text-gray-600" alt="" />
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
	<p class="text-xs text-gray-500 mt-2">{"(Preview)"}</p>
</div>
