<script>
	import { onMount } from "svelte";
	import AddButton from "$components/materials/AddButton/AddButton.svelte";
	import SearchText from "$components/elements/buttons/SearchText/SearchText.svelte";
	import Modal from "$components/modals/Modal.svelte";
	import CreateStickerType from "$components/modals/stickerType/CreateStickerType/CreateStickerType.svelte";
	import { deleteType, searchStickerTypes } from "$providers/actions/kart";
	import EditStickerType from "$components/modals/stickerType/EditStickerType/EditStickerType.svelte";
	import DeleteModal from "$components/modals/DeleteModal/DeleteModal.svelte";
	import ViewListStickerType from "$components/elements/StickerType/ViewListStickerType.svelte";
	import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";

	// Modal
	let onModal = {
		create: false,
		edit: false,
		delete: false,
	};

	// Param
	let loadTypeState = {
		typeData: [],
		typePage: 1,
		loading: false,
		errMsg: "",
		loaded: false,
		searchText: "",
		currentPage: 1,
		type: {},
	};

	const loadTypes = async () => {
		try {
			loadTypeState.errMsg = "";
			loadTypeState.loading = true;
			loadTypeState.loaded = false;
			const res = await searchStickerTypes.load({
				pageNum: loadTypeState.currentPage,
				searchText: loadTypeState.searchText,
			});
			loadTypeState.typeData = res.data.stickerTypes;
			loadTypeState.typePage = res.data.countStickerTypes;
			loadTypeState.loaded = true;
		} catch (err) {
			loadTypeState.errMsg = err.message;
		} finally {
			loadTypeState.loading = false;
		}
	};

	onMount(() => {
		loadTypes();
	});
</script>

<div class="absolute flex flex-col bg-white w-full h-full rounded-lg">
	<div class="flex-grow-0 p-2">
		<div class="flex flex-row items-center justify-between">
			<div class="w-1/2">
				<SearchText
					on:onSearch={async (evt) => {
						loadTypeState.searchText = evt.detail;
						await loadTypes();
					}}
				/>
			</div>
			<div>
				<AddButton
					title={"New Type"}
					on:click={() => {
						onModal.create = true;
					}}
				/>
			</div>
		</div>
	</div>

	<div class=" w-full h-full">
		<div class=" w-full h-full relative overflow-auto">
			<ViewListStickerType
				typeData={loadTypeState.typeData}
				typePage={loadTypeState.typePage}
				on:edit={async (evt) => {
					loadTypeState.type = evt.detail.type;
					onModal.edit = true;
				}}
				on:delete={async (evt) => {
					loadTypeState.type = evt.detail.type;
					onModal.delete = true;
				}}
				on:onCurrentPage={async (evt) => {
					loadTypeState.currentPage = evt.detail;
					await loadTypes();
				}}
			/>
		</div>
		{#if loadTypeState.loading}
			<div class=" flex justify-center">
				<SmfbLoading color="grey" />
			</div>
		{:else if loadTypeState.loaded && loadTypeState.typeData.length === 0}
			<div
				class=" flex justify-center items-center font-medium text-gray-500 text-2xl"
			>
				Empty Sticker Type
			</div>
		{/if}
	</div>
</div>

<Modal shown={onModal.create}>
	<CreateStickerType
		on:close={() => {
			onModal.create = false;
		}}
		on:create={async () => {
			onModal.create = false;
			await loadTypes();
		}}
	/>
</Modal>

<Modal shown={onModal.edit}>
	<EditStickerType
		stickerType={loadTypeState.type}
		on:close={() => {
			onModal.edit = false;
		}}
		on:edit={async () => {
			onModal.edit = false;
			await loadTypes();
		}}
	/>
</Modal>

<Modal shown={onModal.delete}>
	<DeleteModal
		param={loadTypeState.type}
		title={loadTypeState.type.name}
		on:close={() => {
			onModal.delete = false;
		}}
		on:onDelete={async (evt) => {
			onModal.delete = false;
			let id = evt.detail.id;
			try {
				await deleteType.load({ id });
				await loadTypes();
			} catch (e) {
				console.log(e);
			}
		}}
	/>
</Modal>

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
