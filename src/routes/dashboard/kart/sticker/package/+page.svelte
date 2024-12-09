<script>
	import { onMount } from "svelte";
	import Modal from "$components/modals/Modal.svelte";
	import CreateStickerPackage from "$components/modals/StickerPackage/CreateStickerPackage/CreateStickerPackage.svelte";
	import { searchStickerPackages } from "$providers/actions/kart/sticker";
	import EditStickerPackage from "$components/modals/StickerPackage/EditStickerPackage/EditStickerPackage.svelte";
	import SearchText from "$components/elements/buttons/SearchText/SearchText.svelte";
	import StickerPackageList from "$components/elements/StickerPackage/StickerPackageList/StickerPackageList.svelte";
	import AddButton from "$components/materials/AddButton/AddButton.svelte";
	import DeleteStickerPackage from "$components/modals/StickerPackage/DeleteStickerPackage/DeleteStickerPackage.svelte";
    import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";

	// Modal
	let onModal = {
		create: false,
		edit: false,
		delete: false,
		view: false,
	};

	// Param
	let loadPackageState = {
		packageData: [],
		packagePage: 1,
		loading: false,
		errMsg: "",
		loaded: false,
		searchText: "",
		currentPage: 1,
		package: {},
	};

	const loadPackages = async () => {
		try {
			loadPackageState.errMsg = "";
			loadPackageState.loading = true;
			loadPackageState.loaded = false;
			const res = await searchStickerPackages.load({
				pageNum: loadPackageState.currentPage,
				searchText: loadPackageState.searchText,
			});
			loadPackageState.packageData = res.data.stickerPackages;
			loadPackageState.packagePage = res.data.count;
			loadPackageState.loaded = true;
		} catch (err) {
			loadPackageState.errMsg = err.message;
		} finally {
			loadPackageState.loading = false;
		}
	};

	// When Operating start run it first
	onMount(async () => {
		await loadPackages();
	});
</script>

<div class="absolute flex flex-col bg-white w-full h-full rounded-lg">
	<div class="flex-grow-0 p-2">
		<div class="flex flex-row justify-between items-center w-full">
			<div class="w-1/2">
				<SearchText
					on:onSearch={async (evt) => {
						loadPackageState.searchText = evt.detail;
						loadPackages();
					}}
				/>
			</div>
			<div>
				<AddButton
					title={"New Package"}
					on:click={() => {
						onModal.create = true;
					}}
				/>
			</div>
		</div>
	</div>

	{#if loadPackageState.loading}
		<div class="w-full h-full flex justify-center">
			<SmfbLoading color="grey" />
		</div>
	{:else if loadPackageState.packageData.length === 0}
		<div
			class="w-full h-full flex justify-center items-center font-medium text-gray-500 text-2xl"
		>
			Empty Package
		</div>
	{:else if loadPackageState.loaded}
		<div class="flex-grow relative overflow-auto">
			<StickerPackageList
				packageData={loadPackageState.packageData}
				packagePage={loadPackageState.packagePage}
				currentPage={loadPackageState.currentPage}
				on:edit={async (evt) => {
					loadPackageState.package = evt.detail;
					onModal.edit = true;
				}}
				on:delete={async (evt) => {
					loadPackageState.package = evt.detail;
					onModal.delete = true;
				}}
				on:onCurrentPage={async (evt) => {
					loadPackageState.currentPage = evt.detail;
					await loadPackages();
				}}
			/>
		</div>
	{/if}
</div>

<Modal shown={onModal.create}>
	<CreateStickerPackage
		on:close={() => {
			onModal.create = false;
		}}
		on:create={async () => {
			onModal.create = false;
			await loadPackages();
		}}
	/>
</Modal>

<Modal shown={onModal.delete}>
	<DeleteStickerPackage
		param={loadPackageState.package}
		on:close={() => {
			onModal.delete = false;
		}}
		on:onDelete={async () => {
			onModal.delete = false;
			await loadPackages();
		}}
	/>
</Modal>

<Modal shown={onModal.edit}>
	<EditStickerPackage
		stickerPackage={loadPackageState.package}
		on:close={() => {
			onModal.edit = false;
		}}
		on:edit={async () => {
			onModal.edit = false;
			await loadPackages();
		}}
	/>
</Modal>

<style>
	/* width */
	::-webkit-scrollbar {
		width: 4px;
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
