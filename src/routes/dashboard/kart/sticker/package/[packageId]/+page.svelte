<script>
	import ViewSticker from "$components/elements/grids/ViewSticker/ViewSticker.svelte";
	import FbLoading from "$components/materials/Spinners/fbLoading/FBLoading.svelte";
	import EditSticker from "$components/modals/Sticker/EditSticker/EditSticker.svelte";
	import Modal from "$components/modals/Modal.svelte";
	import { onMount } from "svelte";
	import DeleteSticker from "$components/modals/Sticker/DeleteSticker/DeleteSticker.svelte";
	import {
		deleteSticker,
		findStickerByPackage,
		stickerTypes,
	} from "$providers/actions/kart";
	import { get } from "svelte/store";
	import { page } from "$app/stores";
	import AddButton from "$components/materials/AddButton/AddButton.svelte";
	import CreateStickerStatic from "$components/modals/Sticker/CreateSticker/CreateStickerStatic.svelte";
	import CreateStickerAnimated from "$components/modals/Sticker/CreateSticker/CreateStickerAnimated.svelte";
	import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";

	let packageId = get(page).params.packageId;

	export let param = {};

	let shownEdit = false;
	let loadStickerState = {
		loading: false,
		stickers: [],
		loaded: false,
		errMsg: "",
	};

	let loadStickerTypeState = {
		loading: false,
		types: [],
		loaded: false,
		errMsg: "",
	};

	let onModal = {
		createStatic: false,
		createAnimated: false,
		edit: false,
		delete: false,
		view: false,
	};

	const getStickerByPackage = async () => {
		try {
			loadStickerState.loading = true;
			loadStickerState.loaded = false;
			loadStickerState.errMsg = true;
			const res = await findStickerByPackage.load({ packageId });
			loadStickerState.stickers = res.data;
			loadStickerState.loaded = true;
		} catch (err) {
			loadStickerState.errMsg = err?.message || "Unknown error";
		} finally {
			loadStickerState.loading = false;
		}
	};

	const loadTypes = async () => {
		try {
			loadStickerTypeState.loading = true;
			loadStickerTypeState.loaded = false;
			loadStickerTypeState.errMsg = "";
			const res = await stickerTypes.load();
			loadStickerTypeState.types = res.data;
			loadStickerTypeState.loaded = true;
		} catch (err) {
			loadStickerTypeState.errMsg = err?.message || "Unknown error";
		} finally {
			loadStickerTypeState.loading = false;
		}
	};

	onMount(async () => {
		await getStickerByPackage();
		await loadTypes();
	});
</script>

<div class="flex flex-col">
	<div class="flex-grow-0">
		<div class="flex justify-end p-3 space-x-5">
			<div>
				<AddButton
					isDisabled={loadStickerState.loading || !loadStickerTypeState.loaded}
					title={"New static"}
					on:click={() => {
						onModal.createStatic = true;
					}}
				/>
			</div>
			<AddButton
				isDisabled={loadStickerState.loading || !loadStickerTypeState.loaded}
				title={"New animated"}
				on:click={() => {
					onModal.createAnimated = true;
				}}
			/>
		</div>
	</div>
	<div class="flex-grow">
		{#if loadStickerState.loaded && loadStickerState.stickers?.length <= 0}
			<div
				class="w-full h-full flex justify-center items-center py-2 font-medium text-gray-500 text-base"
			>
				Empty Sticker
			</div>
		{/if}

		<ViewSticker
			bind:stickers={loadStickerState.stickers}
			on:onDelete={(evt) => {
				param = evt.detail;
				onModal.delete = true;
			}}
			on:onEdit={(evt) => {
				param = evt.detail;
				shownEdit = true;
			}}
		/>

		{#if loadStickerState.loading}
			<div class="w-full h-full flex justify-center items-center">
				<SmfbLoading color="grey" />
			</div>
		{/if}
	</div>
</div>

<Modal shown={onModal.createStatic}>
	<CreateStickerStatic
		stickerTypes={loadStickerTypeState.types}
		{packageId}
		on:close={() => {
			onModal.createStatic = false;
		}}
		on:create={async () => {
			onModal.createStatic = false;
			await getStickerByPackage();
		}}
	/>
</Modal>

<Modal shown={onModal.createAnimated}>
	<CreateStickerAnimated
		stickerTypes={loadStickerTypeState.types}
		{packageId}
		on:close={() => {
			onModal.createAnimated = false;
		}}
		on:create={async () => {
			onModal.createAnimated = false;
			await getStickerByPackage();
		}}
	/>
</Modal>

<Modal shown={shownEdit}>
	<EditSticker
		packages={packageId}
		stickerTypes={loadStickerTypeState.types}
		{param}
		on:close={() => {
			shownEdit = false;
		}}
		on:edit={async () => {
			shownEdit = false;
			await getStickerByPackage();
		}}
	/>
</Modal>

<Modal shown={onModal.delete}>
	<DeleteSticker
		{param}
		on:close={() => (onModal.delete = false)}
		on:onDeleted={(evt) => {
			onModal.delete = false;
			getStickerByPackage();
		}}
	/>
</Modal>
