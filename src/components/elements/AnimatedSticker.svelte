<script>
	import StickerAnimated from "$components/modals/StickerAnimated/StickerAnimated.svelte";
	import { getBase64ImageSize } from "$providers/actions/storage/storage";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	let frameNum = 1;
	let fps = 10;
	let scale = 1;

	// Convert file to base64
	let base64;
	let fileinput;
	let calWidthHeight;
	let width;
	let height;

	const onSubmit = () => {

	}

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = async (e) => {
			base64 = e.target.result;
			calWidthHeight = await getBase64ImageSize(base64);
			width = calWidthHeight.width;
			height = calWidthHeight.height;
		};
	};
</script>

<!-- <form on:submit|preventDefault={onLoadCreate} method="post">
    <div class="flex flex-col bg-white rounded-lg p-2">
        <div class="flex items-center w-full">
            <div
                class="w-1/3 text-[#717171] hover:text-red-800 cursor-pointer"
                on:click={() => {
                    dispatch("close");
                }}
            >
                <CancelIcon />
            </div>
            <div class="w-1/3 flex justify-center">{title}</div>
            {#if !loading}
                <button
                    type="submit"
                    class="flex justify-end items-center w-1/3 h-full cursor-pointer"
                >
                    <div
                        class="w-[80px] h-[39px] bg-[#006EB2] rounded-[9px] text-white flex items-center justify-center"
                    >
                        {action}
                    </div>
                </button>
            {:else}
                <div
                    class="flex justify-end items-center w-1/3 h-full cursor-pointer"
                >
                    <div
                        class="flex items-center justify-center bg-[#F1F1F1] rounded-[9px] w-[80px] h-[39px] text-white"
                    >
                        <SmfbLoading color={"#006EB2"} />
                    </div>
                </div>
            {/if} -->

            <!-- <div class="mb-5 flex justify-center">
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
                <input
                    type="hidden"
                    name="type"
                    bind:value={selectedStickerType.id}
                />
                <DropDown />
            </label>
        </div> -->
        <!-- </div>
        <div class="flex-grow pt-5">
            <div
                class="mb-5 flex flex-row justify-center space-x-12 items-center"
            >
                <div class="flex items-center">
                    <div class="flex items-center">
                        <input
                            id="staticSticker"
                            type="radio"
                            checked={true}
                            name={params.animatedSticker}
                            bind:value={params.animatedSticker}
                            on:click={() => {
                                params.animatedSticker = false;
                            }}
                            class="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 cursor-pointer"
                        />
                        <label
                            for="staticSticker"
                            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                            >Static</label
                        >
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="flex items-center">
                        <input
                            checked=""
                            name={params.animatedSticker}
                            on:click={() => {
                                params.animatedSticker = true;
                            }}
                            id="animatedSticker"
                            type="radio"
                            class="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 cursor-pointer"
                        />
                        <label
                            for="animatedSticker"
                            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                            >Animated</label
                        >
                    </div>
                </div>
            </div>
            {#if params.animatedSticker}
                <AnimatedSticker
                    on:submit={(evt) => {
                        // params.base64 = evt.detail.base64;
                        // params.frameNum = evt.detail.frameNum;
                        // params.fps = evt.detail.fps;
                        onCreate();
                    }}
                />
            {:else} -->
                <!-- <div class="flex w-full h-full"> -->
                <!-- <StaticSticker
                    on:submit={(evt) => {
                        onCreate();
                    }}
                /> -->
                <!-- </div> -->
            <!-- {/if}
        </div> -->
        <!-- <div class="flex-grow-0">
            <div class="flex justify-center mb-4 space-x-4">
                <button
                    disabled={uploading}
                    type="button"
                    on:click={() => {
                        dispatch("close");
                    }}
                    class=" w-24 h-11 text-gray-400 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >Cancel
                </button>
                <button
                    disabled={uploading}
                    type="submit"
                    class="relative w-24 h-11 rounded-lg overflow-hidden bg-gray-100"
                >
                    <div
                        class="bg-gray-300 absolute left-0 top-0 bottom-0"
                        style={`width: ${uploadPercentage}%;`}
                    />
                    <div
                        class="absolute inset-0 py-1 text-pink-600 flex justify-center items-center"
                    >
                        <div>Create</div>
                    </div>
                </button>
            </div>
        </div> -->
    <!-- </div>
</form> -->

<div class="flex justify-center items-center w-full flex-col">
	<label
		for="image-file"
		class="flex flex-col justify-center items-center w-64 h-16 bg-gray-100 rounded-lg border-2 border-gray-300 cursor-pointer hover:bg-bray-800 bg-gray-700 hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
	>
		<div class="flex flex-col justify-center bg-scroll items-center">
			{#if base64}
				<div class=" w-[250px] overflow-hidden">
					<div class=" overflow-auto w-full">
						<div
							style="width: {width / scale}px; height: {height /
								scale}px;"
						>
							<img
								src={base64}
								class=" text-gray-600 w-full h-full"
								alt=""
							/>
						</div>
					</div>
				</div>
			{:else}
				<div class="text-gray-600">
					<AddImage />
				</div>
				<p class="text-sm text-gray-500 text-gray-400">
					<span class="font-semibold">Image</span>
				</p>
			{/if}
			<div
				on:click={() => {
					fileinput.click();
				}}
			>
				<!-- Choose Image -->
			</div>
			<input
				id="image-file"
				style="display:none"
				type="file"
				accept=".jpg, .jpeg, .png"
				on:input={(e) => onFileSelected(e)}
				bind:this={fileinput}
			/>
		</div>
	</label>
</div>
<div class="flex flex-col justify-center items-center mb-5 mt-5">
	<div class="flex flex-row space-x-14">
		<div class="flex flex-row justify-center items-center">
			<label for="staticSticker" class="text-xs font-sans text-gray-600">
				H:
			</label>
			<div
				class="h-6 w-11 text-xs font-sans bg-gray-100/30 rounded-sm p-1"
			>
				{height} x
			</div>
		</div>
		<div class="flex flex-row justify-center items-center">
			<label
				for="animatedSticker"
				class="text-xs font-sans text-gray-600"
			>
				Frame:
			</label>
			<input
				type="number"
				name="frameNum"
				bind:value={frameNum}
				on:input={() => {
					frameNum = frameNum;
				}}
				class="h-6 w-11 text-xs font-sans bg-gray-100/30 rounded-sm p-1"
			/>
		</div>
	</div>
	<div class="flex flex-row space-x-14 mt-1 mr-1">
		<div class="flex flex-row justify-center items-center">
			<label for="staticSticker" class="text-xs font-sans text-gray-600">
				W:
			</label>
			<div
				class="h-6 w-11 text-xs font-sans bg-gray-100/30 rounded-sm p-1"
			>
				{width} x
			</div>
		</div>
		<div class="flex flex-row justify-center items-center">
			<label
				for="animatedSticker"
				class="text-xs font-sans text-gray-600"
			>
				Speed:
			</label>
			<input
				type="number"
				name="fps"
				bind:value={fps}
				on:input={() => {
					onUpdate();
				}}
				class="h-6 w-11 text-xs font-sans rounded-sm p-1 bg-gray-100/30"
			/>
		</div>
	</div>
</div>
{#if base64}
	<div class=" flex justify-center items-center w-full flex-col">
		<label
			for="dropzone-file"
			class="flex flex-col justify-center items-center w-[85px] h-[85px] bg-gray-50 rounded-lg border-2 border-gray-300 cursor-pointer hover:bg-bray-800 bg-gray-700 hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
		>
			<div class="flex flex-col justify-center items-center">
				<StickerAnimated {base64} {frameNum} {fps} {w} {h} />
			</div>
		</label>
		<p class="text-xs text-gray-500 text-gray-400 mt-2">Preview</p>
	</div>
{/if}
