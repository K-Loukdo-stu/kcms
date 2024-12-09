<script>
	import { onMount } from "svelte";
	import SearchText from "$components/elements/buttons/SearchText/SearchText.svelte";
	import Pagenetion from "$components/elements/pagenation/Pagenation/Pagenetion.svelte";
	import { searchChannelCatalogs } from "$providers/actions/kchannel/catalog";
	import ChannelCatalog from "$components/elements/tables/ChannelCatalog/ChannelCatalog.svelte";
	import Modal from "$components/modals/Modal.svelte";
	import CreateService from "$components/modals/CreateService/CreateService.svelte";
	import EditService from "$components/modals/EditService/EditService.svelte";
	import DeleteModal from "$components/modals/DeleteModal/DeleteModal.svelte";
	import HeaderButton from "$components/elements/buttons/HeaderButton/HeaderButton.svelte";
	import CreateChannelCatalog from "$components/modals/ChannelCatalog/CreateChannelCatalog/CreateChannelCatalog.svelte";
	import EditChannelCatalog from "$components/modals/ChannelCatalog/EditChannelCatalog/EditChannelCatalog.svelte";

	let catalog;
	let shownEdit = false;
	let shownDelete = false;
	let shown = false;
	/**
	 * On loadPlaces
	 */
	let currentPage = 1;
	let searchText = "";
	let Data = [];
	let Page = 0;
	const loadCatalogs = async () => {
		try {
			const res = await searchChannelCatalogs.load({
				pageNum: currentPage,
				searchText: searchText,
			});
			Data = res.data.channelCatalogs;
			Page = res.data.channelCatalogsCount;
		} catch (err) {
			// to do
		}
	};

	// When Operating start run it first
	onMount(async () => {
		await loadCatalogs();
	});
</script>

<div class="flex flex-col bg-white w-full h-[100%]">
	<div class="flex-grow-0">
		<div>
			<div class="flex flex-row justify-between items-center">
				<SearchText
					on:onSearch={async (evt) => {
						searchText = evt.detail;
						currentPage = currentPage;
						await loadCatalogs();
					}}
				/>
				<HeaderButton
					title={"New Catalog"}
					on:click={() => {
						shown = true;
					}}
				/>
			</div>
		</div>
	</div>
	<div class="flex-grow">
		<div>
			<ChannelCatalog
				{Data}
				on:onEdit={async (evt) => {
					catalog = evt.detail;
					shownEdit = true;
				}}
				on:onDelete={async (evt) => {
					catalog = evt.detail;
					shownDelete = true;
				}}
			/>
		</div>
	</div>

	<div class="flex-grow-0 mb-5 mr-5">
		{#if Page != 1}
			<Pagenetion
				totalPageNumber={Page}
				{currentPage}
				on:onCurrentPage={async (evt) => {
					currentPage = evt.detail;
					await loadCatalogs();
				}}
			/>
		{/if}
	</div>
</div>

<Modal {shown}>
	<CreateChannelCatalog
		on:close={() => {
			shown = false;
		}}
		on:create={async () => {
			shown = false;
			await loadCatalogs();
		}}
	/>
</Modal>

<Modal shown={shownEdit}>
	<EditChannelCatalog
		param={catalog}
		on:close={() => {
			shownEdit = false;
		}}
		on:edit={async () => {
			shownEdit = false;
			await loadCatalogs();
		}}
	/>
</Modal>

<Modal shown={shownDelete}>
	<DeleteModal
		param={catalog}
		title={"catalog"}
		on:close={() => {
			shownDelete = false;
		}}
		on:onDelete={async (evt) => {
			shownDelete = false;
			let id = evt.detail.id;
			// try {
			// 	const res = await deleteService.load({ id });
			// } catch {}
			await loadCatalogs();
		}}
	/>
</Modal>
