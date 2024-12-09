<script>
	import CloseIcon from "$components/icons/Close/CloseIcon.svelte";
	import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";
	import { createStickerType } from "$providers/actions/kart";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	let fixParam = {
		title: "Add a new type",
		action: "Create",
	};

	let param = {
		name: "",
		url: "",
		code: "",
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
			let res = await createStickerType.load({
				name: param.name,
				url: param.url,
				code: param.code,
			});
			if (res.success) dispatch("create");
		} catch (err) {
			onLoadState.errMsg = err.message;
		} finally {
			onLoadState.loading = true;
		}
	};
</script>

<div class=" relative w-full h-full flex justify-center items-center">
	<div class=" absolute bg-white rounded-md w-80 h-[300px]">
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
					<div class=" flex flex-col p-7 space-y-4">
						<div>
							<input
								type="text"
								name={param.code}
								bind:value={param.code}
								class="bg-gray-50 border text-center border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
								placeholder="Code"
								required
							/>
						</div>
						<div>
							<input
								type="text"
								name={param.name}
								bind:value={param.name}
								class="bg-gray-50 border text-center border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
								placeholder="Name"
								required
							/>
						</div>
						<div>
							<input
								type="text"
								name={param.url}
								bind:value={param.url}
								class="bg-gray-50 border text-center border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
								placeholder="Emoji"
								required
							/>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>

<style>
	/* width */
	::-webkit-scrollbar {
		width: 0px;
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
