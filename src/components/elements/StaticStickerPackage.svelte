<script>
	import { createEventDispatcher } from 'svelte';
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
            dispatch('onImage',base64)
		};
	};
</script>

<div class=" flex justify-center items-center w-full flex-col">
	<label
		for="dropzone-file"
		class="flex flex-col justify-center items-center w-[85px] h-[85px] bg-gray-50 rounded-lg border-2 border-gray-300 cursor-pointer hover:bg-bray-800 bg-gray-700 hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
	>
		<div class="flex flex-col justify-center items-center">
			{#if base64}
				<img src={base64} class="w-64 h-16 text-gray-600 " alt="" />
			{:else}
				<!-- <img
					src="https://pixlok.com/wp-content/uploads/2021/12/Add-Icon-SVG-98ygj.png"
					class="w-10 h-10 text-gray-600 "
					alt=""
				/> -->
				<img src={file.url} class="w-64 h-16 text-gray-600 " alt="" />
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
