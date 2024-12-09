<script>
    import { createEventDispatcher } from "svelte";
    import CloseIcon from "$components/icons/Close/CloseIcon.svelte";
    import CirclePlus from "$components/icons/Plus/CirclePlus.svelte";
    import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";
    import { getBase64ImageSize } from "$providers/actions/storage";
    import DropDown from "$components/icons/DropDown.svelte";
    import SelectStickerType from "$components/modals/Sticker/SelectStickerType/SelectStickerType.svelte";
    import { createSticker, updateSticker } from "$providers/actions/kart";
    import { uploadStickerStatic } from "$providers/actions/storage";
    import StickerIcon from "$components/icons/Sticker/StickerIcon.svelte";
    import StickerAnimated from "../../StickerAnimated/StickerAnimated.svelte";
    const dispatch = createEventDispatcher();
    export let stickerTypes;
    export let packages;
    export let sticker;

    let scale = 4;
    let onModal = {
        shownModal: false,
        showType: false,
        selectedType: stickerTypes.find((cat) => cat.id == sticker.type.id),
    };

    let fileinput;
    const onFileSelected = (e) => {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async (e) => {
            params.base64 = e.target.result;
            params.calWidthHeight = await getBase64ImageSize(params.base64);
            params.originalWidth = params.calWidthHeight.width;
            params.originalHeight = params.calWidthHeight.height;
        };
    };

    let fixParam = {
        title: "Edit animated sticker",
        action: "Save",
    };

    let params = {
        calWidthHeight: 0,
        scale: 0,
        originalWidth: sticker.originalWidth,
        originalHeight: sticker.originalHeight,
        viewWidth: sticker.viewWidth,
        viewHeight: sticker.viewHeight,
        name: sticker.name,
        code: sticker.code,
        base64: "",
        type: sticker.type,
        file: sticker.file,
        animated: sticker.animated,
        isLoop: sticker.isLoop,
        forward: sticker.forward,
        reverse: sticker.reverse,
        speed: sticker.speed,
        frameNum: sticker.frameNum,
        fps: sticker.fps,
    };

    let onLoadState = {
        loading: false,
        loaded: false,
        errMsg: "",
    };

    const onUpload = async (evt) => {
        evt.preventDefault();
        try {
            onLoadState.loading = true;
            if (params.base64) {
                onLoadState.loading = true;
                await uploadStickerStatic.load({
                    base64: params.base64,
                    onComplete: (res) => {
                        // to do
                        updateSticker
                            .load({
                                id: sticker.id,
                                file: res.response,
                                packageId: packages,
                                name: params.name,
                                code: params.code,
                                animated: params.animated,
                                type: params.type.id,
                                frameNum: params.frameNum,
                                fps: params.fps,
                                viewWidth: params.viewWidth,
                                viewHeight: params.viewHeight,
                                originalHeight: params.originalHeight,
                                originalWidth: params.originalWidth,
                                isLoop: params.isLoop,
                                forward: params.forward,
                                reverse: params.reverse,
                                speed: params.speed,
                                frameNum: params.frameNum,
                            })
                            .then((res) => {
                                // to do
                                dispatch("edit");
                                params.base64 = "";
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
                let res = await updateSticker.load({
                    id: sticker.id,
                    file: params.file,
                    packageId: packages,
                    name: params.name,
                    code: params.code,
                    animated: params.animated,
                    type: params.type.id,
                    frameNum: params.frameNum,
                    fps: params.fps,
                    viewWidth: params.viewWidth,
                    viewHeight: params.viewHeight,
                    originalHeight: params.originalHeight,
                    originalWidth: params.originalWidth,
                    isLoop: params.isLoop,
                    forward: params.forward,
                    reverse: params.reverse,
                    speed: params.speed,
                    frameNum: params.frameNum,
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
                        class="w-full flex flex-col justify-center items-center p-4"
                    >
                        <div
                            class="relative bg-[#EEEEEE] cursor-pointer text-[#717171] w-full h-20 rounded-lg flex items-center justify-center flex-col"
                            on:click={() => {
                                fileinput.click();
                            }}
                        >
                            {#if params.base64}
                                <div class="absolute w-full">
                                    <div class=" overflow-auto w-full">
                                        <div
                                            style="width: {params.originalWidth /
                                                scale}px; 
											height: {params.originalHeight / scale}px;"
                                        >
                                            <img
                                                src={params.base64}
                                                class=" text-gray-600 w-full h-full"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            {:else if params.file}
                                <div class="absolute w-full">
                                    <div class=" overflow-auto w-full">
                                        <div
                                            style="width: {params.originalWidth /
                                                scale}px; 
                                        height: {params.originalHeight /
                                                scale}px;"
                                        >
                                            <img
                                                src={params.file.url}
                                                class=" text-gray-600 w-full h-full"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
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
                        <div
                            class="w-full flex flex-col justify-center items-center"
                        >
                            <div
                                class="bg-[#F8F8F9] text-[#717171] w-40 h-40 rounded-lg flex items-center justify-center flex-col"
                            >
                                {#if params.base64}
                                    <StickerAnimated
                                        base64={params.base64}
                                        bind:frameNum={params.frameNum}
                                        bind:fps={params.fps}
                                    />
                                {:else if params.file}
                                    <StickerAnimated
                                        base64={params.file.url}
                                        bind:frameNum={params.frameNum}
                                        bind:fps={params.fps}
                                    />
                                {:else}
                                    <div class="text-[#BFBFBF]">
                                        <StickerIcon size={40} />
                                    </div>
                                {/if}
                            </div>
                            <div class="text-[#939393] text-base p-2">
                                Preview
                            </div>
                        </div>
                        <div class="flex flex-row w-full space-x-5">
                            <div class=" flex justify-center w-full">
                                <label
                                    on:click={() => (onModal.shownModal = true)}
                                    class="w-full border-2 border-gray-100 p-2 rounded-lg font-sans text-sm text-left flex flex-row justify-between cursor-pointer"
                                >
                                    <div class="flex flex-row space-x-1">
                                        <div class="pl-2">
                                            {onModal.selectedType.url}
                                        </div>
                                        <div class="">
                                            {onModal.selectedType.name}
                                        </div>
                                    </div>
                                    <input
                                        type="hidden"
                                        name="type"
                                        bind:value={onModal.selectedType.id}
                                    />
                                    <DropDown />
                                </label>
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                name={params.code}
                                bind:value={params.code}
                                class="bg-gray-50 border text-center border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Sticker Code"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name={params.name}
                                bind:value={params.name}
                                class="bg-gray-50 border text-center border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div
                            class="w-full bg-[#F8F8F9] rounded-lg p-2 space-y-4"
                        >
                            <div class="flex flex-row w-full items-center">
                                <div class="w-3/5 text-base">Loop</div>
                                <div class=" flex flex-row items-start">
                                    <input
                                        type="checkbox"
                                        checked={params.isLoop}
                                        name={params.isLoop}
                                        value={params.isLoop}
                                        class="w-5 h-5"
                                        on:click={() => {
                                            params.isLoop = !params.isLoop;
                                        }}
                                    />
                                </div>
                            </div>
                            <div class="flex flex-row w-full items-center">
                                <div class="w-3/5 text-base">Scale</div>
                                <div
                                    class=" flex flex-row items-center space-x-2"
                                >
                                    <input
                                        type="number"
                                        name={params.scale}
                                        bind:value={params.scale}
                                        class="bg-gray-50 border text-center w-20 border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
                                        placeholder="Scale"
                                        required
                                        on:change={() => {
                                            params.viewHeight =
                                                params.originalHeight /
                                                params.scale;
                                            params.viewWidth =
                                                params.originalWidth /
                                                params.scale;
                                        }}
                                    />
                                </div>
                            </div>

                            <div class="flex flex-row w-full items-center">
                                <div class="w-3/5 text-base">Frame Number</div>
                                <div
                                    class=" flex flex-row items-center space-x-2"
                                >
                                    <input
                                        type="number"
                                        name={params.frameNum}
                                        bind:value={params.frameNum}
                                        class="bg-gray-50 border text-center w-20 border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="flex flex-row w-full items-center">
                                <div class="w-3/5 text-base">Speed</div>
                                <div
                                    class=" flex flex-row items-center space-x-2"
                                >
                                    <input
                                        type="number"
                                        name={params.fps}
                                        bind:value={params.fps}
                                        class="bg-gray-50 border text-center w-20 border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
                                        required
                                    />
                                </div>
                            </div>
                            {#if params.file}
                                <div class="flex flex-row w-full items-center">
                                    <div class="w-3/5 text-base">
                                        Origin Width
                                    </div>
                                    <div
                                        class=" flex flex-row items-center space-x-2"
                                    >
                                        <div
                                            class="bg-[#EEEEEE] text-center w-20 border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
                                        >
                                            {params.originalWidth}
                                        </div>
                                        <div class="text-[#4E4E4E]">px</div>
                                    </div>
                                </div>
                                <div class="flex flex-row w-full items-center">
                                    <div class="w-3/5 text-base">
                                        Origin Height
                                    </div>
                                    <div
                                        class="flex flex-row items-center space-x-2"
                                    >
                                        <div
                                            class="bg-[#EEEEEE] text-center w-20 border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
                                        >
                                            {params.originalHeight}
                                        </div>
                                        <div class="text-[#4E4E4E]">px</div>
                                    </div>
                                </div>
                                <div class="flex flex-row w-full items-center">
                                    <div class="w-3/5 text-base">
                                        View Width
                                    </div>
                                    <div
                                        class=" flex flex-row items-center space-x-2"
                                    >
                                        <input
                                            type="number"
                                            name={params.viewWidth}
                                            bind:value={params.viewWidth}
                                            class="bg-gray-50 border text-center w-20 border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
                                            placeholder="Width"
                                            required
                                        />
                                        <div class="text-[#4E4E4E]">px</div>
                                    </div>
                                </div>
                                <div class="flex flex-row w-full items-center">
                                    <div class="w-3/5 text-base">
                                        View Height
                                    </div>
                                    <div
                                        class=" flex flex-row items-center space-x-2"
                                    >
                                        <input
                                            type="number"
                                            name={params.viewHeight}
                                            bind:value={params.viewHeight}
                                            class="bg-gray-50 border text-center w-20 border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5"
                                            placeholder="Height"
                                            required
                                        />
                                        <div class="text-[#4E4E4E]">px</div>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
            <SelectStickerType
                shown={onModal.shownModal}
                {stickerTypes}
                on:select={(evt) => {
                    const { type } = evt.detail;
                    onModal.selectedType = type;
                    params.type = onModal.selectedType;
                    onModal.shownModal = false;
                    onModal.showType = true;
                }}
                on:close={() => (onModal.shownModal = false)}
            />
        </form>
    </div>
</div>

<style>
    /* width */
    ::-webkit-scrollbar {
        width: 4px;
        height: 4px;
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
