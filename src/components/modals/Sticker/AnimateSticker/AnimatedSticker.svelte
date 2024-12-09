<script>
    import AddImage from "$components/icons/Add/AddImage.svelte";
    import StickerAnimated from "$components/modals/Sticker/StickerAnimated/StickerAnimated.svelte";
    import { getBase64ImageSize } from "$providers/actions/storage/storage";
    import { createEventDispatcher } from "svelte";
    import DropDown from "$components/icons/DropDown.svelte";
    import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";
    import SelectStickerType from "$components/modals/Sticker/SelectStickerType/SelectStickerType.svelte";
    import { createSticker } from "$providers/actions/kart";
    import { uploadStickerAnimation } from "$providers/actions/storage";

    export let stickerTypes;
    export let packages;
    export let animatedSticker = true;
    export let file;
    
    let stickerTypeModalShown = false;
    let showType = false;
    let selectedStickerType = {};


    let loadCreateState = {
        loading: false,
        loaded: false,
        errMsg: "",
    };

    let params = {
        base64: "",
        frameNum: 24,
        fps: 10,
        type: "",
        width: 0,
        height: 0,
        name: "Animated",
    };

    const onCreate = async (evt) => {
        evt.preventDefault();
        try {
            loadCreateState.loading = true;
            loadCreateState.loaded = false;

            // Upload Image to S3
            await uploadStickerAnimation.load({
                base64: params.base64,
                onComplete: (res) => {
                    // to do
                    createSticker
                        .load({
                            name: params.name,
                            width: params.width,
                            height: params.height,
                            file: res.response,
                            animated: animatedSticker,
                            packages: packages,
                            type: params.type.id,
                            frameNum: params.frameNum,
                            fps: params.fps,
                        })
                        .then((res) => {
                            // to do
                            // dispatch("onDone");
                            dispatch("done");
                            // base64 = "";
                        });
                    // upload to create sticker
                },
                onError: (err) => {
                    // to do
                },
                onProgress: ({ params, loaded, total }) => {
                    // to do
                },
            });
            loadCreateState.loaded = true;
        } catch (err) {
            loadCreateState.errMsg = err.message;
        } finally {
            loadCreateState.loading = true;
        }
    };

    const dispatch = createEventDispatcher();

    // let frameNum = 24;
    // let fps = 10;
    // let scale = 1;
    let w = 130;
    let h = 130;

    // Convert file to base64
    let fileinput;
    let calWidthHeight;

    const onSubmit = () => {};

    const onFileSelected = (e) => {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async (e) => {
            params.base64 = e.target.result;
            calWidthHeight = await getBase64ImageSize(params.base64);
            params.width = calWidthHeight.width;
            params.height = calWidthHeight.height;
        };
    };
</script>

<form on:submit|preventDefault={onCreate} method="post" class="h-full w-full">
    <div class="flex flex-col rounded-lg h-full">
        <div class="flex justify-center items-center w-full flex-col">
            <div
                class="bg-[#F8F8F9] w-[150px] h-[150px] flex items-center justify-center rounded-lg overflow-hidden"
            >
                <div
                    class="relative flex flex-col justify-center items-center w-full h-full"
                >
                    <div
                        class="absolute flex items-center text-[#939393] justify-center flex-col cursor-pointer w-full h-full"
                        on:click={() => {
                            fileinput.click();
                        }}
                    >
                        {#if params.base64}
                            <!-- <div class="w-full h-full">
                                <img
                                    src={base64}
                                    class="w-full h-full text-gray-600"
                                    alt=""
                                />
                            </div> -->
                            <div class="flex justify-center items-center">
                                <StickerAnimated
                                    base64={params.base64}
                                    bind:frameNum={params.frameNum}
                                    bind:fps={params.fps}
                                    {w}
                                    {h}
                                />
                            </div>
                        {:else if file}
                            <img
                                src={file.url}
                                class="w-64 h-16 text-gray-600"
                                alt=""
                            />
                        {:else}
                            <AddImage size={45} />
                            <div>Image</div>
                        {/if}
                    </div>
                </div>
                <input
                    id="dropzone-file"
                    style="display:none"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    on:change={(e) => onFileSelected(e)}
                    bind:this={fileinput}
                />
            </div>
        </div>
        <div class="pt-5 w-full flex flex-col">
            <div class="flex flex-row items-center">
                <div class="flex flex-row w-1/2 items-center space-x-5 p-2">
                    <div>Height:</div>
                    <div
                        class="bg-[#F8F8F9] rounded-md border-2 border-gray-50 p-1 pl-2 pr-2 space-x-2 flex flex-row"
                    >
                        <div>{params.height}</div>
                        <div>x</div>
                    </div>
                </div>
                <div class="flex flex-row w-1/2 items-center space-x-5 p-2">
                    <div>width:</div>
                    <div
                        class="bg-[#F8F8F9] rounded-md border-2 border-gray-50 p-1 pl-2 pr-2 space-x-2 flex flex-row"
                    >
                        <div>{params.width}</div>
                        <div>x</div>
                    </div>
                </div>
            </div>
            <div class="flex flex-row items-center w-full pt-3 space-x-2">
                <div
                    class="flex flex-row w-1/2 items-center justify-center focus:ring-0 rounded-md border-2 border-gray-50"
                >
                    <input
                        type="number"
                        class="w-full p-2 bg-[#F8F8F9]"
                        bind:value={params.frameNum}
                        name={params.frameNum}
                        placeholder="Frame"
                    />
                </div>
                <div
                    class="flex flex-row w-1/2 items-center justify-center rounded-md border-2 border-gray-50"
                >
                    <input
                        type="number"
                        class="w-full p-2 bg-[#F8F8F9]"
                        bind:value={params.fps}
                        name={params.fps}
                        placeholder="FPS"
                    />
                </div>
            </div>
            <div class=" flex justify-center w-full pt-5 pb-5">
                <label
                    on:click={() => (stickerTypeModalShown = true)}
                    class="w-full border-2 border-gray-100 p-2 rounded-lg font-sans text-sm text-left flex flex-row justify-between cursor-pointer"
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
                        name={params.type}
                        bind:value={selectedStickerType.id}
                    />
                    <DropDown />
                </label>
            </div>
        </div>
        <div class="flex items-end w-full h-full pb-5 pt-10">
            {#if !!!loadCreateState.loading}
                <div class="flex justify-start items-center w-1/2">
                    <div
                        class="flex items-center cursor-pointer justify-center bg-red-300 rounded-[9px] w-[80px] h-[39px] text-white"
                        on:click={() => {
                            dispatch("close");
                        }}
                    >
                        Cancel
                    </div>
                </div>
                <button
                    type="submit"
                    class="flex justify-end items-center cursor-pointer w-1/2"
                >
                    <div
                        class="w-[80px] h-[39px] bg-[#006EB2] rounded-[9px] text-white flex items-center justify-center"
                    >
                        Create
                    </div>
                </button>
            {:else}
                <div
                    class="flex justify-end items-center w-full cursor-pointer"
                >
                    <div
                        class="flex items-center justify-center bg-[#F1F1F1] rounded-[9px] w-[80px] h-[39px] text-white"
                    >
                        <SmfbLoading color={"#006EB2"} />
                    </div>
                </div>
            {/if}
        </div>
    </div>
    <SelectStickerType
        shown={stickerTypeModalShown}
        {stickerTypes}
        on:select={(evt) => {
            const { type } = evt.detail;
            selectedStickerType = type;
            params.type = selectedStickerType;
            stickerTypeModalShown = false;
            showType = true;
        }}
        on:close={() => (stickerTypeModalShown = false)}
    />
</form>
