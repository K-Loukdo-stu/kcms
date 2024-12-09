<script>
	import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";
	import { createEventDispatcher, onMount } from "svelte";
	import { getSongOptions } from "$providers/actions/kart/music/music";
	import { createSong } from "$providers/actions/kart/music/song";
	import { uploadSong } from "$providers/actions/storage/music/music";
	import AudioUpload from "$components/materials/music/AudioUpload.svelte";
	import SelectionInput from "$components/materials/music/SelectionInput.svelte";
	export let productionData = [];
	const dispatch = createEventDispatcher();

	let title;
	let genreCode;
	let languageCode;
	let singerId;
	let length = 0;
	let albumId = null;
	let productionId;
	let fileInfo;

	let genres = [];
	let languages = [];
	let singers = [];
	let albums = [];
	let productions = [];

	let uploadPercentage = 0;
	let createSongState = {
		loading: false,
		errMsg: "",
	};

	const onCreateSong = async (file) => {
		try {
			createSongState.loading = true;
			await createSong.load({
				title,
				language: languageCode,
				genre: genreCode,
				length: fileInfo.duration,
				singer: singerId,
				album: albumId,
				production: productionId,
				file: file,
			});
			dispatch("create");
		} catch (error) {
			createSongState.errMsg = error?.message || "Unknown error";
		} finally {
			createSongState.loading = false;
		}
	};

	const onSubmit = async (evt) => {
		evt.preventDefault();
		try {
			if (fileInfo) {
				createSongState.loading = true;
				await uploadSong.load({
					base64: fileInfo.base64,
					name: fileInfo.name,
					size: fileInfo.size,
					contentType: fileInfo.type,
					onComplete: (res) => {
						onCreateSong(res.response);
					},
					onError: (err) => {
						createSongState.loading = false;
					},
					onProgress: ({ params, loaded, total }) => {
						uploadPercentage = (loaded / total) * 98;
					},
				});
			} else {
				throw Error("Audio file is required");
			}
		} catch (error) {
			createSongState.errMsg = error?.message || "Unknown error";
		}
	};

	const onSetup = async () => {
		try {
			const res = await getSongOptions.load();
			genres = res.data.genres;
			languages = res.data.languages;
			if (!languageCode && languages?.length) languageCode = "Khmer";
			productions = res.data.productions;
			singers = res.data.singers;
		} catch (err) {
			console.log(err);
		}
	};

	onMount(() => {
		onSetup();
	});
</script>

<div class=" relative w-full h-full p-1 flex justify-center items-center">
	<div class=" absolute bg-white rounded-md">
		<div class="w-96">
			<div class=" py-6 px-6 lg:px-8 w-full h-full">
				<form
					class=" flex flex-col w-full h-full space-y-6"
					on:submit|preventDefault={onSubmit}
					method="post"
				>
					<div
						class="flex-grow max-h-[700px] overflow-y-auto overflow-x-hidden"
					>
						<div>
							<button
								type="button"
								class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:text-white"
								data-modal-toggle="authentication-modal"
								on:click={() => {
									dispatch("close");
								}}
							>
								<svg
									class="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/></svg
								>
							</button>
							<h3 class="mb-5 text-base font-medium text-gray-700 text-center">
								New song
							</h3>

							<AudioUpload
								bind:fileInfo
								on:handleFile={(evt) => {
									console.log(evt.detail);
								}}
							/>

							<label
								for="title"
								class="block mb-2 text-sm font-medium text-gray-900"
								>Title</label
							>
							<input
								type="text"
								name="title"
								bind:value={title}
								class=" bg-white mb-5 border text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
								placeholder="Title"
								required
							/>
							<SelectionInput
								label="Singer"
								bind:value={singerId}
								bind:optionValues={singers}
								valueField="id"
								optionFields={["firstName", "lastName"]}
								isRequred={true}
								hasNone={true}
							/>
							<div class="h-4" />
							<SelectionInput
								label="Genre"
								bind:value={genreCode}
								bind:optionValues={genres}
								valueField="code"
								optionFields={["name"]}
								isRequred={true}
								hasNone={true}
							/>
							<div class="h-4" />
							<SelectionInput
								label="Language"
								bind:value={languageCode}
								bind:optionValues={languages}
								valueField="code"
								optionFields={["name"]}
								isRequred={true}
							/>
							<div class="h-4" />
							<SelectionInput
								label="Production"
								bind:value={productionId}
								bind:optionValues={productions}
								valueField="id"
								optionFields={["name"]}
								isRequred={true}
								hasNone={true}
							/>
						</div>
					</div>
					{#if createSongState?.errMsg}
						<div
							class=" text-sm text-center bg-yellow-50 text-orange-700 rounded-md p-2"
						>
							{createSongState.errMsg}
						</div>
					{/if}
					<div class="flex-grow-0">
						{#if createSongState.loading}
							<div class="flex justify-end items-end w-3/4">
								<SmfbLoading color="#FE4922" />
							</div>
						{:else}
							<div class="flex justify-center space-x-4">
								<button
									type="button"
									on:click={() => {
										dispatch("close");
									}}
									class=" w-24 h-11 text-gray-600 bg-white focus:ring-4 focus:outline-none rounded-lg border ext-sm font-medium px-5 py-2.5 focus:z-10"
									>Cancel
								</button>
								<button
									type="submit"
									class="relative w-24 h-11 rounded-lg overflow-hidden bg-gray-100"
								>
									<div
										class="absolute inset-0 py-1 text-pink-600 flex justify-center items-center"
									>
										<div>Create</div>
									</div>
								</button>
							</div>
						{/if}
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
